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
1. **fal.ai imagery pipeline.** Key in `.env` as `FAL_KEY` (gitignored — never
   print/commit). Generator: `execution/fal-generate.mjs` (run with
   `node --env-file=.env execution/fal-generate.mjs <verify|hero|animate>`).
   Stills = Flux 1.1 Pro Ultra (21:9); video = Kling 2.1 i2v. Output -> `public/generated/`.
   - [x] Key verified (cheap schnell probe).
   - [x] Hero stills: 3 options generated (sandstone/desk/light). **User picked
     sandstone.** Wired into `src/components/sections/Hero.tsx` as full-bleed
     `next/image` + left-to-right espresso scrim (headline legibility) + top fade
     (nav) + bottom fade. Verified in browser — looks award-grade.
     GOTCHA FIXED: `.scheme-espresso` paints a solid `background-color` on the
     section, so a `-z-10` bg div is hidden behind it. Hero bg wrapper must be
     `z-0` (content stays `z-10`). Don't regress this.
   - [x] Cinematic video hero (v1 sandstone) — REJECTED by client: i2v animated
     people/vehicles (a motorcyclist gliding past a pedestrian) = obvious AI tell.
     LESSON: never animate people/vehicles; animate only light/dust/air. Old
     sandstone stills + hero.mp4 deleted.
   - [x] Hero v2 (current): brainstormed new direction w/ client. Generated clean
     PEOPLE-FREE concepts (sandstone colonnade A, scholar's study B) + chess.
     Client picked **B1 = grand library, window light + dust motes** ("wrote the
     thesis" relevance). Animated via Kling i2v (ambient only: drifting dust motes,
     slow push) -> `public/generated/heroB-study-1.mp4` (4.5MB). Wired in
     `HeroBackground.tsx` (video / reduced-motion still, poster). Crop
     `object-[42%_40%]` + deepened scrim push the bright window right so the red
     "wrote the thesis" stays legible. Build green.
     NOTE: automation sandbox won't decode video (readyState 0) — verified mp4
     serves 206 w/ range + element configured right. CONFIRM PLAYBACK ON REAL DESKTOP.
   - [x] Chess (client wanted it somewhere, NOT hero): wired into PromiseBlock as a
     framed right-column image on the brand-red field. Mirrors his original site's
     chess-move image; big quality upgrade on the old low-res jpg.
   - [x] QUALITY PASS (client feedback): v2 library books looked AI on push-in +
     v2 chess hand had an extra finger. Regenerated with `refine` cmd (PHOTOREAL
     prompt + shallow-DOF to bury book spines; tighter hand framing). Client-sensitive
     finger check done via browser zoom. NOW LIVE: hero = `lib2-1.{jpg,mp4}` (books in
     shadow/bokeh, strong dust motes, object-[55%_45%]); chess = `chess2-grip.jpg`
     (suit-cuffed hand, clean 5 fingers, verified). Old heroB-study-1.* + chess-hand
     deleted. LESSON: AI hands -> generate 4+ variants, framing that hides fingers
     (pinch/curl/suit cuff), verify by zooming the served file in-browser.
   - [x] CHESS v3 (client: chess2-grip still too AI / smooth plastic skin). LESSON:
     Flux 1.1 Ultra + "premium/cinematic" language = airbrushed look. Switched models
     via new `chess3` cmd: GPT Image 1.5 (`fal-ai/gpt-image-1.5`) + Seedream v4
     (`fal-ai/bytedance/seedream/v4/text-to-image`), with CANDID DOCUMENTARY prompt
     (real skin texture/pores/creases, no retouching, 50mm f4). All 4 far more
     photoreal. LIVE: `chess3-gpt-1.jpg` — realistic older hand moving the KNIGHT on a
     real game board (best story + clean verified anatomy). Alternatives kept on disk
     (chess3-gpt-2, chess3-seedream-1/2) pending client confirm; delete once locked.
   - Kept `heroB-study-2.jpg` (book-spines detail) for a future About/Credentials
     section. About teaser portrait slot stays empty — needs Dr Sridaran's REAL photo.
   - [ ] NEXT: more section imagery (origin/service headers/CTA/footer/OG).
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
