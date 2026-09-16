"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const cameraPositions = [
  new THREE.Vector3(0, 1.1, 7.8),
  new THREE.Vector3(-1.8, 1.55, 5.8),
  new THREE.Vector3(1.5, 1.3, 4.2),
  new THREE.Vector3(0.5, 1.45, 2.2),
  new THREE.Vector3(0, 1.15, 0.1),
];
const targets = [
  new THREE.Vector3(0, 1.2, 0),
  new THREE.Vector3(0, 1.1, -0.8),
  new THREE.Vector3(0, 1.2, -1.8),
  new THREE.Vector3(0, 1.05, -3.2),
  new THREE.Vector3(0, 1.0, -5.6),
];

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame((_, delta) => {
    const positionIndex = Math.min(cameraPositions.length - 2, Math.max(0, Math.floor(progress * (cameraPositions.length - 1))));
    const localProgress = (progress * (cameraPositions.length - 1)) - positionIndex;
    const desiredPosition = cameraPositions[positionIndex].clone().lerp(cameraPositions[positionIndex + 1] ?? cameraPositions[positionIndex], localProgress);
    const desiredTarget = targets[positionIndex].clone().lerp(targets[positionIndex + 1] ?? targets[positionIndex], localProgress);
    camera.position.lerp(desiredPosition, 1 - Math.exp(-delta * 2.8));
    target.current.lerp(desiredTarget, 1 - Math.exp(-delta * 2.8));
    camera.lookAt(target.current);
  });
  return null;
}

function RoomSequence() {
  return (
    <group>
      <mesh position={[0, -0.35, -1.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 18]} />
        <meshStandardMaterial color="#2f2924" roughness={0.98} />
      </mesh>
      {[0, -3.1, -6.3, -9.4].map((z, index) => (
        <group key={z} position={[0, 0, z]}>
          <mesh position={[-3.9, 1.4, 0]}><boxGeometry args={[0.12, 3.5, 3]} /><meshStandardMaterial color={index === 3 ? "#191614" : "#603522"} roughness={0.65} /></mesh>
          <mesh position={[3.9, 1.4, 0]}><boxGeometry args={[0.12, 3.5, 3]} /><meshStandardMaterial color={index === 3 ? "#191614" : "#603522"} roughness={0.65} /></mesh>
          <mesh position={[0, 3.05, 0]}><boxGeometry args={[8, 0.12, 3]} /><meshStandardMaterial color="#241e1b" roughness={0.8} /></mesh>
          <pointLight position={[-2.8, 2.35, 0]} intensity={index === 3 ? 2.2 : 1.25} color="#e3a158" distance={4.5} />
          <pointLight position={[2.8, 2.35, 0]} intensity={index === 3 ? 2.2 : 1.25} color="#e3a158" distance={4.5} />
          {index < 3 && <mesh position={[0, 1.45, -1.45]}><boxGeometry args={[3.1, 1.5, 0.07]} /><meshStandardMaterial color="#d5c4a4" emissive="#8b5938" emissiveIntensity={0.14} /></mesh>}
          {index === 3 && <mesh position={[0, 1.35, -1.45]}><boxGeometry args={[4.7, 2.25, 0.08]} /><meshStandardMaterial color="#f0e3c9" emissive="#c48a50" emissiveIntensity={0.16} /></mesh>}
        </group>
      ))}
    </group>
  );
}

export function JourneyCanvas({ progress }: { progress: number }) {
  return (
    <Canvas className="journey-canvas" dpr={[1, 1.45]} gl={{ antialias: false, powerPreference: "high-performance" }}>
      <color attach="background" args={["#1c1917"]} />
      <fog attach="fog" args={["#1c1917", 3, 15]} />
      <ambientLight intensity={0.38} color="#bf9a72" />
      <PerspectiveCamera makeDefault fov={50} position={[0, 1.1, 7.8]} />
      <CameraRig progress={progress} />
      <RoomSequence />
    </Canvas>
  );
}
