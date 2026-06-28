"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** rise distance in px */
  y?: number;
  delay?: number;
  start?: string;
};

/** Fade + rise on scroll-in. Reduced-motion → instant visible. */
export function Reveal({
  children,
  className,
  y = 24,
  delay = 0,
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;
      if (reduced) {
        el.classList.add("is-visible");
        gsap.set(el, { clearProps: "all" });
        return;
      }
      registerGsap();
      gsap.set(el, { y });
      gsap.to(el, {
        y: 0,
        duration: 0.85,
        delay,
        ease: "power3.out",
        onComplete: () => el.classList.add("is-visible"),
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none", once: true },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} data-anim className={cn(className)}>
      {children}
    </div>
  );
}
