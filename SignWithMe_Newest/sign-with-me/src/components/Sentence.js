import React, { useState } from "react";
import "./Sentence.css";
import axios from "axios"; // Ensure axios is imported to make HTTP requests
import { useNavigate } from "react-router-dom";

const App = () => {
  // Sentence data
  const questions = [
    ["I", "READ", "BOOK"],
    ["I", "LOVE", "YOU"],
    ["DOG", "RUNS", "FAST"],
    ["MY", "NAME", "IS", "JOHN"],
    ["SHE", "IS", "NICE"],
  ];

  // Correct ASL translations
  const aslTranslations = [
    ["BOOK", "I", "READ"], // ASL structure for "I READ BOOK"
    ["YOU", "I", "LOVE"], // ASL structure for "I LOVE YOU"
    ["DOG", "RUNS", "FAST"], // Same as original
    ["MY", "NAME", "IS", "JOHN"], // ASL structure with "IS" fingerspelled
    ["SHE", "IS", "NICE"], // ASL structure with "IS" fingerspelled
  ];

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentSentence, setCurrentSentence] = useState([]);
  const [draggedWord, setDraggedWord] = useState("");
  const navigate = useNavigate();

  // Drag-and-drop handlers
  const allowDrop = (e) => e.preventDefault();

  const handleDragStart = (word) => {
    setDraggedWord(word);
  };

  const handleDrop = () => {
    setCurrentSentence((prev) => [...prev, draggedWord]);
    setDraggedWord("");
  };

  const checkSentence = () => {
    const isCorrect =
      JSON.stringify(currentSentence) ===
      JSON.stringify(aslTranslations[currentQuestionIndex]);
    if (isCorrect) {
      alert("Correct!");
      if (currentQuestionIndex < questions.length - 1) {
        // Move to the next question
        setCurrentQuestionIndex((prev) => prev + 1);
        setCurrentSentence([]);
      } else {
        alert("You have completed all questions!");

        const userName = localStorage.getItem("userName");

        if (userName) {
          // Send a PUT request to update the lesson with quiz_complete = true
          axios
            .put(
              "https://signwithme-92dm.onrender.com/api/lessons/update-lesson",
              {
                lessonId: "201",
                userName: userName,
                quiz_complete: true,
              }
            )
            .then((response) => {
              console.log("Lesson updated:", response.data);
            })
            .catch((error) => {
              console.error("Error updating lesson:", error);
            });
          navigate("/units");
        } else {
          console.error("User is not logged in, unable to update lesson.");
        }
      }
    } else {
      alert("Try again!");
    }
  };

  // Clear drop zone
  const clearDropZone = () => {
    setCurrentSentence([]);
  };

  return (
    <div>
      <header>
        <h1>ASL Practice</h1>
        <nav>
          <a href="index.html">Vocabulary</a>
          <a href="/units/lesson4">Grammar Rules</a>
        </nav>
      </header>

      <main>
        <section>
          <h2>Practice: Build a Sentence</h2>
          <p>Drag and drop words to form the correct ASL sentence:</p>

          {/* Display the current question */}
          <div className="question">
            {questions[currentQuestionIndex].map((word) => (
              <div
                key={word}
                draggable
                onDragStart={() => handleDragStart(word)}
                className="word"
              >
                {word}
              </div>
            ))}
          </div>

          {/* Drop zone */}
          <div className="drop-zone" onDrop={handleDrop} onDragOver={allowDrop}>
            {currentSentence.map((word, index) => (
              <span key={index} className="dropped-word">
                {word}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button onClick={checkSentence}>Submit</button>
            <button onClick={clearDropZone}>Clear</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
