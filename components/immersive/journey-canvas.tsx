"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useVideoTexture, Environment, MeshReflectorMaterial, Text } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from "@react-three/postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  
  // Define a curved path through the building
  const points = useMemo(() => [
    new THREE.Vector3(0, 2, 20),   // Outside facade
    new THREE.Vector3(0, 1.5, 10), // Entering reception
    new THREE.Vector3(-2, 1.5, 0), // Smart home display
    new THREE.Vector3(2, 1.5, -10),// Lounge area
    new THREE.Vector3(0, 1.5, -20) // Home theatre
  ], []);

  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  useFrame((_, delta) => {
    // Progress smoothly along the curve
    const point = curve.getPointAt(Math.max(0, Math.min(1, progress)));
    const lookAtPoint = curve.getPointAt(Math.max(0, Math.min(1, progress + 0.05))); // Look slightly ahead
    
    camera.position.lerp(point, 1 - Math.exp(-delta * 4));
    target.current.lerp(lookAtPoint, 1 - Math.exp(-delta * 4));
    camera.lookAt(target.current);
  });
  
  return null;
}

function ImmersiveVideoScreen({ url, position, rotation, scale }: { url: string, position: [number, number, number], rotation: [number, number, number], scale: [number, number] }) {
  // Use a fallback solid color if the video doesn't load/play
  try {
    const texture = useVideoTexture(url, { muted: true, loop: true, start: true });
    return (
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[scale[0], scale[1]]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    );
  } catch (e) {
    return (
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[scale[0], scale[1]]} />
        <meshStandardMaterial color="#443322" emissive="#cc8844" emissiveIntensity={0.5} />
      </mesh>
    );
  }
}

function ShowroomBlockout() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 60]} />
        <MeshReflectorMaterial 
          blur={[400, 100]} resolution={1024} mixBlur={1} mixStrength={15} 
          roughness={0.2} depthScale={1.2} minDepthThreshold={0.4} maxDepthThreshold={1.4} 
          color="#1a1512" metalness={0.5} mirror={0.5}
        />
      </mesh>
      
      {/* Facade Portal */}
      <mesh position={[0, 2, 15]}>
        <boxGeometry args={[10, 4, 0.5]} />
        <meshStandardMaterial color="#2a221e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2, 15]}>
        <boxGeometry args={[4, 3, 0.6]} />
        <meshStandardMaterial color="#111" roughness={0.1} transparent opacity={0.5} />
      </mesh>
      <Text position={[0, 4.5, 15.3]} fontSize={0.5} color="#e0ad75" font="/fonts/Outfit-Medium.ttf">VSS Salesco</Text>

      {/* Corridor Walls */}
      <mesh position={[-5, 2, 0]}>
        <boxGeometry args={[0.5, 4, 40]} />
        <meshStandardMaterial color="#2f2520" roughness={0.8} />
      </mesh>
      <mesh position={[5, 2, 0]}>
        <boxGeometry args={[0.5, 4, 40]} />
        <meshStandardMaterial color="#2f2520" roughness={0.8} />
      </mesh>

      {/* Feature Lighting */}
      <pointLight position={[0, 3, 10]} color="#ffb366" intensity={2} distance={10} />
      <pointLight position={[-3, 2, 0]} color="#ff9933" intensity={3} distance={8} />
      <pointLight position={[3, 2, -10]} color="#ccaa77" intensity={2.5} distance={12} />
      <pointLight position={[0, 2, -20]} color="#3366ff" intensity={3} distance={15} />

      {/* Display Stands & Screens */}
      {/* Reception */}
      <mesh position={[0, 1, 8]}><boxGeometry args={[3, 1, 1]} /><meshStandardMaterial color="#1f1815" roughness={0.2} metalness={0.8} /></mesh>
      
      {/* Smart Home */}
      <mesh position={[-4.5, 1.5, 0]}><boxGeometry args={[0.6, 2, 4]} /><meshStandardMaterial color="#3a2e28" /></mesh>
      {/* Provide a dummy URL for now, the user must upload actual MP4s */}
      <ImmersiveVideoScreen url="/media/demo-video-1.mp4" position={[-4.1, 1.5, 0]} rotation={[0, Math.PI/2, 0]} scale={[3, 1.7]} />

      {/* Lounge */}
      <mesh position={[2, 0.5, -10]}><boxGeometry args={[4, 0.5, 3]} /><meshStandardMaterial color="#d4b492" roughness={0.9} /></mesh>
      
      {/* Theatre */}
      <mesh position={[0, 2, -22]}><boxGeometry args={[8, 4, 0.5]} /><meshStandardMaterial color="#0a0a0a" /></mesh>
      <ImmersiveVideoScreen url="/media/demo-video-2.mp4" position={[0, 2, -21.7]} rotation={[0, 0, 0]} scale={[6, 3.3]} />
    </group>
  );
}

export function JourneyCanvas({ progress }: { progress: number }) {
  return (
    <Canvas className="journey-canvas" dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}>
      <color attach="background" args={["#120e0c"]} />
      <fog attach="fog" args={["#120e0c", 2, 25]} />
      <ambientLight intensity={0.2} color="#ffccaa" />
      <PerspectiveCamera makeDefault fov={55} position={[0, 2, 20]} />
      
      <CameraRig progress={progress} />
      <ShowroomBlockout />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
        <DepthOfField focusDistance={0.02} focalLength={0.1} bokehScale={2} height={480} />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
}
