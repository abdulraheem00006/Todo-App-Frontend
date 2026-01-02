import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Description({ combinedData, setCombinedData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  let result = combinedData.find((value) => value.id === parseInt(id));

  const [titleVal, setTitleVal] = useState(result.title);
  const [descriptionVal, setDescriptionVal] = useState(result.description);

  const [showInput, setShowInput] = useState(false);
  const [showData, setShowData] = useState(true);

  // console.log(result);

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
    // const obj = {
    //   id: Date.now(),
    //   title: titleVal,
    //   description: descriptionVal,
    // };
    const updatedObj = combinedData.map((obj) => {
      if (obj.id === parseInt(id)) {
        return {
          ...obj,
          title: titleVal,
          description: descriptionVal,
        };
      } else {
        return obj;
      }

      // return [...obj, titleVal, descriptionVal];
      // if (obj.id === parseInt.id) {
      //   return {
      //     id: obj.id,
      //     title: titleVal,
      //     description: descriptionVal,
      //   };
      // } else {
      //   return {
      //     id: obj.id,
      //     title: titleVal,
      //     description: descriptionVal,
      //   };
      // }
    });

    setCombinedData(updatedObj);
    navigate("/");
  };
  // console.log(combinedData);
  const handleEdit = () => {
    setShowInput(!showInput);
    setShowData(!showData);

    //when combinedData is equal to
    // combinedData.filter((item) => {
    //   // editVal === item ? item : titleVal;
    //   return item === editVal ? setCombinedData(setTitleVal) : item;
    // combinedData.filter((item) => {
    //   return item !== val ? setCombinedData(setTitleVal) : item;
    // });
  };

  return (
    <div>
      {showData && (
        <div>
          {titleVal}
          <br />
          {descriptionVal}
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}

      {showInput && (
        <form onSubmit={handleCombinedChange}>
          <label>
            Add Title:
            <input type="text" value={titleVal} onChange={handleTitleChange} />
          </label>
          <br />
          <label>
            Add Description:
            <input
              type="text"
              value={descriptionVal}
              onChange={handleDescriptionChange}
            />
          </label>
          <br />
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}
