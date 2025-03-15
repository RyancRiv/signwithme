import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import "./SignUpPage.css";
import axios from "axios";
import { AuthContext } from "../AuthContext"; // Import AuthContext

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Access login function from AuthContext

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== retypePassword) {
      alert("Passwords do not match!");
    } else {
      try {
        // Send sign-up request to the backend
        // await axios.post("https://signwithme-92dm.onrender.com/api/signup", {
          await axios.post("http://localhost:5001/api/signup", {
          username,
          email,
          password,
        });
        setMessage("User created successfully");

        // After sign-up, log the user in automatically
        // const response = await axios.post(
        //   "https://signwithme-92dm.onrender.com/api/signin",
        const response = await axios.post("http://localhost:5001/api/signin",

          {
            username,
            password,
          }
        );

        // Store the token and update AuthContext
        localStorage.setItem("token", response.data.token);
        login(response.data.token, username); // Update the AuthContext to reflect that the user is logged in
        navigate("/"); // Redirect to home after successful login
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSignUp} className="signup-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Retype Password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <button className="login-button" onClick={() => navigate("/login")}>
        Already have an account? Log In
      </button>
      <button className="go-home-button" onClick={() => navigate("/")}>
        Return to Home Page
      </button>
    </div>
  );
};

export default SignUpPage;
