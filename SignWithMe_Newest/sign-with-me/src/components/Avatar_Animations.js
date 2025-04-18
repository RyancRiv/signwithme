import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei";

function AvatarWithAnimation({ animationName }) {
  const group = useRef();

  // Load model
  const { scene: avatarScene } = useGLTF("/models/main_avatar.glb");

  // Load animations from separate GLB files
  const { animations: pointingAnim } = useGLTF("/animation/Updated_Avatar_Pointing.glb");
  const { animations: A_Anim } = useGLTF("/animation/Avatar_Sign_A.glb");
  const { animations: B_Anim } = useGLTF("/animation/Avatar_Sign_B.glb");
  const { animations: C_Anim } = useGLTF("/animation/Avatar_Sign_C.glb");
  const { animations: D_Anim } = useGLTF("/animation/Avatar_Sign_D.glb");
  const { animations: E_Anim } = useGLTF("/animation/Avatar_Sign_E.glb");
  const { animations: F_Anim } = useGLTF("/animation/Avatar_Sign_F.glb");

  // Map animations to custom names
  const animationMap = {
    Pointing: pointingAnim[0], // Manually setting the animation
    A_Sign: A_Anim[0],
    B_Sign: B_Anim[0],
    C_Sign: C_Anim[0],
    D_Sign: D_Anim[0],
    F_Sign: F_Anim[0],
  };

  // Extract animations for useAnimations
  const allAnimations = Object.values(animationMap).filter(Boolean);
  const { actions } = useAnimations(allAnimations, group);

  useEffect(() => {
    if (animationMap[animationName]) {
      const animActionName = animationMap[animationName].name;
      Object.values(actions).forEach((action) => action.stop()); // Stop any active animations
  
      const action = actions[animActionName];
      if (action) {
        action.reset();
        action.timeScale = 0.8; // Normal playback speed
        action.play();
        console.log(`Playing animation: ${animActionName} (3s duration, normal speed)`);
      } else {
        console.warn(`Animation '${animActionName}' not found in actions!`);
      }
    }
  }, [animationName, actions]);

  return (
    <>
      {/* Set up the camera */}
      <PerspectiveCamera 
        makeDefault 
        position={[0, 0, 10]} // Adjust the camera to ensure it's looking at the avatar
      />
      
      {/* Avatar model with centered position */}
      <group ref={group}>
        <primitive 
          object={avatarScene} 
          scale={[50, 50, 30]} 
          position={[0, -60, -50]} // Centered position
          rotation={[0.2, 0, 0]} 
        />
      </group>
    </>
  );
}

export default AvatarWithAnimation;
