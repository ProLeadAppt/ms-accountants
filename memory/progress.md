# Progress — MS Accountants Website v2

## HANDOFF — READ FIRST  [updated 2026-07-04 — INNER-PAGE ELEVATION complete]

### INNER-PAGE ELEVATION — ALL 6 TASKS DONE locally on redesign-v2, deploy HELD, verified on live localhost
Goal was Tyson's: "make every other page match the homepage's quality." A small kit of
premium moves applied per page, reusing the homepage's components (SplitHeadline,
WordReveal, ScrollSmoother `data-speed`, `.scheme-espresso-deep`). No new copy, no
structure changes beyond retiring stale bits. Plan+spec:
`docs/superpowers/{plans,specs}/2026-07-04-inner-page-elevation*`.

- **T1** `d31ea8f` — FinalCTA elevated to the crescendo close (deep drama band + drawn underline); inherited by every page that closes on it.
- **T2** `d49b3c2` — About: retired AuthorityMarquee + the duplicate PromiseBlock close; HowItWorks scheme union widened to accept `espresso-deep`; About now closes cream → espresso-deep drama band → cream → FinalCTA.
- **T3** `d9716b7` — Service detail: `scheme-espresso` → `scheme-espresso-deep` "Why us" band, 21:9 editorial image gets `data-speed="0.9"` parallax drift (oversized wrapper so no hard edge), and the "why" statement runs through WordReveal.
- **T4** `6bd4607` — Services index: each card gets the sliding `arrow` icon (`group-hover:translate-x-1`) for hover parity with the detail-page cards.
- **T5** `a18cf3a` — ScrollReset now scrolls to in-page anchors under ScrollSmoother (fixes `/about#team`, which previously early-returned and did nothing); the smoother intercepts native anchor scroll, so we resolve the target on rAF after `ScrollTrigger.refresh()`. Non-hash navs still reset to top.
- **T6** verification (no code): lint · vitest 27/27 · next build 16 routes; site-wide em-dash guard = 1/page (Header aria-label); About marquee markup = 0, single FinalCTA; service-detail `scheme-espresso-deep` >= 1; services-index arrow markup present. Confirmed on the **live dev server (PID 14108, http://localhost:3000, HTTP 200)** serving current code for all five changes.

➡️ **STILL OPEN before deploy:** Tyson's real-desktop visual pass at http://localhost:3000.
Watch: crescendo close on each inner page (about/services/service-detail) · the two new
drama bands · the 21:9 parallax drift on a service page · `/about#team` scrolling to the
team roster · scroll-to-top when clicking into a service · then emulate
`prefers-reduced-motion` and confirm every heading degrades to static + native scroll.
HEAD `a18cf3a` on redesign-v2, NOT pushed, NOT deployed. Deploy only on Tyson's explicit
go. NOTE: this session's env still throttles rAF, so the *motion feel* is Tyson's to
confirm; structure/scheme/markup are grep-verified above.

---

## HANDOFF — READ FIRST  [updated 2026-07-04 — Ink reveal language + scroll fix]

### INK REVEAL LANGUAGE (site-wide text-reveal) — DONE locally on redesign-v2, deploy HELD, NOT visually verified
Tyson asked for an "incredible" text reveal. Brainstormed 4 options via a rendered
Reveal-Lab artifact; he chose **Ink** — a variable-weight bloom (words press from
hairline-thin 300 to full weight, exploiting Zodiak being a *variable* font) with
Typeset's held-back move: the red "wrote the thesis" blooms LAST, alone, with a drawn
underline.

- **Engine:** the one shared `src/components/motion/SplitHeadline.tsx` gained
  `reveal="hero"|"section"` + `underline`. Splits into words (SplitText), tweens
  `fontWeight` (browser interpolates the variable axis). Hero runs on mount with the
  held-back em beat; sections run on a ScrollTrigger (`top 82%`, once). Splits only
  after `document.fonts.ready`; reduced-motion / no-JS fall through to the natural
  full-weight heading (Tier 3, verified in prerendered HTML).
- **Timing lives ONLY in `src/lib/motion/bloom.ts`** (tested, 4 unit tests). This is the
  single tuning lever. Per-word 1.6s (hero) / 1.2s (section) is the operator-approved
  SLOW-MO pace — he explicitly rejected the faster "normal" pace. To shorten the ~3.3s
  hero, trim `stagger`/`gap` ONLY, never `wordDur` (that carries the press he liked).
- **Rollout (every rendered heading):** hero + all 7 homepage acts + 4 inner-page heroes
  (PageHero now takes `titleSegments`) + 404 + FinalCTA/PromiseBlock/PublishedThinking/
  TeamRoster/about-origin. Repeated list/card/step items left to their existing Stagger
  by design. ConversationAct + PromiseBlock keep the "get the expert" payoff composed
  from `promiseCopy` (single source of truth).
- **Verify gate green:** lint · vitest 27/27 · next build 16 · em-dash guard (1/page =
  Header aria-label) · accent-phrase spacing checked in prerendered HTML.
- Spec/plan: `docs/superpowers/{specs,plans}/2026-07-04-reveal-language-*`.

### SCROLL-TO-TOP BUG — FIXED (same session)
`src/components/motion/ScrollReset.tsx` (mounted in layout): ScrollSmoother owns the
scroll position via a transform and persists across App Router navigations, so pages
opened mid-scroll and "remembered" position on return. Now resets smoother + window +
`ScrollTrigger.refresh()` on each pathname change; `#anchor` links left alone.

➡️ **STILL OPEN before deploy:** the REAL-DESKTOP visual pass (this session's env
throttles rAF so the motion itself is unconfirmable). Watch: hero held-back bloom +
underline on load → a section blooming on scroll → emulate `prefers-reduced-motion` and
confirm every heading degrades to static + native scrolling. Then tune `bloom.ts` if the
hero drags, and confirm the scroll-to-top fix feels right on navigation. `npm run dev`
→ localhost:3000. 8 commits, HEAD `e0344a3`, 7 ahead of last deploy `349c50c`, NOT
pushed. Deploy only on Tyson's explicit go.

---

## HANDOFF (prior)  [updated 2026-06-30i]

### PASS 7 — PREMIUM MOTION PASS (2026-06-30i) — DONE locally, NOT yet redeployed (deploy held for Dr S sign-off)
Executed the full plan (`docs/superpowers/plans/2026-06-30-premium-motion-pass.md`,
9 tasks) on `redesign-v2` via superpowers:executing-plans. Tasks 1–8 implemented and
committed one-per-task; Task 9 verification done; the production deploy (Step 5) is
DELIBERATELY HELD pending sign-off (the standing rule: redesign-v2 awaits Dr S).

WHAT SHIPPED (local, committed):
- **Task 1** (`98433d6`): `registerGsap()` now registers ScrollSmoother, SplitText,
  DrawSVGPlugin alongside ScrollTrigger + CustomEase. `src/lib/motion/eases.ts`.
- **Task 2** (`b33744d`): site-wide ScrollSmoother. New `SmoothScroll.tsx`
  (`#smooth-wrapper > #smooth-content`, smooth 1.2, effects, normalizeScroll).
  `layout.tsx` restructured so Header + grain (+ Preloader) sit OUTSIDE the smoother
  and main+Footer inside — the fixed-element fix from the plan's #1 risk.
- **Task 3** (`<see log>`): stats count-up. `figure.ts` (`parseFigure`, TDD, 3 tests)
  + `CountUp.tsx`, wired into `CredentialGrid.tsx`. Non-numeric figures (PhD/CA) render
  unchanged.
- **Task 4**: branded first-load preloader. `preloader.ts` (session guard, TDD) +
  `Preloader.tsx` (live % to real readiness, 4s cap, lift). Mounted OUTSIDE SmoothScroll.
  NOTE: one targeted `eslint-disable react-hooks/set-state-in-effect` on the client-only
  mount decision (reads sessionStorage + reduced-motion post-mount; SSR must stay false).
- **Task 5** (`ab4fb1a`): new hi-res hero still `public/generated/hero-study-hires.jpg`
  (fal.ai flux-pro v1.1-ultra, 3136×1344 21:9, library study, god rays, people/text-free;
  chose candidate 2 of 3 with operator sign-off). `heroAsset.ts` = single source of truth.
  `HeroBackground.tsx` is now still-only (video retired; `lib2-1.{jpg,mp4}` left on disk,
  unreferenced).
- **Task 6** (`0bb1b32`): `SplitHeadline.tsx` + `DrawUnderline.tsx`. Hero headline →
  SplitHeadline (`splitType="lines"`); hero bg gets ScrollSmoother `data-speed="0.85"`
  + a faster `1.12` dust/light layer for depth; old scrub-parallax removed from
  `HeroTimeline.tsx`. DrawSVG underline applied to the **About PageHero "run a small
  firm" phrase** (the plan's sanctioned fallback — avoids colliding with the hero's
  line-masked SplitText; `CaseInPoint.frame` prop narrowed React.ReactNode→string,
  safe: both callers use the default string).
