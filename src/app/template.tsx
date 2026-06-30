"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

/** Enter-only page transition: a restrained fade + lift on each navigation.
 *  App Router re-mounts this per route, so it runs on every page change. */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from(ref.current, { autoAlpha: 0, y: 16, duration: 0.5, ease: "power2.out" });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return <div ref={ref}>{children}</div>;
}
