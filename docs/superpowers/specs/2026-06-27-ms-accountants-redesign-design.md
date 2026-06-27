# MS Accountants — Website Redesign (v2) Design Spec

> **Status:** Approved in brainstorming, awaiting final spec review.
> **Date:** 2026-06-27
> **Project:** `D:\Dev\MS Accountants` (Next.js 16, App Router)
> **Supersedes:** the v1 build (to be torn down — see §10).
> **Copy source of truth:** `WEBSITE-COPY-AND-BUILD-SPEC.md` (verbatim; do not rewrite).

---

## 1. Goal & Positioning

Rebuild the MS Accountants website as a **premium, editorial, statement-piece** site that turns Dr Maheswaran Sridaran's elite credentials into the firm's central trust-and-conversion asset.

**North Star:** a visitor with a hard tax problem books a conversation with Dr Sridaran because the site makes his depth unmistakable.

**One-line positioning:** *"Your accountant should know capital gains tax. Ours wrote the thesis on it."*

**Primary CTA (verbatim, repeated, never diluted):** `Book a conversation with Dr Sridaran`

---

## 2. Design Language

Original, art-directed — **not** a clone of any single reference.

- **Inspiration inputs:** Quinn Global Tax Law (motion craft + warmth), Awwwards finance refs Adveris/"RHÉTORÈS" (dark editorial authority) and Dirty Martini/"MAXIMA" (cream + oversized serif + classical art direction), 21st.dev (component patterns), CodePen (effect techniques).
- **Skills to apply at build time:** `frontend-design`, `ui-ux-pro-max`.
- **Register:** warm cream/espresso editorial base · oversized serif headlines · architectural Sydney imagery with one recurring classical accent · enormous whitespace · restrained brick-red · intentional, quiet motion.
- **Voice:** professional but human, no jargon, no exclamation points, benefits over features, honest (no invented stats/awards/testimonials). Per spec §2.

---

## 3. Design System

### 3.1 Color tokens
His current site's palette (cream + brick-red dominant + warm neutrals), elevated. Red is the **brand lead**, used with restraint.

| Token | Value | Role |
|---|---|---|
| `--cream` | `#F4EEE6` | page background |
| `--sand` | `#EAE0D3` | alt surfaces / cards |
| `--brand-red` | `#8E1B16` | primary brand — logo, key headings, buttons, accents |
| `--red-bright` | `#B5231C` | hover / interactive red |
| `--clay` | `#7B3D2C` | warm brown — large headings, warm dark sections |
| `--espresso` | `#241C18` | body text, near-black sections |
| `--sage` | `#8FA398` | sparing cool secondary |
| `--lines` | `#E0D7CC` | hairlines / dividers |
| `--white` | `#FFFFFF` | fine details, nav-on-scroll |

**Section color schemes** (utility classes, à la Quinn): `scheme-cream`, `scheme-sand`, `scheme-espresso`. Pages alternate schemes for rhythm.

### 3.2 Typography
**Hybrid system (locked). Explicitly NO Inter/Manrope/Poppins/Montserrat or any "default AI" face.** All foundry-grade, free for commercial use, self-hosted (no layout shift, no FOUT).

| Role | Typeface | Notes |
|---|---|---|
| **Headings (base)** | **Fraunces** (variable, `opsz`/`wght`) | warm literary serif; `text-wrap: balance` |
| **Signature display** | **Instrument Serif** | reserved for a few oversized "statement" moments only (homepage word-reveal line, major section openers) — the unexpected face that makes it distinctly MS |
| **Body / UI** | **Schibsted Grotesk** | distinctive editorial grotesque |
| **Eyebrow / labels / mono detail** | **Space Mono** | small caps, letter-spaced — editorial micro-detail |
| **Logo wordmark** | **Archivo** (800/900) | heavy grotesque, intentional contrast with serif |

- **Signature device:** red headline with the key phrase in *italic* (e.g. "Ours *wrote the thesis* on it") — a recurring brand motif across the site.
- Fraunces via `next/font/google`; Fontshare faces (if used) + Space Mono self-hosted via `next/font/local` / `next/font/google`. Intro paragraphs keep the leading-letter text-indent motif.

### 3.3 Logo (deliverable)
Recreation of the current "MS Accountants" wordmark — **Option A (faithful+ heavy grotesque)**, brick-red, crisp and scalable (current is a fuzzy raster).
- **Wordmark:** "MS Accountants", Archivo 800/900, brand-red; recolours to cream on dark sections.
- **Monogram:** "MS" tile (Archivo) for favicon, nav-when-scrolled, social avatar; solid + outline variants.
- **Delivery:** inline SVG in-build (recolour + animate) + outlined SVG and PNG/ICO exports.

