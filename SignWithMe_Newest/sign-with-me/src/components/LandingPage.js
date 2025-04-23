import { useNavigate } from "react-router-dom";
import React from "react";
import "./LandingPage.css";
import { Canvas } from '@react-three/fiber';
import AvatarWithAnimation from "./Avatar_Animations";
import { ToonShader } from '@react-three/drei';


console.log("AvatarWithAnimation component is rendering!");

function LandingPage() {
  const navigate = useNavigate();

  const unitsClick = () => {
    navigate("/units");
  };

  return (
    <div className="landing-container">
      <div className="content" style={{ padding: "100px" }} >
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


      {/* <div className="canvas-container">  */}
        <Canvas> 
        <ambientLight intensity={2} />
        <AvatarWithAnimation animationName="Pointing" width = "25" height = "25" z_axis = "25" />
      </Canvas> 
     </div>
    // </div>
  );
}

export default LandingPage;
