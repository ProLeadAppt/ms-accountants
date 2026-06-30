# Premium Motion Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a branded first-load preloader, a crisp layered-parallax hero, site-wide smooth scrolling, and supporting premium motion (stats count-up, page transitions, a self-drawing underline, SplitText headings) using the now-free GSAP plugin suite already bundled in the repo.

**Architecture:** A client `SmoothScroll` provider wraps the page in ScrollSmoother's `#smooth-wrapper > #smooth-content`; fixed chrome (preloader, grain, header) stays outside it. A single `usePrefersReducedMotion()` gate disables every motion path. The hero becomes a high-resolution still with code-driven depth (`data-speed` parallax + a dust/light layer) and a SplitText headline.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React, Tailwind v4, `gsap@3.15` (+ `@gsap/react`), GSAP plugins ScrollTrigger / ScrollSmoother / SplitText / DrawSVGPlugin / CustomEase, `next/image`, fal.ai for the still, vitest.

## Global Constraints

- Branch: `redesign-v2`. Commit per task. Co-author trailer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- **No em-dashes** in any visible copy (use colon/comma/full stop). AU spelling.
- Body/UI font stays **Schibsted Grotesk** (never Inter/Manrope); display = Instrument Serif (`font-display`); headlines = Fraunces (`font-serif`); eyebrows = Space Mono.
- Icons sized via the numeric `size` prop, never `h-/w-` classes.
- `.scheme-espresso` paints a solid bg: any background wrapper must be `z-0`, content `z-10`.
- **Every** motion path must honour `usePrefersReducedMotion()` (`src/lib/motion/useReducedMotion.ts`); reduced-motion degrades to a correct static result.
- Register GSAP plugins exactly once, client-side only, via `registerGsap()` in `src/lib/motion/eases.ts`.
- Page count must stay **16** (no new routes). No copy/business-logic changes beyond wiring the new hero asset.
- Verify gate per relevant task: `npm run lint` clean, `npx vitest run` green, `npm run build` succeeds. Motion is eyeballed on a real desktop (the automation browser freezes rAF).

---

### Task 1: Register the premium GSAP plugins

**Files:**
- Modify: `src/lib/motion/eases.ts`

**Interfaces:**
- Produces: `registerGsap()` now also registers `ScrollSmoother`, `SplitText`, `DrawSVGPlugin` (in addition to the existing `ScrollTrigger`, `CustomEase`). Same idempotent signature, no return value. `FOLDER_EASE` unchanged.

- [ ] **Step 1: Update the registration module**

Replace the import block and `gsap.registerPlugin(...)` line in `src/lib/motion/eases.ts`:

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";

/** Quinn-style custom ease for folder/hero reveals. */
export const FOLDER_EASE_CURVE = "0, 0.47, 0.02, 1";
export const FOLDER_EASE = "folderEase";

let registered = false;

