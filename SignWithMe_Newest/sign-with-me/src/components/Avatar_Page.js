import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
// import AvatarCreator from "./Character_Creation";
import AvatarCreator from "./CreateCharacter";

const AvatarPage = () => {
  const [avatarUrl, setAvatarUrl] = useState(null); // Holds the avatar URL (GLB file)
  const [inputUrl, setInputUrl] = useState(""); // Stores the manually entered avatar URL

  // Load avatar URL from localStorage if available
  useEffect(() => {
    const storedAvatarUrl = localStorage.getItem("avatarUrl");
    // const storedAvatarUrl = "/model/main_avatar.glb";

    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl); // Set the avatar URL from localStorage if it exists
    }
  }, []);

  const handleUrlChange = (event) => {
    setInputUrl(event.target.value); // Update the input field value
  };

  const handleSaveUrl = () => {
    if (inputUrl.trim() !== "") {
      setAvatarUrl(inputUrl); // Set the URL to the state
      localStorage.setItem("avatarUrl", inputUrl); // Store the URL in localStorage
    } else {
      alert("Please enter a valid URL.");
    }
  };

  // UseGLTF hook to load the .glb file
  const AvatarModel = ({ url }) => {
    const { scene } = useGLTF(url); // Load the .glb model using the URL

    return (
      <primitive object={scene} scale={3} position={[0, -3, 0]} rotation={[0.3, 0, 0]} /> // Adjust scale and position as needed
    );
  };

  return (
    <div>
      <h1>Create Your Avatar</h1>

      {/* Input Field for Manual Avatar URL */}
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

      {/* Display the Avatar if URL is set */}
      {avatarUrl ? (
        <div style={{ width: "100%", height: "500px" }}>
          <h2>Your Avatar</h2>
          <Canvas>
            <ambientLight intensity={3} />
            <spotLight position={[10, 10, 10]} angle={0.15} intensity={1} />
            <AvatarModel url={avatarUrl} />
          </Canvas>
        </div>
      ) : (
        // If avatarUrl is not set, show Avatar Creator
        <AvatarCreator onAvatarCreated={setAvatarUrl} />
      )}
    </div>
  );
};

export default AvatarPage;
