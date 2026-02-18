import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignInPage({ fetchData, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/signin", {
        email: email,
        password: password,
      });
      setErrorMessage(response.data.message);
      setIsLoggedIn(true);
      await fetchData();
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        onChange={handleEmailChange}
        value={email}
        placeholder=" Enter email address"
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        onChange={handlePasswordChange}
        value={password}
        placeholder="Enter password"
      />
      <br />
      <button>Sign In</button>
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
