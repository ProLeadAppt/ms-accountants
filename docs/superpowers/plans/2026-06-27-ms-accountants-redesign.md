# MS Accountants Website v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the MS Accountants website as a premium, award-calibre, editorial site that converts on Dr Sridaran's credentials.

**Architecture:** Next 16 App Router + React 19 + Tailwind v4 (`@theme` tokens) + GSAP/ScrollTrigger motion layer, all content in typed `lib/` modules, art-directed sections built with `frontend-design`/`ui-ux-pro-max` and verified visually on localhost. Copy is research-driven and voice-matched.

**Tech Stack:** Next.js 16.2.9, React 19, TypeScript, Tailwind CSS v4, `gsap` + `@gsap/react`, `next/font`.

## Global Constraints

- **Modified Next.js:** read `node_modules/next/dist/docs/` for the relevant API before writing any Next code (per `AGENTS.md`).
- **Fonts — NO Inter/Manrope/Poppins/Montserrat or any generic "AI" face.** Use only: Fraunces (headlines), Instrument Serif (signature display), Schibsted Grotesk (body/UI), Space Mono (eyebrows), Archivo (logo). Self-hosted via `next/font`.
- **Color tokens (exact):** `--cream #F4EEE6`, `--sand #EAE0D3`, `--brand-red #8E1B16`, `--red-bright #B5231C`, `--clay #7B3D2C`, `--espresso #241C18`, `--sage #8FA398`, `--lines #E0D7CC`, `--white #FFFFFF`.
- **Primary CTA verbatim, never reworded:** `Book a conversation with Dr Sridaran`.
- **Motion:** every animation gates on `prefers-reduced-motion` (fallback = instant-visible). Custom ease `folderEase = 0, 0.47, 0.02, 1`.
- **Copy:** world-class, research-driven, voice-matched to Dr Sridaran (spec §6). Voice rules: professional but human, no jargon, no exclamation points, benefits over features, honest — no invented stats/awards/testimonials.
- **Verification baseline:** `npm run build` must pass with 0 TS errors at the end of every phase; `npm run lint` clean.
- **Branch:** `redesign-v2`. Commit after each task.

---

## Phase 0 — Teardown & Reset

### Task 0.1: Snapshot, then strip v1 page/component bodies

**Files:**
- Remove: `src/components/*` (v1 components), `public/logo-preview.html`, `public/type-preview.html`
- Reset to minimal: `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/app/contact/page.tsx`
- Keep: `src/app/api/contact/route.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/not-found.tsx`, `src/lib/cn.ts`, configs, `/public` image assets, `/docs`, `/memory`.

- [ ] **Step 1:** Confirm branch is `redesign-v2` (`git branch --show-current`).
- [ ] **Step 2:** Delete temp preview files and v1 components listed above.
- [ ] **Step 3:** Replace each page with a minimal placeholder that renders its name (so routes still resolve).
- [ ] **Step 4:** Run `npm run build` — expect PASS (all routes resolve, no missing imports).
- [ ] **Step 5:** Commit: `chore: strip v1 bodies, keep scaffold for v2 rebuild`.

---

## Phase 1 — Design System Foundation

### Task 1.1: Fonts via next/font

