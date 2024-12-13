import React, { useState, useEffect } from "react";
import "./Finger_Spelling.css";
import axios from "axios"; // Make sure axios is imported
import A from "../Letters/A_Cropped.png";
import B from "../Letters/B_Cropped.png";
import C from "../Letters/C_Cropped.png";
import D from "../Letters/D_Cropped.png";
import E from "../Letters/E_Cropped.png";
import F from "../Letters/F_Cropped.png";
import G from "../Letters/G_Cropped.png";
import H from "../Letters/H_Cropped.png";
import I from "../Letters/I_Cropped.png";
import J from "../Letters/J_Cropped.png";
import K from "../Letters/K_Cropped.png";
import L from "../Letters/L_Cropped.png";
import M from "../Letters/M_Cropped.png";
import N from "../Letters/N_Cropped.png";
import O from "../Letters/O_Cropped.png";
import P from "../Letters/P_Cropped.png";
import Q from "../Letters/Q_Cropped.png";
import R from "../Letters/R_Cropped.png";
import S from "../Letters/S_Cropped.png";
import T from "../Letters/T_Cropped.png";
import U from "../Letters/U_Cropped.png";
import V from "../Letters/V_Cropped.png";
import W from "../Letters/W_Cropped.png";
import X from "../Letters/X_Cropped.png";
import Y from "../Letters/Y_Cropped.png";
import Z from "../Letters/Z_Cropped.png";

const words = ["BAT", "MORNING", "ORANGE"]; // Target words

const Finger_Spelling = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [popupMessage, setPopupMessage] = useState("");
  const [finalMessage, setFinalMessage] = useState("");
  const [slots, setSlots] = useState([]);

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    initializeGame();
  }, [currentWordIndex]);

  const initializeGame = () => {
    setPopupMessage("");
    setFinalMessage("");
    setSlots(
      currentWord.split("").map((letter) => ({
        letter,
        filled: false,
        incorrect: false,
        correct: false,
      }))
    );
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedLetter = e.dataTransfer.getData("text/plain");

    setSlots((prevSlots) => {
      const newSlots = [...prevSlots];
      const slot = newSlots[index];

      if (slot.filled) return prevSlots; // Slot already filled

      if (draggedLetter === slot.letter) {
        slot.filled = true;
        slot.correct = true;
      } else {
        slot.incorrect = true;
        setTimeout(() => {
          setSlots((prevSlots) => {
            const updatedSlots = [...prevSlots];
            updatedSlots[index].incorrect = false;
            return updatedSlots;
          });
        }, 1000);
      }
      return newSlots;
    });
    // Use setTimeout to ensure state has updated before checking win condition
    setTimeout(checkWinCondition, 0);
  };

  const checkWinCondition = () => {
    const allFilled = slots.every((slot) => slot.filled && slot.correct);

    if (allFilled) {
      setScore((prevScore) => prevScore + 1);
      setPopupMessage("+1");
      setFinalMessage("✔ All Correct!");

      setTimeout(() => {
        if (currentWordIndex + 1 < words.length) {
          setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
          setFinalMessage("🎉 Game Completed!");
          // Assuming userName is stored in localStorage after login
          const userName = localStorage.getItem("userName");

          if (userName) {
            // Send a PUT request to update the lesson with quiz_complete = true
            axios
              .put(
                "https://signwithme-92dm.onrender.com/api/lessons/update-lesson",
                {
                  lessonId: "102",
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
          } else {
            console.error("User is not logged in, unable to update lesson.");
          }
        }
      }, 1000);
    }
  };

  const renderDropSlots = () =>
    slots.map((slot, index) => (
      <div
        key={index}
        className={`drop-slot ${slot.incorrect ? "incorrect" : ""} ${
          slot.filled ? "correct" : ""
        }`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, index)}
      >
        {slot.filled && (
          <img
            src={letterImages[slot.letter]}
            alt={`ASL sign for ${slot.letter}`}
            className="slot-image"
          />
        )}
      </div>
    ));

  const letterImages = {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X,
    Y,
    Z,
  };

  const renderASLPieces = () =>
    Object.keys(letterImages).map((letter) => (
      <div
        key={letter}
        className="alphabet-piece"
        draggable
        onDragStart={(e) => e.dataTransfer.setData("text/plain", letter)}
      >
        <img
          src={letterImages[letter]}
          alt={`ASL sign for ${letter}`}
          className="alphabet-image"
        />
      </div>
    ));

  return (
    <div>
      <header>
        <h1 style={{ color: "white" }}>ASL Drag-and-Drop Game</h1>
        <p style={{ color: "white" }}>
          Drag the ASL signs to the correct boxes to spell the word!
        </p>
      </header>
      <main>
        <div id="target-word-container">
          <h2 id="target-word">{currentWord}</h2>
        </div>
        <div id="game-container">
          <div id="drop-zone" className="drop-zone">
            {renderDropSlots()}
          </div>
          <div id="alphabet-container2" className="alphabet-container2">
            {renderASLPieces()}
          </div>
        </div>
        <p id="feedback" className="feedback"></p>
        <div id="score-display">Score: {score}</div>
        {popupMessage && (
          <div id="popup" className="popup">
            {popupMessage}
          </div>
        )}
        {finalMessage && <div id="final-message">{finalMessage}</div>}
      </main>
    </div>
  );
};

export default Finger_Spelling;
