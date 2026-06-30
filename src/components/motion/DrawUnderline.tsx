"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

export function DrawUnderline({
  children,
  delay = 0.9,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reduced) {
        gsap.set(ref.current, { drawSVG: "100%" });
        return;
      }
      registerGsap();
      gsap.fromTo(
        ref.current,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.7, ease: "power2.inOut", delay },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <span className="relative inline-block whitespace-nowrap pb-[0.12em]">
      {children}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[0.22em] w-full overflow-visible"
        viewBox="0 0 200 8"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={ref}
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
