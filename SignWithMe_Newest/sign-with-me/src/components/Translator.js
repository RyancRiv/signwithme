import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import AvatarAnimations from "./Avatar_Animations"; // Import AvatarAnimations

const TranslationPage = () => {
  const [input, setInput] = useState(""); // User input
  const [animatedWord, setAnimatedWord] = useState([]); // Animated letters

  // Handle word input and animation
  const handleAddWord = (e) => {
    e.preventDefault();
    const word = input.trim().toLowerCase();
    if (word) {
      setAnimatedWord([]); // Clear previous animation
      animateWord(word); // Trigger the animation for the word
      setInput(""); // Reset the input field
    }
  };

  // Function to animate the word
  const animateWord = (word) => {
    const letters = word.split(""); // Split the word into individual letters
    letters.forEach((letter, index) => {
      setTimeout(() => {
        setAnimatedWord((prev) => [...prev, letter]); // Add letter to animatedWord after delay
      }, index * 800); // Delay each letter animation
    });
  };

  return (
    <div className="container">
      <h1>ASL Translator</h1>

      {/* Input form */}
      <form onSubmit={handleAddWord} className="form">
        <input
          type="text"
          placeholder="Enter a word to translate"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input field value
          className="input"
        />
        <button type="submit" className="button">
          Translate
        </button>
      </form>

      {/* Canvas for 3D rendering */}
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        
        {/* Display Animated Avatar Signs */}
        {animatedWord.map((char, index) => (
          <AvatarAnimations key={index} letter={char.toLowerCase()} />
        ))}
      </Canvas>

      {/* Regular HTML elements like a div can go here outside of the Canvas */}
      <div className="animated-word">
        {/* Any additional static content like buttons or text can go here */}
      </div>
    </div>
  );
};

export default TranslationPage;
