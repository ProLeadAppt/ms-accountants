"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/cn";

/** A hairline that "draws" itself (scaleY) as it scrolls into view. */
export function LineDraw({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      registerGsap();
      gsap.fromTo(
        ref.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            end: "top 45%",
            scrub: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <span
      ref={ref}
      data-anim
      className={cn("block origin-top", className)}
    />
  );
}
