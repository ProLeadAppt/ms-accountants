"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { registerGsap, FOLDER_EASE } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/cn";

export type Segment = { text: string; em?: boolean };

export function SplitHeadline({
  segments,
  className,
  emClassName,
  splitType = "lines,words",
  as = "h1",
}: {
  segments: Segment[];
  className?: string;
  emClassName?: string;
  splitType?: "lines" | "lines,words";
  as?: "h1" | "h2";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      registerGsap();
      let split: SplitText | undefined;
      let cancelled = false;
      // Split only after webfonts resolve: line boundaries computed against
      // fallback metrics break once the real serif swaps in.
      const run = () => {
        if (cancelled || !ref.current) return;
        split = SplitText.create(ref.current, { type: splitType, mask: "lines" });
        const targets = splitType === "lines" ? split.lines : split.words;
        gsap.from(targets, {
          yPercent: 110,
          duration: 0.9,
          ease: FOLDER_EASE,
          stagger: 0.045,
          immediateRender: false,
        });
      };
      if (typeof document !== "undefined" && document.fonts?.status !== "loaded") {
        document.fonts.ready.then(run);
      } else {
        run();
      }
      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: ref, dependencies: [reduced] },
  );

  const Tag = as;
  return (
    <Tag ref={ref} data-anim className={cn(className)}>
      {segments.map((s, i) => {
        const tail = i < segments.length - 1 ? " " : "";
        return s.em ? (
          <em key={i} className={cn(emClassName)}>
            {s.text}
            {tail}
          </em>
        ) : (
          <Fragment key={i}>
            {s.text}
            {tail}
          </Fragment>
        );
      })}
    </Tag>
  );
}
