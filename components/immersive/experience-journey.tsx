"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Eye, Volume2, VolumeX } from "lucide-react";
import type { ExperienceScene } from "@/lib/cms/types";
import { TactileLink } from "@/components/ui/tactile-button";

const JourneyCanvas = dynamic(() => import("./journey-canvas").then((module) => module.JourneyCanvas), { ssr: false });

const productIntelligence = ["CCTV", "Video Door Phones", "Smart Locks", "Home Automation", "Fire & Burglar Alarm", "Gate Automation", "EPABX", "Video Conferencing", "Home Theatre"];

export function ExperienceJourney({ scenes }: { scenes: ExperienceScene[] }) {
  const sections = useRef<Array<HTMLElement | null>>([]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [muted, setMuted] = useState(true);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = document.createElement("canvas");
    setWebgl(!reduced && Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate text reveal
    gsap.utils.toArray<HTMLElement>(".scene-copy, .journey-closing h2").forEach((elem) => {
      gsap.fromTo(elem, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: elem, start: "top 85%" }
      });
    });

    const triggers = sections.current.map((section, index) => {
      if (!section) return null;
      return ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
        onUpdate: (self) => setProgress(Math.min(1, Math.max(0, (index + self.progress) / Math.max(1, scenes.length - 1)))),
      });
    });
    return () => triggers.forEach((trigger) => trigger?.kill());
  }, [scenes.length]);

  const scrollToScene = (index: number) => {
    sections.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="journey-main">
      {webgl && <div className="journey-canvas-wrap" aria-hidden="true"><JourneyCanvas progress={progress} /></div>}
      <div className="experience-topbar">
        <span className="preview-chip">Experience Centre Preview</span>
        <button className="sound-toggle" type="button" onClick={() => setMuted(!muted)} aria-pressed={!muted}>
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />} {muted ? "Sound off" : "Sound on"}
        </button>
      </div>
      <aside className="scene-selector" aria-label="Journey scenes">
        {scenes.map((scene, index) => <button type="button" onClick={() => scrollToScene(index)} className={active === index ? "active" : ""} key={scene.slug}><span>0{index + 1}</span>{scene.title}</button>)}
      </aside>

      {scenes.map((scene, index) => (
        <section className={`story-scene scene-${scene.slug}`} key={scene.slug} ref={(element) => { sections.current[index] = element; }}>
          <Image className="scene-still" src={scene.fallbackImage} alt={`Concept render: ${scene.title}`} fill style={{ objectFit: "cover" }} priority={index === 0} sizes="100vw" />
          <div className="scene-scrim" />
          <div className="scene-copy">
            <p className="eyebrow">0{index + 1} / {scene.sceneType}</p>
            {index === 0 ? <><h1>Security, intelligence,<br />and cinema - <em>experienced</em><br />in one place.</h1><p className="lede">A premium smart-living, security and AV experience centre by VSS Salesco.</p><div className="hero-actions"><TactileLink href="/experience">Explore the centre</TactileLink><TactileLink className="is-quiet" href="/book-demo">Book a consultation</TactileLink></div></> : <><h2>{scene.title}</h2><p className="lede">{scene.caption}</p><div className="scene-actions">{scene.hotspots.slice(0, 2).map((hotspot) => <button key={hotspot.id} type="button" className="hotspot-copy" onClick={() => hotspot.targetSceneSlug && scrollToScene(scenes.findIndex((item) => item.slug === hotspot.targetSceneSlug))}><span>{hotspot.label}</span><ArrowDownRight size={15} /></button>)}</div></>}
          </div>
          <div className="scene-meta"><span>Concept render</span><span>{index === 0 ? "Scroll to enter" : scene.caption}</span></div>
          {scene.slug === "display" && <div className="intelligence-grid" aria-label="Product intelligence categories">{productIntelligence.map((item) => <Link href="/solutions" key={item}>{item}<ArrowDownRight size={14} /></Link>)}</div>}
          {scene.slug === "theatre" && <div className="theatre-note"><Eye size={15} /> Star ceiling and theatre imagery are visual-preview content only. Final AV, acoustic and lighting specification remains site-led.</div>}
        </section>
      ))}
      <section className="journey-closing">
        <p className="eyebrow">The next scene is real</p>
        <h2>Visit VSS Salesco.<br /><em>Experience technology</em><br />before you buy it.</h2>
        <div className="hero-actions"><TactileLink href="/book-demo">Book a demo</TactileLink><TactileLink className="is-quiet" href="/contact">Contact VSS Salesco</TactileLink></div>
      </section>
      {!webgl && <p className="webgl-fallback">Immersive motion is unavailable or reduced-motion is enabled. You are seeing the full accessible concept-render journey.</p>}
    </main>
  );
}
