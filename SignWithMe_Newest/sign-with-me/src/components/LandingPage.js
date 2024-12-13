import { useNavigate } from "react-router-dom";
import React from "react";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const unitsClick = () => {
    navigate("/units");
  };
  return (
    <div className="landing-container">
      <div className="content">
        <h1 className="welcome-text">Welcome to Sign With Me!</h1>
        <p className="description-text">
          Our goal at Sign With Me is to cultivate understanding and inclusion
          through the power of sign language. Whether you're just beginning or
          looking to advance your skills, our interactive lessons are designed
          to guide you every step of the way.
        </p>
        <button className="get-started-button" onClick={unitsClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
