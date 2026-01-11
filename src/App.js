import "./App.css";
import Data from "./components/Data";
import { Routes, Route } from "react-router-dom";
import Description from "./components/Description";
import AddingValues from "./components/AddingValues";
// import data from "./Values.json"
import axios from "axios";

import { useState, useEffect } from "react";

function App() {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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
      await axios.delete(`http://localhost:4000/delete/${deleteVal}`);
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
            />
          }
        />
        <Route
          path="/description/:id"
          element={
            <Description
              combinedData={combinedData}
              setCombinedData={setCombinedData}
            />
          }
        />
        <Route
          path="/addingValues"
          element={
            <AddingValues
              combinedData={combinedData}
              setCombinedData={setCombinedData}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
