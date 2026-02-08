import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Text } from "@react-three/drei";

export default function SimulationOrb({ median, floor, ceiling, confidence }) {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} />

      <Sphere args={[1.5, 64, 64]}>
        <meshStandardMaterial color="#00f0ff" wireframe />
      </Sphere>

      <Text position={[0, 2.2, 0]} fontSize={0.3} color="white">
        Simulation Confidence: {confidence}%
      </Text>

      <Text position={[-2.5, -2, 0]} fontSize={0.25} color="#ff5555">
        Floor: {floor}
      </Text>

      <Text position={[0, -2, 0]} fontSize={0.25} color="#00ff88">
        Median: {median}
      </Text>

      <Text position={[2.5, -2, 0]} fontSize={0.25} color="#ffaa00">
        Ceiling: {ceiling}
      </Text>

      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
}
