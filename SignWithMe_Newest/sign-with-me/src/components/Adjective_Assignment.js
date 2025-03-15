import React, { useState } from "react";
import "./Adjective_Assignment.css"; // Import the CSS file
import axios from "axios"; // Ensure axios is imported to make HTTP requests
import { useNavigate } from "react-router-dom";

function ASLQuiz() {
  const sentences = [
    {
      sentence: "She has a _____ shirt.",
      correctAdjective: "Bright",
      options: ["Bright", "Slow", "Fast", "Dark"],
      video: "asl_bright_sign.mp4",
      hint: "Think about a shirt with a lot of light reflecting off of it.",
    },
    {
      sentence: "The sky is _____ today.",
      correctAdjective: "Blue",
      options: ["Blue", "Green", "Cold", "Big"],
      video: "asl_blue_sign.mp4",
      hint: "It's the color of the sky on a clear day.",
    },
    {
      sentence: "He is a very _____ runner.",
      correctAdjective: "Fast",
      options: ["Slow", "Fast", "Strong", "Smart"],
      video: "asl_fast_sign.mp4",
      hint: "This is the opposite of slow.",
    },
  ];
  const translationSentences = [
    { english: "Is our chair green?", asl: "OUR CHAIR GREEN?" },
    {
      english: "Do you think a cow would make a good pet?",
      asl: "YOU THINK COW GOOD PET?",
    },
    {
      english: "What is your favorite book?",
      asl: "YOUR FAVORITE BOOK, NAME?",
    },
    {
      english: "Where should we put dirty clothes?",
      asl: "CLOTHES DIRTY, SHOULD PUT WHERE?",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTranslationIndex, setCurrentTranslationIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showAdjectiveQuiz, setShowAdjectiveQuiz] = useState(true);
  const [translationAnswer, setTranslationAnswer] = useState("");
  const navigate = useNavigate();

  const checkAdjectiveAnswer = (selectedOption) => {
    const currentQuestion = sentences[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAdjective) {
      setFeedback("Correct! Well done!");
    } else {
      setFeedback(`Incorrect. Hint: ${currentQuestion.hint}`);
    }
  };

  const loadNextAdjectiveQuestion = () => {
    if (currentQuestionIndex + 1 < sentences.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback("");
    } else {
      setShowAdjectiveQuiz(false);
    }
  };

  const checkTranslation = () => {
    const currentTranslation = translationSentences[currentTranslationIndex];
    if (translationAnswer.toUpperCase().trim() === currentTranslation.asl) {
      setFeedback("Correct! Well done!");
      if (currentTranslationIndex + 1 < translationSentences.length) {
        setCurrentTranslationIndex(currentTranslationIndex + 1);
        setTranslationAnswer("");
      } else {
        setFeedback("You've completed the quiz!");
        const userName = localStorage.getItem("userName");

        if (userName) {
          // Send a PUT request to update the lesson with quiz_complete = true
          axios
            .put(
              // "https://signwithme-92dm.onrender.com/api/lessons/update-lesson",
              "http://localhost:5001/api/lessons/update-lesson",

              {
                lessonId: "202",
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
      setFeedback("Incorrect. Try again or review ASL sentence structure.");
    }
  };

  return (
    <div className="quiz-container">
      {showAdjectiveQuiz ? (
        <div className="adjective-quiz">
          <h2>Adjective Quiz</h2>
          <p className="sentence">{sentences[currentQuestionIndex].sentence}</p>
          <video
            src={sentences[currentQuestionIndex].video}
            controls
            className="quiz-video"
          />
          <div className="options-container">
            {sentences[currentQuestionIndex].options.map((option, idx) => (
              <button
                key={idx}
                className="option-button"
                onClick={() => checkAdjectiveAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="feedback">{feedback}</p>
          {feedback.includes("Correct") && (
            <button className="next-button" onClick={loadNextAdjectiveQuestion}>
              Next Question
            </button>
          )}
        </div>
      ) : (
        <div className="translation-quiz">
          <h2>ASL Translation Quiz</h2>
          <p className="english-sentence">
            {translationSentences[currentTranslationIndex].english}
          </p>
          <input
            type="text"
            className="translation-input"
            value={translationAnswer}
            onChange={(e) => setTranslationAnswer(e.target.value)}
            placeholder="Type your ASL translation here"
          />
          <button className="submit-button" onClick={checkTranslation}>
            Submit
          </button>
          <p className="feedback">{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default ASLQuiz;
