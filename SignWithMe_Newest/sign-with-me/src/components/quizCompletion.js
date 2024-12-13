import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function QuizCompletion({ score, totalQuestions }) {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2>Congratulations!</h2>
      <p>You have completed the ASL Quiz.</p>
      {/* <p>Your progress has been saved.</p> */}
      <p>
        Your score: {score} out of {totalQuestions}
      </p>
      <button
        onClick={() => {
          /* Navigate to next lesson */
        }}
        style={{
          marginTop: "20px",
          padding: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Move to Next Lesson
      </button>

      {/* <button 
        onClick={() => {<Link to="src/UnitSet.js">{}</Link>
      }}
        
        style={{ marginTop: '20px', padding: '10px', fontSize: '16px', cursor: 'pointer' }}
      >
        Save Progress and Return Home
      </button> */}
      <Link
        to="/units"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#f0f0f0",
          color: "black",
          textDecoration: "none",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        Save Progress and Return Home
      </Link>
    </div>
  );
}

export default QuizCompletion;
