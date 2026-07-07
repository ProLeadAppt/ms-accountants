"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Wraps scrolling page content in ScrollSmoother's required structure.
 * Fixed chrome (preloader, grain, header) must stay OUTSIDE this wrapper,
 * because ScrollSmoother transforms #smooth-content and that breaks
 * position:fixed descendants. Reduced-motion/touch keep native scrolling.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isTouchDevice =
        typeof window !== "undefined" &&
        (window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0);

      if (reduced || isTouchDevice) return;
      registerGsap();
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        smoothTouch: false,
      });
      return () => smoother.kill();
    },
    { dependencies: [reduced] },
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
