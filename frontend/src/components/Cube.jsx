import React from "react";

export default function Cube({ color = "#ffffff", position = [0, 0, 0] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.1} />
    </mesh>
  );
}
