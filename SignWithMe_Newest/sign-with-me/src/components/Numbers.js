import React, { useState } from "react";

import number00 from "../Letters/number00.png";
import number01 from "../Letters/number01.png";
import number02 from "../Letters/number02.png";
import number03 from "../Letters/number03.png";
import number04 from "../Letters/number04.png";
import number05 from "../Letters/number05.png";
import number06 from "../Letters/number06.png";
import number07 from "../Letters/number07.png";
import number08 from "../Letters/number08.png";
import number09 from "../Letters/number09.png";
import number10 from "../Letters/number10.gif";

const aslImages = [
  {
    src: number00,
    alt: "ASL Number 0",
    instructions: "To sign 0, form a circle with your thumb and index finger.",
  },
  {
    src: number01,
    alt: "ASL Number 1",
    instructions: "To sign 1, raise your index finger.",
  },
  {
    src: number02,
    alt: "ASL Number 2",
    instructions: "To sign 2, raise your index and middle fingers.",
  },
  {
    src: number03,
    alt: "ASL Number 3",
    instructions: "To sign 3, raise your index, middle, and thumb fingers.",
  },
  {
    src: number04,
    alt: "ASL Number 4",
    instructions:
      "To sign 4, raise your index, middle, ring, and pinky fingers.",
  },
  {
    src: number05,
    alt: "ASL Number 5",
    instructions: "To sign 5, raise all five fingers.",
  },
  {
    src: number06,
    alt: "ASL Number 6",
    instructions:
      "To sign 6, touch your thumb to your pinky finger while keeping other fingers extended.",
  },
  {
    src: number07,
    alt: "ASL Number 7",
    instructions:
      "To sign 7, touch your thumb to your ring finger while keeping other fingers extended.",
  },
  {
    src: number08,
    alt: "ASL Number 8",
    instructions:
      "To sign 8, touch your thumb to your middle finger while keeping other fingers extended.",
  },
  {
    src: number09,
    alt: "ASL Number 9",
    instructions:
      "To sign 9, touch your thumb to your index finger while keeping other fingers extended.",
  },
  {
    src: number10,
    alt: "ASL Number 10",
    instructions:
      "To sign 10, form a fist and move your thumb in a small waving motion.",
  },
];

const LearnASLNumbers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % aslImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + aslImages.length) % aslImages.length
    );
  };

  return (
    <div>
      {/* Main Content */}
      <header>
        <h1 style={{ color: "white" }}>Learn ASL Numbers</h1>
        <p style={{ fontSize: "25px", color: "white" }}>
          Learn how to sign numbers in American Sign Language (ASL) from 0 to
          10!
        </p>
      </header>

      {/* Slideshow Container */}
      <section className="slideshow">
        <div className="slide">
          <img
            style={{ paddingLeft: "40%", paddingTop: "6%", width: "400px" }}
            id="asl-slide"
            src={aslImages[currentIndex].src}
            alt={aslImages[currentIndex].alt}
          />
        </div>
        <div style={{ paddingLeft: "43%" }}>
          <button id="prev-btn" onClick={prevSlide}>
            Previous
          </button>
          <button id="next-btn" onClick={nextSlide}>
            Next
          </button>
        </div>
      </section>

      {/* Instructions */}
      <aside className="instructions">
        <h2>How to Sign</h2>
        <p
          style={{ paddingLeft: "38%", fontSize: "30px" }}
          id="instructions-text"
        >
          <strong>{aslImages[currentIndex].instructions}</strong>
        </p>
      </aside>

      {/* Footer Navigation */}
      <footer>
        <a
          style={{
            color: "white",
            fontSize: "30px",
            backgroundColor: "green",
            padding: "10px",
            borderRadius: "5px",
          }}
          href="/units/lesson7/quiz"
        >
          Take the ASL Quiz
        </a>
      </footer>
    </div>
  );
};

export default LearnASLNumbers;
