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

      // from() with immediateRender:false keeps the *rest* state the natural CSS
      // (scale 1, content in place). The zoom/rise are applied only once the
      // ticker runs, so a throttled or stalled rAF degrades to a correct static
      // hero instead of a background stranded mid-zoom.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", immediateRender: false },
      });
      if (bg.length)
        tl.from(bg, { scale: 1.08, duration: 1.0, ease: FOLDER_EASE }, 0);
      if (rise.length)
        tl.from(rise, { y: 18, duration: 0.7, stagger: 0.12 }, "-=0.5");

      // Scroll parallax — background drifts slower than the content.
      if (bg.length) {
        gsap.to(bg, {
          yPercent: 16,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} data-anim className={cn(className)}>
      {children}
    </div>
  );
}
