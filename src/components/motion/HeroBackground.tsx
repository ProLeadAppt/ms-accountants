"use client";

import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { HERO_STILL, HERO_VIDEO } from "@/lib/heroAsset";

/**
 * Full-bleed hero media. Reduced-motion users get the crisp still; everyone else
 * gets the ambient loop (drifting dust/light) with the still as its poster, so
 * the first paint is instant and identical to the preloaded image. The
 * depth/parallax is applied by the Hero wrapper (ScrollSmoother data-speed).
 */
export function HeroBackground() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <Image
        src={HERO_STILL}
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
      poster={HERO_STILL}
    >
      <source src={HERO_VIDEO} type="video/mp4" />
    </video>
  );
}
