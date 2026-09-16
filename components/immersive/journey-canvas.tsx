"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Image as ImageImpl, useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const cameraPositions = [
  new THREE.Vector3(0, 0, 8),
  new THREE.Vector3(0, 0, 4),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, -4),
  new THREE.Vector3(0, 0, -8),
];
const targets = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 0, -4),
  new THREE.Vector3(0, 0, -8),
  new THREE.Vector3(0, 0, -12),
  new THREE.Vector3(0, 0, -16),
];

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  useFrame((_, delta) => {
    const positionIndex = Math.min(cameraPositions.length - 2, Math.max(0, Math.floor(progress * (cameraPositions.length - 1))));
    const localProgress = (progress * (cameraPositions.length - 1)) - positionIndex;
    const desiredPosition = cameraPositions[positionIndex].clone().lerp(cameraPositions[positionIndex + 1] ?? cameraPositions[positionIndex], localProgress);
    const desiredTarget = targets[positionIndex].clone().lerp(targets[positionIndex + 1] ?? targets[positionIndex], localProgress);
    camera.position.lerp(desiredPosition, 1 - Math.exp(-delta * 3.5));
    target.current.lerp(desiredTarget, 1 - Math.exp(-delta * 3.5));
    camera.lookAt(target.current);
  });
  return null;
}

const scenes = [
  { url: "/media/reception-preview.png", z: 2 },
  { url: "/media/reception-preview.png", z: -2 }, // Reception
  { url: "/media/reception-display-preview.png", z: -6 }, // Smart home
  { url: "/media/lounge-preview.png", z: -10 }, // Lounge
  { url: "/media/theatre-preview.png", z: -14 }, // Theatre
];

function LayeredPlanes({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Calculate a scale that covers the viewport nicely
  const scale = Math.max(viewport.width, viewport.height) * 1.2;

  useFrame(() => {
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      // Fade out planes as camera passes through them
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      // camera starts at z=8 and goes to z=-8
      // plane z positions: 2, -2, -6, -10, -14
      // rough distance calculation for opacity
      const distance = mesh.position.z - (8 - progress * 16);
      
      let opacity = 0;
      if (distance < 0 && distance > -5) {
        opacity = 1 - Math.abs(distance + 1) * 0.25; // fade near camera
      } else if (distance <= -5) {
        opacity = 1;
      }
      
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, Math.max(0, Math.min(1, opacity)), 0.1);
    });
  });

  return (
    <group ref={group}>
      {scenes.map((scene, i) => (
        <ImageImpl
          key={i}
          url={scene.url}
          position={[0, 0, scene.z]}
          scale={[scale, scale * 0.5625]} // 16:9 aspect ratio roughly
          transparent
          opacity={1}
        />
      ))}
    </group>
  );
}

export function JourneyCanvas({ progress }: { progress: number }) {
  return (
    <Canvas className="journey-canvas" dpr={[1, 1.45]} gl={{ antialias: false, powerPreference: "high-performance" }}>
      <color attach="background" args={["#1c1917"]} />
      <fog attach="fog" args={["#1c1917", 2, 12]} />
      <PerspectiveCamera makeDefault fov={45} position={[0, 0, 8]} />
      <CameraRig progress={progress} />
      <LayeredPlanes progress={progress} />
    </Canvas>
  );
}
