"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Same markup and visual as DrawUnderline, but the draw fires on
 * scroll-enter via ScrollTrigger instead of a mount delay. For flourishes
 * that sit below the fold on first paint (e.g. ConversationAct, the page's
 * last act), a mount-timed draw completes long before the user scrolls
 * there. DrawUnderline itself stays mount-driven for /about's PromiseBlock.
 */
export function DrawUnderlineOnScroll({
  children,
  start = "top 80%",
}: {
  children: React.ReactNode;
  start?: string;
}) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!pathRef.current) return;
      if (reduced) {
        gsap.set(pathRef.current, { drawSVG: "100%" });
        return;
      }
      registerGsap();
      gsap.fromTo(
        pathRef.current,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 0.7,
          ease: "power2.inOut",
          scrollTrigger: { trigger: wrapperRef.current, start, once: true },
        },
      );
    },
    { scope: wrapperRef, dependencies: [reduced] },
  );

  return (
    <span ref={wrapperRef} className="relative inline-block whitespace-nowrap pb-[0.12em]">
      {children}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[0.22em] w-full overflow-visible"
        viewBox="0 0 200 8"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={pathRef}
          d="M2 5 C 50 8, 150 8, 198 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
