import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import AvatarAnimations from "./Avatar_Animations";
import "./Translator.css";

const TranslationPage = () => {
  const [input, setInput] = useState("");
  const [animatedWord, setAnimatedWord] = useState([]);

  const handleAddWord = (e) => {
    e.preventDefault();
    const word = input.trim().toLowerCase();
    if (word) {
      setAnimatedWord([]);
      animateWord(word);
      setInput("");
    }
  };

  const animateWord = (word) => {
    const letters = word.split("");
    letters.forEach((letter, index) => {
      setTimeout(() => {
        setAnimatedWord((prev) => [...prev, letter]);
      }, index * 800);
    });
  };

  return (
    <div className="translation-page">
      <div className="translator-box">
        <h1 className="title">ASL Translator</h1>

        <form onSubmit={handleAddWord} className="form">
          <input
            type="text"
            placeholder="Enter a word"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">
            Translate
          </button>
        </form>

        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {animatedWord.map((char, index) => (
              <AvatarAnimations key={index} letter={char.toLowerCase()} />
            ))}
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default TranslationPage;
