import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import AvatarCreator from "./CreateCharacter";
import AvatarViewer from "./AvatarViewer"; // handles both avatar and animation

const AvatarPage = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [inputUrl, setInputUrl] = useState("");

  useEffect(() => {
    const storedAvatarUrl = localStorage.getItem("avatarUrl");
    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl);
    }
  }, []);

  const handleUrlChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleSaveUrl = () => {
    if (inputUrl.trim() !== "") {
      setAvatarUrl(inputUrl);
      localStorage.setItem("avatarUrl", inputUrl);
    } else {
      setAvatarUrl("/models/main_avatar.glb")
      // alert("Please enter a valid URL.");
    }
  };
  const handleAvatarCreated = (url) => {
    setAvatarUrl(url || "/models/main_avatar.glb");
  };
  

  return (
    <div>
      <h1>Create Your Avatar</h1>

      <div>
        <label>
          Enter Avatar URL (GLB File):
          <input
            type="text"
            value={inputUrl}
            onChange={handleUrlChange}
            placeholder="Enter the avatar GLB URL here"
            style={{ width: "100%", padding: "10px" }}
          />
        </label>
        <button onClick={handleSaveUrl}>Save Avatar URL</button>
      </div>

      {avatarUrl ? (
        <div style={{ width: "100%", height: "500px" }}>
          <h2>Your Avatar</h2>
          <Canvas camera={{ position: [0, 1.6, 3] }}>
            <ambientLight intensity={3} />
            <spotLight position={[10, 10, 10]} angle={0.15} intensity={1.5} />
            <AvatarViewer
              avatarUrl={avatarUrl || "/models/main_avatar.glb" }
              animationUrl="/animation/Avatar_Sign_F.glb" // Replace this with your actual animation path
            />
          </Canvas>
        </div>
      ) : (
        <AvatarCreator onAvatarCreated={handleAvatarCreated} />

      )}
    </div>
  );
};

export default AvatarPage;
