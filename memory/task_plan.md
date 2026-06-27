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
