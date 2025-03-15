import React, { useState } from "react";
import "./Greetings.css"; // Assuming you want to keep your styles in a separate CSS file
import axios from "axios"; // Ensure axios is imported to make HTTP requests
import { useNavigate } from "react-router-dom";

const Greetings = () => {
  const [feedback, setFeedback] = useState("");
  const userName = localStorage.getItem("userName"); // Get username from localStorage

  const navigate = useNavigate();

  const giveFeedback = (greeting) => {
    const feedbackMessages = {
      hello: 'Great job! You signed "Hello" correctly.',
      "good-morning": 'Well done! "Good Morning" is correct.',
      "how-are-you": 'Nice work! You signed "How Are You?" correctly.',
      goodbye: 'Perfect! You signed "Goodbye" correctly.',
      "see-you-later": 'Excellent! "See You Later" is right!',
    };

    if (feedbackMessages[greeting]) {
      setFeedback(feedbackMessages[greeting]);
    } else {
      setFeedback("Oops! Please try again.");
    }
  };

  const handleFinish = async () => {
    const userName = localStorage.getItem("userName");

    if (userName) {
      // Send a PUT request to update the lesson with quiz_complete = true
      axios
        // .put("https://signwithme-92dm.onrender.com/api/lessons/update-lesson", {
          .put("http://localhost:5001/api/lessons/update-lesson", {

          lessonId: "103",
          userName: userName,
          quiz_complete: true,
        })
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
  };

  return (
    <div>
      <header>
        <h1 style={{ color: "white" }}>Let's Practice ASL Greetings!</h1>
        <p style={{ color: "white" }}>
          Learn and practice American Sign Language (ASL) greetings with tips
          and visual aids!
        </p>
      </header>

      <main id="practice-container">
        {/* Practice Section for "Hello" */}
        <div className="practice-section">
          <h2>Practice 1: "Hello"</h2>
          <div className="gif-container">
            <img
              id="hello-gif"
              src="https://assistivetechnologyblog.com/wp-content/uploads/2017/03/giphy.gif"
              alt="Hello in ASL"
            />
          </div>
          <div className="tips">
            <h3>Tips:</h3>
            <p>
              Start with your dominant hand in a fist, then open your fingers
              slightly and move your hand from your forehead outward.
            </p>
          </div>
          <p id="feedback">{feedback}</p>
        </div>

        {/* Practice Section for "Good Morning" */}
        <div className="practice-section">
          <h2>Practice 2: "Good Morning"</h2>
          <div className="gif-container">
            <img
              id="good-morning-gif"
              src="https://media.giphy.com/media/sitxzpEkJfKPzTEsFS/giphy.gif"
              alt="Good Morning in ASL"
            />
          </div>
          <div className="tips">
            <h3>Tips:</h3>
            <p>
              Start with your right hand in a fist, then place your thumb under
              your chin and move it away from your face.
            </p>
          </div>
          <p id="feedback">{feedback}</p>
        </div>

        {/* Practice Section for "How Are You?" */}
        <div className="practice-section">
          <h2>Practice 3: "How Are You?"</h2>
          <div className="gif-container">
            <img
              id="how-are-you-gif"
              src="https://media.giphy.com/media/26FLgm33ve3iUexZC/giphy.gif"
              alt="How Are You in ASL"
            />
          </div>
          <div className="tips">
            <h3>Tips:</h3>
            <p>
              Place both hands with fingers spread, facing each other, then move
              them apart in a circular motion.
            </p>
          </div>
          <p id="feedback">{feedback}</p>
        </div>

        {/* Practice Section for "Goodbye" */}
        <div className="practice-section">
          <h2>Practice 4: "Goodbye"</h2>
          <div className="gif-container">
            <img
              id="goodbye-gif"
              src="https://media.giphy.com/media/3o7TKzb3i29i86BPJm/giphy.gif"
              alt="Goodbye in ASL"
            />
          </div>
          <div className="tips">
            <h3>Tips:</h3>
            <p>
              To say goodbye, wave your hand with your fingers spread. You can
              do this by simply extending your fingers and waving them side to
              side.
            </p>
          </div>
          <p id="feedback">{feedback}</p>
        </div>

        {/* Practice Section for "See You Later" */}
        <div className="practice-section">
          <h2>Practice 5: "See You Later"</h2>
          <div className="gif-container">
            <img
              id="see-you-later-gif"
              src="https://media.giphy.com/media/l0MYHTyMzMRcikIxi/giphy.gif"
              alt="See You Later in ASL"
            />
          </div>
          <div className="tips">
            <h3>Tips:</h3>
            <p>
              To say "See You Later," you can wave your hand from side to side
              or use the "peace" sign and then make a slight wave.
            </p>
          </div>
          <p id="feedback">{feedback}</p>
        </div>
      </main>

      {/* Finish Button */}
      <footer>
        <button className="finish-btn" onClick={handleFinish}>
          Finish
        </button>
        <p>Practice makes perfect! Keep practicing your ASL skills daily!</p>
      </footer>
    </div>
  );
};

export default Greetings;
