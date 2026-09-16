"use client";

import { Canvas } from "@react-three/fiber";
import { DeviceOrientationControls, OrbitControls, useTexture } from "@react-three/drei";

function Panorama({ src }: { src: string }) {
  const texture = useTexture(src);
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 64, 40]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

export function PanoramaCanvas({ src, gyro }: { src: string; gyro: boolean }) {
  return (
    <Canvas 
      className="tour-canvas" 
      camera={{ fov: 60, position: [0, 0, 0.1] }} 
      dpr={[1, 1.5]} 
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Panorama src={src} />
      <OrbitControls 
        enablePan={false} 
        enableZoom={true} 
        minDistance={0.1}
        maxDistance={20}
        rotateSpeed={-0.4} 
        zoomSpeed={0.8}
        enableDamping={true}
        dampingFactor={0.05}
      />
      {gyro && <DeviceOrientationControls />}
    </Canvas>
  );
}
