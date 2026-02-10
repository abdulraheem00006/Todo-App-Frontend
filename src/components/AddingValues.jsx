import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";

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
      <AppBar position="static">
        <Toolbar>
          <TaskIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {" "}
            TODO
          </Typography>
        </Toolbar>
      </AppBar>
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
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </form>
  );
}

/*we have to push the data of the dataValues to the values.json
  file but first I need to convert it key and value */
export default AddingValues;
