import { useState } from "react";

import { useNavigate } from "react-router-dom";

function AddingValues({ combinedData }) {
  const navigate = useNavigate();
  const [descriptionVal, setDescriptionVal] = useState("");
  const [titleVal, setTitleVal] = useState("");

  // create states which can hold the value of title and description and they are string
  // and lets then push those two states values into a single array.

  const handleDescriptionChange = (e) => {
    setDescriptionVal(e.target.value);
    // Values.push(setDescriptionVal);
    // I want to push the values of setDescriptionVal into Values json file
  };

  const handleTitleChange = (e) => {
    setTitleVal(e.target.value);
  };

  const handleCombinedChange = (e) => {
    e.preventDefault();
    const obj = {
      id: Date.now(),
      title: titleVal,
      description: descriptionVal,
    };

    combinedData.push(obj);

    setTitleVal("");
    setDescriptionVal("");
    navigate("/");
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

      {/* combined data now has the array of object with id and title that i have to send it to the 
 data.jsx file and display the title and description from there  */}
    </form>
  );
}

/*we have to push the data of the dataValues to the values.json
  file but first I need to convert it key and value */
export default AddingValues;
