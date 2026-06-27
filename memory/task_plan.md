# Task Plan — MS Accountants Website v2

**North Star:** A visitor with a hard tax problem books a conversation with Dr Sridaran because the site makes his depth unmistakable.

**Blueprint (approved):** `docs/superpowers/specs/2026-06-27-ms-accountants-redesign-design.md`

## Phases
- [x] **B — Blueprint:** discovery + design direction locked (palette, logo Option A, motion, pages, assets, architecture). Spec written.
- [ ] **L — Link:** confirm `/api/contact` email provider + env; confirm booking mechanism. (Non-blocking — slots built.)
- [ ] **A — Architect:** implementation plan (writing-plans skill) → build design system, motion layer, components, pages.
- [ ] **Copy (world-class):** `deep-research` best-in-niche tax/law copy → `copywriting` skill → voice-match to Dr Sridaran (his AFR/SMH/book + samples). Base = copy spec; output far exceeds it. Runs alongside build; dropped into `lib/`.
- [ ] **S — Stylize:** art-direction pass with `frontend-design` + `ui-ux-pro-max`; wire AI imagery; QA.
- [ ] **T — Trigger:** production build green; deploy (Vercel) when approved.

## Decisions locked
- Scrap v1 entirely; rebuild in place (keep scaffold + `/api/contact` + `site.ts` shape).
- Design: warm editorial, oversized serif, restrained brick-red, architectural Sydney + classical accent.
- Logo: faithful+ heavy grotesque recreation (Option A) + MS monogram.
- Motion: GSAP/ScrollTrigger, 6 primitives, reduced-motion safe (no Lottie).
- Copy: verbatim from `WEBSITE-COPY-AND-BUILD-SPEC.md`.

## Next step
User reviews spec → invoke `writing-plans` to produce the implementation plan.
