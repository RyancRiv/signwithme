import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import Logo from "../Assets/Logo.png";
import { AuthContext } from "../AuthContext";
import "../components/Navbar.css";



const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const homeClick = () => navigate("/");
  const unitsClick = () => navigate("/units");
  const loginClick = () => navigate("/login");
  const createcharacterClick = () => navigate("/createcharacters");
  const gotoavatar = () => navigate("/avatar");
  const translationClick = () => navigate("/translation"); // ✅ correct route

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

          {isAuthenticated ? (
            <button className="navbar-button b-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="navbar-button b-button" onClick={loginClick}>
              Login/Signup
            </button>
          )}

          <button className="navbar-button b-button" onClick={createcharacterClick}>
            Create Character
          </button>

          <button className="navbar-button b-button" onClick={gotoavatar}>
            Go To Avatar
          </button>

          <button className="navbar-button translation_page-button" onClick={translationClick}>
            Translation
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
