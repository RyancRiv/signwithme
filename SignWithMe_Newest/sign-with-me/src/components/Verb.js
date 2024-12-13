import React, { useState, useEffect } from "react";
import "./Verb.css";
import Past from "../Letters/ASL_Vocabulary_Past_Tense.gif";
import Future from "../Letters/ASL_Vocabulary_Future_Tense.gif";
import Present from "../Letters/ASL_Vocabulary_Present_Tense.gif";
import Red from "../Letters/Red.gif";
import Blue from "../Letters/Blue.gif";
import Yellow from "../Letters/Yellow.gif";
import Green from "../Letters/Green.gif";
import Orange from "../Letters/Orange.gif";
import axios from "axios"; // Ensure axios is imported to make HTTP requests
import { useNavigate } from "react-router-dom";

const VerbsPage = ({ navigate }) => {
  return (
    <section>
      <h1 style={{ color: "white" }}>Learn ASL - Verbs</h1>
      <p style={{ paddingLeft: "25%", fontSize: "24px", color: "white" }}>
        In ASL, verbs can appear at the beginning, middle, or end of a sentence,
        depending on the emphasis.
      </p>

      <div className="tense-section">
        <h2>Present Tense</h2>
        <div className="tense-content">
          <p style={{ fontSize: "24px" }}>
            <strong>
              Signing in present tense is simple — you sign close to your body,
              just like in a normal conversation.
            </strong>
          </p>
          <img
            src={Present}
            alt="Present Tense Example"
            className="tense-gif"
          />
        </div>
      </div>

      <div className="tense-section">
        <h2>Past Tense</h2>
        <div className="tense-content">
          <p style={{ fontSize: "24px" }}>
            <strong>
              Signing in past tense is done by signing <strong>finish</strong>{" "}
              at chest level at the beginning or end of the sentence.
            </strong>
          </p>
          <img src={Past} alt="Past Tense Example" className="tense-gif" />
        </div>
      </div>

      <div className="tense-section">
        <h2>Future Tense</h2>
        <div className="tense-content">
          <p style={{ fontSize: "24px" }}>
            <strong>
              For future tense, sign and say <strong>will</strong> at the end of
              the sentence. Signing farther away indicates a more distant
              future.
            </strong>
          </p>
          <ul style={{ fontSize: "20px", color: "black" }}>
            <strong>
              <li>
                English: He can go later. <br /> Sign: HE GO — WILL
              </li>
              <li>
                English: Mike is walking over to my house. <br /> Sign: MY HOUSE
                — M-I-K-E — WALKING — WILL
              </li>
            </strong>
          </ul>
          <img src={Future} alt="Future Tense Example" className="tense-gif" />
        </div>
      </div>
      <button onClick={() => navigate("quiz")}>Go to Verb Assignment</button>

      <button onClick={() => navigate("colors")}>Go to Colors</button>
    </section>
  );
};

const ColorsPage = ({ navigate, enlargeGif }) => {
  return (
    <section>
      <h1>Learn ASL - Colors</h1>
      <p>Hover over each flashcard to learn how to sign colors in ASL.</p>
      <div className="flashcards">
        <div
          className="flashcard red"
          tabIndex="0"
          onClick={() => enlargeGif(Red)}
        >
          <div className="front">Red</div>
          <div className="back">
            <img src={Red} alt="Sign for Red" />
          </div>
        </div>
        <div
          className="flashcard blue"
          tabIndex="0"
          onClick={() => enlargeGif(Blue)}
        >
          <div className="front">Blue</div>
          <div className="back">
            <img src={Blue} alt="Sign for Blue" />
          </div>
        </div>
        <div
          className="flashcard yellow"
          tabIndex="0"
          onClick={() => enlargeGif(Yellow)}
        >
          <div className="front">Yellow</div>
          <div className="back">
            <img src={Yellow} alt="Sign for Yellow" />
          </div>
        </div>
        <div
          className="flashcard green"
          tabIndex="0"
          onClick={() => enlargeGif(Green)}
        >
          <div className="front">Green</div>
          <div className="back">
            <img src={Green} alt="Sign for Green" />
          </div>
        </div>
        <div
          className="flashcard orange"
          tabIndex="0"
          onClick={() => enlargeGif(Orange)}
        >
          <div className="front">Orange</div>
          <div className="back">
            <img src={Orange} alt="Sign for Orange" />
          </div>
        </div>
      </div>
      <button onClick={() => navigate("verbs")}>Back to Verbs</button>
    </section>
  );
};

