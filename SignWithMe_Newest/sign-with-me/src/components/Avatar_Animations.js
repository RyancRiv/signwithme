import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations, PerspectiveCamera } from "@react-three/drei";

function AvatarWithAnimation({ animationName }) {
  const group = useRef();

  // Load the main avatar model
  const { scene: avatarScene } = useGLTF("/models/main_avatar.glb");

  // Load animation clips from separate GLBs
  const { animations: pointingAnim } = useGLTF("/animation/Updated_Avatar_Pointing.glb");
  const { animations: A_Anim } = useGLTF("/animation/Avatar_Sign_A.glb");
  const { animations: B_Anim } = useGLTF("/animation/Avatar_Sign_B.glb");
  const { animations: C_Anim } = useGLTF("/animation/Avatar_Sign_C.glb");
  const { animations: D_Anim } = useGLTF("/animation/Avatar_Sign_D.glb");
  const { animations: E_Anim } = useGLTF("/animation/Avatar_Sign_E.glb");
  const { animations: F_Anim } = useGLTF("/animation/Avatar_Sign_F.glb");

  // Manually rename animation clips to prevent name collisions
  if (pointingAnim[0]) pointingAnim[0].name = "Pointing";
  if (A_Anim[0]) A_Anim[0].name = "A_Sign";
  if (B_Anim[0]) B_Anim[0].name = "B_Sign";
  if (C_Anim[0]) C_Anim[0].name = "C_Sign";
  if (D_Anim[0]) D_Anim[0].name = "D_Sign";
  if (E_Anim[0]) E_Anim[0].name = "E_Sign";
  if (F_Anim[0]) F_Anim[0].name = "F_Sign";

  // Combine animations into a single list for useAnimations
  const allAnimations = [
    pointingAnim[0],
    A_Anim[0],
    B_Anim[0],
    C_Anim[0],
    D_Anim[0],
    E_Anim[0],
    F_Anim[0],
  ].filter(Boolean); // Remove undefined entries

  const { actions } = useAnimations(allAnimations, group);

  useEffect(() => {
    if (!animationName || !actions) return;

    // Stop all other actions before playing the new one
    Object.values(actions).forEach((action) => action.stop());

    const action = actions[animationName];
    if (action) {
      action.reset();
      action.timeScale = 0.8; // Adjust playback speed
      action.play();
      console.log(`Playing animation: ${animationName}`);
    } else {
      console.warn(`Animation '${animationName}' not found in actions!`);
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
          scale={[25, 25, 25]} 
          position={[5, -30, -50]} // Centered position
          rotation={[0.2, 0, 0]} 
        />
      </group>
    </>
  );
}

export default AvatarWithAnimation;
