import "./App.css";
import Data from "./components/Data";
import { Routes, Route } from "react-router-dom";
import Description from "./components/Description";
import AddingValues from "./components/AddingValues";

import { useState } from "react";

function App() {
  const [combinedData, setCombinedData] = useState([]);
  console.log(combinedData);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8000/Data")
  //     .then((res) => setCombinedData(res.combinedData))
  //     .catch((err) => console.log(err));
  // }, []);

  // console.log(combinedData);

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
