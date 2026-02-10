import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";

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
      {combinedData.map((val, index) => (
        <Card
          variant="outlined"
          key={index}
          sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
        >
          <Link to={`/description/${val.id}`}>{val.title}</Link>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(val.id)}
          >
            Delete
          </Button>
        </Card>
      ))}

      <Button variant="contained" onClick={handleClick}>
        Add button
      </Button>
    </div>
  );
}