/** Register GSAP plugins + the custom ease exactly once, client-side only. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin, CustomEase);
  CustomEase.create(FOLDER_EASE, FOLDER_EASE_CURVE);
  registered = true;
}
```

- [ ] **Step 2: Verify the imports resolve**

Run: `npx tsc --noEmit` (or `npm run build`)
Expected: no "Cannot find module 'gsap/ScrollSmoother'" errors (the plugins are present under `node_modules/gsap/`).

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/lib/motion/eases.ts
git commit -m "Register premium GSAP plugins (ScrollSmoother, SplitText, DrawSVG)"
```

---

### Task 2: SmoothScroll provider + RootLayout restructure (backbone)

**Files:**
- Create: `src/components/motion/SmoothScroll.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `<SmoothScroll>{children}</SmoothScroll>` — renders `#smooth-wrapper > #smooth-content` and creates ScrollSmoother (smooth 1.2, `effects:true`, `normalizeScroll:true`) when motion is allowed; pass-through structure otherwise. Consumers put scrolling page content inside it; fixed chrome stays outside.

- [ ] **Step 1: Create the provider**

Create `src/components/motion/SmoothScroll.tsx`:

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

/**
 * Wraps scrolling page content in ScrollSmoother's required structure.
 * Fixed chrome (preloader, grain, header) must stay OUTSIDE this wrapper,
 * because ScrollSmoother transforms #smooth-content and that breaks
 * position:fixed descendants. Reduced-motion/touch keep native scrolling.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const wrapper = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      registerGsap();
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.2,
        effects: true,
        normalizeScroll: true,
        smoothTouch: false,
      });
      return () => smoother.kill();
    },
    { dependencies: [reduced] },
  );

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
```

- [ ] **Step 2: Restructure RootLayout so fixed chrome sits outside the smoother**

In `src/app/layout.tsx`, import the provider and change the body so `Header`, the grain, (and later the preloader) are siblings of `SmoothScroll`, while `main` + `Footer` live inside it. Replace the JSX from `<Header />` through the grain div:

```tsx
import { SmoothScroll } from "@/components/motion/SmoothScroll";
// ...
        <Header />
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScroll>
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
```

(Leave the `<script>`, analytics, and JSON-LD where they are, above `<Header />`.)

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: succeeds, 16 pages.

- [ ] **Step 4: Manual scroll verification (real desktop)**

Run `npm run start`, open `http://localhost:3000`. Confirm: page scrolls with eased momentum; the grain overlay stays fixed and full-screen (does NOT scroll with content); the header stays pinned; existing section reveals (Reveal/Stagger/LineDraw) still fire on scroll. Then emulate `prefers-reduced-motion: reduce` (DevTools Rendering) and confirm native scrolling returns and content is fully visible.

- [ ] **Step 5: Commit**

```bash
git add src/components/motion/SmoothScroll.tsx src/app/layout.tsx
git commit -m "Add site-wide ScrollSmoother; keep fixed chrome outside smooth-content"
```

---

### Task 3: Stats count-up

**Files:**
- Create: `src/lib/motion/figure.ts`
- Create: `src/lib/motion/figure.test.ts`
- Create: `src/components/motion/CountUp.tsx`
- Modify: `src/components/sections/CredentialGrid.tsx`

**Interfaces:**
- Produces: `parseFigure(figure: string): { prefix: string; value: number; suffix: string } | null` and `<CountUp figure={string} className?={string} />`.
- Consumes: `registerGsap`, `usePrefersReducedMotion`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/motion/figure.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { parseFigure } from "./figure";

describe("parseFigure", () => {
  it("parses a trailing-suffix number", () => {
    expect(parseFigure("45+")).toEqual({ prefix: "", value: 45, suffix: "+" });
  });
  it("parses a bare number", () => {
    expect(parseFigure("1")).toEqual({ prefix: "", value: 1, suffix: "" });
  });
  it("returns null for non-numeric figures", () => {
    expect(parseFigure("PhD")).toBeNull();
    expect(parseFigure("CA")).toBeNull();
  });
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `npx vitest run src/lib/motion/figure.test.ts`
Expected: FAIL (`parseFigure` not defined).

- [ ] **Step 3: Implement the parser**

Create `src/lib/motion/figure.ts`:

```ts
/** Split a stat figure into a countable integer plus any prefix/suffix.
 *  "45+" -> {prefix:"",value:45,suffix:"+"};  "PhD" -> null (not countable). */
export function parseFigure(
  figure: string,
): { prefix: string; value: number; suffix: string } | null {
  const m = figure.match(/^(\D*)(\d+)(\D*)$/);
  if (!m) return null;
  return { prefix: m[1], value: parseInt(m[2], 10), suffix: m[3] };
}
```

- [ ] **Step 4: Run it, expect pass**

Run: `npx vitest run src/lib/motion/figure.test.ts`
Expected: PASS.

- [ ] **Step 5: Create the CountUp component**

Create `src/components/motion/CountUp.tsx`:

```tsx
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
```

- [ ] **Step 6: Wire CountUp into CredentialGrid**

In `src/components/sections/CredentialGrid.tsx`, import `CountUp` and replace the figure `<div>`:

```tsx
import { CountUp } from "@/components/motion/CountUp";
// ...
                <div className="font-serif text-5xl leading-none text-cream sm:text-6xl">
                  <CountUp figure={stat.figure} />
                </div>
```

- [ ] **Step 7: Full test + build**

Run: `npx vitest run` then `npm run build`
Expected: all tests pass; build succeeds (16 pages).

- [ ] **Step 8: Commit**

```bash
git add src/lib/motion/figure.ts src/lib/motion/figure.test.ts src/components/motion/CountUp.tsx src/components/sections/CredentialGrid.tsx
git commit -m "Animate credential stats counting up on scroll-in"
```

---

### Task 4: Branded first-load preloader

**Files:**
- Create: `src/lib/motion/preloader.ts`
- Create: `src/lib/motion/preloader.test.ts`
- Create: `src/components/motion/Preloader.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `shouldShowPreloader(storage): boolean`, `markPreloaded(storage): void`, and `<Preloader heroSrc={string} />` (mounted once, outside `SmoothScroll`).
- Consumes: `registerGsap`, `usePrefersReducedMotion`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/motion/preloader.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { shouldShowPreloader, markPreloaded } from "./preloader";

function memStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => (m.has(k) ? m.get(k)! : null),
    setItem: (k: string, v: string) => void m.set(k, v),
  };
}

describe("preloader session guard", () => {
  it("shows on a fresh session, then not after marking", () => {
    const s = memStorage();
    expect(shouldShowPreloader(s)).toBe(true);
    markPreloaded(s);
    expect(shouldShowPreloader(s)).toBe(false);
  });
});
```

- [ ] **Step 2: Run it, expect failure**

Run: `npx vitest run src/lib/motion/preloader.test.ts`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement the guard**

Create `src/lib/motion/preloader.ts`:

```ts
type MiniStorage = Pick<Storage, "getItem" | "setItem">;
const KEY = "ms-preloaded";

/** First load of the session -> show the preloader once. */
export function shouldShowPreloader(storage: MiniStorage): boolean {
  try {
    return storage.getItem(KEY) !== "1";
  } catch {
    return false;
  }
}

export function markPreloaded(storage: MiniStorage): void {
  try {
    storage.setItem(KEY, "1");
  } catch {
    /* private mode: ignore */
  }
}
```

- [ ] **Step 4: Run it, expect pass**

Run: `npx vitest run src/lib/motion/preloader.test.ts`
Expected: PASS.

- [ ] **Step 5: Build the Preloader component**

Create `src/components/motion/Preloader.tsx`. Progress is driven by real readiness (`document.fonts.ready` + preloading the hero image), eased so the number never stalls, with a 4s hard cap; then the panel lifts and unmounts. Once per session via the guard. Reduced-motion or repeat-session renders nothing.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { registerGsap, FOLDER_EASE } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { shouldShowPreloader, markPreloaded } from "@/lib/motion/preloader";

export function Preloader({ heroSrc }: { heroSrc: string }) {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  // Decide on mount (client only) whether to show.
  useEffect(() => {
    if (reduced) return;
    if (shouldShowPreloader(window.sessionStorage)) setShow(true);
  }, [reduced]);

  useEffect(() => {
    if (!show || !rootRef.current) return;
    registerGsap();

    const progress = { p: 0 };
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      markPreloaded(window.sessionStorage);
      gsap.to(progress, {
        p: 100,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: render,
        onComplete: lift,
      });
    };

    const render = () => {
      const v = Math.round(progress.p);
      if (numRef.current) numRef.current.textContent = String(v);
      if (barRef.current) barRef.current.style.width = v + "%";
    };

    const lift = () => {
      gsap.to(rootRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: FOLDER_EASE,
        onComplete: () => setShow(false),
      });
    };

    // Creep toward 90% so there is always motion, real readiness finishes it.
    const creep = gsap.to(progress, {
      p: 90,
      duration: 3,
      ease: "power1.out",
      onUpdate: render,
    });

    const heroImg = new Image();
    heroImg.src = heroSrc;
    const ready = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      heroImg.decode ? heroImg.decode().catch(() => {}) : Promise.resolve(),
    ]);
    ready.then(() => {
      creep.kill();
      finish();
    });

    const cap = window.setTimeout(() => {
      creep.kill();
      finish();
    }, 4000);

    return () => {
      window.clearTimeout(cap);
      creep.kill();
    };
  }, [show, heroSrc]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="scheme-espresso fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-espresso"
    >
      <div className="font-logo flex h-12 w-12 items-center justify-center rounded-[12px] bg-brand-red text-lg font-black text-cream">
        MS
      </div>
      <div className="mt-7 h-px w-56 overflow-hidden bg-cream/15">
        <span ref={barRef} className="block h-full w-0 bg-red-bright" />
      </div>
      <div className="mt-7 font-serif text-6xl font-medium text-cream sm:text-7xl">
        <span ref={numRef}>0</span>
        <span className="ml-1 align-top text-2xl text-cream/50">%</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Mount the Preloader outside SmoothScroll**

In `src/app/layout.tsx`, import it and the hero src constant, and render it as the first body child after the scripts (above `<Header />`):

```tsx
import { Preloader } from "@/components/motion/Preloader";
import { HERO_STILL } from "@/lib/heroAsset"; // created in Task 5
// ...
        <Preloader heroSrc={HERO_STILL} />
        <Header />
