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
  y?: number;
  each?: number;
  start?: string;
};

/** Direct children fade + rise in sequence on scroll-in. */
export function Stagger({
  children,
  className,
  y = 28,
  each = 0.1,
  start = "top 82%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      const items = gsap.utils.toArray<HTMLElement>(ref.current.children);
      if (!items.length) return;
      if (reduced) {
        ref.current.classList.add("is-visible");
        gsap.set(items, { clearProps: "all" });
        return;
      }
      registerGsap();
      gsap.set(items, { y });
      gsap.to(items, {
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: each,
        onComplete: () => ref.current?.classList.add("is-visible"),
        scrollTrigger: { trigger: ref.current, start, once: true },
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
