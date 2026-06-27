# Progress — MS Accountants Website v2

## HANDOFF — READ FIRST (next session starts here)

**Branch:** `redesign-v2` (all work committed here; not merged to main).
**Dev server:** `npm run dev` → http://localhost:3000 (a background one may still be
running from the prior session; if styles look stale, kill node + `rm -rf .next` +
restart — stale-CSS bit us once).
**Build:** `npm run build` (green). **Tests:** `npm test` / `npx vitest run` (passing).

**Spec:** `docs/superpowers/specs/2026-06-27-ms-accountants-redesign-design.md`
**Plan:** `docs/superpowers/plans/2026-06-27-ms-accountants-redesign.md` (13 phases)

### Done (Phases 0–6 + elevation 6.5)
- Teardown of v1; scaffold kept.
- Design system: tokens + Tailwind `@theme` + schemes (cream/sand/espresso); fonts
  (Fraunces, Instrument Serif, Schibsted Grotesk, Space Mono, Archivo) via next/font.
  **NO Inter/Manrope/AI-slop fonts. NO em-dashes in copy.**
- Logo + MS monogram + favicon (recolourable SVG/text).
- GSAP motion layer (reduced-motion safe): Reveal, Stagger, WordReveal, LineDraw,
  StickyPin, HeroTimeline, MaskHeadline, CustomCursor + eases/useReducedMotion.
- Core UI: Container, Button (working arrow slide + brighten wipe), TextLink,
  EyebrowTag, Icon (size via `size` prop — do NOT size icons with h-/w- classes,
  it caused a real bug). Scroll-aware Header + Footer.
- Content lib `src/lib/site.ts` (+ `services.ts` re-export) + integrity tests.
- **Homepage** (`/`): Hero (cinematic mask headline + parallax), AuthorityMarquee,
  Statement (WordReveal), ServiceList (elevated hover), AboutTeaser (sticky),
  CredentialGrid (line-draw), PromiseBlock (brand-red), Testimonial (placeholder
  slot), FinalCTA. Plus full-page film grain + custom cursor.

### Client feedback already actioned
- Hero/above-the-fold liked; scroll reveals liked → keep.
- Wanted bolder/award-grade, more emotion. Fixed broken micro-interactions, purged
  em-dashes, added marquee/grain/cinematic headline/cursor/parallax.
- Still wants MORE wow. Agreed the two biggest levers are REAL IMAGERY + WORLD-CLASS
  COPY (both pending).

### NEXT ACTIONS (in order)
1. **fal.ai imagery pipeline (do first).** Key is in `.env` as `FAL_KEY` (gitignored —
   never print/commit it). Build a generator script in `/execution/` that calls fal
   (Flux 1.1 Pro/Ultra for stills; Kling/Veo for image-to-video), downloads to
   `/public`, then wire via `next/image` / `<video>`.
   - First: verify key with a tiny auth call. Then generate **hero still** (warm
     Sydney sandstone, golden-hour, cream-espresso grade) → show options → wire.
   - Then animate that still into a **cinematic video hero** (image-to-video).
   - Then section imagery (about/origin, service headers, CTA, footer, OG).
   - DO NOT AI-generate Dr Sridaran's face — his portrait must be a real photo.
2. **Phase 11 — world-class copy:** `deep-research` elite tax/law firm copy →
   `copywriting` skill → voice-match to Dr Sridaran (AFR/SMH/book; ask for samples).
   Replace base copy in `lib/`. Purge remaining em-dashes in service/credential copy.
3. **Phases 7–10:** About, Services index + 5 `[slug]` detail, Contact + API hardening,
   SEO/metadata/404. (See plan.)
4. **Phase 13:** QA, Lighthouse, present for sign-off; merge `redesign-v2` when approved.

### Environment gotchas
- Automation/headless browser throttles requestAnimationFrame (entrance animations
  look slow in screenshots — they're ~1.5s for real) and reports no fine pointer (so
  the custom cursor won't appear in captures; it works on a real desktop).
- The "1 Issue" Next dev overlay = hydration on `<div id="contentOverview">` injected
  by the browser-automation extension. NOT our bug; ignore.
- Windows: `.env` is hidden in Explorer; edit via the IDE file tree. CRLF warnings on
  commit are harmless.

---

## Log
- 2026-06-27: brainstormed + spec + plan; built Phases 0–6 (design system → homepage).
- 2026-06-28: elevation pass (marquee, grain, cinematic headline, custom cursor,
  parallax, micro-interaction fixes, em-dash purge). Wired fal.ai key into `.env`.
  Handover at user request (~50% context).