**Files:**
- Create: `src/lib/fonts.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: exported font instances `fraunces`, `instrumentSerif`, `schibsted`, `spaceMono`, `archivo` each exposing `.variable` CSS var classnames (`--font-fraunces`, `--font-instrument`, `--font-schibsted`, `--font-mono`, `--font-archivo`).

- [ ] **Step 1:** Read `node_modules/next/dist/docs/` for `next/font` usage in this Next version.
- [ ] **Step 2:** In `fonts.ts`, load the five families via `next/font/google` (Fraunces, Instrument Serif, Schibsted Grotesk, Space Mono, Archivo), each with a `variable` name and appropriate weights/subsets. If a family isn't on Google in this setup, load via `next/font/local` from `public/fonts/` (download woff2).
- [ ] **Step 3:** In `layout.tsx`, apply all five `.variable` classes to `<html>`.
- [ ] **Step 4:** `npm run build` — expect PASS.
- [ ] **Step 5:** Commit: `feat: self-hosted brand fonts via next/font`.

### Task 1.2: Tokens, Tailwind theme, globals

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1:** Define all color tokens (exact values from Global Constraints) as CSS custom properties on `:root`.
- [ ] **Step 2:** Map tokens + font vars into Tailwind v4 via `@theme` (e.g. `--color-cream`, `--font-serif: var(--font-fraunces)`), so utilities like `bg-cream`, `text-brand-red`, `font-serif` exist.
- [ ] **Step 3:** Add base layer: body `bg-cream text-espresso font-sans`, heading defaults `font-serif text-balance`, custom red scrollbar, red `::selection`, smooth-scroll, antialiasing.
- [ ] **Step 4:** Add the three section color-scheme utility classes (`.scheme-cream`, `.scheme-sand`, `.scheme-espresso`) that set local fg/bg/accent variables.
- [ ] **Step 5:** `npm run build` — expect PASS. Visual check: temporary token swatch on `/` renders correct colors (then revert).
- [ ] **Step 6:** Commit: `feat: design tokens + tailwind theme + global base styles`.

---

## Phase 2 — Logo & Monogram

### Task 2.1: Logo + Monogram components

**Files:**
- Create: `src/components/ui/Logo.tsx`, `src/components/ui/MonogramMark.tsx`
- Create (export later): `public/logo/ms-accountants.svg`, `public/logo/ms-monogram.svg`, `public/favicon` assets

**Interfaces:**
- Produces: `<Logo variant="full" tone="red|cream" />`, `<MonogramMark tone />` — inline SVG, `currentColor`-driven so it recolours per scheme.

- [ ] **Step 1:** Recreate the "MS Accountants" wordmark (Option A — heavy Archivo grotesque, brand-red) as an inline SVG component using `currentColor`.
- [ ] **Step 2:** Build the "MS" monogram (solid + outline) as `MonogramMark`.
- [ ] **Step 3:** Export outlined SVG + PNG/ICO to `public/` and wire favicon/apple-touch in `layout.tsx` metadata.
- [ ] **Step 4:** Visual verify on localhost (drop both into a scratch route or the header stub); screenshot.
- [ ] **Step 5:** `npm run build` PASS. Commit: `feat: MS Accountants logo + monogram (SVG, recolourable)`.

---

## Phase 3 — Motion Layer

### Task 3.1: Eases + reduced-motion hook

**Files:**
- Create: `src/lib/motion/eases.ts`, `src/lib/motion/useReducedMotion.ts`
- Test: `src/lib/motion/__tests__/eases.test.ts`

**Interfaces:**
- Produces: `registerEases()` (defines `folderEase`), `usePrefersReducedMotion(): boolean`.

- [ ] **Step 1:** Write failing test: `registerEases()` registers `folderEase` on gsap CustomEase (mock gsap), and `folderEase` constant string equals `0, 0.47, 0.02, 1`.
- [ ] **Step 2:** Run test → FAIL.
- [ ] **Step 3:** Implement `eases.ts` (export the cubic string + `registerEases`) and `useReducedMotion` (matchMedia, SSR-safe default).
- [ ] **Step 4:** Run test → PASS.
- [ ] **Step 5:** Commit: `feat: motion eases + reduced-motion hook`.

### Task 3.2: Motion primitive components

**Files:**
- Create: `src/components/motion/Reveal.tsx`, `Stagger.tsx`, `WordReveal.tsx`, `LineDraw.tsx`, `StickyPin.tsx`, `HeroTimeline.tsx`
- Create: `src/lib/motion/useGsapContext.ts`

**Interfaces:**
- Consumes: `registerEases`, `usePrefersReducedMotion`.
- Produces: client components, each accepting `children` + tuning props; all no-op to instant-visible when reduced-motion.

- [ ] **Step 1:** Read `@gsap/react` `useGSAP` usage from its package docs.
- [ ] **Step 2:** Implement `Reveal` (fade+rise on ScrollTrigger), `Stagger` (children sequence), `WordReveal` (split words, scrubbed), `LineDraw` (scaleY scrub), `StickyPin` (pin bg), `HeroTimeline` (orchestrated on-load timeline). Each guards on reduced-motion.
- [ ] **Step 3:** Verify on a scratch route: each primitive animates; toggling OS reduced-motion shows instant content. Screenshot/scroll-check on localhost.
- [ ] **Step 4:** `npm run build` PASS. Commit: `feat: GSAP motion primitives (reduced-motion safe)`.

---

## Phase 4 — Core UI & Layout

### Task 4.1: Primitives — Container, Button, EyebrowTag, Icon

**Files:**
- Create: `src/components/layout/Container.tsx`, `src/components/ui/Button.tsx`, `src/components/ui/EyebrowTag.tsx`, `src/components/ui/Icon.tsx`

**Interfaces:**
- Produces: `<Container size>`, `<Button href variant>` (sliding triple-arrow on hover), `<EyebrowTag>label` (circle-dot + Space Mono caps), `<Icon name>` (inline SVG set incl. arrow, quote, menu, 5 service icons).

- [ ] **Step 1:** Build each primitive following tokens/type. Button arrow uses CSS hover transition (no JS needed).
- [ ] **Step 2:** Visual verify variants on a scratch route; screenshot.
- [ ] **Step 3:** `npm run build` PASS. Commit: `feat: core UI primitives`.

### Task 4.2: Header (scroll-aware) + Footer

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx` (mount Header/Footer)

