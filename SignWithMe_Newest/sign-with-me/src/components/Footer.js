import React from "react";
import "./Footer.css"; // Assuming you'll create this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Sign With Me</h3>
        {/* <p>Helping you learn sign language, one step at a time.</p> */}
        <div className="social-links">
          <a
            href="https://github.com/SoloStarkes/SignWithMe"
            target="_blank"
            rel="noopener noreferrer"
          >
            Githib
          </a>
          {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a> */}
          <p style={{ color: "white" }}>
            &copy; {new Date().getFullYear()} Sign With Me. All rights reserved.
          </p>
        </div>
      </div>
      {/* <div className="footer-bottom"> */}
      {/* </div> */}
    </footer>
  );
};

export default Footer;
