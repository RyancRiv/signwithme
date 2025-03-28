import { useNavigate } from "react-router-dom";
import React from "react";
import "./LandingPage.css";
import { Canvas } from '@react-three/fiber';
import AvatarWithAnimation from "./Avatar_Animations";

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


      <Canvas>
        <ambientLight intensity={2.5} />
        <spotLight position={[5, 5, 5]} angle={0.3} />
        <AvatarWithAnimation animationName="Armature.001|mixamo.com|Layer0" />
      </Canvas>
    </div>
  );
}

export default LandingPage;
