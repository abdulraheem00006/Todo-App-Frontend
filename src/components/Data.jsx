import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import AddingValues from "./AddingValues";
import axios from "axios";

export default function Data({ combinedData, setCombinedData }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addingValues");
  };

  const handleDelete = async (deleteVal) => {
    try {
      const resp = await axios.delete(
        `http://localhost:4000/delete/${deleteVal}`
      );
      console.log(resp.data);
      setCombinedData(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {combinedData.map((val, index) => (
        <div key={index}>
          <Link to={`/description/${val.id}`}>{val.title}</Link>
          <button onClick={() => handleDelete(val.id)}>Delete</button>
        </div>
      ))}

      <button onClick={handleClick}>Add button</button>
    </div>
  );
}
