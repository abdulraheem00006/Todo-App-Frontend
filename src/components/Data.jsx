import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import AddingValues from "./AddingValues";
// import axios from "axios";

export default function Data({ combinedData, handleDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addingValues");
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
