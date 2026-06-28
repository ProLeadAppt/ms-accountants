"use client";

import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Full-bleed hero media. Reduced-motion users get the still; everyone else gets
 * the cinematic loop with the still as its poster (instant first paint).
 */
export function HeroBackground() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <Image
        src="/generated/lib2-1.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[55%_45%]"
      />
    );
  }

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover object-[55%_45%]"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/generated/lib2-1.jpg"
    >
      <source src="/generated/lib2-1.mp4" type="video/mp4" />
    </video>
  );
}
