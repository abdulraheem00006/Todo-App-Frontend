import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function Description({ combinedData, fetchData }) {
  const { id } = useParams();
  const navigate = useNavigate();

  let result = combinedData.find((value) => value.id === parseInt(id));

  const [titleVal, setTitleVal] = useState(result?.title || "");
  const [descriptionVal, setDescriptionVal] = useState(
    result?.description || "",
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
      await axios.put(
        `http://localhost:4000/put/${result.id}`,
        {
          title: titleVal,
          description: descriptionVal,
        },
        {
          withCredentials: true,
        },
      );

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
          <h3>{result.title}</h3>
          <p>{result.description}</p>
          <Button variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        </div>
      )}

      {showInput && (
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
          <br />
          <Stack>
            <TextField
              label="Title"
              type="text"
              value={titleVal}
              onChange={handleTitleChange}
            />
            <br />

            <TextField
              label="Description"
              type="text"
              value={descriptionVal}
              onChange={handleDescriptionChange}
            />
          </Stack>

          <br />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}
