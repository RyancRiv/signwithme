import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateCharacter.css";

const CreateCharacter = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userInputUrl, setUserInputUrl] = useState("");
  const [status, setStatus] = useState("");
  const [characterMap, setCharacterMap] = useState({});
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
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
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleSubmit = async () => {
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

    try {
      const response = await axios.post(
        "http://localhost:3000/api/download-avatar",
        { url: userInputUrl }
      );
      setStatus(`✅ ${response.data.message}`);
    } catch (error) {
      console.error("Error downloading avatar:", error);
      setStatus(`❌ Error: ${error.response?.data?.message || error.message}`);
    }

    setSubmittedUrl(userInputUrl);
    setUserInputUrl("");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".glb")) {
      setFile(selectedFile);
      setStatus("");
      setUploadProgress(0);
    } else {
      setFile(null);
      setStatus("❌ Only .glb files are allowed.");
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("myFile", file);

    try {
      setStatus("⏳ Uploading file...");
      
      const res = await axios.post("http://localhost:3000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      setStatus(`✅ ${res.data.message}`);
      console.log("File upload details:", res.data);
      setFile(null);
      setUploadProgress(0);
    } catch (err) {
      console.error("Upload error details:", err);
      setStatus(
        `❌ Upload failed: ${err.response?.data?.error || err.message}`
      );
      setUploadProgress(0);
    }
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

      <div className="upload-section">
        <h3>Upload .glb File</h3>
        <form onSubmit={handleFileUpload}>
          <input 
            type="file" 
            accept=".glb" 
            onChange={handleFileChange} 
          />
          {uploadProgress > 0 && (
            <div className="progress-bar">
              <div style={{ width: `${uploadProgress}%` }}>
                {uploadProgress}%
              </div>
            </div>
          )}
          <br />
          <button type="submit" disabled={!file}>
            {uploadProgress > 0 ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      {status && (
        <p className={`status ${status.includes("❌") ? "error" : "success"}`}>
          {status}
        </p>
      )}

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