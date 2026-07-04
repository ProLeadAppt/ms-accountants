# Reveal Language "Ink" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every rendered headline on the site one variable-weight "Ink" reveal — words press from hairline-thin to full weight — with the hero's red phrase held back to land last, and a graceful static fallback.

**Architecture:** Centralise all timing in a pure, tested `bloom.ts` config module. Upgrade the single shared `SplitHeadline` component to a `reveal="hero" | "section"` bloom driven by GSAP `SplitText` (words) + variable `font-weight` tweens, scroll-triggered for sections and load-run for heroes. Then convert every rendered heading to feed `SplitHeadline` `segments`. Reduced-motion / no-JS / fonts-not-loaded all fall through to the natural full-weight DOM.

**Tech Stack:** Next 16 (App Router), React 19, GSAP 3.15 (`SplitText`, `ScrollTrigger`, `DrawSVGPlugin`, `CustomEase` — all already registered in `registerGsap()`), Zodiak variable font (`font-weight: 300 700`), Tailwind v4, Vitest.

## Global Constraints

- **Branch:** `redesign-v2`. Do not merge to `master`.
- **Reveal only.** No copy, business-logic, layout, scheme-rhythm, or type-scale changes. Headline *text* stays byte-identical (it must still match the em-dash / placeholder / content guards in `src/lib/content.test.ts`).
- **No em-dashes** anywhere in copy (the one allowed site-wide is the pre-existing Header logo `aria-label`). AU spelling.
- **Every reveal path is gated by `usePrefersReducedMotion()`** and must degrade to the natural full-weight static heading. The reveal is a progressive enhancement, never a gate.
- **Slow-mo pace is the approved baseline.** Per-word `duration` is fixed (it carries the "press"); only `stagger`/`gap` may be tuned. All timing values live in `bloom.ts` — never hard-code a duration in a component.
- **Gate between every task:** `npm run lint` clean · `npx vitest run` 23/23 (or more) green · `npx next build` 16 routes. A task is not done until all three pass.
- **No deploy.** `npx vercel --prod` is out of scope for this plan; deploy is operator-gated after a real-desktop visual pass.

## File Structure

- **Create** `src/lib/motion/bloom.ts` — pure timing config + delay helpers. Single source of truth for all bloom timing.
- **Create** `src/lib/motion/bloom.test.ts` — unit tests for the helpers.
- **Rewrite** `src/components/motion/SplitHeadline.tsx` — add `reveal`/`trigger`/`underline`, swap line-mask for the word bloom.
- **Modify** `src/components/sections/Hero.tsx` — headline → `reveal="hero"` + underline.
- **Modify** `src/components/sections/{Statement,ProofAct}.tsx` — retune existing `SplitHeadline` to section bloom.
- **Modify** `src/components/sections/{ServiceList,PeopleAct,HowRail,ConversationAct}.tsx` — plain headings → `SplitHeadline`.
- **Modify** `src/components/sections/PageHero.tsx` — accept `titleSegments` and render a `reveal="hero"` `SplitHeadline`; update callers `src/app/{about,services,contact}/page.tsx`.
- **Modify** `src/app/not-found.tsx` — 404 `<h1>` → `SplitHeadline`.

---

### Task 1: Bloom timing config (pure, tested)

**Files:**
- Create: `src/lib/motion/bloom.ts`
- Test: `src/lib/motion/bloom.test.ts`

**Interfaces:**
- Produces: `BLOOM` (const with `.hero` and `.section` config objects) and `heroEmStart(baseWordCount: number, cfg?: typeof BLOOM.hero): number`.

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/motion/bloom.test.ts
import { describe, it, expect } from "vitest";
import { BLOOM, heroEmStart } from "./bloom";

