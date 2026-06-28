# Findings — MS Accountants Website v2

## Client's current site (msaccountants.com.au)
- Old Joomla-era site. Palette: cream/white base, **brick-red/maroon dominant** (logo, header bars, buttons), warm tan nav, dark body text, warm imagery (chess on wood, warm-lit portrait).
- Logo: heavy bold grotesque "MS Accountants" in brick-red, low-res raster. Client wants it recreated "exactly but better."
- Reads dated → goal is the same palette, made premium/high-end.

## Reference研究
- **Quinn (quinngtl.com):** Webflow + GSAP. Warm earth/clay/seafoam palette, folder-tab hero, custom `folderEase`, Lottie line-art, sticky-pin about, scroll-scrubbed reveals. Borrow motion craft + warmth only.
- **Awwwards finance:** Adveris/"RHÉTORÈS" (dark editorial authority, centred serif), Dirty Martini/"MAXIMA" (cream + oversized serif + classical statue art direction), Outcrowd (cream, sculptural hero). Anti-refs: Voila/Athlon (SaaS/crypto).
- **21st.dev categories** to draw from: Heroes, Texts, Testimonials, Clients (logo wall), Features, CTAs, Backgrounds, Scroll Areas.

## Tech baseline
- Project already Next 16 + React 19 + Tailwind v4 + `gsap`/`@gsap/react` installed. v1 builds clean (15 pages). `/api/contact` exists. `site.ts` already holds typed content.
- `AGENTS.md`: modified Next.js — read `node_modules/next/dist/docs/` before coding.

## Asset tooling
- User has Val.ai + Grok (+ ChatGPT) paid subs for AI image generation. Workflow: I write prompts → user generates → drops in `/public` → I wire up. Portrait = real photo from client.

## Dr Sridaran's writing voice (research 2026-06-28, for the world-class copy pass)
- **Book:** *Are Capital Gains Equitably Taxed in Australia?* (LAP Lambert Academic
  Publishing, 2012, ISBN 9783659195488). Thesis-as-question title. Abstract voice:
  formal, rigorous, argument-driven; poses a sharp question then resolves it through
  case studies + process review; intellectually honest — explicitly CONCEDES
  counter-objectives ("recognizes that horizontal equity is just one among many
  policy objectives... concedes that there may be situations where a violation...
  may inevitably occur"). Measured, never salesy.
- **Academic papers (titles = his voice signature):** "Who pays the lion's share of
  personal income tax?" (CCH Tax Week, 2004); "The High Court decision in Hart: An
  alternative view" (Thomson ATP Weekly Tax Bulletin, 2004). Note the rhetorical
  question + the contrarian "an alternative view" stance — he positions himself as
  the rigorous dissenter who re-examines settled positions.
- **VOICE SIGNATURE to match:** (1) lead with the hard question, (2) measured/precise,
  (3) intellectually honest — concede the counterpoint before answering it, (4) quiet
  authority not hype, (5) the contrarian re-examination ("the received view is X;
  the truer picture is Y"). TRANSLATE this into warm, accessible client-facing prose
  — do NOT reproduce dense academic legalese (client wants emotional/award-grade).
- **COULD NOT ACCESS (paywalled / 403):** full AFR & SMH op-ed text (not surfacing in
  search — likely old/print or paywalled), Academia.edu profile (403), Macquarie
  researcher portal (403), the LAP book interior. His *journalistic* (accessible)
  voice is therefore inferred, not sampled. → ASK CLIENT for 1-2 AFR/SMH clippings or
  a book excerpt to nail the popular register before finalising copy.