### 3.4 Motifs
Eyebrow "circle-dot + label" tag · sliding triple-arrow button · custom red scrollbar + selection · hairline rules · one recurring classical/architectural accent element.

---

## 4. Motion System

GSAP + ScrollTrigger, wrapped as small client components/hooks. All gate on `prefers-reduced-motion` (fallback: instant-visible). Central `eases.ts` defines custom `folderEase` (`0, 0.47, 0.02, 1`).

| Primitive | Behaviour | Used in |
|---|---|---|
| `HeroTimeline` | Orchestrated on-load entrance: bg scale-in → heading fade-up → sub → button → accent stagger | Home/About/Contact hero |
| `Reveal` | Fade + rise on scroll-in (per-item delay/offset) | section intros, cards |
| `Stagger` | Children animate in sequence | tile grids, service rows |
| `LineDraw` | Hairline draws itself (scrubbed) | credential cards' left rule |
| `WordReveal` | Statement text reveals word-by-word (scrubbed) | homepage statement line |
| `StickyPin` | Background pins while content scrolls past | About section |

Micro-interactions: scroll-aware nav (solid + recolour past threshold), arrow-button hover.

---

## 5. Page Structure

Every page: scroll-aware Header on top, warm Footer at bottom. Content order below; each section executed as an original, art-directed composition.

**Home:** Hero (folder/editorial) → Statement (word-reveal) → Services 1–5 (numbered rows) → About teaser (sticky image + card) → Credentials (4 value cards w/ line-draw: PhD · 30 years · 5 countries · 1 principal) → Promise block (accent bg) → Testimonial (slot; placeholder) → Final CTA → Footer.

**About:** Hero → origin story (sticky image, "Why a tax academic chose to run a small firm") → authority wall (AFR · SMH · Macquarie · UNSW · McKell · Chifley) → credential-translation grid (4 cards) → promise ("the principal does the work") → CTA → Footer.

**Services (index):** Hero → intro statement → 5 service blocks (number, title, teaser, "what we help with", "why us") each linking to detail → CTA → Footer.

**Service detail `[slug]` (×5):** Hero (title + tagline) → intro → "What we help with" list → optional note → "Why us" → next/other services → CTA → Footer. `generateStaticParams` over the 5 slugs.

**Contact:** Hero (contact variant — heading + staggered contact items: phone, email, address) → contact form (name, email, phone, service interest, message → `/api/contact`) → Footer.

Background rhythm: alternate cream / sand / espresso schemes for trust escalation (identity → proof → relevance → reassurance → depth → conversion).

---

## 6. Content & Copy

**Copy bar: world-class.** The existing `WEBSITE-COPY-AND-BUILD-SPEC.md` copy is the *strategic base*, not the final words. Final copy is produced by:

1. **Deep research** (`deep-research` skill) on the best-in-niche — elite boutique tax/law/advisory firms (e.g. ABL/Mark Leibler, Jones Day/Dr Niv Tadmore, CST Tax/John Marcarian, Munro Lawyers, top international tax-law brands) — extracting their *copywriting principles*: how they open, build authority, translate credentials to benefit, handle CTAs, pace, rhythm, restraint.
2. **`copywriting` skill** to apply those principles to every page.
3. **Voice-match to Dr Sridaran** — the copy must sound like *him*: how he speaks and carries himself. Voice reference = his published writing (AFR, SMH, tax journals, his book), his current-site phrasing, plus any samples he supplies (see §9.7). Honest, precise, understated authority — no hype, no invented claims (spec §2 voice rules still bind).

Output is original MS copy that out-classes competitors while reading unmistakably as Dr Sridaran. The mapping of which copy lands where:

| Section | Spec ref |
|---|---|
| Home hero | §3 Hero (Option A) |
| Authority wall | §3 Borrowed-authority band |
| Credentials grid | §3 Credential-translation grid |
| Promise block | §3 Promise block |
| Services teasers | §6 |
| Service detail ×5 | §7.1–7.5 |
| About origin story | §5 |
| Final CTA | §3 Final CTA |
| Microcopy | §8 |

All copy lives in typed objects in `src/lib/site.ts` + `src/lib/services.ts`. No copy hard-coded in JSX. `[[PLACEHOLDER]]` markers retained for §9 client-confirm items.

---

## 7. Asset Map

AI-generated (Val.ai / Grok / ChatGPT) by the user from prompts below; dropped into `/public`; wired via `next/image`. Grade: warm, editorial, espresso–cream, slightly desaturated, premium. Art direction: **architectural Sydney + one recurring classical accent.**

