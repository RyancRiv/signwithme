// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./CreateCharacter.css";

// const CreateCharacter = () => {
//   const [avatarUrl, setAvatarUrl] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const iframe = document.createElement("iframe");
//     iframe.src = "https://readyplayer.me/avatar?frame_api";
//     iframe.style.width = "100%";
//     iframe.style.height = "600px";
//     iframe.style.border = "none";

//     const container = document.getElementById("avatar-container");
//     container.appendChild(iframe);

//     window.addEventListener("message", (event) => {
//       if (event.origin === "https://readyplayer.me") {
//         const data = JSON.parse(event.data);
//         if (data.type === "avatar") {
//           setAvatarUrl(data.url); // Store avatar URL in state
//         }
//       }
//     });

//     return () => {
//       window.removeEventListener("message", () => {}); // Cleanup listener
//     };
//   }, []);

//   return (
//     <div className="character-container">
//       <h1>Create Your Character</h1>
//       <div id="avatar-container"></div>

//       {avatarUrl && (
//         <div className="avatar-preview">
//           <h3>Avatar Preview</h3>
//           <img src={avatarUrl} alt="Avatar" className="avatar-img" />
//           <button onClick={() => navigate("/dashboard")}>Save & Continue</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateCharacter;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCharacter.css";

const CreateCharacter = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userInputUrl, setUserInputUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [characterMap, setCharacterMap] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById("avatar-container");

    if (!container.querySelector("iframe")) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://readyplayer.me/avatar?frame_api";
      iframe.style.width = "100%";
      iframe.style.height = "600px";
      iframe.style.border = "none";
      container.appendChild(iframe);
    }

    const handleMessage = (event) => {
      if (event.origin === "https://readyplayer.me") {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "avatar") {
            setAvatarUrl(data.url);
          }
        } catch (error) {
          console.error("Error parsing avatar data:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleSubmit = () => {
    if (!userInputUrl) {
      alert("Please enter a valid avatar URL.");
      return;
    }

    const characterName = prompt("Enter a character name:");
    if (!characterName) {
      alert("Character name is required!");
      return;
    }

    setCharacterMap((prevMap) => ({
      ...prevMap,
      [characterName]: userInputUrl,
    }));

    setSubmittedUrl(userInputUrl);
    setUserInputUrl("");
    alert("Avatar link submitted and saved to character map!");
  };

  return (
    <div className="character-container">
      <h1>Create Your Character</h1>
      <div id="avatar-container"></div>

      {avatarUrl && (
        <div className="avatar-preview">
          <h3>Avatar Preview</h3>
          <img src={avatarUrl} alt="Avatar" className="avatar-img" />
        </div>
      )}

      <div className="link-form">
        <h3>Submit Your Avatar Link</h3>
        <input
          type="text"
          placeholder="Enter your avatar link here"
          value={userInputUrl}
          onChange={(e) => setUserInputUrl(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {Object.keys(characterMap).length > 0 && (
        <div className="character-map">
          <h3>Characters & Avatars</h3>
          {Object.entries(characterMap).map(([name, url]) => (
            <div key={name} className="character-entry">
              <h4>{name}</h4>
              <img src={url} alt={`${name}'s avatar`} className="avatar-img" />
            </div>
          ))}
        </div>
      )}

      {submittedUrl && (
        <div className="submitted-avatar">
          <button onClick={() => navigate("/dashboard")}>Save & Continue</button>
        </div>
      )}
    </div>
  );
};

export default CreateCharacter;
