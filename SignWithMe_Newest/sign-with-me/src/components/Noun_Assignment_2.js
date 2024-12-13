import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import if using react-router-dom
import "./N_Assignment2.css";
const ASLTranslationPractice = () => {
  const aslSigns = [
    {
      images: ["https://www.youtube.com/embed/uKAKaQG5FTI"],
      word: "Is your house big?",
    },
    {
      images: ["https://www.youtube.com/embed/c1fJX4uQvLY"],
      word: "In what city do you live?",
    },
    {
      images: ["https://media.giphy.com/media/LI7i6crQp5ffHyrosY/giphy.gif"],
      word: "CAT",
    },
  ];

  const [currentSign, setCurrentSign] = useState(0);
  const [aslInput, setAslInput] = useState("");
  const [aslFeedback, setAslFeedback] = useState("");

  const checkASL = () => {
    const correctAnswer = aslSigns[currentSign].word;
    if (aslInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      setAslFeedback("Correct!");
      nextASLSign();
    } else {
      setAslFeedback(`Try again! Hint: "${correctAnswer}"`);
    }
  };

  const nextASLSign = () => {
    if (currentSign + 1 < aslSigns.length) {
      setCurrentSign(currentSign + 1);
      setAslInput("");
      setAslFeedback("");
    } else {
      setAslFeedback("Great job! You've completed all translations.");
    }
  };

  return (
    <div>
      <h1>ASL Translation Practice</h1>
      <Link
        to="/units/lesson5/N_A"
        style={{ marginRight: "10px", textDecoration: "none" }}
      >
        <button>Go to Noun Page</button>
      </Link>

      <div id="asl-container">
        <div id="asl-image">
          {aslSigns[currentSign].images[0].includes("youtube") ? (
            <iframe
              src={aslSigns[currentSign].images[0]}
              width="560"
              height="315"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src={aslSigns[currentSign].images[0]}
              alt={aslSigns[currentSign].word}
              style={{ width: "200px", height: "200px" }}
            />
          )}
        </div>
        <input
          type="text"
          id="asl-translation"
          placeholder="Type your translation here"
          value={aslInput}
          onChange={(e) => setAslInput(e.target.value)}
        />
        <button className="Back_Button" onClick={checkASL}>
          Submit
        </button>
        <p id="asl-feedback">{aslFeedback}</p>
      </div>
    </div>
  );
};

export default ASLTranslationPractice;
