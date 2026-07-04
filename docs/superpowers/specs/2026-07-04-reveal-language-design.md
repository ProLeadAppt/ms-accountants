# Reveal Language — "Ink" — Design Spec

**Date:** 2026-07-04
**Branch:** `redesign-v2`
**Status:** Approved in principle (Tyson: "ship it", slow-mo pace). Awaiting spec sign-off → plan.

## North Star

Every headline on the site reveals in **one deliberate motion language** so the reveal
becomes part of the brand, not decoration. The language is **"Ink"**: type presses in from
hairline-thin to full weight, exploiting Zodiak being a *variable* font — a thing a static
webfont cannot do, and a direct echo of the principal who *wrote the thesis* and publishes.

Chosen over three alternatives (Settle/line-rise, Focus/blur, Typeset/letterpress) via the
Reveal Lab comparison. The winner borrows Typeset's single best move: the red emphasis phrase
is **held back to bloom last, alone.**

## The language — three tiers

One family, dialled to context. All timings are the **slow-mo** values the operator approved
(the showcase's "normal" pace was too quick). Per-word **duration** carries the deliberate
"press" and is fixed; inter-word **stagger** and the **held-back gap** are the tuning levers
if the full hero ever feels long on the live page.

### Tier 1 — Signature (the hero `<h1>`, once per visit, after the preloader)
- Non-emphasis words bloom **weight 300 → 450**, **opacity 0 → 1**, **translateY 30% → 0**,
  **blur 6px → 0**. Per-word **duration 1.6s**, **stagger 0.12s**, ease `cubic-bezier(.2,.8,.2,1)`.
- The emphasis segment (`"wrote the thesis"`, red `--color-red-bright`) is **held back**: it
  begins ~**0.25s after** the base cascade, blooms over **1.9s**, pressing to **weight 650**
  then settling to **560**.
- A red underline (`DrawSVG`-style scaleX rule) draws under the held phrase over **1.2s**,
  starting mid-press. Reuses the existing `DrawUnderline` idiom.
- Total hero sequence ≈ 3.5–4s. It sits behind the branded preloader, so it is the page's
  single "held breath", not a barrier to content.

### Tier 2 — Voice (every other rendered heading, `<h2>`/`<h3>`, dark **and** light grounds)
- The same bloom, **restrained**: weight **320 → 440**, translateY **12% → 0**, blur **3px → 0**,
  duration **1.2s**, stagger **0.07s**. **No** held-back beat, **no** underline.
- An optional single accent word (a `Segment` marked `em`) presses to **weight 600** in the
  scheme accent colour. Example: "one **principal** on every file."
- **Trigger:** on scroll into view (`ScrollTrigger`, start `top 82%`), not on mount, so each
  heading reveals as the visitor arrives at it. (Current `SplitHeadline` runs on mount; this
  is an intentional change for section headings.)

### Tier 3 — Rest (reduced-motion / no-JS / fonts-not-yet-loaded)
- Headings render **static at full weight**, full contrast, no transform, no opacity trick.
- The reveal is a progressive enhancement only. This is also exactly what crawlers and
  screen readers receive. Guaranteed by `usePrefersReducedMotion()` early-return (existing
  pattern) plus the `.no-js` → `.js` swap already in `layout.tsx`.

## Technical design

### `SplitHeadline` gains a `reveal` mode
Single shared component (`src/components/motion/SplitHeadline.tsx`) already consumes
`segments: {text, em?}[]`. Extend it:

```
reveal?: "bloom-hero" | "bloom-section"   // default "bloom-section"
trigger?: "load" | "scroll"               // hero = load, sections = scroll (default)
underline?: boolean                        // hero em phrase only
```

- Split with `SplitText` **words** (not lines) after `document.fonts.ready` — the weight axis
  must be available before we animate it.
- Animate `fontWeight` via GSAP (numeric tween; the browser interpolates on the variable font).
  `will-change: font-weight, opacity, transform, filter` on word spans.
- `bloom-hero`: base words cascade, then the `em` segment's words run the held-back beat, then
  the underline draws. `bloom-section`: all words cascade uniformly; `em` word(s) → accent weight.
- Reduced-motion: keep the existing early-return so the natural (full-weight) DOM shows.
- Revert `SplitText` on cleanup (already done) to keep the DOM clean for re-splits.

### Rollout — every rendered major heading
Convert plain headings to `SplitHeadline` (or apply the new mode where it is already used).

- **Already on `SplitHeadline`** (retune to bloom): `Hero` (load), `Statement`, `ProofAct`.
- **Homepage acts to convert** (scroll): `ServiceList`, `PeopleAct`, `HowRail`, `ConversationAct`.
- **Inner pages** (scroll): `PageHero` (drives about / services index / contact / 404 heros),
  plus the section headings rendered on those routes.
- **Out of scope:** components kept on disk but **not rendered** by any current route
  (orphaned inner-page pieces per `.superpowers/sdd/progress.md`). The plan will confirm the
  exact rendered set route-by-route before editing, so we touch only live headings.

### What must not change
- Copy, business logic, scheme rhythm, layout, type scale — untouched. Reveal only.
- The em-dash / placeholder / AU-spelling guards and the 23 content tests stay green.
- The hero's existing `HeroTimeline` rise for the eyebrow/button/panel stays; only the
  headline swaps from line-rise to the hero bloom.

## Verification (per CLAUDE.md "if you can't verify, don't ship")
- `npm run lint` clean · `npx vitest run` 23/23 · `npx next build` 16 routes.
- Prerendered-HTML guard: every headline phrase present in static HTML (no-JS legibility),
  `data-anim` hooks intact, no new em-dashes.
- **Real-desktop visual pass** (the one gate this environment can't run — automation throttles
  rAF): hero bloom + held-back red + underline on load; a section heading blooming on scroll;
  then emulate `prefers-reduced-motion: reduce` and confirm every heading is static and legible.
- Nothing deploys until Tyson has watched it on the live/dev page.

## Risks
- **font-weight interpolation:** if a browser snaps weight instead of tweening, the reveal
  still reads thin→full (just less smooth). Acceptable floor. Verify on the target Chrome.
- **Sequence length:** 3.5–4s hero. Mitigation: trim stagger/gap (not duration) if it drags.
- **Scroll-trigger + ScrollSmoother:** section reveals must fire correctly under ScrollSmoother;
  `ScrollTrigger.refresh()` on route change (just added via `ScrollReset`) already covers height
  recompute. Confirm triggers use the smoother's proxy, not raw window scroll.
- **Broad edit surface:** many files. Mitigated by the plan enumerating live headings only,
  one heading family per task, gates green between tasks.
