# Progress — MS Accountants Website v2

## HANDOFF — READ FIRST (next session starts here)  [updated 2026-06-30d]

### PASS 3 — DE-CLICHE + PUBLISHED-THINKING STRIP + GAP F (2026-06-30d) — committed+pushed to redesign-v2, NOT redeployed
Operator (Tyson) approved committing pass 2, then greenlit all three follow-ups:
de-cliche commit · build the "Published thinking" strip · light Gap F interrogative.

1. **DE-CLICHE / de-overstate (committed 5c1a0ea).** Removed generic premium-speak that
   also overstated the career (bio already had the accurate framing):
   - `site.ts` credentialCards[2]: title "Over 45 years across the world's leading firms"
     → "Over 45 years, across more than five countries"; body dropped "top-tier technical
     firepower" → "that seniority applied to your file directly".
   - `site.ts` CFO tagline "The financial brain of a big company" → "An in-house CFO's
     judgement"; CFO intro "across some of the world's leading firms" → "at the senior end
     of accounting and finance".
   Reason: "world's leading firms" implied the whole 45y was Big Four; only the early years
   were. Honours the no-buzzword + honesty house rules. See decisions #19.

2. **"PUBLISHED THINKING" strip (workstream 2, previously parked) — BUILT.** New section
   shows what he WROTE, not just where he is cited (fixes Gap C: authority told-not-shown).
   - `site.ts`: added `publications` (5 verbatim real AFR/SMH titles, ordered fairness-first)
     + `book` ("Are Capital Gains Equitably Taxed in Australia?", "His first book, published
     in 2012.").
   - New `src/components/sections/PublishedThinking.tsx` (Container/EyebrowTag/Reveal/Stagger
     pattern, scheme-sand). Eyebrow "In his own words"; heading "Not just advice. A public
     case for fairness."; titles as serif headlines with `outlet · year` (middots, NOT
     em-dashes); book as a bordered capstone card.
   - Wired into `src/app/page.tsx` between `<AboutTeaser/>` (cream) and `<CredentialGrid/>`
     (espresso) → cream→sand→espresso rhythm. Non-numeric eyebrow so no section renumbering.
   - ⚠️ It QUOTES his real published titles publicly → get Dr S's nod before redeploy.
   - Verified in prerendered index.html: all 5 titles + book render, smart quotes, clean
     `outlet · year`. Only on the HOMEPAGE for now (About strip is an open option).

3. **GAP F — light interrogative (1 line).** `site.ts` business-cfo-advisory .why opening
   "Most growing businesses assume that calibre…" → "Does that calibre of financial
   judgement only come with a full-time hire? Most growing businesses assume so. It does
   not." Kept to ONE why to avoid an over-questioning tic (brief said restrained).

Verify gate (pass 3): `npm run lint` clean, `npx vitest run` 8/8, `npm run build` 16 pages.
Tests still 8 (deliberately did not add a publications integrity test, to match the gate).
⚠️ NOT redeployed — `npx vercel --prod --yes` only after Dr S sign-off. Still open: his REAL
portrait photo (placeholder gradients). Deferred audit workstream still NOT done: #3
(de-cliché was partially done here; the warmth-pass remainder is open).

---

### PASS 2 — "FAIRNESS + CHALLENGER IDENTITY" (2026-06-30c) — DONE, committed 90ed525, NOT redeployed
Voice re-audit (findings.md, now SAMPLED from resume + his real AFR/SMH titles, not
inferred) surfaced six through-lines and six gaps. Top finding: his #1 lever, FAIRNESS,
was nearly invisible on the site, and his contrarian "challenger" trait was muted /
told-not-shown. Three recommended workstreams; **user approved ONLY workstream 1
(fairness + challenger identity)** — #2 ("published thinking" strip) and #3 (de-cliché/
precision/warmth) deliberately NOT done.

