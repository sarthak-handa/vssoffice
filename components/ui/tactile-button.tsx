"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Shared = {
  children: ReactNode;
  className?: string;
  label?: string;
};

type LinkProps = Shared & { href: string; onClick?: never };
type ButtonProps = Shared & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

function useMagneticMotion() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const xTo = gsap.quickTo(element, "x", { duration: 0.32, ease: "power3.out" });
    const yTo = gsap.quickTo(element, "y", { duration: 0.32, ease: "power3.out" });
    const move = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      xTo((event.clientX - (box.left + box.width / 2)) * 0.12);
      yTo((event.clientY - (box.top + box.height / 2)) * 0.16);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
    };
  }, []);

  return ref;
}

export function TactileLink({ children, className = "", href, label }: LinkProps) {
  const ref = useMagneticMotion();
  return (
    <Link ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={`tactile-link ${className}`} aria-label={label}>
      <span>{children}</span><i aria-hidden="true">↗</i>
    </Link>
  );
}

export function TactileButton({ children, className = "", label, ...props }: ButtonProps) {
  const ref = useMagneticMotion();
  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} className={`tactile-link ${className}`} aria-label={label} {...props}>
      <span>{children}</span><i aria-hidden="true">↗</i>
    </button>
  );
}
