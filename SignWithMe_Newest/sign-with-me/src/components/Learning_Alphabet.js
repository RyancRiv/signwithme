import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import AvatarWithAnimation from "./Avatar_Animations";


const animationNames = [
  "A_Sign",
  "B_Sign",
  "C_Sign",
  "D_Sign",
  "E_Sign",
  "F_Sign",
  null, // G
  null, // H
  null, // I
  null, // J
  null, // K
  null, // L
  null, // M
  null, // N
  null, // O
  null, // P
  null, // Q
  null, // R
  null, // S
  null, // T
  null, // U
  null, // V
  null, // W
  null, // X
  null, // Y
  null, // Z
];

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function LearningAlphabet() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const handleNext = () => {
    setCurrentLetterIndex((prev) => (prev + 1 < letters.length ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentLetterIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  const currentLetter = letters[currentLetterIndex];
  const currentAnimation = animationNames[currentLetterIndex];

  return (
    <div className="learning-alphabet-container">
      <h1>Learning the Alphabet: {currentLetter}</h1>
      
      <div className="letter">
        {currentAnimation ? (
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight />
            <directionalLight position={[0, 0, 5]} />
            <AvatarWithAnimation animationName={currentAnimation} />
          </Canvas>
        ) : (
          <div className="no-animation">
            <p style={{ fontSize: "4rem" }}>{currentLetter}</p>
            <p>(Animation not available)</p>
          </div>
        )}
      </div>

      <div className="navigation">
        <button onClick={handlePrevious} disabled={currentLetterIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentLetterIndex === letters.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default LearningAlphabet;

