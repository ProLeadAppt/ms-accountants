# Premium motion pass: preloader, parallax hero, smooth scroll

**Date:** 2026-06-30
**Branch:** `redesign-v2`
**Status:** Design (approved in brainstorm; pending spec review + plan)

## Context

GSAP became 100% free under the Webflow standard "no charge" license, and the
project already ships `gsap@3.15.0` with the entire formerly-paid plugin suite
bundled in `node_modules` (ScrollSmoother, SplitText, DrawSVG, MorphSVG, Flip,
Inertia, MotionPath, Observer). The site currently uses only ScrollTrigger +
CustomEase, so the premium toolkit is untapped.

The operator wants the hero "finalised" to a premium standard and a branded
first-load **preloader with a live percentage**, plus whatever else lifts the
high-end feel. The hero video is a soft 1464×628 loop; the brand marks are
text-based (Archivo "MS" monogram + wordmark); palette is cream/sand/espresso
with brand red; display type is Fraunces. House rules (carry into every change):
no em-dashes in copy, Schibsted Grotesk body (never Inter/Manrope), icons sized
via the `size` prop, `.scheme-espresso` paints a solid bg so any bg wrapper must
be `z-0`, and **every** motion path must honour `prefers-reduced-motion`.

## Approved decisions

1. **Preloader:** dark, number-forward (blend of mock C × A). First load only.
2. **Hero:** layered parallax stills (not video). A new high-resolution still,
   depth via ScrollSmoother, headline via SplitText. Retire the video.
3. **Smooth scroll:** site-wide ScrollSmoother.
4. **Extras (all in):** stats count-up · page transitions · DrawSVG accent ·
   SplitText section-heading reveals.

## Architectural backbone: ScrollSmoother + reduced-motion

ScrollSmoother transforms a content wrapper, which **breaks `position: fixed`
descendants**. This dictates the layout:

```
<body>
  <Preloader/>            ← fixed overlay, OUTSIDE smooth-content, top of stack
  <div class="grain"/>    ← fixed, OUTSIDE smooth-content
  <Header/>               ← fixed, OUTSIDE smooth-content
  <SmoothScroll>          ← creates #smooth-wrapper > #smooth-content
     <main>… all page sections …</main>
     <Footer/>
  </SmoothScroll>
</body>
```

- New client component `SmoothScroll` (e.g. `src/components/motion/SmoothScroll.tsx`)
  wraps children in `#smooth-wrapper > #smooth-content`, registers
  ScrollSmoother + ScrollTrigger, and calls `ScrollSmoother.create({ smooth: 1.2,
  effects: true, normalizeScroll: true })`. It **does not create** the smoother
  when `prefers-reduced-motion: reduce` (renders children in a plain pass-through
  wrapper) so native scrolling is preserved for those users; touch smoothing
  stays off (`smoothTouch: false`, the default).
- `effects: true` enables `data-speed` / `data-lag` parallax attributes used by
  the hero.
- `RootLayout` (`src/app/layout.tsx`) moves the grain/Header out of the scrolled
  content and wraps `{children}` + Footer in `SmoothScroll`. The grain stays
  fixed and visible because it is outside the transformed content.
- A single shared `usePrefersReducedMotion()` (already exists) is the source of
  truth for all motion gates below.

## Component 1: Preloader

`src/components/motion/Preloader.tsx` (client). Fixed full-screen espresso panel
above the grain (`z-[10000]`). Brand-true: Archivo "MS" monogram, a hairline that
draws (DrawSVG on a 1px line, or scaleX), and a large Fraunces percentage.

- **Progress model:** drive the number from real readiness, not a fake timer —
  `Promise.all([document.fonts.ready, heroImageLoaded])`, mapped to 0→100 and
  eased with GSAP so it never stalls visibly. A **hard 4s cap** force-completes
  so a slow asset can never trap a visitor.
- **Exit:** at 100%, the panel lifts away (`yPercent: -100` / clip reveal) and the
  component unmounts; the hero is already painted underneath.
- **Once per session:** guard on `sessionStorage["ms-preloaded"]`; if set, render
  nothing (instant). Set it when the preloader completes. Internal navigations
  therefore never replay it.
- **Reduced-motion / no-JS:** render nothing (no overlay) so content is immediate.
  Because it is JS-mounted, a no-JS visitor never sees an empty overlay.
- **Interface:** no props; self-contained. Mounted once in `RootLayout` outside
  `SmoothScroll`.

## Component 2: Hero (parallax stills + SplitText)

- **Asset:** generate a new high-resolution, people-free library-study still via
  fal.ai (Flux 1.1 Ultra, ~2560px wide, matching the current warm window-light
  mood and `object-[55%_45%]` framing), output to `public/generated/`
  (e.g. `hero-study-hires.{jpg,webp}`). Optimised through `next/image`.