**Interfaces:**
- Consumes: `Logo`, `MonogramMark`, `Button`, `nav` from `lib/site`.
- Produces: sticky Header that turns solid + swaps logo→ red on scroll past threshold; Footer with oversized type, nav, contact, background image slot.

- [ ] **Step 1:** Implement Header with scroll listener (rAF, passive) toggling a `data-scrolled` state; mobile menu with scroll-lock.
- [ ] **Step 2:** Implement Footer per spec.
- [ ] **Step 3:** Mount both in `layout.tsx`. Visual verify scroll behaviour on localhost; screenshot top + scrolled.
- [ ] **Step 4:** `npm run build` PASS. Commit: `feat: scroll-aware header + footer`.

---

## Phase 5 — Content Library

### Task 5.1: Typed content modules

**Files:**
- Modify/Create: `src/lib/site.ts`, `src/lib/services.ts`
- Test: `src/lib/__tests__/content.test.ts`

**Interfaces:**
- Produces: `site` (name, contact, cta), `nav`, `authorityItems`, `credentialCards`, `valueStats`, `services: Service[]`, `getService(slug)`.

- [ ] **Step 1:** Write failing test: 5 services exist with unique slugs; each has required fields; `getService('tax-advisory-planning')` returns the flagship; CTA string equals the verbatim constant.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Populate `site.ts`/`services.ts` from the copy spec as the strategic base (final wording replaced in Phase 11). Keep `[[PLACEHOLDER]]` markers for §9 items.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit: `feat: typed content library`.

---

## Phase 6 — Home Page

### Task 6.1: Home section components

