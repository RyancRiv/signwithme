import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Learning_Alphabet.css";
import Navbar from "./Navbar";

// Import all your letter images
import imageA from "../Letters/ASLAlphabetPoster_A.webp.png";
import imageB from "../Letters/ASLAlphabetPoster_B.webp.png";
import imageC from "../Letters/ASLAlphabetPoster_C.webp.png";
import imageD from "../Letters/ASLAlphabetPoster_D.webp.png";
import imageE from "../Letters/ASLAlphabetPoster_E.webp.png";
import imageF from "../Letters/ASLAlphabetPoster_F.webp.png";
import imageG from "../Letters/ASLAlphabetPoster_G.webp.png";
import imageH from "../Letters/ASLAlphabetPoster_H.webp.png";
import imageI from "../Letters/ASLAlphabetPoster_I.webp.png";
import imageJ from "../Letters/ASLAlphabetPoster_J.webp.png";
import imageK from "../Letters/ASLAlphabetPoster_K.webp.png";
import imageL from "../Letters/ASLAlphabetPoster_L.webp.png";
import imageM from "../Letters/ASLAlphabetPoster_M.webp.png";
import imageN from "../Letters/ASLAlphabetPoster_N.webp.png";
import imageO from "../Letters/ASLAlphabetPoster_O.webp.png";
import imageP from "../Letters/ASLAlphabetPoster_P.webp.png";
import imageQ from "../Letters/ASLAlphabetPoster_Q.webp.png";
import imageR from "../Letters/ASLAlphabetPoster_R.webp.png";
import imageS from "../Letters/ASLAlphabetPoster_S.webp.png";
import imageT from "../Letters/ASLAlphabetPoster_T.webp.png";
import imageU from "../Letters/ASLAlphabetPoster_U.webp.png";
import imageV from "../Letters/ASLAlphabetPoster_V.webp.png";
import imageW from "../Letters/ASLAlphabetPoster_W.webp.png";
import imageX from "../Letters/ASLAlphabetPoster_X.webp.png";
import imageY from "../Letters/ASLAlphabetPoster_Y.webp.png";
import imageZ from "../Letters/ASLAlphabetPoster_Z.webp.png";

const aslImages = [
  imageA,
  imageB,
  imageC,
  imageD,
  imageE,
  imageF,
  imageG,
  imageH,
  imageI,
  imageJ,
  imageK,
  imageL,
  imageM,
  imageN,
  imageO,
  imageP,
  imageQ,
  imageR,
  imageS,
  imageT,
  imageU,
  imageV,
  imageW,
  imageX,
  imageY,
  imageZ,
];

function Unit1() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [assignment, setAssignment] = useState("");
  const aslImageRef = useRef(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const assignmentParam = searchParams.get("assignment");
    setAssignment(assignmentParam || "No assignment specified");

    if (aslImageRef.current) {
      aslImageRef.current.src = aslImages[currentLetterIndex];
    }
  }, [location.search, currentLetterIndex]);

  const handleNext = () => {
    if (currentLetterIndex < aslImages.length - 1) {
      setCurrentLetterIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleStartQuiz = () => {
    navigate("/quiz?assignment=" + encodeURIComponent(assignment));
  };

  return (
    <>
      <div className="alphabet-container">
        <h1 style={{ color: "white" }}>ASL Alphabet</h1>
        <p style={{ color: "white" }}>
          Current Assignment: {"Learning ASL Alphabet"}
        </p>

        <div className="letter">
          <img className="image" ref={aslImageRef} alt="ASL Letter" />
        </div>

        <div className="letter-info">
          <p style={{ fontSize: "25px", textAlign: "center" }}>
            Letter: {String.fromCharCode(65 + currentLetterIndex)}
          </p>
          <p style={{ fontSize: "25px" }}>
            Progress: {currentLetterIndex + 1} / {aslImages.length}
          </p>
        </div>

        <div className="buttons">
          <button onClick={handlePrev} disabled={currentLetterIndex === 0}>
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentLetterIndex === aslImages.length - 1}
          >
            Next
          </button>
        </div>

        <div className="quiz-prompt">
          <p style={{ fontSize: "25px", textAlign: "center" }}>
            Ready to test your knowledge?
          </p>
          <button style={{ marginLeft: "35%" }} onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    </>
  );
}

export default Unit1;
