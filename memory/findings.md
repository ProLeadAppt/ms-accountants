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
