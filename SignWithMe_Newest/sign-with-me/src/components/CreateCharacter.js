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
  const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById("avatar-container");

    // Prevent multiple iframe insertions
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
  }, []); // Runs only once when component mounts

  return (
    <div className="character-container">
      <h1>Create Your Character</h1>
      <div id="avatar-container"></div>

      {avatarUrl && (
        <div className="avatar-preview">
          <h3>Avatar Preview</h3>
          <img src={avatarUrl} alt="Avatar" className="avatar-img" />
          <button onClick={() => navigate("/dashboard")}>Save & Continue</button>
        </div>
      )}
    </div>
  );
};

export default CreateCharacter;