"use client";

import { useState } from "react";
import { PanoramaCanvas } from "./panorama-canvas";

const scenes = [
  { id: "reception", name: "Reception", image: "/media/reception_360.jpg" },
  { id: "lounge", name: "Lounge", image: "/media/lounge_360.jpg" },
  { id: "theatre", name: "Theater", image: "/media/theatre_360.jpg" }
];

export function WalkaroundViewer() {
  const [activeId, setActiveId] = useState("reception");
  const activeScene = scenes.find(s => s.id === activeId) || scenes[0];

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#000", overflow: "hidden" }}>
      <PanoramaCanvas key={activeScene.id} src={activeScene.image} gyro={false} />

      <div style={{ 
        position: "absolute", 
        bottom: "40px", 
        left: "50%", 
        transform: "translateX(-50%)", 
        display: "flex", 
        gap: "10px",
        background: "rgba(0,0,0,0.6)",
        padding: "10px 20px",
        borderRadius: "40px",
        backdropFilter: "blur(10px)"
      }}>
        {scenes.map(scene => (
          <button
            key={scene.id}
            onClick={() => setActiveId(scene.id)}
            style={{
              padding: "10px 20px",
              borderRadius: "30px",
              border: "none",
              background: activeId === scene.id ? "#fff" : "transparent",
              color: activeId === scene.id ? "#000" : "#fff",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease"
            }}
          >
            {scene.name}
          </button>
        ))}
      </div>
      
      <div style={{
        position: "absolute",
        top: "40px",
        left: "40px",
        color: "#fff",
        textShadow: "0 2px 10px rgba(0,0,0,0.8)"
      }}>
        <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 400 }}>{activeScene.name}</h1>
        <p style={{ margin: 0, opacity: 0.7 }}>Drag to look around • Scroll to zoom</p>
      </div>
    </div>
  );
}