```

(If Task 5 is not yet done, temporarily pass `heroSrc="/generated/lib2-1.jpg"` and switch to `HERO_STILL` in Task 5.)

- [ ] **Step 7: Full test + build**

Run: `npx vitest run` then `npm run build`
Expected: tests pass; build succeeds.

- [ ] **Step 8: Manual verification (real desktop)**

Open a fresh tab to `http://localhost:3000`: the dark preloader shows, the number ticks up and the hairline fills, then it lifts to reveal the hero. Navigate to /about and back: no replay. Open a new tab (new session) to confirm it shows again. Emulate reduced-motion: no preloader, hero immediate.

- [ ] **Step 9: Commit**

```bash
git add src/lib/motion/preloader.ts src/lib/motion/preloader.test.ts src/components/motion/Preloader.tsx src/app/layout.tsx
git commit -m "Add branded first-load preloader with live percentage"
```

---

### Task 5: High-resolution hero still + still-only background

**Files:**
- Create: `public/generated/hero-study-hires.jpg` (generated asset)
- Create: `src/lib/heroAsset.ts`
- Modify: `src/components/motion/HeroBackground.tsx`

**Interfaces:**
- Produces: `export const HERO_STILL = "/generated/hero-study-hires.jpg";`
- Consumes: nothing new.

- [ ] **Step 1: Generate the high-res still (fal.ai)**

Use the fal MCP (`mcp__fal-ai__run_model`, model `fal-ai/flux-pro/v1.1-ultra`) with a people-free, text-free library-study prompt matching the current warm window-light mood, aspect 21:9, high resolution. Save the chosen output to `public/generated/hero-study-hires.jpg`. Verify by zooming the saved file: sharp, no AI tells (no warped text, no extra fingers/objects), people-free. Per prior imagery lessons, generate 2-4 candidates and keep the best; delete the rest.

- [ ] **Step 2: Add the asset constant**

Create `src/lib/heroAsset.ts`:

```ts
/** Single source of truth for the hero still (used by the hero + preloader). */
export const HERO_STILL = "/generated/hero-study-hires.jpg";
```

- [ ] **Step 3: Make HeroBackground still-only**

Replace `src/components/motion/HeroBackground.tsx` so it renders the still for everyone (no `<video>`):

```tsx
import Image from "next/image";
import { HERO_STILL } from "@/lib/heroAsset";

/** Full-bleed hero still. The depth/parallax is applied by the Hero wrapper. */
export function HeroBackground() {
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
```

- [ ] **Step 4: Point the preloader at the constant**

In `src/app/layout.tsx`, import `HERO_STILL` from `@/lib/heroAsset` and pass it: `<Preloader heroSrc={HERO_STILL} />`.

- [ ] **Step 5: Build + manual**

Run: `npm run build` then `npm run start`. Confirm the hero shows the new crisp still; the preloader preloads the same asset so the reveal is seamless.

- [ ] **Step 6: Commit**

```bash
git add public/generated/hero-study-hires.jpg src/lib/heroAsset.ts src/components/motion/HeroBackground.tsx src/app/layout.tsx
git commit -m "Replace soft hero video with a high-resolution still"
```

---

### Task 6: Hero depth parallax + SplitText headline + DrawSVG underline

**Files:**
- Create: `src/components/motion/SplitHeadline.tsx`
- Create: `src/components/motion/DrawUnderline.tsx`
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/components/motion/HeroTimeline.tsx`

**Interfaces:**
- Produces: `<SplitHeadline segments={Segment[]} className emClassName splitType?={"lines"|"lines,words"} as?={"h1"|"h2"} />` where `type Segment = { text: string; em?: boolean }`; and `<DrawUnderline>phrase</DrawUnderline>`.
- Consumes: `registerGsap`, `FOLDER_EASE`, `usePrefersReducedMotion`.

- [ ] **Step 1: Create SplitHeadline**

Create `src/components/motion/SplitHeadline.tsx`:

```tsx
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
      const split = SplitText.create(ref.current, { type: splitType, mask: "lines" });
      const targets = splitType === "lines" ? split.lines : split.words;
      gsap.from(targets, {
        yPercent: 110,
        duration: 0.9,
        ease: FOLDER_EASE,
        stagger: 0.045,
        immediateRender: false,
      });
      return () => split.revert();
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
```

- [ ] **Step 2: Create DrawUnderline**

Create `src/components/motion/DrawUnderline.tsx`. Wrap a phrase; a red SVG stroke under it draws on load. Reduced-motion shows it fully drawn.

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";

export function DrawUnderline({
  children,
  delay = 0.9,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      if (reduced) {
        gsap.set(ref.current, { drawSVG: "100%" });
        return;
      }
      registerGsap();
      gsap.fromTo(
        ref.current,
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.7, ease: "power2.inOut", delay },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <span className="relative inline-block whitespace-nowrap pb-[0.12em]">
      {children}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[0.22em] w-full overflow-visible"
        viewBox="0 0 200 8"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          ref={ref}
          d="M2 5 C 50 8, 150 8, 198 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
```

