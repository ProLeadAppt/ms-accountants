# Task Plan — MS Accountants Website v2

**North Star:** A visitor with a hard tax problem books a conversation with Dr Sridaran because the site makes his depth unmistakable.

**Blueprint:** `docs/superpowers/specs/2026-06-27-ms-accountants-redesign-design.md`
**Plan:** `docs/superpowers/plans/2026-06-27-ms-accountants-redesign.md`

## Phases
- [x] **B — Blueprint:** discovery + design direction locked. Spec + plan written.
- [x] **A — Architect (partial):** design system, motion layer, UI/layout, content lib,
  homepage built (plan Phases 0-6) + elevation pass (6.5). Branch `redesign-v2`.
- [ ] **Imagery (NEXT):** fal.ai pipeline (`FAL_KEY` in `.env`) -> Flux stills + Kling/Veo
  video -> `/public` -> wire. Hero first. No AI portrait of Dr Sridaran.
- [ ] **Remaining pages:** About, Services index + 5 detail, Contact + API, SEO/404 (Phases 7-10).
- [ ] **Copy (world-class):** `deep-research` + `copywriting` -> voice-match (Phase 11).
- [ ] **L — Link:** `/api/contact` email provider env; booking mechanism (spec section 9).
- [ ] **S / QA + T — Trigger:** Lighthouse, walkthrough, sign-off, merge, deploy (Phase 13).

## Decisions locked
- Scrap v1 entirely; rebuild in place (keep scaffold + `/api/contact` + `site.ts` shape).
- Design: warm editorial, oversized serif, restrained brick-red, architectural Sydney + classical accent.
- Type: Fraunces + Instrument Serif + Schibsted Grotesk + Space Mono + Archivo. NO Inter/slop. NO em-dashes.
- Logo: faithful heavy grotesque recreation (Option A) + MS monogram.
- Motion: GSAP/ScrollTrigger, reduced-motion safe, no Lottie.
- Copy: base from `WEBSITE-COPY-AND-BUILD-SPEC.md`, to be elevated by deep-research voice pass.
- Imagery: fal.ai (Flux + Kling/Veo). Portrait must be Dr Sridaran's real photo.

## Next step
Verify `FAL_KEY`, generate the hero still (Flux), then animate to cinematic video hero.
Full resume guide in `progress.md` -> HANDOFF.

## 2026-07-02 — Team expansion + premium 10X overhaul (approved plan)
Phases: 0 baseline (DONE: lint+vitest 16+build 16 green; Playwright before-shots in session scratchpad /baseline — NOTE ScrollSmoother breaks fullPage capture below the fold, compare like-for-like) → 1 team data model+bios → 2 Monogram+TeamRoster (About) → 3 BenchStrip (home) → 4 type mockups (Tyson picks; blocks 7) → 5 de-AI copy pass → 6 homepage IA restructure → 7 font swap → 8 photo brief → 9 verify + packet. Full plan in the user plans dir ("i-ve-just-uploaded-into-precious-lobster.md"). Deploy only on Tyson's explicit go.

## 2026-07-03 - Premium homepage 10x (seven-act rebuild, T1-T10)
Plan: `docs/superpowers/plans/2026-07-03-premium-homepage-10x.md`. Subagent-driven build, tracked task by task in `.superpowers/sdd/progress.md`.
- [x] **T1** Design tokens (+ `.scheme-paper`) committed.
- [x] **T2** Type swap: Zodiak + General Sans, self-hosted, weight ranges declared.
- [x] **T3** Act I Hero (Quiet-Luxury split + authority strip).
- [x] **T4** Act II Statement (thesis + voice quote, shared `voiceQuote` copy).
- [x] **T5** Act III ServiceList (numbered editorial index).
- [x] **T6** Act IV PeopleAct (principal + credentials + bench merge).
- [x] **T7** Act V ProofAct (case-in-point + testimonial + published record merge, shared `caseFrame`).
- [x] **T8** Act VI HowRail (3-step rail, shared `howItWorksSteps`).
- [x] **T9** Act VII ConversationAct (red crescendo close, shared `promiseCopy`).
- [x] **T10** Verification pass: kill-list sweep clean, reveal audit clean (no nested Stagger),
  em-dash/placeholder guard coverage closed for `voiceQuote`/`caseFrame`/`howItWorksSteps`/`promiseCopy`,
  reduced-motion/no-JS static HTML confirmed, full gate green (lint/vitest/build).
  Screenshots (T10 step 5) intentionally skipped this pass; controller verifies visually.
- Result: all seven acts assembled on `redesign-v2` (`src/app/page.tsx`), full gate green.
  **Deploy remains HELD pending Tyson's sign-off.**
