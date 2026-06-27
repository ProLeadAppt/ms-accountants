"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

const INTERACTIVE = "a,button,input,textarea,select,label,[data-cursor]";

/** Lagging ring + instant dot. Desktop (pointer:fine) only, reduced-motion safe. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    document.documentElement.classList.add("has-custom-cursor");
    gsap.set([dotEl, ringEl], { xPercent: -50, yPercent: -50, opacity: 0 });

    const ringX = gsap.quickTo(ringEl, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ringEl, "y", { duration: 0.45, ease: "power3" });
    const dotX = gsap.quickTo(dotEl, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dotEl, "y", { duration: 0.08, ease: "power3" });

    let shown = false;
    const move = (e: MouseEvent) => {
      if (!shown) {
        gsap.to([dotEl, ringEl], { opacity: 1, duration: 0.3 });
        shown = true;
      }
      ringX(e.clientX);
      ringY(e.clientY);
      dotX(e.clientX);
      dotY(e.clientY);
    };
    const over = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE)) ringEl.classList.add("is-active");
    };
    const out = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(INTERACTIVE)) ringEl.classList.remove("is-active");
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduced]);

  if (reduced) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
