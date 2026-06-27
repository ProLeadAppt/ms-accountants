"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { registerGsap, FOLDER_EASE } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/cn";

export type Segment = { text: string; em?: boolean };

/**
 * Cinematic headline: each word rises out of a clip mask, staggered, on load.
 * Reduced-motion → static. Pass emphasis segments for the italic red device.
 */
export function MaskHeadline({
  segments,
  className,
  emClassName,
}: {
  segments: Segment[];
  className?: string;
  emClassName?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();

  const words = segments.flatMap((seg) =>
    seg.text
      .split(" ")
      .filter(Boolean)
      .map((w) => ({ w, em: seg.em })),
  );

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      registerGsap();
      const inners = ref.current.querySelectorAll<HTMLElement>("[data-word-inner]");
      gsap.timeline().from(inners, {
        yPercent: 118,
        duration: 0.9,
        ease: FOLDER_EASE,
        stagger: 0.05,
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <h1 ref={ref} data-anim className={cn(className)}>
      {words.map((it, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom [margin-bottom:-0.12em]">
            <span
              data-word-inner
              className={cn("inline-block will-change-transform", it.em && emClassName)}
            >
              {it.w}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </h1>
  );
}
