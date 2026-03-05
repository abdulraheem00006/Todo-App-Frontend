import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TaskIcon from "@mui/icons-material/Task";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Navigate } from "react-router-dom";

export default function SignInPage({ fetchData, setIsLoggedIn, isLoggedIn }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
    if (isLoggedIn) {
      return <Navigate to="/" replace />;
    }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/signin",
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      );
      if (response.data.loggedIn) {
        setIsLoggedIn(true);
        await fetchData();
        navigate("/", { replace: true });
      } else {
        setErrorMessage("No record found");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
          type="email"
          label="Email"
          onChange={handleEmailChange}
          value={email}
          placeholder="Enter email address"
        />
        <br />
        <TextField
          type="password"
          label="Password"
          onChange={handlePasswordChange}
          value={password}
          placeholder="Enter password"
        />
      </Stack>

      <br />
      <Button variant="contained" type="submit">
        Sign In
      </Button>
      {errorMessage && (
        <p
          style={{
            marginTop: "15px",
            color: errorMessage.includes("success") ? "green" : "red",
          }}
        >
          {errorMessage}
        </p>
      )}
    </form>
  );
}
