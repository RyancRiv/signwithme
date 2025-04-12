


import React, { useEffect } from "react";

const AvatarCreator = ({ onAvatarCreated }) => {
  useEffect(() => {
    const receiveMessage = (event) => {
      // Make sure the message comes from the Ready Player Me domain
      if (event.origin !== "https://readyplayer.me") return;

      try {
        // Parse the incoming data
        const data = JSON.parse(event.data);

        // Check if the event is the one where the avatar has been exported
        if (data?.source === "readyplayerme" && data?.eventName === "v1.avatar.exported") {
          const avatarUrl = data.data.url;
          localStorage.setItem("avatarUrl", avatarUrl); // Save avatar URL to localStorage
          onAvatarCreated(avatarUrl); // Call the passed callback to update the avatarUrl state
        }
      } catch (error) {
        console.warn("Received non-JSON message:", event.data);
      }
    };

    window.addEventListener("message", receiveMessage);
    return () => window.removeEventListener("message", receiveMessage);
  }, [onAvatarCreated]);

  return (
    <iframe
      src="https://readyplayer.me/avatar?frameApi"
      allow="camera *; microphone *"
      title="Ready Player Me Avatar Creator"
      style={{ width: "100%", height: "600px" }}
    />
  );
};

export default AvatarCreator;
