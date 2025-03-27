import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function AnimationScene() {
  return (
    <Canvas camera={{ position: [2, 2, 2], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Model url="../Letters/avatar_pointing.glb" />
      <OrbitControls />
    </Canvas>
  );
}

export default AnimationScene;
