import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import if using react-router-dom
import "./N_Assignment1.css";

const DragAndDropASL = () => {
  const nouns = [
    {
      name: "HOME",
      image: "https://media.giphy.com/media/3o7TKqKtZG1bnbVyhi/giphy.gif",
    },
    {
      name: "DOG",
      image: "https://media.giphy.com/media/l0HlBGjKUV8KJxDoc/giphy.gif",
    },
    {
      name: "CAT",
      image: "https://media.giphy.com/media/LI7i6crQp5ffHyrosY/giphy.gif",
    },
  ];

  const [currentNoun, setCurrentNoun] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [droppedWord, setDroppedWord] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setFeedback("");
  }, [currentNoun]);

  const handleDragStart = (event, word) => {
    event.dataTransfer.setData("text/plain", word);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedWord = event.dataTransfer.getData("text/plain");
    setDroppedWord(droppedWord);
    checkSentence(droppedWord);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const checkSentence = (selectedWord) => {
    const correctWord = nouns[currentNoun].name;
    if (selectedWord === correctWord) {
      setFeedback("Great job! Moving to the next sign.");
      if (currentNoun + 1 < nouns.length) {
        setCurrentNoun(currentNoun + 1);
      } else {
        setFeedback("You've completed all the signs!");
        setIsCompleted(true);
      }
    } else {
      setFeedback("Try again!");
    }
  };

  return (
    <div>
      <h1>Drag and Drop: Match the ASL Sign</h1>
      <Link
        to="/units/lesson5/N_A"
        className="Back_Button"
        style={{ marginRight: "10px", textDecoration: "none" }}
      >
        <button>Go to Noun Page</button>
      </Link>

      <div id="image-container">
        <img
          src={nouns[currentNoun].image}
          alt={nouns[currentNoun].name}
          id="current-noun-image"
          style={{ width: "700px", height: "400px" }}
        />
      </div>
      <div id="drag-words">
        {nouns.map((noun) => (
          <div
            key={noun.name}
            className="word"
            draggable
            onDragStart={(event) => handleDragStart(event, noun.name)}
          >
            {noun.name}
          </div>
        ))}
      </div>
      <div
        id="drop-noun"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        {droppedWord || "[Drop Noun Here]"}
      </div>

      <p id="feedback">{feedback}</p>

      {isCompleted && (
        <div style={{ marginTop: "20px" }}>
          {/* Using react-router-dom Link */}
          {/* Standard <a> tag for external links */}
          <a href="/units" style={{ textDecoration: "none" }}>
            <button>Back to Units Page</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default DragAndDropASL;
