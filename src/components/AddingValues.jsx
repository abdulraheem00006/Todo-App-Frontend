import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddingValues({ fetchData, setCombinedData }) {
  const navigate = useNavigate();
  const [descriptionVal, setDescriptionVal] = useState("");
  const [titleVal, setTitleVal] = useState("");

  const handleDescriptionChange = (e) => {
    setDescriptionVal(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitleVal(e.target.value);
  };

  const handleCombinedChange = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post("http://localhost:4000/add", {
        title: titleVal,
        description: descriptionVal,
      });
      setCombinedData(resp);
      setTitleVal("");
      setDescriptionVal("");
      await fetchData();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleCombinedChange}>
      <label>
        Add Title:
        <input type="text" onChange={handleTitleChange} value={titleVal} />
      </label>
      <br />
      <label>
        Add Description:
        <input
          type="text"
          onChange={handleDescriptionChange}
          value={descriptionVal}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

/*we have to push the data of the dataValues to the values.json
  file but first I need to convert it key and value */
export default AddingValues;