- **Task 7** (`f06133b`): SplitText on the three largest section headings
  (`Statement` display sentence, `CaseInPoint` frame line, `HowItWorks` h2), classes
  kept identical so layout is unchanged.
- **Task 8** (`5ea5676`): `src/app/template.tsx` — restrained enter-only page transition
  (fade + 16px lift), reduced-motion gated.
- **POST-PLAN (`39de016`): hero ambient video re-added** at operator request after
  review — the still alone read "dead" between loads. Generated a 5s ambient loop from
  `hero-study-hires.jpg` via fal.ai Kling 2.1 i2v (standard), drifting dust/light only,
  room locked still (verified first/last frames: no warp, no people). Saved
  `public/generated/hero-study-hires.mp4` (H.264/yuv420p, 1464×628). `HeroBackground.tsx`
  back to video+poster (poster=HERO_STILL; reduced-motion still shows the still);
  `heroAsset.ts` adds `HERO_VIDEO`. The plan's "retire the video" decision is thus
  PARTLY REVERSED for the hero (operator preference); everything else from the plan stands.
  Operator also confirmed: keep the OTHER motion effects RESTRAINED (no amplification).
  NOTE for review: the preloader is once-per-session (sessionStorage `ms-preloaded`), so
  to see it again open a FRESH/Incognito window — verified working (not a bug).

