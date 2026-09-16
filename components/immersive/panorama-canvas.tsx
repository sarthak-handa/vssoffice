"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { DeviceOrientationControls, OrbitControls, useTexture } from "@react-three/drei";
import { useEffect } from "react";

function KeyboardLook() {
  const { camera } = useThree();
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") camera.rotation.y += 0.08;
      if (event.key === "ArrowRight") camera.rotation.y -= 0.08;
      if (event.key === "ArrowUp") camera.rotation.x += 0.05;
      if (event.key === "ArrowDown") camera.rotation.x -= 0.05;
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [camera]);
  return null;
}

function Panorama({ src }: { src: string }) {
  const texture = useTexture(src);
  return <mesh scale={[-1, 1, 1]}><sphereGeometry args={[30, 64, 40]} /><meshBasicMaterial map={texture} /></mesh>;
}

export function PanoramaCanvas({ src, gyro }: { src: string; gyro: boolean }) {
  return <Canvas className="tour-canvas" camera={{ fov: 72, position: [0, 0, 0.1] }} dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }}>
    <Panorama src={src} />
    <KeyboardLook />
    <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={-0.24} />
    {gyro && <DeviceOrientationControls />}
  </Canvas>;
}
