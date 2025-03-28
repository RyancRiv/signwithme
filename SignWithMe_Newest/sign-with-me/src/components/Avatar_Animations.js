import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

function AvatarWithAnimation({ animationName  }) {
  const group = useRef();

  // Load the model
//   const { scene: avatarScene, animations } = useGLTF('/models/main_avatar.glb');
  const { scene: avatarScene } = useGLTF('/models/main_avatar.glb'); 
  const { animations } = useGLTF('/animation/Updated_Avatar_Pointing.glb'); 

  // Check if animations exist
  console.log("Animations loaded:", animations.length);
  if (animations.length === 0) {
    console.warn("No animations found in the model");
  }

  // Apply animations
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log("Loaded animations:", animations.map(a => a.name));
    console.log("Actions available:", Object.keys(actions));

    if (animations.length === 0) {
        console.warn("No animations found in the GLB file!");
        return;
    }

    if (animationName && actions[animationName]) {
        actions[animationName].reset().fadeIn(0.5).play();
        console.log(`Playing animation: ${animationName}`);
    } else {
        console.warn(`Animation '${animationName}' not found! Available animations:`, Object.keys(actions));
    }
}, [animationName, actions]);

  return (
    <group ref={group}>
      <primitive object={avatarScene} scale={[1.9, 1.9, 1.8]} position={[0, -2, 0]} />
    </group>
  );
}

export default AvatarWithAnimation;
