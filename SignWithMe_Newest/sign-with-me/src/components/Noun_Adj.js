import React from "react";
import "./Noun_Adj.css";
function Noun_Adj() {
  const navigateTo = (page) => {
    window.location.href = page;
  };

  return (
    <div>
      <header>
        <h1 style={{ color: "white" }}>ASL Nouns and Adjective Lessons</h1>
        {/* <nav>
          <a style={{padding:'3px',color:'black',fontSize:'20px',fontWeight:'bold',backgroundColor:'rgb(206 136 249)',borderRadius:'5px'}} href="index.html">Home</a>
        </nav> */}
      </header>

      <main>
        <section>
          <h2>Nouns</h2>
          <p style={{ fontSize: "20px" }}>
            <strong>
              Nouns are words that represent a person, place, or thing. In ASL,
              nouns are often signed using distinct handshapes and repeated
              movements. Watch these examples of ASL signs for nouns:
            </strong>
          </p>
          <ul>
            <li>
              <iframe
                width="500"
                height="315"
                src="https://www.youtube.com/embed/emMYyyc0WdQ"
                title="Dog Sign ASL"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
            <li>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/fN4baaByX9A"
                title="House Sign ASL"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
            <li>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/gqLwL33hXKg"
                title="Cat Sign ASL"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
          </ul>
          <div style={{ paddingLeft: "30%" }}>
            <button
              className="Assignment_Button"
              onClick={() => navigateTo("/units/lesson5/N_A/Noun_Assigment1")}
            >
              Go to Drag and Drop Noun Excercise
            </button>
            <button
              className="Assignment_Button"
              onClick={() => navigateTo("/units/lesson5/N_A/Noun_Assigment2")}
            >
              Go to Translation Noun Excercise
            </button>
          </div>
        </section>

        <section>
          <h2>Adjectives</h2>
          <p style={{ fontSize: "20px" }}>
            <strong>
              Adjectives describe nouns by providing more information about
              their size, color, or condition. In ASL, adjectives are often
              shown with expressive facial gestures and dynamic hand movements.
              Watch these examples of ASL signs for adjectives:
            </strong>
          </p>
          <ul>
            <li>
              <iframe
                width="500"
                height="315"
                src="https://www.youtube.com/embed/QTbj2GM5ohs"
                title="Adjective Sign ASL - South Dakota School For The Deaf"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
            <li>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Ob9KC7GOYk0"
                title="Adjective Sign ASL"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
            <li>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/skzUPWKL9GM"
                title="Adjective Sign ASL - Signing with Omar"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </li>
          </ul>
          <div style={{ paddingLeft: "41%" }}>
            <button
              className="Assignment_Button"
              onClick={() => navigateTo("/units/lesson5/N_A/Adj_Assigment")}
            >
              Go to Adjective Assignment
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Noun_Adj;