EVERY motion path is gated by `usePrefersReducedMotion()` and degrades to a correct
static result. Page count still 16. No copy/business-logic changes beyond the new hero.

VERIFICATION (Task 9): lint clean · `vitest run` 16/16 green · `next build` 16 pages ·
prerendered-HTML guard PASS (hero-study-hires referenced; only em-dash is the
pre-existing Header `aria-label="MS Accountants — home"`).

➡️ STILL OPEN before deploy:
1. REAL-DESKTOP eyeball (the claude-in-chrome tab freezes rAF, so motion can't be
   frame-captured here): preloader counts+lifts → smooth scroll → hero parallax depth →
   SplitText headline + heading reveals → DrawSVG underline (About page) → stats count-up
   → page-enter transition; then emulate `prefers-reduced-motion: reduce` and confirm
   every effect degrades to static + native scrolling. `npm run start` → localhost:3000.
2. Lighthouse on the homepage (watch LCP/CLS vs the preloader+smoother; retiring the 4MB
   video offsets the added JS).
3. DEPLOY (held): `git push origin redesign-v2 && npx vercel --prod --yes`, then re-verify
   live home + `/generated/hero-study-hires.jpg` are 200. Do this ONLY after Dr S sign-off.

---

### PASS 6 — HERO BACKGROUND ANIMATION FIX (2026-06-30g) — SHIPPED
Operator: "the hero animated in the background needs to be finalised."
ROOT BUG found: in `Hero.tsx` the `data-hero="bg"` background div was a SIBLING
of `<HeroTimeline>`, but HeroTimeline selects `[data-hero='bg']` only within its
own ref scope (`gsap.utils.selector(ref)`) — so the load scale-in AND the scroll
parallax NEVER ran; the background was static (only the video loop, where the
browser played it).
FIX: moved the bg div INSIDE `<HeroTimeline>` (kept z-0 bg / z-10 content split so
media stays behind the headline). Proven: GSAP now targets bg (it applied the
transform). HARDENED `HeroTimeline.tsx`: switched `gsap.set(...)+to(...)` to
`from(...)` with `immediateRender:false`, so the REST state is the natural CSS
(scale 1, content in place) — a throttled/stalled rAF now degrades to a correct
static hero instead of a background stranded mid-zoom.
VIDEO: `public/generated/lib2-1.mp4` codec is browser-valid (H.264 / yuv420p,
1464x628, 5s loop); poster `lib2-1.jpg` is the guaranteed first paint. Serves 200
(video/mp4) on prod.
⚠️ VERIFY LIMITATION: the claude-in-chrome automation tab FREEZES requestAnimation-
Frame (confirmed: rAF never fired in 45s; also blocks video decode → readyState 0).
So the MOTION itself could not be frame-captured here — only the composition
(verified clean: bg behind content, scrims, legible headline, dust motes). The
scale-in + parallax + video playback must be eyeballed on a REAL desktop. Same
limitation the imagery passes flagged ("CONFIRM PLAYBACK ON REAL DESKTOP").
OPTIONAL future enhance: hero video is modest res (1464x628) → slightly soft when
upscaled on large displays; could regenerate higher-res via fal.ai Kling i2v
(light/dust only, never people/vehicles — see imagery LESSONs below).
Committed `4e9cfe6` on `redesign-v2` (pushed) → `npx vercel --prod --yes` →
deploy `ms-accountants-6xy2k49wx` READY, aliased to https://ms-accountants.vercel.app
(home 200, hero mp4+poster 200). Local `npm start` server stopped after.

