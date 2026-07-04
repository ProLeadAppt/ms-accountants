"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/cn";
import { BLOOM, heroEmStart } from "@/lib/motion/bloom";

export type Segment = { text: string; em?: boolean };

/**
 * The site-wide "Ink" reveal. Each word presses from hairline-thin to full
 * weight (Zodiak is a variable font, so GSAP tweens `fontWeight` and the
 * browser interpolates the weight axis).
 *
 * - reveal="hero"    → runs on mount; the em phrase is HELD BACK to bloom last,
 *                      pressing heavier then settling, with an optional underline.
 * - reveal="section" → runs on scroll-into-view; a single em word is the accent.
 *
 * Every path is gated by reduced-motion and only splits after fonts load, so the
 * fallback is always the natural full-weight heading (no-JS + SSR get plain text).
 */
export function SplitHeadline({
  segments,
  className,
  emClassName,
  as = "h2",
  reveal = "section",
  underline = false,
}: {
  segments: Segment[];
  className?: string;
  emClassName?: string;
  as?: "h1" | "h2" | "h3";
  reveal?: "hero" | "section";
  underline?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      registerGsap();
      const root = ref.current;
      let split: SplitText | undefined;
      let cancelled = false;

      const run = () => {
        if (cancelled || !root) return;
        split = SplitText.create(root, { type: "words" });
        const words = split.words as HTMLElement[];
        const emWords = words.filter((w) => w.closest("em"));
        const baseWords = words.filter((w) => !w.closest("em"));
        const path = underline
          ? (root.querySelector(".headline-underline path") as SVGPathElement | null)
          : null;
        gsap.set(words, {
          display: "inline-block",
          willChange: "font-weight, opacity, transform, filter",
        });

        if (reveal === "hero") {
          const cfg = BLOOM.hero;
          const tl = gsap.timeline();
          tl.from(
            baseWords,
            {
              opacity: 0,
              fontWeight: cfg.weightFrom,
              yPercent: cfg.rise,
              filter: `blur(${cfg.blur}px)`,
              duration: cfg.wordDur,
              stagger: cfg.stagger,
              ease: "power2.out",
              // rest state stays natural until the ticker runs, so a stalled
              // rAF degrades to a correct full-weight hero rather than a stuck
              // half-bloomed one.
              immediateRender: false,
            },
            0,
          );
          if (emWords.length) {
            const start = heroEmStart(baseWords.length);
            tl.fromTo(
              emWords,
              {
                opacity: 0,
                fontWeight: cfg.weightFrom,
                yPercent: cfg.rise + 4,
                filter: `blur(${cfg.blur}px)`,
              },
              {
                opacity: 1,
                fontWeight: cfg.emWeightPeak,
                yPercent: 0,
                filter: "blur(0px)",
                duration: cfg.emDur * 0.7,
                stagger: cfg.stagger * 0.8,
                ease: "power2.out",
              },
              start,
            );
            tl.to(emWords, { fontWeight: cfg.emWeightSettle, duration: cfg.emDur * 0.3 }, ">-0.1");
            if (path) {
              tl.fromTo(
                path,
                { drawSVG: "0%" },
                { drawSVG: "100%", duration: cfg.underlineDur, ease: "power2.inOut" },
                start + cfg.emDur * 0.5,
              );
            }
          }
        } else {
          const cfg = BLOOM.section;
          const tl = gsap.timeline({
            scrollTrigger: { trigger: root, start: "top 82%", once: true },
          });
          tl.from(
            words,
            {
              opacity: 0,
              fontWeight: cfg.weightFrom,
              yPercent: cfg.rise,
              filter: `blur(${cfg.blur}px)`,
              duration: cfg.wordDur,
              stagger: cfg.stagger,
              ease: "power2.out",
            },
            0,
          );
          if (emWords.length) {
            tl.to(emWords, { fontWeight: cfg.emWeightTo, duration: cfg.wordDur * 0.6 }, 0.1);
          }
          if (path) {
            tl.fromTo(
              path,
              { drawSVG: "0%" },
              { drawSVG: "100%", duration: cfg.wordDur, ease: "power2.inOut" },
              0.2,
            );
          }
        }
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
        if (!s.em) {
          return (
            <Fragment key={i}>
              {s.text}
              {tail}
            </Fragment>
          );
        }
        return (
          <em key={i} className={cn(emClassName)}>
            {underline ? (
              <span className="relative inline-block whitespace-nowrap pb-[0.12em]">
                {s.text}
                <svg
                  className="headline-underline pointer-events-none absolute inset-x-0 bottom-0 h-[0.22em] w-full overflow-visible"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 5 C 50 8, 150 8, 198 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            ) : (
              s.text
            )}
            {tail}
          </em>
        );
      })}
    </Tag>
  );
}
