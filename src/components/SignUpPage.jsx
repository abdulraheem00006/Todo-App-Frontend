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

export default function SignUpPage({ fetchData }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Password do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/data",
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      );

      if (response.data.loggedIn) {
        fetchData();
        navigate("/signin");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
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
          label="Email"
          type="email"
          onChange={handleEmailChange}
          value={email}
          placeholder=" Enter email address"
        />
        <br />
        <TextField
          label="Password"
          type="password"
          onChange={handlePasswordChange}
          value={password}
          placeholder="Enter password"
        />
        <br />
        <TextField
          label="Re-enter password"
          type="password"
          onChange={handleConfirmPasswordChange}
          value={confirmPassword}
          placeholder="Re-enter password"
        />
        <br />
      </Stack>

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
      <Button variant="contained" type="submit">
        Sign Up
      </Button>
    </form>
  );
}