---

### PASS 5 — "SHOW, DON'T TELL" UI/UX STRUCTURE PASS (2026-06-30f) — DONE locally, verified, NOT yet committed/redeployed
Operator brief: beyond the copy, what UI/UX structure + feel adds to authority +
warmth + courage (standing against the ATO on the hard cases)? Plan approved:
ALL FOUR moves, feel = "quiet authority". Plan file:
`C:\Users\domin\.claude\plans\foamy-soaring-snowflake.md`.

Four NEW section components (reuse existing design system; no new fonts/tokens/routes):
1. **CaseInPoint** (`src/components/sections/CaseInPoint.tsx`) — promotes the real
   Neda Morris testimonial (ATO + NSW Office of State Revenue audited her two
   colleges, defended cost-effectively) into a proof band. Courage SHOWN. Default
   scheme cream; reusable. On HOMEPAGE (scheme sand, between PublishedThinking and
   CredentialGrid) + TAX DISPUTES page (scheme sand, after "Why us").
2. **HowItWorks** (`HowItWorks.tsx`) — 3 principal-led steps (LineDraw+Stagger) +
   restrained boutique-vs-big-firm contrast (no SaaS table). Cells use --fg tints
   so it works on any scheme. HOMEPAGE (sand, after AboutTeaser) + ABOUT
   (scheme espresso, after Team).
