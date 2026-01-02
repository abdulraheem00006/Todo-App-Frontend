import { Link, useNavigate } from "react-router-dom";

// import AddingValues from "./AddingValues";

export default function Data({ combinedData, setCombinedData }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // when clicked opens a new page

    navigate("/addingValues");
  };

  const handleDelete = (deleteVal) => {
    //combined data has the values of both title and description, i have to
    // set that to the setter function here and delete it when clicked
    // can I directly set it to the null then the
    const delTask = combinedData.data.filter((item) => item !== deleteVal);
    setCombinedData(delTask);
  };

  return (
    <div>
      {combinedData.map((val, index) => (
        <div key={index}>
          <Link to={`/description/${val.id}`}>{val.title}</Link>
          <button onClick={() => handleDelete(val)}>Delete</button>
        </div>
      ))}

      <button onClick={handleClick}>Add button</button>
    </div>
  );
}
