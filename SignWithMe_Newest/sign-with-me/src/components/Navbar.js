import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Logo from "../Assets/Logo.png";
import { AuthContext } from "../AuthContext"; // Import AuthContext
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext); // Access authentication context

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
    navigate("/"); // Redirect to home page after logout
  };

  const homeClick = () => {
    navigate("/");
  };

  const unitsClick = () => {
    navigate("/units");
  };

  const loginClick = () => {
    navigate("/login");
  };

  // const translateClick = () => {
  //   navigate("/translator");
  // };

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">
            <img src={Logo} alt="Logo" className="logo" />
          </a>
        </div>
        <div className="navbar-right">
          <button className="navbar-button home-button" onClick={homeClick}>
            Home
          </button>
          <button className="navbar-button lessons-button" onClick={unitsClick}>
            Units
          </button>
          {/* <button
            className="navbar-button translator-button"
            onClick={translateClick}
          >
            Translator Tool */}
          {/* </button> */}
          {isAuthenticated ? (
            <button className="navbar-button b-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="navbar-button b-button" onClick={loginClick}>
              Login/Signup
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