- [ ] **Step 3: Rewire the Hero headline + depth**

In `src/components/sections/Hero.tsx`: (a) swap `MaskHeadline` for `SplitHeadline` with `splitType="lines"` (so the inline underline survives line-splitting), wrapping the "wrote the thesis" segment text in `DrawUnderline`; (b) add `data-speed` parallax to the background and a dust/light layer.

Replace the `MaskHeadline` import and element:

```tsx
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { DrawUnderline } from "@/components/motion/DrawUnderline";
// ...
          <SplitHeadline
            as="h1"
            splitType="lines"
            className="mt-8 max-w-[18ch] font-serif text-[2.7rem] leading-[0.98] text-cream sm:text-6xl lg:text-[5.5rem]"
            emClassName="headline-em text-red-bright"
            segments={[
              { text: "Your accountant should know tax. Ours" },
              { text: "wrote the thesis", em: true },
              { text: "on it, and is a" },
              { text: "lawyer", em: true },
              { text: "too." },
            ]}
          />
```

Note: keep the existing `segments`/`emClassName` device. (If a per-word underline on exactly "wrote the thesis" proves visually fiddly under line-masking, apply `DrawUnderline` around the About PageHero "run a small firm" em phrase instead, which uses a plain `Reveal` and has no SplitText collision. Pick whichever reads cleaner on the real desktop; the component is identical.)

For depth, on the background wrapper (the `data-hero="bg"` div) add ScrollSmoother parallax via a `data-speed` attribute, and add a dust/light layer inside it with a faster speed:

```tsx
      <HeroTimeline className="relative block min-h-[100svh]">
        <div
          data-hero="bg"
          data-speed="0.85"
          className="absolute inset-x-0 -top-[8%] z-0 h-[118%] bg-[#1a130f] will-change-transform"
          aria-hidden="true"
        >
          <HeroBackground />
          {/* dust + light layer, drifts faster than the still for depth */}
          <div
            data-speed="1.12"
            className="absolute inset-0 opacity-[0.5] mix-blend-screen [background-image:radial-gradient(circle,rgba(255,224,170,0.5)_1px,transparent_0)] [background-size:64px_64px]"
          />
          {/* existing scrims stay below this comment, unchanged */}
```

- [ ] **Step 4: Remove the superseded HeroTimeline parallax**

In `src/components/motion/HeroTimeline.tsx`, delete the scroll-parallax block (the `gsap.to(bg, { yPercent: 16, scrollTrigger: ... })`); ScrollSmoother `data-speed` now owns the parallax. Keep the `from(...)` entrance (scale-in + rise) intact.

- [ ] **Step 5: Build + manual (real desktop)**

Run: `npm run build` then `npm run start`. Confirm: headline rises line by line; on scroll the still drifts slower than the dust layer (visible depth); the red underline draws under the key phrase; reduced-motion shows a static, correct hero.

- [ ] **Step 6: Commit**

```bash
git add src/components/motion/SplitHeadline.tsx src/components/motion/DrawUnderline.tsx src/components/sections/Hero.tsx src/components/motion/HeroTimeline.tsx
git commit -m "Hero: SplitText headline, ScrollSmoother depth parallax, DrawSVG underline"
```

---

### Task 7: SplitText on major section headings

**Files:**
- Modify: `src/components/sections/Statement.tsx`
- Modify: `src/components/sections/CaseInPoint.tsx`
- Modify: `src/components/sections/HowItWorks.tsx`

**Interfaces:**
- Consumes: `SplitHeadline` (Task 6).

- [ ] **Step 1: Apply SplitHeadline to the largest section headings**