describe("bloom config", () => {
  it("keeps the slow-mo per-word durations the operator approved", () => {
    expect(BLOOM.hero.wordDur).toBe(1.6);
    expect(BLOOM.section.wordDur).toBe(1.2);
  });

  it("holds the hero em phrase back until after the base cascade plus the gap", () => {
    // 12 base words * 0.11 stagger + 0.25 gap
    expect(heroEmStart(12)).toBeCloseTo(12 * BLOOM.hero.stagger + BLOOM.hero.gap, 5);
  });

  it("never starts the em before the gap even with no base words", () => {
    expect(heroEmStart(0)).toBeCloseTo(BLOOM.hero.gap, 5);
  });

  it("presses the hero em heavier than it settles", () => {
    expect(BLOOM.hero.emWeightPeak).toBeGreaterThan(BLOOM.hero.emWeightSettle);
    expect(BLOOM.hero.emWeightSettle).toBeGreaterThan(BLOOM.hero.weightTo);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/motion/bloom.test.ts`
Expected: FAIL — "Cannot find module './bloom'".

- [ ] **Step 3: Write the config**

```ts
// src/lib/motion/bloom.ts
/**
 * Single source of truth for the "Ink" reveal timing. Per-word `wordDur`
 * carries the slow, deliberate press the operator approved and must not be
 * lowered; `stagger` and `gap` are the only knobs for shortening the sequence.
 * All values in seconds / unitless font-weights.
 */
export const BLOOM = {
  hero: {
    weightFrom: 300,
    weightTo: 450,
    emWeightPeak: 650, // the held-back phrase presses hardest
    emWeightSettle: 560,
    wordDur: 1.6,
    stagger: 0.11,
    gap: 0.25, // pause after the base cascade before the red phrase blooms
    emDur: 1.9,
    rise: 30, // yPercent
    blur: 6, // px
    underlineDur: 1.2,
  },
  section: {
    weightFrom: 320,
    weightTo: 440,
    emWeightTo: 600, // the single accent word
    wordDur: 1.2,
    stagger: 0.07,
    rise: 12,
    blur: 3,
  },
} as const;

/** When (seconds into the hero timeline) the held-back em phrase begins. */
export function heroEmStart(
  baseWordCount: number,
  cfg: typeof BLOOM.hero = BLOOM.hero,
): number {
  return baseWordCount * cfg.stagger + cfg.gap;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/motion/bloom.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Full gate + commit**

Run: `npm run lint && npx vitest run && npx next build`
Expected: lint clean · all tests green · 16 routes.

```bash
git add src/lib/motion/bloom.ts src/lib/motion/bloom.test.ts
git commit -m "feat(motion): add Ink bloom timing config (single source of truth)"
```

---

### Task 2: SplitHeadline bloom engine

**Files:**
- Modify (rewrite body): `src/components/motion/SplitHeadline.tsx`

**Interfaces:**
- Consumes: `BLOOM`, `heroEmStart` from Task 1; `registerGsap` from `@/lib/motion/eases`; `usePrefersReducedMotion`.
- Produces: `SplitHeadline` accepting `{ segments: Segment[]; className?; emClassName?; as?: "h1"|"h2"|"h3"; reveal?: "hero"|"section"; trigger?: "load"|"scroll"; underline?: boolean }`. Default `reveal="section"`, default `trigger` = `hero→load`, `section→scroll`. `Segment = { text: string; em?: boolean }` (unchanged, still exported).

**Design notes for the implementer:**
- Split with `SplitText.create(root, { type: "words" })`. Classify em words with `word.closest("em")`.
- Animate `fontWeight` (GSAP tweens it numerically; the browser interpolates because Zodiak is variable), `opacity`, `yPercent`, `filter: blur`.
- **Hero:** base words `gsap.from(..., { immediateRender: false })` so a stalled rAF degrades to the natural hero; em words a held-back `fromTo` starting at `heroEmStart(baseWords.length)`, pressing to `emWeightPeak` then a short tween to `emWeightSettle`. Runs on mount (load).
- **Section:** all words `gsap.from` inside a `ScrollTrigger` (`start: "top 82%", once: true`) so they stay hidden until scrolled into view; a single em word (accent) tweens to `emWeightTo`. Leave `immediateRender` default (true) so words start hidden at the trigger.
- Split only after `document.fonts.ready` (weight axis must be present). `split.revert()` on cleanup.
- `underline`: when true, render the existing `DrawUnderline`-style SVG under the `em` segment. For the hero, draw it after the em blooms (delay ≈ `heroEmStart + emDur*0.5`); for sections that opt in (ConversationAct), draw on the same ScrollTrigger. Reuse the SVG markup/`drawSVG` approach from `src/components/motion/DrawUnderline.tsx` (path `d="M2 5 C 50 8, 150 8, 198 4"`).

- [ ] **Step 1: Write the component**

```tsx
"use client";

import { Fragment, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsap } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/cn";
import { BLOOM, heroEmStart } from "@/lib/motion/bloom";

export type Segment = { text: string; em?: boolean };

export function SplitHeadline({
  segments,
  className,
  emClassName,
  as = "h2",
  reveal = "section",
  trigger,
  underline = false,
}: {
  segments: Segment[];
  className?: string;
  emClassName?: string;
  as?: "h1" | "h2" | "h3";
  reveal?: "hero" | "section";
  trigger?: "load" | "scroll";
  underline?: boolean;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();
  const cfg = reveal === "hero" ? BLOOM.hero : BLOOM.section;
  const onScroll = (trigger ?? (reveal === "hero" ? "load" : "scroll")) === "scroll";

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      registerGsap();
      const root = ref.current;
      let split: SplitText | undefined;
      let st: ScrollTrigger | undefined;
      let cancelled = false;

      const run = () => {
        if (cancelled || !root) return;
        split = SplitText.create(root, { type: "words" });
        const words = split.words as HTMLElement[];
        const emWords = words.filter((w) => w.closest("em"));
        const baseWords = words.filter((w) => !w.closest("em"));
        gsap.set(words, {
          display: "inline-block",
          willChange: "font-weight, opacity, transform, filter",
        });

        const build = () => {
          const tl = gsap.timeline();
          if (reveal === "hero") {
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
                  fontWeight: (cfg as typeof BLOOM.hero).emWeightPeak,
                  yPercent: 0,
                  filter: "blur(0px)",
                  duration: (cfg as typeof BLOOM.hero).emDur * 0.7,
                  stagger: cfg.stagger * 0.8,
                  ease: "power2.out",
                },
                start,
              );
              tl.to(
                emWords,
                {
                  fontWeight: (cfg as typeof BLOOM.hero).emWeightSettle,
                  duration: (cfg as typeof BLOOM.hero).emDur * 0.3,
                },
                ">-0.1",
              );
            }
          } else {
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
              tl.to(
                emWords,
                { fontWeight: (cfg as typeof BLOOM.section).emWeightTo, duration: cfg.wordDur * 0.6 },
                0.1,
              );
            }
          }
          return tl;
        };

        if (onScroll) {
          st = ScrollTrigger.create({ trigger: root, start: "top 82%", once: true, onEnter: build });
        } else {
          build();
        }
      };

      if (typeof document !== "undefined" && document.fonts?.status !== "loaded") {
        document.fonts.ready.then(run);
      } else {
        run();
      }

      return () => {
        cancelled = true;
        st?.kill();
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
```

- [ ] **Step 2: Gate — typecheck via build (no unit test; animation is verified at the gate + real-desktop pass)**

Run: `npm run lint && npx vitest run && npx next build`
Expected: lint clean · 23+ tests green · 16 routes. (Statement/ProofAct/Hero still compile — they pass `segments`; the new props are optional.)

- [ ] **Step 3: Prerendered-HTML legibility check (Tier 3 guarantee)**

Run: `npx next build && npx next start -p 3210 &` then `curl -s localhost:3210 | grep -c "wrote the thesis"`
Expected: `>= 1` (the hero phrase is present as text in the static HTML — no-JS legible). Kill the server after.

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/SplitHeadline.tsx
git commit -m "feat(motion): SplitHeadline variable-weight Ink bloom (hero + section)"
```

---

### Task 3: Hero → held-back Ink signature

**Files:**
- Modify: `src/components/sections/Hero.tsx:47-57`

**Interfaces:**
- Consumes: `SplitHeadline` from Task 2.

- [ ] **Step 1: Swap the headline props**

In `src/components/sections/Hero.tsx`, change the `<SplitHeadline …>` (currently `splitType="lines"`) to:

```tsx
<SplitHeadline
  as="h1"
  reveal="hero"
  underline
  className="mt-8 max-w-[18ch] font-serif text-[2.7rem] leading-[0.98] text-cream sm:text-6xl lg:text-[5.5rem]"
  emClassName="headline-em text-red-bright"
  segments={[
    { text: "Your accountant should know tax. Ours" },
    { text: "wrote the thesis", em: true },
    { text: "on it, and is a lawyer too." },
  ]}
/>
```

(Remove the now-unused `splitType` prop. Segments text is unchanged.)

- [ ] **Step 2: Gate**

Run: `npm run lint && npx vitest run && npx next build`
Expected: all green, 16 routes.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat(hero): held-back Ink reveal on the signature headline"
```

---

### Task 4: Retune existing SplitHeadline sections (Statement, ProofAct)

**Files:**
- Modify: `src/components/sections/Statement.tsx:12-21`
- Modify: `src/components/sections/ProofAct.tsx:24-28`

**Interfaces:**
- Consumes: `SplitHeadline` (Task 2). These already render `SplitHeadline`; they now inherit `reveal="section"` (the default) and scroll-trigger automatically. Only remove the stale `splitType` prop.

- [ ] **Step 1: Statement — drop `splitType`**

In `src/components/sections/Statement.tsx`, remove `splitType="lines,words"` from the `<SplitHeadline>` (keep `as="h2"`, `className`, `segments` exactly as they are). It now uses the default section bloom + scroll trigger.

- [ ] **Step 2: ProofAct — no change needed beyond confirming**

`src/components/sections/ProofAct.tsx` already renders `<SplitHeadline as="h2" … segments={[{ text: caseFrame }]} />` with no `splitType`. Confirm it compiles unchanged (it inherits section bloom). No edit required unless a `splitType` remains.

- [ ] **Step 3: Gate + commit**

Run: `npm run lint && npx vitest run && npx next build`
Expected: all green.

```bash
git add src/components/sections/Statement.tsx src/components/sections/ProofAct.tsx
git commit -m "feat(sections): Statement + ProofAct inherit the section Ink bloom"
```

---

### Task 5: Convert the plain homepage acts (ServiceList, PeopleAct, HowRail, ConversationAct)

**Files:**
- Modify: `src/components/sections/ServiceList.tsx:16-18`
- Modify: `src/components/sections/PeopleAct.tsx:58-60` (and `:95-97` for the bench h3)
- Modify: `src/components/sections/HowRail.tsx:20-22`
- Modify: `src/components/sections/ConversationAct.tsx:23-30`

**Interfaces:**
- Consumes: `SplitHeadline` (Task 2). Add `import { SplitHeadline } from "@/components/motion/SplitHeadline";` to each file.

**Pattern (apply to each):** replace the plain `<h2 className="…">…text…</h2>` with a `<SplitHeadline as="h2" className="…same classes…" emClassName="…" segments={…} />`. Keep the exact class strings and the exact text. Split the text into `segments`, marking the accent word `{ em: true }`. The heading must stay inside its existing `<Reveal>` wrapper (the Reveal fades the block; the bloom animates the words — they compose).

- [ ] **Step 1: ServiceList** — `"Five disciplines, one principal on every file."`

```tsx
<SplitHeadline
  as="h2"
  className="mt-6 max-w-[16ch] font-serif text-4xl leading-[1.05] sm:text-5xl"
  emClassName="text-brand-red"
  segments={[
    { text: "Five disciplines, one" },
    { text: "principal", em: true },
    { text: "on every file." },
  ]}
/>
```

- [ ] **Step 2: PeopleAct** — principal `<h2>` `"Why an accountant and lawyer chose to run a small firm."` (no accent), and the bench `<h3>` (`teamCollective.heading`, single segment, `as="h3"`).

```tsx
{/* principal h2 */}
<SplitHeadline
  as="h2"
  className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl"
  segments={[{ text: "Why an accountant and lawyer chose to run a small firm." }]}
/>
...
{/* bench h3 */}
<SplitHeadline
  as="h3"
  className="mt-6 font-serif text-3xl leading-[1.08] sm:text-4xl"
  segments={[{ text: teamCollective.heading }]}
/>
```

- [ ] **Step 3: HowRail** — `"One principal. On your file, start to finish."` (accent `"principal"`).

```tsx
<SplitHeadline
  as="h2"
  className="mt-7 max-w-[22ch] font-serif text-4xl leading-[1.06] sm:text-5xl"
  emClassName="text-brand-red"
  segments={[
    { text: "One" },
    { text: "principal", em: true },
    { text: ". On your file, start to finish." },
  ]}
/>
```

Note: the accent segment is the word only; the following segment starts with `.` so spacing stays correct (segments join with a single space, so use `{ text: "principal", em: true }` then `{ text: ". On your file, start to finish." }` — verify in the built HTML that it reads `principal. On your file` with no stray space before the period; if a space appears, fold the period into the em segment: `{ text: "principal.", em: true }`).

- [ ] **Step 4: ConversationAct** — keep the closing underline. Use `underline` on the section and mark the em phrase. Replace the `<h2>…<DrawUnderlineOnScroll>…` block with:

```tsx
<SplitHeadline
  as="h2"
  underline
  className="mt-7 max-w-[16ch] font-serif text-4xl leading-[1.03] text-cream sm:text-5xl lg:text-6xl"
  emClassName="headline-em"
  segments={[
    { text: promiseCopy.headlineLead },
    { text: promiseCopy.headlineEm, em: true },
    { text: `${promiseCopy.headlineTail}.` },
  ]}
/>
```

Remove the now-unused `DrawUnderlineOnScroll` import from this file. (The underline now draws via `SplitHeadline`'s `underline` on the section's scroll trigger.)

- [ ] **Step 5: Gate + commit**

Run: `npm run lint && npx vitest run && npx next build`
Expected: all green, 16 routes.

```bash
git add src/components/sections/ServiceList.tsx src/components/sections/PeopleAct.tsx src/components/sections/HowRail.tsx src/components/sections/ConversationAct.tsx
git commit -m "feat(sections): homepage acts adopt the section Ink bloom"
```

---

### Task 6: Inner-page heroes (PageHero + about/services/contact) and the 404

**Files:**
- Modify: `src/components/sections/PageHero.tsx`
- Modify: `src/app/about/page.tsx:27-40`, `src/app/services/page.tsx:30-42`, `src/app/contact/page.tsx:19-28`
- Modify: `src/app/not-found.tsx:10-12`

**Interfaces:**
- `PageHero` gains `titleSegments: Segment[]`, `underline?: boolean` and renders a `reveal="hero"` `SplitHeadline` (`as="h1"`). Keep the old `title?: React.ReactNode` prop TEMPORARILY as a fallback so callers migrate one at a time without breaking the build; a caller passes either `titleSegments` (new) or `title` (legacy). After all three callers migrate, drop `title`.

- [ ] **Step 1: PageHero — render SplitHeadline when segments are given**

In `src/components/sections/PageHero.tsx` change the props + the `<h1>`:

```tsx
import { SplitHeadline, type Segment } from "@/components/motion/SplitHeadline";
// ...
type Props = {
  eyebrow: string;
  titleSegments?: Segment[];
  underline?: boolean;
  title?: React.ReactNode; // legacy fallback, remove once all callers use titleSegments
  lede?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, titleSegments, underline, title, lede, children }: Props) {
  // ...inside <Reveal>, replace the <h1>…{title}…</h1> with:
  {titleSegments ? (
    <SplitHeadline
      as="h1"
      reveal="hero"
      underline={underline}
      className="mt-7 max-w-[20ch] font-serif text-[2.6rem] leading-[1.02] text-cream sm:text-6xl lg:text-7xl"
      emClassName="headline-em text-red-bright"
      segments={titleSegments}
    />
  ) : (
    <h1 className="mt-7 max-w-[20ch] font-serif text-[2.6rem] leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
      {title}
    </h1>
  )}
}
```

- [ ] **Step 2: Migrate the three callers**

`src/app/about/page.tsx` — replace the `title={<>…</>}` prop with:
```tsx
titleSegments={[
  { text: "An accountant and lawyer who chose to" },
  { text: "run a small firm", em: true },
  { text: "." },
]}
underline
```
(Remove the now-unused `DrawUnderline` import if nothing else uses it in the file.)

`src/app/services/page.tsx`:
```tsx
titleSegments={[
  { text: "Five disciplines, one" },
  { text: "principal", em: true },
  { text: "on every file." },
]}
```

`src/app/contact/page.tsx`:
```tsx
titleSegments={[
  { text: "When the tax question is hard," },
  { text: "start here", em: true },
  { text: "." },
]}
```

Verify the built HTML reads `run a small firm.` / `principal on every file.` / `start here.` with correct spacing (fold the period into the em segment if a stray space appears, as in Task 5 Step 3).

- [ ] **Step 3: Drop the legacy `title` prop from PageHero** now that all callers use `titleSegments` (delete the `title?` prop and the `else` branch `<h1>`).

- [ ] **Step 4: 404 heading**

`src/app/not-found.tsx` — replace the `<h1 className="…">This page took a position we can't defend.</h1>` with:
```tsx
<SplitHeadline
  as="h1"
  reveal="hero"
  className="mt-7 max-w-[18ch] font-serif text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl"
  segments={[{ text: "This page took a position we can’t defend." }]}
/>
```
Add `import { SplitHeadline } from "@/components/motion/SplitHeadline";`. Keep the `’` (right single quote) so the apostrophe matches the current copy exactly.

- [ ] **Step 5: Gate + commit**

Run: `npm run lint && npx vitest run && npx next build`
Expected: all green, 16 routes.

```bash
git add src/components/sections/PageHero.tsx src/app/about/page.tsx src/app/services/page.tsx src/app/contact/page.tsx src/app/not-found.tsx
git commit -m "feat(pages): inner-page heroes + 404 adopt the hero Ink bloom"
```

---

### Task 7: Full verification sweep + remaining rendered headings

**Files:**
- Audit only, then modify any remaining rendered section headings found.

- [ ] **Step 1: Enumerate every rendered heading route-by-route**

Run: `npx next build && npx next start -p 3210 &`
For each route (`/`, `/about`, `/services`, `/services/tax-advisory-planning`, `/contact`, a 404), `curl -s localhost:3210<route> | grep -oE "<h[123][^>]*>"` and confirm each major section heading is a `SplitHeadline` (has `data-anim`). List any plain `<h2>/<h3>` still rendered by a live section component (e.g. inner-page `TeamRoster`, `HowItWorks`, `PublishedThinking`, service `[slug]` heros). Convert each with the Task 5 pattern (`reveal="section"`, accent where a red word exists). Skip components that are on disk but not rendered by any route.

- [ ] **Step 2: Prerendered legibility + em-dash guard**

Run: `curl -s localhost:3210 | grep -c "—"`
Expected: `1` (only the pre-existing Header logo aria-label). Any other em-dash is a regression — fix it. Kill the server.

- [ ] **Step 3: Reduced-motion + no-JS reasoning check**

Confirm by reading: every reveal path returns early under `usePrefersReducedMotion()` (natural DOM) and the split only runs after `document.fonts.ready`. There is no code path that leaves a heading hidden when JS is disabled (SSR renders the plain `<Tag>` text).

- [ ] **Step 4: Final gate**

Run: `npm run lint && npx vitest run && npx next build`
Expected: lint clean · all tests green · 16 routes.

- [ ] **Step 5: Commit + hand back for the real-desktop visual pass**

```bash
git add -A
git commit -m "feat(motion): complete Ink reveal-language rollout across all headings"
```

Then STOP and hand to the operator for the real-desktop visual pass (this environment throttles rAF and cannot frame-capture motion): hero held-back bloom + underline on load; a section heading blooming on scroll; emulate `prefers-reduced-motion: reduce` and confirm every heading is static and legible; then confirm the ~3.3s hero does not feel sluggish (trim `BLOOM.hero.stagger`/`gap` only if it does). No deploy until the operator signs off.

---

## Self-Review

**Spec coverage:**
- Tier 1 Signature → Task 3 (hero) + Task 6 (inner-page h1s, 404). ✓
- Tier 2 Voice → Tasks 4, 5, 7 (all section headings, scroll-triggered, accent word). ✓
- Tier 3 Rest → guaranteed by `usePrefersReducedMotion` early-return + `document.fonts.ready` gate + SSR plain text; verified Task 2 Step 3, Task 7 Step 3. ✓
- Slow-mo timing as single source of truth → Task 1 `bloom.ts`. ✓
- Held-back red phrase + underline → Task 2 (engine) + Task 3 (hero) + Task 4/5 (ConversationAct). ✓
- Scroll-trigger for sections under ScrollSmoother → Task 2 `ScrollTrigger.create`; height recompute already handled by the shipped `ScrollReset`. ✓
- No copy/layout/scheme change; guards stay green → Global Constraints + gate every task. ✓
- Rollout touches only rendered headings → Task 7 Step 1 route-by-route audit. ✓

**Placeholder scan:** No TBD/TODO. The one deferred item (Task 7 Step 1) is an explicit route-by-route audit with the conversion pattern given, not a vague "handle the rest".

**Type consistency:** `Segment = { text: string; em?: boolean }` used identically in Tasks 2–6. `SplitHeadline` props (`reveal`, `trigger`, `underline`, `as`) consistent across all call sites. `BLOOM`/`heroEmStart` signatures match Task 1 definitions and Task 2 usage. `PageHero` `titleSegments` typed as `Segment[]` imported from SplitHeadline.