Three surgical edits (all no-em-dash, no-buzzword, active voice, AU spelling):
  1. `src/lib/site.ts` credentialCards[0].body — recast the doctorate around FAIRNESS /
     horizontal equity ("whether it taxes them fairly, or whether the rules quietly
     treat equals unequally") + ATO's hardest positions = familiar ground here.
  2. `src/lib/site.ts` services[1] (slug tax-disputes-ato) .why — added that he "has
     questioned in print whether the High Court, the Full Federal Court and the
     Commissioner got it right" (shows the challenger trait, doesn't just claim it).
  3. `src/app/about/page.tsx` origin para — SPLIT into two <p>; first ends at the
     *Australian Taxation Law* citation, second is a fairness+challenger capstone
     ("whether the tax system is fair to the people who pay it, and whether the received
     answer, even from the High Court or the Commissioner, is the right one. That is the
     standard of thinking he now applies…").
NOTE: the handoff's EDIT 3 "WITH" block accidentally duplicated the line "the Australian
Financial Review and the Sydney Morning Herald." — dropped the dupe (would have rendered
a broken run-on); applied the intended split only. See decisions.md #18.

Verify gate ALL GREEN: `npm run lint` clean, `npx vitest run` 8/8, `npm run build` 16
pages. Prerendered `about.html` confirmed: correct spacing around both <em> titles
(`fair: <em>…</em> His work`, `text, <em>…</em>.`), clean `</p><p>` split, no run-ons.
⚠️ NOT committed (pass 2 awaits Dr S sign-off before commit/push to redesign-v2) and NOT
redeployed. EDIT 1 of this pass was already in the working tree from the prior session.
Still open: Dr S's REAL portrait photo (placeholder gradients).

---

### RESUME-ALIGNMENT + VOICE PASS (2026-06-30b) — DONE locally, NOT redeployed
Used Dr Sridaran's own resume (`docs\Maheswaran Sridaran_Resume_29 May 2026.doc`) as the
authoritative fact + voice source (NOT uploaded anywhere; alignment only, per brief). It
VERIFIES the "also a lawyer / 45y / two Big Four" repositioning and RESOLVES the two open
client-confirmations:
  (a) ADMITTED lawyer, admitted in NSW, Aug 2023 (Supreme Court oath; Member, Law Society
      of NSW) → team credentials now read "Lawyer (admitted in NSW)".
  (b) real forums = Commonwealth AAT, NSW Administrative Decisions Tribunal, NSW District
      Court (with leave) vs ATO → named AAT + NSW District Court in the disputes intro.
User picks for this pass: **Surgical polish · Curated enrichment · address = resume (5 George St)**.
Edited:
  - `site.ts`: office address 9→**5 George Street** (resume; the live-site scrape was stale);
    "for the most part with two of the Big Four" → "the early years with two of the Big Four"
    (×2, credential card + team bio) — Big Four was the EARLY INTERNATIONAL career (~1980-98:
    Coopers & Lybrand→PwC + EY); the AU decades were boutique / academia / own-firm, so "for
    the most part" overstated; team credentials += "(admitted in NSW)"; disputes intro += AAT
    + NSW District Court sentence.
  - `Hero.tsx`, `about/page.tsx` (para 1), `layout.tsx` (schema founder): same Big Four reframe.
  - `about/page.tsx` origin para: added Macquarie teaching award ("most knowledgeable teacher
    in their field", Faculty of Law, 2007), NAMED the book *Are Capital Gains Equitably Taxed
    in Australia?* (italic <em>), + textbook citation (*Australian Taxation Law*, Woellner/CCH).
  - `Statement.tsx`: sharpened to his question-led / parallel-verdict cadence ("That is the
    question that matters most. Most accountants answer it last. We answer it first.").
Voice finding: his published ARTICLE TITLES (now SAMPLED, not inferred) confirm the
findings.md profile — question-led ("Who pays the lion's share…?", "Was the Full Federal
Court right?"), contrarian ("an alternative view", "deeply flawed"), plain confident
verdicts ("High Court gets it right", "best and fairest"). Current copy already leans this
way; only light sharpening applied. Flagship Tax Advisory intro left AS-IS (already his voice).
**No em-dashes.** lint + vitest(8) + `next build`(16 pages) ALL GREEN; About paragraph spacing
verified in the prerendered HTML.
⚠️ NOT redeployed — all copy still subject to Dr S sign-off; `npx vercel --prod --yes` only
after sign-off. Still open from before: Dr S's REAL portrait photo (placeholder gradients).

---

### "ALSO A LAWYER" REPOSITIONING (2026-06-30) — DONE locally, NOT redeployed
Dr Sridaran replied to the review build (29 Jun email) with one big point: the site
shows him only as a chartered accountant + PhD in tax, but he is **also a lawyer**
(LLB Macquarie) with the complete complement of skills for any tax problem at every
level, incl. complex tax-authority investigations + litigation. He redrafted the
opening paragraph and asked the *entire* site reflect it. User chose: **Rebalance**
(lawyer + complete capability equal billing, CGT stays a proof point) · keep & extend
the "wrote the thesis" hero hook · **enhance+rename** the disputes service (not a 6th
page) · use his stated facts (over 45y, 5+ countries, last 25 in AU, two Big Four),
soften the old "30 years at PwC/EY/Horwath".

Changed: `src/lib/site.ts` (credentialLine, footerTrust, valueStats, credentialCards,
team[0] credentials+bio, `tax-disputes-ato` → "Tax Disputes, Investigations &
Litigation" with new help items incl. complex investigations + tax litigation,
softened 30y in compliance/CFO/SMSF, lawyer angle in flagship intro) · `Hero.tsx`
(headline "…on it, and is a lawyer too" + new sub-para) · `layout.tsx` (meta + OG +
schema.org founder: LLB/Lawyer, 45y, 5+ countries, knowsAbout += investigations/
litigation) · `about/page.tsx` (hero title + origin story + meta) · `services/page.tsx`
(lede + meta) · `AboutTeaser.tsx` h2. Disputes **slug kept** (`tax-disputes-ato`) so
the SSG route + links don't break. tsc + lint + vitest(8) + `next build`(16 pages)
ALL GREEN. Verified in browser (hero + disputes page screenshots).
**No em-dashes** used (honoured the standing house rule even though the approved hero
preview showed them — set to colon/comma instead).

⚠️ TWO CLIENT-CONFIRMATIONS — now RESOLVED by the resume-alignment pass (2026-06-30b):
  (a) admitted lawyer, NSW, Aug 2023 → credentials say "Lawyer (admitted in NSW)";
  (b) forums named: AAT + NSW District Court (resume-backed, not Federal Court).
  Both still ride on Dr S's final sign-off before publishing.
⚠️ Still NOT redeployed — run `npx vercel --prod --yes` only after user sign-off.
Also still open from before: Dr S's REAL portrait photo (placeholder gradients).

---

## HANDOFF (prior) [updated 2026-06-28b]

**State: LIVE & PUBLIC review build. Full site + real contact/testimonials/team +
photoreal imagery + VOICE-MATCHED COPY deployed to prod (commit 77f65b6). Vercel
Authentication OFF → ms-accountants.vercel.app returns 200 publicly. Detail below.**

### VOICE-MATCH COPY PASS (2026-06-28c) — DONE, deployed
Researched Dr Sridaran's published writing (book + academic papers; AFR/SMH op-eds
NOT accessible — paywalled/403; see `memory/findings.md` for the full voice profile).
His signature = name the conventional view then set himself against it ("an
alternative view"), pose the hard question, concede honestly, quiet authority.
Threaded through: homepage Statement, all 5 service intros + why paragraphs.
Credential cards + About origin already in-voice, left as-is. No em-dashes.
tsc+tests(7)+build green.
⚠️ NOTHING IS CLIENT-APPROVED YET — incl. the HERO headline (the older "client
liked hero" note was the USER's read, NOT Dr S's sign-off). Everything is open to
change once he responds. Brief expanded 2026-06-28c: copy must (a) sound exactly
like him, (b) be instantly clear to his ICP (established business owners /
property & company owners / HNW individuals with complex tax — see testimonials),
(c) make identity unmistakable to warm AND cold visitors, (d) explain what he does
all-in-one. Hero rework options put to user (A: refined "wrote the thesis" hook
broadened from CGT→tax; B: principal-led clarity; C: hard-question signature).
STILL PENDING for true voice lock: client's 1-2 AFR/SMH clippings or book excerpt.

### CLIENT REVIEW EMAIL drafted (not sent — user sends it). Asks Dr S for:
(1) real portrait photo, (2) AFR/SMH writing samples for voice, (3) confirm
contact details + testimonials. Framed as review build; portrait + final copy
flagged as the two intentionally-unfinished items.

### THIS SESSION (2026-06-28b) — DONE, committed+pushed, NOT yet redeployed
- **Real contact details** scraped from live msaccountants.com.au → `site.ts`
  `contact`: phone 02 9739 4837, mobile 0410 588 536, fax 02 8078 6640,
  email m.sridaran@msaccountants.com.au, office "Suite 70, WOTSO WorkSpace,
  9 George Street, North Strathfield NSW 2137", postal "P O Box 2194, Hornsby
  Westfield Post Office, Hornsby NSW 1635". Wired into Contact page + Footer
  (Footer hardcodes "North Strathfield NSW 2137"; old `contact.address` REMOVED).
- **Testimonials** (5 real, from /what-our-clients-say.html) → `site.ts`
  `testimonials[]`. Homepage `Testimonial.tsx` rebuilt: featured (Ambi Thind) +
  4-card grid. Verified in browser.
- **Team** → `site.ts` `team[]`: Dr Sridaran + Niroshi Rathnayakage ONLY
  (Samantha Mullins removed per client). About page gained an "Our people"
  section (avatar gradient placeholders; "Portrait to follow" on Dr S).
- **Service imagery** (GPT Image 2 = `openai/gpt-image-2`, NOT "Chacha Beauty"
  which doesn't exist on fal): 21:9 editorial band added to each service detail
  page via new `Service.image` field. LIVE picks in `public/generated/`:
  tax-advisory-2 (library chambers), tax-disputes-1 (CBD desk), tax-compliance-1
  (coloured folders), cfo-advisory-1 (blue-hour Sydney boardroom — best of set),
  smsf-2 (wax seal + coins). 5 rejected options deleted. All people-free/text-free
  per the AI-tell rules. Generated directly via fal MCP submit_job (no script).
- Build/lint/tsc/vitest(7) ALL GREEN.

### ⏭ IMMEDIATE NEXT STEP
Run the production redeploy (blocked in auto mode this session):
  `npx vercel --prod --yes`  (from repo root; CLI authed as munyal)
Then the new contact/testimonials/team/imagery go live at ms-accountants.vercel.app.

---

**Prior state (still true): full site built, deployed to GitHub + Vercel. One owner
action left to make it public (disable Vercel Auth). Detail below.**

**Branch:** `redesign-v2` (default branch on GitHub too; NOT merged to local `master`).
**Repo:** https://github.com/ProLeadAppt/ms-accountants (PUBLIC — consider private).
  Remote `origin` set; `git push origin redesign-v2`. gh authed as ProLeadAppt.
**Vercel:** project `ms-accountants`, team/org `team_DRSFPnWB50EsXwRlV0ucTrlo`,
  projectId `prj_C99H17YmzXsmDDiXz0QUA8Nz3ge2`. CLI authed as `munyal`.
  Redeploy: `npx vercel --prod --yes` from repo root. No runtime env vars needed.
  Permanent URL: **https://ms-accountants.vercel.app**
**Dev server:** `npm run dev` → http://localhost:3000. **Build/lint/tests all green**
  (`npm run build`, `npm run lint`, `npx vitest run` = 7/7).

### ⚠️ THE ONE OPEN ITEM — Vercel Deployment Protection
The site is live and renders correctly, but **Vercel Authentication (Deployment
Protection)** gates logged-out visitors (anon -> 302 SSO / 404). The OWNER (logged
into Vercel) CAN see it now. To make it public:
  Vercel dashboard → project ms-accountants → Settings → Deployment Protection →
  **Vercel Authentication → Off** (or "Only Preview") → Save.
No CLI/MCP tool can toggle this (MCP Vercel is read-only; reading the CLI token is
sandbox-blocked). Either the user toggles it, or provides a token / sets
`VERCEL_TOKEN` and we PATCH `v9/projects/{id}` `{ssoProtection:null}`.
FIXED already: `framework:null` was causing a real root 404 even for the owner →
pinned via `vercel.json {"framework":"nextjs"}`; redeploy confirmed the app renders.

**Spec:** `docs/superpowers/specs/2026-06-27-ms-accountants-redesign-design.md`
**Plan:** `docs/superpowers/plans/2026-06-27-ms-accountants-redesign.md` (13 phases)

### What's DONE (this + prior sessions)
- Homepage (Phases 0–6 + elevation) — see below.
- **Inner pages built**: About, Services index, 5 service detail (SSG), Contact
  (+working form, verified), branded 404. Reusable `PageHero`,
  `CredentialTranslation` sections. Per-page metadata; sitemap/robots done.
- **AI imagery (fal.ai)**: hero = animated library video `public/generated/lib2-1.{jpg,mp4}`
  (Flux 1.1 Ultra still + Kling i2v; dust motes; reduced-motion still fallback).
  Promise section chess = `public/generated/chess4-1.jpg` (GPT Image 1.5, photoreal
  hand of Indian descent — client is Indian). Generator: `execution/fal-generate.mjs`
  (cmds: verify|hero|concepts|refine|chess3|chess4|animate). SOP: `architecture/imagery-pipeline.md`.
  Kept `public/generated/heroB-study-2.jpg` (book spines) for About origin image.
- Copy em-dashes purged from `src/lib/site.ts`. `useReducedMotion`→`useSyncExternalStore`.
- **UX fixes**: `body{overflow-x:clip}` (kills horizontal overflow, sticky-safe) +
  `html{overscroll-behavior-y:none}` (stops footer "push-down"). NOTE: could NOT
  reproduce at automation width (locked 2545px) — user should confirm at their width;
  diagnostic JS ready (measure elements crossing viewport edge).

### NEXT (after protection toggle)
1. **PROD REDEPLOY** `npx vercel --prod --yes` (this session's work not yet live).
2. Confirm the two UX fixes on the real public URL at the user's width.
3. Client-supplied, NOT AI: Dr Sridaran's **real portrait** (About "Our people"
   + AboutTeaser + about-origin slots all still gradient placeholders). Email/
   address now CONFIRMED from live site (done). Optional voice-match copy.
4. **World-class copy pass** (user explicitly wants this next): deep-research elite
   tax/law firm copy → `copywriting` skill → voice-match to Dr Sridaran (AFR/SMH/
   book samples — ask client). Replace base copy in `src/lib/site.ts`.
5. Optional: make GitHub repo private; merge `redesign-v2`→`master` if desired.

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

## DEPLOY (2026-06-28)
- **GitHub:** https://github.com/ProLeadAppt/ms-accountants (default branch
  `redesign-v2`; repo is PUBLIC — consider making private). Remote `origin` set.
- **Vercel:** project `ms-accountants` (scope munyal-projects). Production deploy
  READY. Permanent URL: **https://ms-accountants.vercel.app**
  (deploy URL: ms-accountants-mstyfwmfm-munyal-projects.vercel.app).
- **BLOCKER for public access:** Vercel **Deployment Protection (Vercel
  Authentication)** is ON -> non-logged-in visitors get 302->SSO then 404.
  FIX (dashboard, ~10s): Vercel -> project ms-accountants -> Settings ->
  Deployment Protection -> Vercel Authentication -> Off (or "Only Preview") ->
  Save. Then the URL is public. No CLI/MCP tool exists to toggle this.
- Redeploy after code changes: `npx vercel --prod` from repo root (CLI authed as
  munyal). No runtime env vars needed (fal is build-time only; contact API just logs).
- Inner pages (about/services/[slug]/contact/404) built this session; build+lint+
  tests all green. Copy em-dashes purged. Outstanding for client: real portrait
  photo (About slot), email/address confirmation (site.ts §9), final voice-match.

## Log
- 2026-06-27: brainstormed + spec + plan; built Phases 0–6 (design system → homepage).
- 2026-06-28: elevation pass (marquee, grain, cinematic headline, custom cursor,
  parallax, micro-interaction fixes, em-dash purge). Wired fal.ai key into `.env`.
  Handover at user request (~50% context).
