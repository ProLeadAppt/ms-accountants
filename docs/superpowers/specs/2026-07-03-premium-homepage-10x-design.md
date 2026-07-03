# Premium Homepage 10x — Design Spec

**Date:** 2026-07-03
**Branch:** redesign-v2
**Scope:** Homepage only (Pass 1). Inner pages inherit the system in a later pass.
**North Star:** A visitor with a hard tax problem books a conversation with Dr Sridaran because the homepage takes them on one clear, premium, guided journey — hierarchy, spacing, and typography direct the eye at every scroll position.

**Register (chosen via visual companion):** Quiet Luxury (mockup B) with Elevated-Editorial warmth — hairline grids, large negative space, calm precision, serif soul.

## 1. Foundations (system layer)

### Type
- **Zodiak** (Fontshare, variable) — display serif. Hero claim, act headlines, pull-quotes. Act openers at `clamp(3.5rem → 7rem)`, one step larger than current scale. Italic + brick-red reserved for ONE emphasis word/phrase per act.
- **General Sans** (Fontshare, variable) — UI grotesk. Nav, labels, buttons, body-adjacent UI, data. Replaces Schibsted Grotesk.
- **Retired:** Newsreader, Schibsted Grotesk. Space Mono kept ONLY for tabular/footnote figures (Act V publication row); otherwise unused.
- **Hierarchy rule:** max 3 type levels visible per viewport (label → headline → supporting).
- Implementation: `src/lib/fonts.ts` + `globals.css` @theme; self-host via next/font (download Fontshare files to `/public/fonts` or use fontshare CSS with preconnect — prefer self-host for perf). SplitText must wait on `document.fonts.ready` (existing pattern).

### Spacing
- `.section` (6rem / 8rem @lg) = workhorse acts; `.section-major` (7rem / 10rem @lg) = Thesis, Proof, final CTA. Already drafted in the uncommitted `globals.css` — becomes law; no per-section hand-tuned padding.
- Internal rhythm: 8px base, fixed ladder 12/20/32/52/84px. No arbitrary margins.

### Color roles (existing palette, tightened)
- Cream `#F3EBDD` = narrative bands. Paper/white = work bands. Espresso-deep `#160F0B` / espresso-soft `#1A130F` (new tokens, uncommitted diff) = drama bands. Brick-red `#9E2B22` = ONE full band (Act VII, via new `.scheme-red`) + emphasis ink elsewhere. `--color-sage` removed.
- Scheme rhythm down the page: **dark → cream → paper → cream → dark → paper → red**. No two adjacent bands share a scheme.

## 2. The Seven Acts (13 sections → 7)

| Act | Scheme / spacing | Content | Merges / kills |
|---|---|---|---|
| I · Hero | espresso-deep, 100svh | Ambient video kept. Quiet-Luxury split: Zodiak claim left, principal-credentials hairline panel right. One CTA. | AuthorityMarquee dies as a section; its 3 strongest items become a slim hairline strip pinned to hero bottom edge. |
| II · Thesis | cream, `.section-major` | Statement display sentence at full Zodiak scale, max air. | Absorbs VoicePullQuote — his voice = the italic red line inside the thesis. |
| III · The Work | paper, `.section` | ServiceList as a numbered editorial index: 5 services, one line + one clause each. No cards/icons. | — |
| IV · The People | cream, `.section` | Dr S leads (portrait slot + 2-line bio + PhD/CA/Lawyer translation as 3 compact lines); bench of 5 as monogram strip below. Message: team builds, he reviews. | Merges AboutTeaser + BenchStrip + CredentialTranslation. |
| V · Proof | espresso-deep, `.section-major` | CaseInPoint anecdote centerpiece; Testimonial as counter-signature; published titles as small mono/caps footnote row. | Merges CaseInPoint + Testimonial + PublishedThinking. |
| VI · How | paper, `.section` | 3 steps on one hairline rail. ~10s read. | HowItWorks compressed. |
| VII · The Conversation | brick-red (`.scheme-red`), `.section-major` | Promise as headline; booking CTA as the only action. The single red band on the page. | Merges PromiseBlock + FinalCTA. |

Copy: reuse existing approved copy wherever possible (it has Dr S sign-off history); merging acts trims, does not rewrite voice. No em-dashes (existing vitest regression guard stays green).

## 3. Motion & the guided eye

- Motion directs attention only; rides existing GSAP/ScrollSmoother stack, no new deps.
- **Hero:** SplitText line-mask on claim; credentials panel fades in 200ms after; eye order claim → credentials → CTA.
- **Act entrances:** ONE reveal per act — headline line-masks in, rest fades as a single group. No per-element stagger. Shared ease/duration tokens (`eases.ts`).
- **Rhythm breaks:** the two `.section-major` dark/red bands pre-shift background ~15% before entry.
- **Act VII:** DrawSVG underline on the promise phrase — the page's one flourish.
- **Kill list:** count-up stats, parallax beyond hero data-speed layers, hovers beyond 150ms color/hairline shift.
- **Reduced-motion:** all paths degrade static-correct via `usePrefersReducedMotion` (unchanged). Preloader stays (once/session), restyled to Zodiak.

## 4. Out of scope (Pass 2+)
- Inner pages (About, Services ×5, Contact, 404) — inherit the system later.
- Real headshots (photo shoot in progress per `docs/photo-brief.md`; Act IV ships with Monogram stand-ins + portrait slot).
- Copy rewrites beyond merge-trims.

## 5. Verification & constraints
- Gate: lint clean · vitest green (incl. em-dash guard; update tests broken by section merges) · `next build` 16/16 pages · no-JS renders full page.
- Playwright fullPage capture is broken on this site (100svh hero) — use viewport/tall-viewport captures.
- **Deploy is HELD for Tyson's explicit go** (standing rule; he holds sign-off on Dr S's behalf).

## 6. Decision log (this session, via visual companion)
- Direction: B (Quiet Luxury) with A's warmth. C (Bold Statement) rejected.
- Type: Zodiak + General Sans over Erode+Switzer and Sentient+Archivo. Driver: avoid AI-slop font rotation (Newsreader/Fraunces/Playfair/Inter/Instrument); rare but professional.
- Journey: Seven Acts (ruthless 13→7) over Nine Beats and Five Chapters.
