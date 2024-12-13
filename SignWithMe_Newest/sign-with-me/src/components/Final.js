import React, { useState } from "react";
import "./Final.css";
const questions = [
  {
    question: "What letter is represented by a closed fist?",
    answers: ["A", "B", "C", "D"],
    correct: "A",
  },
  {
    question: "How do you sign the number 5?",
    answers: ["Open hand", "Closed fist", "Two fingers", "Thumbs up"],
    correct: "Open hand",
  },
  {
    question: "Which of these is a verb in ASL?",
    answers: ["Run", "House", "Blue", "Ten"],
    correct: "Run",
  },
  {
    question: "How do you fingerspell 'DOG'?",
    answers: ["D-O-G", "D-G-O", "O-D-G", "G-O-D"],
    correct: "D-O-G",
  },
  {
    question: "What does the ASL sentence 'HOUSE BLUE' mean?",
    answers: [
      "The house is blue",
      "Blue house",
      "House in blue",
      "Blue in house",
    ],
    correct: "The house is blue",
  },
  {
    question: "What is the ASL sign for the number 10?",
    answers: [
      "Thumbs up shaking",
      "Closed fist",
      "Open hand",
      "Index finger only",
    ],
    correct: "Thumbs up shaking",
  },
  {
    question: "Which handshape is used to sign 'F' in ASL?",
    answers: [
      "Circle with thumb and index finger",
      "Flat hand",
      "Closed fist",
      "V shape",
    ],
    correct: "Circle with thumb and index finger",
  },
  {
    question: "How do you sign the letter 'B'?",
    answers: [
      "Flat hand with thumb tucked in",
      "Closed fist",
      "Circle with fingers",
      "Thumbs up",
    ],
    correct: "Flat hand with thumb tucked in",
  },
  {
    question: "Which word is a noun in ASL?",
    answers: ["Car", "Jump", "Red", "Run"],
    correct: "Car",
  },
  {
    question: "Which is the correct sign for the letter 'C'?",
    answers: ["C-shaped hand", "Flat hand", "Closed fist", "V shape"],
    correct: "C-shaped hand",
  },
  {
    question: "How do you sign the letter 'T'?",
    answers: [
      "Thumb between index and middle finger",
      "Thumbs up",
      "Flat hand",
      "Circle with fingers",
    ],
    correct: "Thumb between index and middle finger",
  },
  {
    question: "What does the ASL sentence 'SCHOOL FINISH' mean?",
    answers: [
      "School is over",
      "Finished school",
      "School end",
      "All are correct",
    ],
    correct: "All are correct",
  },
  {
    question: "Which is an adjective in ASL?",
    answers: ["Happy", "Walk", "House", "Apple"],
    correct: "Happy",
  },
  {
    question: "How do you sign the number 3?",
    answers: [
      "Thumb, index, and middle fingers up",
      "Index, middle, and ring fingers up",
      "Open hand",
      "Closed fist",
    ],
    correct: "Thumb, index, and middle fingers up",
  },
  {
    question: "Which of the following is NOT a correct ASL grammar rule?",
    answers: [
      "Time first in a sentence",
      "Topic first in a sentence",
      "Use articles like 'a' and 'the'",
      "Eyebrows for questions",
    ],
    correct: "Use articles like 'a' and 'the'",
  },
  {
    question: "What does 'FINGERSPELL NAME YOU WHAT' mean in ASL?",
    answers: [
      "What is your name?",
      "Do you know fingerspelling?",
      "What do you spell?",
      "Spell your name?",
    ],
    correct: "What is your name?",
  },
  {
    question: "Which is the correct sign for the letter 'Y'?",
    answers: [
      "Thumb and pinky extended",
      "Closed fist",
      "Flat hand",
      "V shape",
    ],
    correct: "Thumb and pinky extended",
  },
  {
    question: "How do you sign the number 20?",
    answers: [
      "Index and thumb pinch repeatedly",
      "Two closed fists",
      "Open hand shaking",
      "Two hands showing 10 each",
    ],
    correct: "Index and thumb pinch repeatedly",
  },
  {
    question: "Which of these is a proper ASL sentence?",
    answers: [
      "I go store tomorrow",
      "I am going to the store tomorrow",
      "Tomorrow I store go",
      "Both A and C",
    ],
    correct: "Both A and C",
  },
  {
    question: "How do you sign the letter 'Z'?",
    answers: [
      "Draw a 'Z' in the air with your index finger",
      "Closed fist",
      "Thumb up shaking",
      "Flat hand",
    ],
    correct: "Draw a 'Z' in the air with your index finger",
  },
  {
    question: "Which is a common facial expression used in ASL questions?",
    answers: [
      "Eyebrows raised",
      "Eyebrows furrowed",
      "Mouth open",
      "Both A and B",
    ],
    correct: "Both A and B",
  },
  {
    question: "Which of these is NOT a number in ASL?",
    answers: [
      "Open hand",
      "Closed fist",
      "Thumbs crossed",
      "Index and middle fingers up",
    ],
    correct: "Thumbs crossed",
  },
  {
    question: "How do you sign 'HELLO' in ASL?",
    answers: [
      "Hand at forehead moving outward",
      "Wave hand",
      "Thumbs up",
      "Clap hands",
    ],
    correct: "Hand at forehead moving outward",
  },
  {
    question: "How do you fingerspell 'CAT' in ASL?",
    answers: ["C-A-T", "A-T-C", "C-T-A", "T-A-C"],
    correct: "C-A-T",
  },
  {
    question: "What does 'YESTERDAY ME WORK' mean in ASL?",
    answers: [
      "I worked yesterday",
      "Yesterday is work day",
      "I will work tomorrow",
      "Work done",
    ],
    correct: "I worked yesterday",
  },
];

const Final = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const loadQuestion = () => {
    return questions[currentQuestionIndex];
  };

  const checkAnswer = (answer) => {
    if (answer === loadQuestion().correct) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    if (currentQuestionIndex + 1 >= questions.length) {
      setShowResult(true);
    }
  };

  const questionObj = loadQuestion();

  return (
    <div id="quiz-container">
      <div className="quiz-content">
        {showResult ? (
          <div className="result-container">
            <h2>
              {score >= Math.ceil(questions.length * 0.8)
                ? "Congratulations!"
                : "Try Again!"}
            </h2>
            <p>
              You scored{" "}
              <strong>
                {score}/{questions.length}
              </strong>
              .
            </p>
            {score >= Math.ceil(questions.length * 0.8) && (
              <img
                src="https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif"
                alt="Congratulations GIF"
              />
            )}
          </div>
        ) : (
          <div>
            <h3 className="quiz-question">{questionObj.question}</h3>
            <div>
              {questionObj.answers.map((answer, index) => (
                <button
                  key={index}
                  className="answer-button"
                  onClick={() => checkAnswer(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Final;
