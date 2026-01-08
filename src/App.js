import "./App.css";
import Data from "./components/Data";
import { Routes, Route } from "react-router-dom";
import Description from "./components/Description";
import AddingValues from "./components/AddingValues";
// import data from "./Values.json"
import axios from "axios";

import { useEffect, useState } from "react";

function App() {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000");
      console.log(response);
      setCombinedData(response.data);
    } catch (error) {
      console.log("There's an error ", error);
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
