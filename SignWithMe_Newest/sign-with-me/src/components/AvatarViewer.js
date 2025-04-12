import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const AvatarViewer = ({ avatarUrl, animationUrl }) => {
  const avatarRef = useRef();

  // Load the avatar GLB file
  const { scene: avatarScene, nodes, materials } = useGLTF(avatarUrl);

  // Load the animation GLB file
  const { animations } = useGLTF(animationUrl);

  // Set up the mixer and actions
  const { actions, mixer } = useAnimations(animations, avatarRef);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      // Play the first animation if available
      const action = actions[Object.keys(actions)[0]];
      action.setEffectiveTimeScale(0.5); // 👈 slow down to 50% speed (1.0 = normal)

      action.reset().fadeIn(0.5).play();
      
    }
  }, [actions]);

  // Update animation mixer on every frame
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  return <primitive ref={avatarRef} object={avatarScene} />;
};

export default AvatarViewer;