const quizQuestions = [
  { question: "I will go to sleep.", correct: "future" },
  { question: "I ate breakfast.", correct: "past" },
  { question: "I am walking to school.", correct: "present" },
  { question: "She will run a race tomorrow.", correct: "future" },
  { question: "He finished his homework.", correct: "past" },
  { question: "We are learning ASL.", correct: "present" },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showNextButton, setShowNextButton] = useState(false);
  const navigate = useNavigate();

  const loadQuestion = () => {
    setFeedback("");
    setShowNextButton(false);
  };

  const checkAnswer = (selectedAnswer) => {
    const correctAnswer = quizQuestions[currentQuestionIndex].correct;

    if (selectedAnswer === correctAnswer) {
      setFeedback("Correct! Well done.");
    } else {
      setFeedback(
        `Incorrect. The correct answer is ${correctAnswer.toUpperCase()}.`
      );
    }

    setShowNextButton(true);
  };

  const loadNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setFeedback("Quiz Complete! Great job! You've finished the quiz.");

      const userName = localStorage.getItem("userName");

      if (userName) {
        // Send a PUT request to update the lesson with quiz_complete = true
        axios
          .put("http://localhost:5000/api/lessons/update-lesson", {
            lessonId: "203",
            userName: userName,
            quiz_complete: true,
          })
          .then((response) => {
            console.log("Lesson updated:", response.data);
          })
          .catch((error) => {
            console.error("Error updating lesson:", error);
          });
        // navigate("/units");
      } else {
        console.error("User is not logged in, unable to update lesson.");
      }
      setShowNextButton(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setFeedback("");
    setShowNextButton(false);
  };

  useEffect(() => {
    loadQuestion();
  }, [currentQuestionIndex]);

  return (
    <div style={{ paddingLeft: "50px" }} className="quiz-container">
      <h2 id="quiz-question">{quizQuestions[currentQuestionIndex].question}</h2>
      <div>
        <button onClick={() => checkAnswer("future")}>
          <img src={Future} alt="Future Tense Example" className="tense-gif" />
        </button>
        <button onClick={() => checkAnswer("past")}>
          <img src={Past} alt="Past Tense Example" className="tense-gif" />
        </button>
        <button onClick={() => checkAnswer("present")}>
          <img
            src={Present}
            alt="Present Tense Example"
            className="tense-gif"
          />
        </button>
      </div>
      {feedback && (
        <div
          id="feedback"
          style={{ color: feedback.includes("Correct") ? "green" : "red" }}
        >
          {feedback}
        </div>
      )}
      {showNextButton && (
        <button id="next-question" onClick={loadNextQuestion}>
          Next Question
        </button>
      )}
      {feedback.includes("Quiz Complete") && (
        <button onClick={restartQuiz}>Restart Quiz</button>
      )}
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("verbs");
  const [enlargedGif, setEnlargedGif] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case "verbs":
        return <VerbsPage navigate={setCurrentPage} />;
      case "colors":
        return (
          <ColorsPage navigate={setCurrentPage} enlargeGif={setEnlargedGif} />
        );
      case "quiz":
        return <Quiz navigate={setCurrentPage} />;
      default:
        return <VerbsPage navigate={setCurrentPage} />;
    }
  };

  return (
    <div>
      <main>{renderPage()}</main>
      {enlargedGif && (
        <div className="lightbox" onClick={() => setEnlargedGif(null)}>
          <img src={enlargedGif} alt="Enlarged GIF" />
        </div>
      )}
    </div>
  );
};

export default App;