**Files:**
- Create: `src/components/sections/Hero.tsx`, `Statement.tsx`, `ServiceList.tsx`, `AboutTeaser.tsx`, `CredentialGrid.tsx`, `PromiseBlock.tsx`, `Testimonial.tsx`, `FinalCTA.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: content lib, motion primitives, UI primitives.

- [ ] **Step 1:** Build each section as an original, art-directed composition (apply `frontend-design` + `ui-ux-pro-max`): Hero (HeroTimeline), Statement (WordReveal + Instrument Serif), ServiceList (numbered rows + Stagger), AboutTeaser (StickyPin), CredentialGrid (4 cards + LineDraw), PromiseBlock (accent scheme), Testimonial (placeholder slot), FinalCTA. Alternate color schemes for rhythm.
- [ ] **Step 2:** Assemble `page.tsx`; add page metadata.
- [ ] **Step 3:** Visual verify full homepage on localhost at desktop + mobile widths; screenshot each section; iterate on hierarchy/spacing to award bar.
- [ ] **Step 4:** `npm run build` PASS. Commit: `feat: homepage`.

---

## Phase 7 — About Page

### Task 7.1: About page

**Files:**
- Create: `src/components/sections/AuthorityWall.tsx`, `CredentialTranslation.tsx`, `OriginStory.tsx`
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1:** Build Hero → OriginStory (sticky image) → AuthorityWall (marquee/logo row) → CredentialTranslation (4 cards) → Promise → FinalCTA.
- [ ] **Step 2:** Metadata; assemble page.
- [ ] **Step 3:** Visual verify localhost desktop+mobile; screenshot; iterate.
- [ ] **Step 4:** `npm run build` PASS. Commit: `feat: about page`.

---

## Phase 8 — Services Index & Detail

### Task 8.1: Services index

**Files:**
- Create: `src/components/sections/ServiceShowcase.tsx`
- Modify: `src/app/services/page.tsx`

- [ ] **Step 1:** Build Hero → intro statement → 5 rich service blocks linking to detail → FinalCTA. Flagship (Tax Advisory) gets prominence.
- [ ] **Step 2:** Metadata; visual verify; screenshot; iterate.
- [ ] **Step 3:** `npm run build` PASS. Commit: `feat: services index`.

### Task 8.2: Service detail [slug]

**Files:**
- Modify: `src/app/services/[slug]/page.tsx`

- [ ] **Step 1:** Implement `generateStaticParams` over the 5 slugs and `generateMetadata` per service. Read the relevant Next docs for dynamic-route APIs in this version first.
- [ ] **Step 2:** Build detail layout: Hero (title+tagline) → intro → "What we help with" → optional note → "Why us" → next/other services → FinalCTA.
- [ ] **Step 3:** Verify all 5 slugs render on localhost; 404 on bad slug; screenshot one; iterate.
- [ ] **Step 4:** `npm run build` PASS (5 SSG pages). Commit: `feat: service detail pages`.

---

## Phase 9 — Contact

### Task 9.1: Contact API hardening

**Files:**
- Modify: `src/app/api/contact/route.ts`
- Test: `src/app/api/contact/__tests__/route.test.ts`

**Interfaces:**
- Produces: POST handler validating `{name,email,phone?,service?,message}`; 400 on invalid, 200 on valid; email send behind an env-guarded adapter (no send if unconfigured — logs + returns ok-queued).

- [ ] **Step 1:** Write failing tests: rejects missing email/invalid email (400); accepts valid payload (200); does not throw when email env unset.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement validation + env-guarded email adapter; flag env var name in code comment + `.env.example`.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit: `feat: hardened contact API`.

### Task 9.2: Contact page + form

**Files:**
- Create: `src/components/sections/ContactForm.tsx`
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1:** Build Hero (contact variant, staggered contact items) + form (name, email, phone, service select, message) posting to `/api/contact` with inline success/error states.
- [ ] **Step 2:** Metadata; visual verify localhost incl. submit happy/error path; screenshot; iterate.
- [ ] **Step 3:** `npm run build` PASS. Commit: `feat: contact page + form`.

---

## Phase 10 — SEO, Metadata, 404

### Task 10.1: Sitewide SEO

**Files:**
- Modify: `src/app/layout.tsx` (default metadata, OG), `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/not-found.tsx`

- [ ] **Step 1:** Default + per-page metadata, OG/twitter using `public/og.jpg` slot, canonical.
- [ ] **Step 2:** Sitemap lists all routes incl. 5 services; robots allows; branded 404.
- [ ] **Step 3:** `npm run build` PASS; verify `/sitemap.xml`, `/robots.txt` on localhost. Commit: `feat: SEO + 404`.

---

## Phase 11 — World-Class Copy (deep research → voice-matched)

### Task 11.1: Niche copy research

**Files:**
- Create: `docs/research/2026-06-27-tax-firm-copy-principles.md`

- [ ] **Step 1:** Use `deep-research` skill on elite boutique tax/law/advisory copy (ABL, Jones Day/Tadmore, CST Tax, Munro, top intl tax-law brands): extract opening strategies, authority-building, credential-to-benefit translation, CTA patterns, rhythm/restraint. Cite sources.
- [ ] **Step 2:** Commit research doc.

### Task 11.2: Voice-matched rewrite

**Files:**
- Modify: `src/lib/site.ts`, `src/lib/services.ts`

- [ ] **Step 1:** Gather voice reference (Dr Sridaran's AFR/SMH/book + any samples supplied; current-site phrasing).
- [ ] **Step 2:** Use `copywriting` skill to rewrite every page's copy applying the researched principles in Dr Sridaran's authentic voice — honest, precise, understated authority. Keep CTA verbatim. No invented claims.
- [ ] **Step 3:** Re-run content test (Task 5.1) → PASS. Visual re-check all pages on localhost.
- [ ] **Step 4:** Commit: `feat: world-class voice-matched copy`.

---

## Phase 12 — Imagery

### Task 12.1: Asset brief + wiring

**Files:**
- Create: `docs/asset-brief.md`
- Modify: section components to use `next/image` with the `/public` slots

- [ ] **Step 1:** Write `docs/asset-brief.md` — the §7 shot list with paste-ready prompts, filenames, aspect ratios, and target slot per image.
- [ ] **Step 2:** Wire `next/image` for every image slot with tasteful warm placeholders committed now; portrait/testimonial remain marked slots.
- [ ] **Step 3:** Visual verify on localhost; screenshot. `npm run build` PASS. Commit: `feat: image wiring + asset brief`.

---

## Phase 13 — QA & Launch Readiness

### Task 13.1: Full QA pass

- [ ] **Step 1:** Run `npm run build` + `npm run lint` — both clean.
- [ ] **Step 2:** Localhost walkthrough of all 6 route types, desktop + mobile; verify motion, reduced-motion fallback, nav scroll, form, links. Screenshot each page for the user.
- [ ] **Step 3:** Lighthouse on `/` — record scores; fix obvious perf/a11y issues.
- [ ] **Step 4:** Update `/memory/progress.md`. Commit: `chore: v2 QA pass`.
- [ ] **Step 5:** Present localhost to the user for sign-off (spec §S Feedback). Deploy only on approval.

---

## Self-Review (author checklist — completed)

- **Spec coverage:** design system (P1), logo (P2), motion (P3), components (P4), content (P5), all pages incl. 5 service detail (P6–9), SEO (P10), world-class copy (P11), imagery + asset brief (P12), QA/Lighthouse (P13). ✔
- **Placeholders:** visual sections intentionally lack pixel-code (built with design skills + localhost verification) — this is the chosen method, not a gap; deterministic parts (tokens, fonts, eases, content test, contact API) carry exact values/tests. ✔
- **Type consistency:** component prop names and lib exports referenced consistently across tasks. ✔
- **Pending items** (spec §9: portrait, testimonial, email/address, book title, booking mechanism, email provider, voice samples) handled as marked slots — non-blocking. ✔
