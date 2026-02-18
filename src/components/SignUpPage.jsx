import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post("http://localhost:4000/data", {
        email: email,
        password: password,
      });
      setErrorMessage(response.data.message);
      navigate("/signin");
    } catch (error) {
      console.log(error);
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
      <label>Confirm Password</label>
      <input
        type="password"
        onChange={handleConfirmPasswordChange}
        value={confirmPassword}
        placeholder="Re-enter password"
      />
      <br />
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
      <button>Sign Up</button>
    </form>
  );
}
