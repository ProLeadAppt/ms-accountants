"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  className?: string;
};

/**
 * Statement text that reveals word-by-word, scrubbed to scroll position.
 * Words are real DOM (SSR-friendly); reduced-motion → fully visible.
 */
export function WordReveal({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!ref.current) return;
      const spans = ref.current.querySelectorAll<HTMLElement>("[data-word]");
      if (reduced) {
        ref.current.classList.add("is-visible");
        gsap.set(spans, { clearProps: "all" });
        return;
      }
      registerGsap();
      gsap.set(spans, { opacity: 0.42 });
      gsap.to(spans, {
        opacity: 1,
        ease: "none",
        stagger: 0.08,
        onComplete: () => ref.current?.classList.add("is-visible"),
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 35%",
          scrub: 1,
        },
      });
    },
    { scope: ref, dependencies: [reduced, text] },
  );

  return (
    <p ref={ref} data-anim className={cn(className)}>
      {words.map((w, i) => (
        <span key={i} data-word className="inline-block">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
