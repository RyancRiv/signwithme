import { useNavigate } from "react-router-dom";
import React from "react";
import "./LandingPage.css";
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { AvatarCreator } from '@readyplayerme/react-avatar-creator';


// Avatar Model Component - moved outside LandingPage
function Model() {
  // Make sure your model is in public/models/ and update the path
  const { scene } = useGLTF('../Letters/avatar_pointing.glb');
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
}

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
        
        {/* 3D Animation Container */}

        {/* <div className="animation-container">
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Model />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={1}
            />
          </Canvas>
        </div> */}

        <button className="get-started-button" onClick={unitsClick}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;