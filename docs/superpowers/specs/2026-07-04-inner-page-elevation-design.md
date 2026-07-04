# Inner-Page Elevation to Homepage Quality — Design Spec

**Date:** 2026-07-04
**Branch:** `redesign-v2`
**Status:** Design approved by Tyson ("yep looks all good"). Awaiting spec sign-off → plan.

## North Star

Every inner page (About, Services index, Service detail ×5, Contact, 404) reads as if
built by the same hand as the premium 7-act homepage — same motion vocabulary, same depth,
same closing crescendo — with **no dead clicks** anywhere and **scroll-to-top on every
navigation** as a standard (in-page `#anchor` links being the sole, intended exception).

Chosen approach: **targeted elevation** (over a full act-rebuild) — a small kit of moves
applied per page. Copy, page structure, and content stay untouched; this is composition +
motion only, exactly like the site-wide heading rollout.

## The elevation kit (shared moves)

### 1. Crescendo close — elevate `FinalCTA` in place
`src/components/sections/FinalCTA.tsx`: promote the section from `.scheme-espresso` to the
`.scheme-espresso-deep` drama ground; split the heading so the emphasis phrase carries a
drawn underline; keep the crescendo restrained.
- Heading segments: `{ text: "When the tax question is hard," }`, `{ text: "who do you call?", em: true }` with `underline`, `emClassName="headline-em"` (the SplitHeadline `underline` draws under the em phrase, as on the hero).
- One consistent closer site-wide. Do NOT clone the homepage's chess-image `ConversationAct`
  onto inner pages (avoids repeating the chess 4×). The homepage keeps `ConversationAct`;
  inner pages close on the elevated `FinalCTA`.

### 2. Retire the stale bits (About)
`src/app/about/page.tsx`: remove `<AuthorityMarquee />` (retired on the homepage) and its
import. About currently runs a **double** close — both `<PromiseBlock />` and `<FinalCTA />`;
remove `<PromiseBlock />` (and its import) so the page ends on the single elevated `FinalCTA`
crescendo. Re-check the scheme rhythm after removal (no two adjacent sections share a scheme).

### 3. Drama band — promote key dark sections to `.scheme-espresso-deep`
- Service detail "Why us": `src/app/services/[slug]/page.tsx` — the `<section className="scheme-espresso …">` around `service.why` → `scheme-espresso-deep`.
- About "How it works": `src/app/about/page.tsx` — `<HowItWorks scheme="espresso" />` → `scheme="espresso-deep"` (confirm `HowItWorks` forwards the scheme to a `.scheme-espresso-deep` class; if it only accepts `"espresso"`, widen its `scheme` prop type to include `"espresso-deep"`).

### 4. Image parallax — ScrollSmoother `data-speed` on the big editorial images
Mirror the homepage hero: the image sits in an `overflow-hidden` figure, and the image
wrapper is oversized (~`-inset-y` / `h-[120%] -top-[10%]`) so the parallax drift stays
within the clipped bounds (no revealed edges).
- Service detail 21:9 band: `src/app/services/[slug]/page.tsx` — image wrapper gets `data-speed="0.9"`.
- About study image: `src/app/about/page.tsx` — the origin-story figure. NOTE it currently
  sits in `StickyPin`; parallax + sticky conflict, so EITHER apply a gentle `data-speed` and
  drop the sticky for that figure, OR keep sticky and skip parallax there. Decision: keep the
  sticky (it is a nice existing touch) and add parallax only to the service-detail 21:9 band.
  (Parallax is a "where it fits" move, not every image.)

### 5. Motion + micro-interaction parity
- Service detail `service.why` statement (`<p className="… font-serif text-3xl …">`): give it
  a `WordReveal` (existing `src/components/motion/WordReveal.tsx`) so the statement reveals on
  scroll like the homepage's Statement act. (It is a paragraph, not a heading — WordReveal, not
  SplitHeadline.)
- Card hover parity: the services-index cards (`src/app/services/page.tsx`) already shift bg on
  hover; add the arrow-translate affordance the service-detail "other services" cards have
  (`group-hover:translate-x-1` on an arrow `Icon`), so all service cards behave identically.

## Per-page application

| Page | Moves |
|---|---|
| **About** | 1 (close) · 2 (retire marquee + de-dupe close) · 3 (drama band on How-it-works) |
| **Services index** | 1 (close) · 5 (card arrow parity) |
| **Service detail ×5** | 1 (close) · 3 (drama band on "Why us") · 4 (parallax on 21:9 band) · 5 (WordReveal on "why") |
| **Contact** | Kept light — hero bloom only (already done). No heavy motion on the form (conversion page). |
| **404** | Already elevated (hero bloom). No change. |

## The two interaction fixes

### 6. `#team` anchor under ScrollSmoother
`src/components/motion/ScrollReset.tsx`: today it resets to top and returns early when a hash
is present, but ScrollSmoother intercepts native anchor scrolling, so `/about#team` lands at
the top (a dead-ish click). Change: when a hash is present on a route change, scroll the
smoother TO the target element instead of doing nothing —
`const el = document.querySelector(hash); if (el) smoother ? smoother.scrollTo(el, false) : el.scrollIntoView();`
Run after `ScrollTrigger.refresh()` and a `requestAnimationFrame` so the target's measured
position is correct. `TeamRoster` already renders `id="team"`.

### 7. Scroll-to-top confirmation
No code change expected — `ScrollReset` already fires on every pathname change (covers
service-card clicks). Verified live on localhost: home → services → click a service lands at
the top; `#team` is the only exception and now works (move 6).

## What must not change
- All copy, page content, section order (beyond removing the retired marquee + duplicate
  close on About), the type scale, and the scheme tokens themselves. Reveal/composition only.
- The 27 tests, the em-dash / placeholder / AU-spelling guards stay green.
- `bloom.ts` timing is untouched (this spec adds no new heading timings).

## Verification (per CLAUDE.md "if you can't verify, don't ship")
- `npm run lint` clean · `npx vitest run` 27/27 · `npx next build` 16 routes.
- Prerendered-HTML: no new em-dashes (1/page baseline holds); every page still renders its
  headings and copy as text (no-JS legible).
- **Serve a verified localhost** (standing rule) and hand Tyson the working URL for the visual
  pass: crescendo close on each inner page, drama bands, parallax drift, `#team` scroll, and
  scroll-to-top on service clicks. Then reduced-motion emulation → everything static + native.
- No deploy until Tyson's explicit go.

## Risks
- **Parallax bounds:** if the oversized image wrapper is mis-sized, the drift reveals a hard
  edge inside the figure. Mitigation: size the wrapper ~20% taller than the figure and cap
  `data-speed` near 0.9 (subtle). Verify on localhost.
- **`scheme-espresso-deep` prop widening:** `HowItWorks` may type `scheme` narrowly; widen the
  union rather than hard-code a class, so the token system stays the source of truth.
- **ScrollSmoother `scrollTo` timing:** the target element must be measured after layout +
  `ScrollTrigger.refresh()`; wrap in rAF. If the smoother is not yet created on first paint,
  fall back to `el.scrollIntoView()`.
- **Scheme rhythm after About edits:** removing marquee + PromiseBlock changes adjacency;
  re-verify no two neighbouring sections share a scheme.
