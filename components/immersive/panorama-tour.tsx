"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { Compass, Expand, GalleryHorizontalEnd, MousePointer2, Rotate3D } from "lucide-react";
import type { ExperienceScene } from "@/lib/cms/types";

const PanoramaCanvas = dynamic(() => import("./panorama-canvas").then((module) => module.PanoramaCanvas), { ssr: false });

export function PanoramaTour({ scenes }: { scenes: ExperienceScene[] }) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [gyro, setGyro] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const scene = scenes[active];
  const panoramaAvailable = Boolean(scene.panoramaAsset);
  const previewScenes = useMemo(() => scenes.filter((item) => item.fallbackImage), [scenes]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setActive((value) => Math.min(scenes.length - 1, value + 1));
      if (event.key === "ArrowLeft") setActive((value) => Math.max(0, value - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scenes.length]);

  useEffect(() => {
    const syncFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  const enterFullscreen = async () => {
    if (!stage.current) return;
    if (!document.fullscreenElement) await stage.current.requestFullscreen?.();
    else await document.exitFullscreen?.();
  };
  const goTo = (slug?: string) => {
    const next = scenes.findIndex((item) => item.slug === slug);
    if (next >= 0) setActive(next);
  };

  return <main className="tour-main"><div className="tour-layout"><div className="tour-stage" ref={stage} tabIndex={0} aria-label={`${scene.title} virtual tour scene`}>
    {panoramaAvailable ? <PanoramaCanvas src={scene.panoramaAsset!} gyro={gyro} /> : <img src={scene.fallbackImage} alt={`Concept-render fallback: ${scene.title}`} />}
    <div className="tour-stage-copy"><p className="eyebrow">Experience Centre Preview / {active + 1} of {scenes.length}</p><h1>{scene.title}</h1><p>{scene.caption}</p></div>
    <div className="tour-hotspots" aria-label="Scene hotspots">{scene.hotspots.slice(0, 3).map((hotspot) => <button type="button" key={hotspot.id} className="tour-hotspot" onClick={() => hotspot.targetSceneSlug ? goTo(hotspot.targetSceneSlug) : undefined}>{hotspot.label}</button>)}</div>
    {!panoramaAvailable && <p className="tour-fallback"><GalleryHorizontalEnd size={14} /> Panorama not supplied yet. This accessible concept-render gallery is the supplied-asset fallback; replace this scene with an equirectangular panorama in Webflow CMS when available.</p>}
  </div><aside className="tour-sidebar"><p className="eyebrow">Explore in 360 degrees</p><h2>Move through the centre.</h2><p>Drag or swipe to look around when a 360-degree panorama is available. Arrow keys navigate scenes in every mode.</p><div className="tour-progress" aria-label={`Scene ${active + 1} of ${scenes.length}`}>{scenes.map((item, index) => <span className={index <= active ? "active" : ""} key={item.slug} />)}</div><div className="tour-scenes" aria-label="Scene navigation">{scenes.map((item, index) => <button type="button" className={index === active ? "active" : ""} onClick={() => setActive(index)} key={item.slug}><span>0{index + 1} / {item.title}</span><Compass size={14} /></button>)}</div><div className="tour-controls"><button type="button" onClick={enterFullscreen}><Expand size={14} /> {fullscreen ? "Exit" : "Fullscreen"}</button><button type="button" onClick={() => setGyro(!gyro)} aria-pressed={gyro}><Rotate3D size={14} /> Gyro</button></div></aside></div><section className="content-section" aria-label="Fallback gallery"><div className="section-heading"><div><p className="eyebrow">Fallback gallery</p><h2>Every scene remains available without WebGL.</h2></div><p>Concept stills load one at a time in the tour. Supplied multi-resolution panoramas replace them without changing the interface.</p></div><div className="product-grid">{previewScenes.map((item, index) => <button type="button" className="product-card" onClick={() => { setActive(index); window.scrollTo({ top: 0, behavior: "smooth" }); }} key={item.slug}><img src={item.fallbackImage} alt="" /><div><p>0{index + 1} / Concept preview</p><h3>{item.title}</h3><span>Open scene ↗</span></div></button>)}</div></section></main>;
}