For each file, replace the main `<h2>` (and, in `Statement.tsx`, the `WordReveal`) with `<SplitHeadline as="h2" splitType="lines,words" ...>` using a single non-emphasised segment carrying the existing heading text and classes. Example for `HowItWorks.tsx`:

```tsx
import { SplitHeadline } from "@/components/motion/SplitHeadline";
// replace the <h2> with:
          <SplitHeadline
            as="h2"
            className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl"
            segments={[{ text: "One principal. On your file, start to finish." }]}
          />
```

Apply the equivalent change to `CaseInPoint.tsx` (its `frame` serif line) and `Statement.tsx` (its display sentence). Keep classes identical to the originals so layout is unchanged. Do not apply to every heading, only these large ones, to avoid over-animating.

- [ ] **Step 2: Build + manual**

Run: `npm run build` then `npm run start`. Confirm the targeted headings reveal line by line and reduced-motion shows them static. No layout shift versus before.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Statement.tsx src/components/sections/CaseInPoint.tsx src/components/sections/HowItWorks.tsx
git commit -m "Reveal major section headings with SplitText"
```

---

### Task 8: Page-enter transitions

**Files:**
- Create: `src/app/template.tsx`

**Interfaces:**
- Consumes: `registerGsap`, `usePrefersReducedMotion`. App Router re-mounts `template.tsx` on every navigation.

- [ ] **Step 1: Create the transition wrapper**

Create `src/app/template.tsx`:

```tsx
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
```

- [ ] **Step 2: Build + manual**

Run: `npm run build` then `npm run start`. Navigate home -> about -> a service: each page fades and lifts in gently. Confirm ScrollSmoother still works after navigation (scroll resets to top, reveals fire). Reduced-motion: hard cut, no fade.

- [ ] **Step 3: Commit**

```bash
git add src/app/template.tsx
git commit -m "Add restrained page-enter transitions"
```

---

### Task 9: Final verification + production deploy

**Files:** none (verification + deploy).

- [ ] **Step 1: Full gate**

Run: `npm run lint` (clean) · `npx vitest run` (all green, incl. figure + preloader tests) · `npm run build` (16 pages).

- [ ] **Step 2: Prerendered HTML guard**

Confirm no em-dashes were introduced and the hero still is referenced:
Run: grep the built `index.html` for `hero-study-hires` (present) and confirm em-dash count is unchanged from baseline (only the pre-existing Header aria-label).

- [ ] **Step 3: Real-desktop walkthrough**

`npm run start`, then verify end to end: first-load preloader counts and lifts; smooth scrolling; hero parallax depth; SplitText headline + heading reveals; DrawSVG underline; stats count-up; one page-enter transition. Then emulate `prefers-reduced-motion: reduce` and confirm every effect degrades to a correct static experience and native scrolling returns.

- [ ] **Step 4: Lighthouse**

Run Lighthouse (or `npx unlighthouse`/Chrome DevTools) on the homepage; confirm no major LCP/CLS regression from the preloader + smoother (hero paints under the overlay; retiring the 4MB video offsets added JS).

- [ ] **Step 5: Deploy**

```bash
git push origin redesign-v2
npx vercel --prod --yes
```

Then re-verify live: `curl -s -o /dev/null -w "%{http_code}" https://ms-accountants.vercel.app/` is 200 and `https://ms-accountants.vercel.app/generated/hero-study-hires.jpg` is 200.

- [ ] **Step 6: Update the handoff**

Append a PASS 7 entry to `memory/progress.md` summarising the premium motion pass and the deploy, then commit.

---

## Self-review notes

- **Spec coverage:** preloader (Task 4), parallax hero + new still (Tasks 5-6), ScrollSmoother site-wide (Task 2), SplitText headline + headings (Tasks 6-7), stats count-up (Task 3), page transitions (Task 8), DrawSVG accent (Task 6), reduced-motion gate (every task), verification/deploy (Task 9). All spec sections map to a task.
- **Fixed-element risk** is handled structurally in Task 2 (chrome outside `#smooth-content`) and the preloader mounts there too (Task 4 Step 6).
- **Type consistency:** `parseFigure` shape, `Segment` type, `HERO_STILL`, `shouldShowPreloader/markPreloaded`, and `registerGsap` are used with identical names/signatures across tasks.
- **Known fiddly point** flagged inline: the hero underline under a line-masked SplitText; Task 6 gives a clean fallback target (About PageHero phrase) if needed.