- **Retire the video:** `HeroBackground` returns the still only. Delete the
  `<video>` path (keeps load light and razor-sharp). `lib2-1.mp4` may be removed
  from `public/generated` once the still is wired and verified.
- **Depth:** three planes via ScrollSmoother effects —
  - background still: `data-speed="0.85"` (drifts slowest) plus the existing
    on-load scale-settle from `HeroTimeline`;
  - an independent **dust/light layer** (CSS/canvas motes + a soft radial light
    bloom) at `data-speed="1.1"` / `data-lag` for separation;
  - the content/headline is the natural-speed foreground.
- **Headline:** replace `MaskHeadline` with a SplitText-based reveal
  (`src/components/motion/SplitHeadline.tsx`): split into lines + words, rise on
  load, revert on cleanup. Keeps the italic-red emphasis device on the
  "wrote the thesis" / "lawyer" segments. Reduced-motion → static, no split.
- `HeroTimeline` keeps the robust `from(... immediateRender:false)` entrance from
  the last pass; its parallax block is superseded by ScrollSmoother `data-speed`.

## Component 3: Stats count-up

`src/components/sections/CredentialGrid.tsx` figures animate when scrolled into
view. Figures are mixed (`PhD`, `CA`, `45+`, `1`): a small helper parses a leading
integer and counts up to it (preserving prefix/suffix like `+`), while purely
non-numeric figures (`PhD`, `CA`) just fade in. New util
`src/lib/motion/countUp.ts` (or a `CountUp` client component). Reduced-motion →
final value shown immediately. Echoes the preloader's number motif.

## Component 4: Page transitions

App Router `src/app/template.tsx` (re-mounts per navigation) runs a restrained
GSAP enter animation (fade + slight lift) on each route change so navigations feel
composed rather than a hard cut. Exit animations are out of scope (App Router
makes true exits costly); enter-only is the pragmatic premium touch. Reduced-motion
→ no transition. Must coexist with ScrollSmoother (refresh/scroll-to-top on route
change).

## Component 5: DrawSVG accent

One self-drawing red underline beneath a single key phrase ("wrote the thesis" in
the hero). A small inline `<svg>` path animated with DrawSVG on load, positioned
under the emphasised words. Reusable as `src/components/motion/DrawUnderline.tsx`
if reused later, but scoped to the hero for now. Reduced-motion → static drawn
line (or omitted).

## Component 6: SplitText section headings

The `SplitHeadline` component (Component 2) is reused on the major section `h2`s
(Statement, ServiceList, CaseInPoint, etc.) for consistent line-by-line editorial
entrances, replacing/augmenting the current `Reveal` on those headings. Applied
selectively to the largest headings to avoid over-animating. Reduced-motion →
static.

## Cross-cutting

- **Reduced-motion:** one gate (`usePrefersReducedMotion`) disables ScrollSmoother
  creation, the preloader, count-up easing, SplitText, parallax, and transitions.
  CSS `@media (prefers-reduced-motion: reduce)` fallback already forces
  `[data-anim]` visible.
- **Performance:** retiring the 4MB video offsets the added plugin JS; register
  GSAP plugins once (extend `registerGsap()` in `eases.ts` to include
  ScrollSmoother/SplitText/DrawSVG). Serve the new still as WebP/AVIF via
  `next/image`. Watch LCP (preloader must not delay hero paint — hero renders
  under the overlay).
- **Accessibility:** preloader is `aria-hidden` decorative with a visually-hidden
  "Loading" status; never traps focus; hard timeout guarantees dismissal.

## Risks / watch-items

1. Fixed elements (Header, grain, preloader) **must** sit outside `#smooth-content`
   or they will scroll/jitter. Primary integration risk.
2. Existing ScrollTriggers must be created after the smoother and refreshed once on
   mount; verify all current Reveal/Stagger/LineDraw still fire.
3. SplitText must `revert()` on unmount to avoid leaked split DOM on navigation.
4. App Router `template.tsx` + ScrollSmoother: reset scroll and `ScrollTrigger.
   refresh()` on route change.
5. fal.ai still quality: people-free, no text, no AI tells; verify by zoom before
   committing (per prior imagery lessons).

## Verification

- `npm run lint`, `npx vitest run` (existing suite green; add a `countUp` parse
  unit test), `npm run build` (page count unchanged at 16).
- Manual on a real desktop (the automation browser freezes rAF, so motion is
  eyeballed live): first-load preloader counts and lifts; hero parallax depth on
  scroll; smooth scroll feel; stats count-up; one page navigation transition;
  DrawSVG underline; reduced-motion emulation disables all of it cleanly.
- Lighthouse pass for LCP/CLS regressions from the preloader + smoother.

## Out of scope

- Dr Sridaran's real portrait (client-supplied).
- Exit (leave) page-transition animations.
- Any copy/content/business-logic change beyond wiring the new hero asset.