| File | Purpose | Prompt (paste-ready) |
|---|---|---|
| `public/hero.jpg` | Home hero bg | "Editorial architectural photograph of Sydney sandstone heritage architecture, warm golden-hour light, shallow depth, muted warm cream-and-espresso color grade, fine grain, premium magazine aesthetic, generous negative space, no people, no text" |
| `public/portrait-sridaran.jpg` | About hero + home About teaser | **Real photo (client-supplied).** Placeholder until then: "Refined warm-toned placeholder portrait frame, espresso and cream tones, studio lighting" |
| `public/origin.jpg` | About story (sticky) | "Warm editorial photograph of a quiet study with law/tax books and a classical sculptural bust, golden light, espresso-cream grade, no people, premium, lots of negative space" |
| `public/service-1.jpg` … `service-5.jpg` | Service headers | "Minimal warm architectural still, single classical/architectural element (column, scales, ordered ledgers), espresso-cream grade, abstract, editorial, lots of negative space — variant {N}" |
| `public/cta.jpg` | Final CTA bg | "Sydney skyline / sandstone facade at golden hour, warm muted editorial grade, atmospheric, no text, premium" |
| `public/footer.jpg` | Footer backdrop | "Atmospheric warm architectural detail, espresso tones, soft shadow, editorial, no text" |
| `public/og.jpg` | Social share | Branded card: logo + positioning line on cream, 1200×630 |
| texture (optional) | accent sections | "Subtle warm sandstone/paper texture, seamless, very low contrast, cream" |

**Icons:** custom inline SVG set — 5 service icons + UI marks (arrow, circle-dot eyebrow, quote, menu). No icon-library dependency.

---

## 8. Technical Architecture

**Stack:** Next 16 App Router · React 19 · Tailwind v4 (`@theme` tokens) · GSAP + `@gsap/react` · `next/font` · TypeScript.

```
src/
  app/        layout, page, about/, services/, services/[slug]/,
              contact/, api/contact/, sitemap.ts, robots.ts, not-found.tsx
  components/
    layout/   Header (scroll-aware), Footer, Container
    ui/       Button, EyebrowTag, Logo, MonogramMark, Icon
    motion/   Reveal, Stagger, WordReveal, LineDraw, StickyPin, HeroTimeline
    sections/ Hero, AuthorityWall, CredentialGrid, PromiseBlock, ServiceList,
              AboutTeaser, Testimonial, FinalCTA, ContactForm
  lib/        site.ts, services.ts, cn.ts, eases.ts, motion hooks
  styles/     globals.css (tokens, scrollbar, selection, base type)
```

**Forms:** Contact → existing `/api/contact` (keep, refine validation). Email provider/destination is a §9 confirm item — wire via env var, flag clearly.

**SEO/Perf:** per-page metadata, SSG (`generateStaticParams` for services), `sitemap.ts`/`robots.ts`, `next/image` (AVIF/WebP), self-hosted fonts. Target: statically rendered, Lighthouse-strong.

**AGENTS.md constraint:** this is a modified Next.js — read `node_modules/next/dist/docs/` for current APIs before writing code.

---

## 9. Open / Pending Items (build as marked slots — non-blocking)

1. **Portrait** of Dr Sridaran — client to supply; placeholder until then.
2. **Testimonial** — Quikstar quote pending permission (spec §9.2); slot built, placeholder.
3. **Email / office address** — confirm exact values (spec §9).
4. **Book title** — confirm before naming explicitly (spec §9.1).
5. **Booking mechanism** — CTA currently → `/contact`; confirm Calendly vs form vs phone.
6. **Email provider** for `/api/contact` — needs env config.
7. **Voice samples** (high value for copy) — any of: Dr Sridaran's AFR/SMH articles, his book excerpt, LinkedIn posts, a short recorded call, or emails. Sharpens voice-match. Build proceeds without; copy refined as samples arrive.

---

## 10. Teardown Plan

Keep the scaffold (configs, `/api/contact`, `site.ts` shape, assets in `/public`, `docs/`). Replace v1 page bodies and components. Remove temp `public/logo-preview.html` and any v1 components not in §8's inventory. Verify production `build` is green before completion.

---

## 11. Success Criteria

- All 6 routes render; production `build` passes with 0 TS errors.
- Design system tokens + logo implemented; motion primitives working and reduced-motion safe.
- All copy sourced from `lib/`; copy is research-driven and voice-matched to Dr Sridaran (§6), not generic. Image/portrait/testimonial slots clearly swappable.
- Lighthouse: strong performance/SEO/accessibility on home.
- Looks like a premium, art-directed, Awwwards-calibre site — not a Quinn clone.
