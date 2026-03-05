import "./App.css";
import Data from "./components/Data";
import { Routes, Route } from "react-router-dom";
import Description from "./components/Description";
import AddingValues from "./components/AddingValues";
import axios from "axios";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";

import { useState, useEffect } from "react";

function App() {
  const [combinedData, setCombinedData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );
  const [loggedInUser, setLoggedInUser] = useState(null);

  const checkLogin = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user", {
        withCredentials: true,
      });
      if (response.data.loggedIn) {
        setIsLoggedIn(true);
        setLoggedInUser(response.data.user); 
        localStorage.setItem("isLoggedIn", "true");
      } else {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem("isLoggedIn");
      }
    } catch (error) {
      setIsLoggedIn(false);
      setLoggedInUser(null);
      localStorage.removeItem("isLoggedIn");
    }
  };

  useEffect(() => {
    checkLogin();
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/logout",
        {},
        { withCredentials: true },
      );

      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000");
      setCombinedData(response.data);
    } catch (error) {
      console.log("There's an error ", error);
    }
  };

  const handleDelete = async (deleteVal) => {
    try {
      await axios.delete(`http://localhost:4000/delete/${deleteVal}`, {
        withCredentials: true,
      });
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Data
              combinedData={combinedData}
              setCombinedData={setCombinedData}
              handleDelete={handleDelete}
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              loggedInUser={loggedInUser}
            />
          }
        />
        <Route
          path="/description/:id"
          element={
            <Description
              combinedData={combinedData}
              setCombinedData={setCombinedData}
              fetchData={fetchData}
            />
          }
        />
        <Route
          path="/addingValues"
          element={
            <AddingValues
              combinedData={combinedData}
              setCombinedData={setCombinedData}
              fetchData={fetchData}
              loggedInUser={loggedInUser}
            />
          }
        />
        <Route path="/signup" element={<SignUpPage fetchData={fetchData} />} />
        <Route
          path="/signin"
          element={
            <SignInPage
              fetchData={fetchData}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
