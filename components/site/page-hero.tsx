"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageHero({ eyebrow, title, description, image, children }: { eyebrow: string; title: ReactNode; description: string; image?: string; children?: ReactNode }) {
  const container = useRef<HTMLElement>(null);
  
  useLayoutEffect(() => {
    if (!container.current) return;
    const elements = container.current.querySelectorAll(".eyebrow, h1, .lede, .hero-actions");
    gsap.fromTo(elements, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: "power3.out", delay: 0.1 });
  }, []);

  return (
    <section ref={container} className={`page-hero ${image ? "has-image" : ""}`}>
      {image && <Image src={image} alt="" fill priority style={{ objectFit: "cover", zIndex: 0 }} sizes="100vw" />}
      <div className="hero-content" style={{ position: "relative", zIndex: 2 }}>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{description}</p>
        {children}
      </div>
    </section>
  );
}
