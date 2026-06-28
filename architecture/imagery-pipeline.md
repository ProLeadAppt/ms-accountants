# SOP — fal.ai Imagery Pipeline

**Goal:** Generate award-grade, on-brand stills and cinematic video for the site
from text prompts, deterministically and cheaply, without ever leaking the key.

## Tool
`execution/fal-generate.mjs` (Node 24 native fetch; no fal dependency).

Run (key is read from `.env`, never hardcoded):
```
node --env-file=.env execution/fal-generate.mjs verify     # cheap key probe (schnell)
node --env-file=.env execution/fal-generate.mjs hero        # 3 hero stills -> public/generated/
node --env-file=.env execution/fal-generate.mjs animate <img> [prompt]   # i2v -> hero.mp4
```

## Models
- Stills: `fal-ai/flux-pro/v1.1-ultra` via `https://fal.run/{model}` (sync). Uses
  `aspect_ratio` (e.g. `21:9`), up to 2K, `output_format: jpeg`.
- Image-to-video: `fal-ai/kling-video/v2.1/standard/image-to-video`. Needs a public
  `image_url`; local files are uploaded to fal storage first (see `uploadIfLocal`).

## Brand prompt language (keep consistent)
Warm Sydney sandstone, golden-hour, cream-and-espresso colour grade, editorial
architectural photography, Leica/35mm, shallow DOF, fine film grain, restrained,
expensive, deep shadow on the left third for text, generous negative space.
NEG list strips cartoon/3d/neon/watermark/AI-slop. NO faces in focus.

## Wiring rules (learned)
- `.scheme-espresso` sets a solid `background-color` on the section. A background
  `next/image` wrapper must be `z-0` (NOT `-z-10`) or it hides behind the fill.
  Content stays `z-10`.
- Scrim a full-bleed hero so the cream headline reads: left dark, right glows.
  `bg-gradient-to-r from-[#160f0b] from-8% via-[#160f0b]/55 via-48% to-transparent to-90%`,
  plus a short top fade for nav and a bottom fade into the next section.
- Flux bakes garbled signage text into architecture shots. Hide it via crop
  (`object-[68%_center]`) and/or the dark side of the scrim. Never leave legible
  gibberish text visible.

## Hard rules
- NEVER print, log, or commit `FAL_KEY`. `.env` is gitignored.
- Do NOT AI-generate Dr Sridaran's face — real photo only.
- Verify the key (cheap) before batch/video spend.
