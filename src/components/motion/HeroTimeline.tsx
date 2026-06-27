"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { registerGsap, FOLDER_EASE } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Orchestrated on-load hero entrance. Mark children with:
 *   data-hero="bg"    → background image (scale-in)
 *   data-hero="rise"  → headline/sub/button/accents (staggered fade-up)
 * Reduced-motion → everything visible immediately.
 */
export function HeroTimeline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      registerGsap();
      const q = gsap.utils.selector(ref);
      const bg = q("[data-hero='bg']");
      const rise = q("[data-hero='rise']");

      if (bg.length) gsap.set(bg, { autoAlpha: 0, scale: 1.08 });
      if (rise.length) gsap.set(rise, { autoAlpha: 0, y: 18 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (bg.length)
        tl.to(bg, { autoAlpha: 1, scale: 1, duration: 0.9, ease: FOLDER_EASE }, 0);
      if (rise.length)
        tl.to(
          rise,
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 },
          "-=0.45",
        );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} data-anim className={cn(className)}>
      {children}
    </div>
  );
}
