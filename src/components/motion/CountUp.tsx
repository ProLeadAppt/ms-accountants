"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { parseFigure } from "@/lib/motion/figure";

/** Renders a stat figure; if it contains an integer, counts up to it when
 *  scrolled into view. Non-numeric figures (PhD, CA) render unchanged. */
export function CountUp({ figure, className }: { figure: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const parsed = parseFigure(figure);

  useGSAP(
    () => {
      if (reduced || !parsed || !ref.current) return;
      registerGsap();
      const el = ref.current;
      const counter = { n: 0 };
      gsap.to(counter, {
        n: parsed.value,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = parsed.prefix + Math.round(counter.n) + parsed.suffix;
        },
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  // SSR / reduced-motion / non-numeric: show the final figure immediately.
  return <span ref={ref} className={className}>{figure}</span>;
}
