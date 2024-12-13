import React, { useState } from "react";

import "./Grammer.css";

const Grammar = () => {
  const peopleImages = [
    {
      src: "https://media.giphy.com/media/3o7TKFpahYpUp4g0N2/giphy.gif",
      alt: "Happy",
    },
    {
      src: "https://media.giphy.com/media/3o7TKVhsMTczdAzMB2/giphy.gif",
      alt: "Sad",
    },
    {
      src: "https://media.giphy.com/media/3o7TKvPoxDMYr9pYf6/giphy.gif",
      alt: "Kind",
    },
    {
      src: "https://media.giphy.com/media/3o7TKvsHER8leUJvAQ/giphy.gif",
      alt: "Angry",
    },
    {
      src: "https://media.giphy.com/media/3o7TKnRuBdakLslcaI/giphy.gif",
      alt: "Tired",
    },
  ];
  const feelingsImages = [...peopleImages];

  const [peopleIndex, setPeopleIndex] = useState(0);
  const [feelingsIndex, setFeelingsIndex] = useState(0);

  const updateSlide = (images, index, setIndex, direction) => {
    const newIndex = (index + direction + images.length) % images.length;
    setIndex(newIndex);
  };

  return (
    <div>
      <header>
        <h1 style={{ color: "white" }}>ASL Vocabulary and Grammar</h1>
        <nav>
          {/* <a href="/grammar">Grammar Rules</a> */}
          <a
            style={{
              padding: "3px",
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              backgroundColor: "rgb(206 136 249)",
              borderRadius: "5px",
            }}
            href="/units/lesson4/sentence"
          >
            Practice Exercises
          </a>
        </nav>
      </header>
      <main>
        <h2 style={{ color: "black" }}>Feelings Slideshow</h2>
        <div>
          <img
            style={{ paddingLeft: "70px" }}
            src={feelingsImages[feelingsIndex].src}
            alt={feelingsImages[feelingsIndex].alt}
          />
          <div style={{ paddingLeft: "150px" }}>
            <button
              onClick={() =>
                updateSlide(feelingsImages, feelingsIndex, setFeelingsIndex, -1)
              }
            >
              Previous
            </button>
            <button
              onClick={() =>
                updateSlide(feelingsImages, feelingsIndex, setFeelingsIndex, 1)
              }
            >
              Next
            </button>
          </div>
        </div>

        <section>
          <h2 style={{ color: "black" }}>ASL Grammar Rules</h2>
          <article>
            <h3 style={{ color: "black", fontSize: "30px" }}>
              1. Topic-Comment Structure
            </h3>
            <p style={{ fontSize: "25px" }}>
              ASL sentences often follow a topic-comment structure. The main
              topic is introduced first, followed by a comment or action related
              to the topic.
              <strong> Example:</strong> "BOOK I READ"
            </p>
          </article>

          <article>
            <h3 style={{ color: "black", fontSize: "30px" }}>
              2. Facial Expressions
            </h3>
            <p style={{ fontSize: "25px" }}>
              Facial expressions are a critical part of ASL grammar. They
              provide context, tone, and emphasis. For example, raising eyebrows
              indicates a yes/no question.
            </p>
          </article>

          <article>
            <h3 style={{ color: "black", fontSize: "30px" }}>
              3. Time Indicators
            </h3>
            <p style={{ fontSize: "25px" }}>
              Time is specified at the beginning of a sentence. This helps
              establish the tense of the conversation.
              <strong> Example:</strong> "YESTERDAY STORE I GO"
            </p>
          </article>

          <article>
            <h3 style={{ color: "black", fontSize: "30px" }}>
              4. Subject-Verb Agreement
            </h3>
            <p style={{ fontSize: "25px" }}>
              Verbs in ASL can show who is performing and receiving the action.
              This is often done through directional signs.
              <strong> Example:</strong> "I-GIVE-YOU" vs. "YOU-GIVE-ME"
            </p>
          </article>

          <article>
            <h3 style={{ color: "black", fontSize: "30px" }}>5. Classifiers</h3>
            <p style={{ fontSize: "25px" }}>
              Classifiers are handshapes that represent objects, actions, or
              people. They provide more detail about size, shape, or movement.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Grammar;