3. **VoicePullQuote** (`VoicePullQuote.tsx`) — oversized Instrument Serif divider;
   uses a VERBATIM real title (book: "Are Capital Gains Equitably Taxed in
   Australia?") not a fabricated quote. HOMEPAGE espresso, between Statement and
   ServiceList.
4. **ServiceTestimonial** (`ServiceTestimonial.tsx`) — one un-truncated relevant
   testimonial per service page via `getTestimonialForService(slug)`. Map in
   `site.ts` (`relatedTestimonial`): advisory→Manya Scheftsik, compliance→Araliya
   De Silva, cfo→Ambi Thind, super→Anne Truong; DISPUTES intentionally omitted
   (carries CaseInPoint instead); SMSF uses a general reliability quote (no SMSF
   claim invented).

Also: homepage `PublishedThinking` switched to scheme="cream" for clean
alternation. Scheme rhythm re-checked end to end (no two identical adjacent in the
new inserts; espresso kept as punctuation).

Verify gate ALL GREEN: `npm run lint` clean; `npx vitest run` **12/12** (8 + 4 new
mapping-integrity tests in `content.test.ts`); `npm run build` **16 pages**;
prerendered HTML grep confirmed every new band + correct conditional logic
(disputes shows CaseInPoint and suppresses ServiceTestimonial); zero NEW em-dashes
(the lone em-dash sitewide is the pre-existing Header logo aria-label "MS
Accountants — home", an accessibility label, out of scope). Visual screenshots
captured on localhost:3000 (prod `npm start`) for VoicePullQuote, HowItWorks,
CaseInPoint, and the CFO ServiceTestimonial — all read clean in quiet-authority.

➡️ SIGNED OFF + SHIPPED. Committed `22f622d` on `redesign-v2` (pushed), then
`npx vercel --prod --yes` → deploy `dpl_GMMFiKXcTgbKF6EUztjzFCkYoXzf` READY,
aliased to https://ms-accountants.vercel.app. Live public re-verified (HTTP 200 +
grep): homepage CaseInPoint/HowItWorks/VoicePullQuote, disputes CaseInPoint, CFO
ServiceTestimonial all present. Still open (unchanged): Dr S's REAL portrait photo
(placeholder gradients on hero/About — do NOT AI-generate his face).

---

### PASS 4 — "MAKE IT EXCEPTIONAL": WARMTH + ABOUT STRIP + REDEPLOY (2026-06-30e)
Dr Sridaran gave his nod THROUGH the operator (Tyson) — sign-off is granted, redeploy
AUTHORISED. Operator brief: "10x everything, prove it, position him as the authority but
with warmth and competency, easily understood from the landing page inward."

Implemented (all grounded in real facts/testimonial language, no inventions):
1. **WARMTH (the last missing through-line).** Added a closing paragraph to the About
   origin story: "The rigour comes with a manner his clients describe in consistent terms:
   patient, generous with his time, and unfailingly courteous, even when the matter is
   hard. The fairness he argues for in print is the fairness he extends to the person
   across the table." Sourced from the real testimonials ("unfailing professional
   courtesy", "patient", "generously given us his time") and tied to his fairness
   principle. SHOWN, not self-claimed.
2. **Homepage testimonial framing headline** ("Brought in for the hard problems. Kept on
   for years.") added to `Testimonial.tsx` between the eyebrow and the featured quote, so
   the competency + long-tenure point lands instantly (grounded: clients of 7+ years,
   "since incorporation").
3. **Published-thinking strip now on the ABOUT page too.** Added a `scheme` prop to
   `PublishedThinking` (default "sand"); placed `<PublishedThinking scheme="cream" />` on
   About after `CredentialTranslation`, before `PromiseBlock` (sand→cream→red rhythm).
   Homepage strip unchanged (sand).

Verify gate: lint clean, vitest 8/8, build 16 pages. Rendered HTML confirmed: About warmth
para + cream strip present; homepage testimonial headline present. ALL THREE AUDIT
WORKSTREAMS (fairness/challenger · published-thinking · de-cliché+warmth) NOW COMPLETE.

➡️ REDEPLOYED to production this pass (`npx vercel --prod --yes`) — see the DEPLOY note
below for the result. Still open: Dr S's REAL portrait photo (placeholder gradients on
hero/About — do NOT AI-generate his face).

---

### PASS 3 — DE-CLICHE + PUBLISHED-THINKING STRIP + GAP F (2026-06-30d) — committed+pushed to redesign-v2
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

## 2026-07-02 — HANDOFF: Team expansion + premium 10X overhaul (phases 0-6, 8, 9 DONE; phase 7 awaits font pick)
- team[] 2→6 in src/lib/site.ts (resume-grounded, honesty flags applied: Niroshi ACA former, Eshani KPMG=Jamaica only, Senaviratne CPA associate). New TeamMember fields: slug/shortName/credentialShort/lineage/joined/initials/reportsTo/photo/featured. teamCollective = bench-strip hooks.
- New components: src/components/ui/Monogram.tsx (photo-ready typographic stand-in), sections/TeamRoster.tsx (About, id="team", Niroshi spans 2 cols), sections/BenchStrip.tsx (home, after AboutTeaser).
- De-AI copy pass done (kill-list executed; grep-verified 1 instance each of "complete complement", "name is on the door", "the way the courts do"; Most-anaphora kept only in Statement + credentialCards[1]). Review claim now varies everywhere + team-aware twice. Positioning reframed: team builds, he reviews.
- Homepage IA restructured (see git log); CredentialGrid deleted (stats absorbed into CredentialTranslation); Testimonial → cream, moved after CaseInPoint; eyebrow numbers dropped.
- docs/photo-brief.md written for Sri. Sign-off packet: .tmp/signoff-packet-2026-07-02.md.
- Type candidates for the font swap (phase 7, BLOCKED on Tyson's pick): .tmp/type-candidates/{a-broadsheet,b-law-review,c-chambers}.html (Newsreader / Source Serif 4+Libre Caslon / Libre Caslon+Hanken). After pick: edit src/lib/fonts.ts + globals.css @theme lines 22-26, verify SplitText waits on document.fonts.ready, re-screenshot.
- Verification: lint clean, vitest 23/23, build 16/16, DOM-verified section order + scheme alternation, no-JS fallback renders whole page. Playwright fullPage capture is BROKEN on this site (100svh hero + capture resize) — use viewport/tall-viewport captures instead.
- Vitest 23 includes an em-dash regression test over the whole content library.
- Deploy HELD for Tyson's explicit go (he holds sign-off authority on Sri's behalf).

## 2026-07-03 - HANDOFF: Premium homepage 10x, seven-act rebuild verified (deploy HELD)
Shipped this pass, on `redesign-v2`, local only:
- Full seven-act premium homepage rebuild in the Quiet-Luxury register. Zodiak (display/serif)
  and General Sans (sans) self-hosted with variable weight ranges declared and verified in the
  built CSS. Espresso color tokens added alongside scheme-red/paper and a new unlayered
  `.scheme-espresso-deep` class.
- The seven acts and what each merges: Hero (Act I, Quiet-Luxury split + authority strip) ·
  Statement (Act II, thesis + voice quote) · ServiceList (Act III, numbered editorial index) ·
  PeopleAct (Act IV, merges AboutTeaser + CredentialTranslation + BenchStrip) · ProofAct (Act V,
  merges CaseInPoint + Testimonial + PublishedThinking) · HowRail (Act VI, compressed HowItWorks) ·
  ConversationAct (Act VII, merges PromiseBlock + FinalCTA, red crescendo close). `src/app/page.tsx`
  now wires exactly these seven; the retired section components stay on disk for inner pages.
- Shared copy consolidated into `src/lib/site.ts`: `voiceQuote`, `caseFrame`, `howItWorksSteps`,
  `promiseCopy`, each a single source of truth reused by the matching homepage act and its inner-page
  counterpart.
- `DrawUnderline` flourish reused as-is for the Act VII headline (no changes to the component or its
  on-mount timing; that stays with the controller's visual pass).

Verification (this pass, T10):
- Kill-list sweep clean: `CountUp` only in the retired `CredentialTranslation.tsx` (not imported by
  `page.tsx`); `data-speed` only in `Hero.tsx`. No fix needed.
- Reveal audit clean across all seven acts: each act uses a single coherent `Reveal`/`SplitHeadline`
  entrance group; `Stagger` (where present) wraps only a flat list of repeated items, never nested
  inside another `Stagger`. No fix needed.
- Closed the em-dash/placeholder guard coverage gap: `src/lib/content.test.ts` now imports
  `voiceQuote`, `caseFrame`, `howItWorksSteps`, `promiseCopy` from `./site` and includes all four in
  both the em-dash guard blob and the placeholder guard blob. `npx vitest run` passes 23/23 with the
  guards now exercising the new exports (confirmed em-dash-free and placeholder-free).
- Reduced-motion/no-JS: built (`next build`) and served (`next start`) the app; fetched the static
  homepage HTML. All seven act headline phrases are present in the pre-rendered markup ("wrote the
  thesis", "answer it first", "Five disciplines", "run a small firm", "comprehensive, correct",
  "One principal", "You hired the expert" all matched with count greater than zero). `data-anim`
  present 18 times (progressive-enhancement hooks intact). Exactly one em-dash found in the built
  HTML: the pre-existing Header logo `aria-label` text (it names the site then "home"), matching
  the expected baseline.
- Full gate: `npm run lint` clean, `npx vitest run` 23/23 green, `npx next build` produced the
  expected 16 routes (11 HTML pages including 5 service slugs, favicon.ico, icon.svg, robots.txt,
  sitemap.xml, plus the dynamic `/api/contact` route).
- Deploy remains HELD. No `vercel` command was run. Awaiting Tyson's sign-off (the controller
  handles screenshots and the underline-timing visual check separately).

## 2026-07-02b — DEPLOYED TO PRODUCTION
Tyson gave the explicit go (twice: "let's push it" + "YES" for the prod deploy). Pushed redesign-v2 (a44c1c7) to GitHub; `npx vercel --prod --yes` → deployment ms-accountants-9vf8tem2l, Ready in 23s. Live at https://ms-accountants.vercel.app (HTTP 200; verified serving the BenchStrip heading, all 6 team members, Newsreader font, and the reframed footerTrust). This deploy includes Pass 7 motion + team expansion + de-AI copy + IA restructure + Broadsheet type. OUTSTANDING: real headshots (Tyson is running the photo shoot per docs/photo-brief.md); drop files into team[].photo when they arrive.
