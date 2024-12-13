import React, { useState } from "react";
import "./Translator.css";
import Navbar from "./Navbar";

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [outputSign, setOutputSign] = useState("");

  const handleTranslate = () => {
    // Replace this with actual translation logic
    // For now, we'll just show the input text as a placeholder
    setOutputSign(`Sign for: ${inputText}`);
  };

  return (
    <div className="translator-container">
      <h1>Sign Language Translator</h1>
      <textarea
        className="input-box"
        placeholder="Enter text to translate..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button className="translate-button" onClick={handleTranslate}>
        Translate
      </button>
      <div className="output-box">
        <h2>Output Sign:</h2>
        <p>{outputSign}</p>
      </div>
    </div>
  );
};

export default Translator;
