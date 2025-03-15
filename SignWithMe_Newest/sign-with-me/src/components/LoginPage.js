import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import "./LoginPage.css";
import axios from "axios";
import { AuthContext } from "../AuthContext"; // Import AuthContext

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        // "https://signwithme-92dm.onrender.com/api/signin",
        "http://localhost:5001/api/signin",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      login(response.data.token, username); // Update the AuthContext to reflect that the user is logged in
      setMessage("Sign-in successful");
      navigate("/"); // Redirect to the home page
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button className="sign-up-button" onClick={handleSignUp}>
        Don’t have an account? Sign Up
      </button>
      <button className="sign-up-button" onClick={goHome}>
        Return to Home Page
      </button>
    </div>
  );
};

export default LoginPage;
