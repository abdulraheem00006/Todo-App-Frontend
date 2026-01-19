import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Description({ combinedData, fetchData }) {
  const { id } = useParams();
  const navigate = useNavigate();
  let result = combinedData.find((value) => value.id === parseInt(id));

  const [titleVal, setTitleVal] = useState(result?.title || "");
  const [descriptionVal, setDescriptionVal] = useState(
    result?.description || ""
  );

  const [showInput, setShowInput] = useState(false);
  const [showData, setShowData] = useState(true);

  const handleDescriptionChange = (e) => {
    setDescriptionVal(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitleVal(e.target.value);
  };

  const handleCombinedChange = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/put/${result.id}`, {
        title: titleVal,
        description: descriptionVal,
      });

      await fetchData();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setShowInput(!showInput);
    setShowData(!showData);
  };

  return (
    <div>
      {showData && (
        <div>
          <h3>{result.title}</h3>
          <p>{result.description}</p>
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
