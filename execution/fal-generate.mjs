// fal.ai image/video generator for MS Accountants.
//
// Usage (FAL_KEY is read from .env via node --env-file):
//   node --env-file=.env execution/fal-generate.mjs verify
//   node --env-file=.env execution/fal-generate.mjs hero
//   node --env-file=.env execution/fal-generate.mjs animate <local-or-remote-image> [prompt]
//
// Stills -> Flux 1.1 Pro Ultra. Image-to-video -> Kling 2.x.
// Output lands in public/generated/. NEVER print or commit FAL_KEY.

import { mkdir, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const KEY = process.env.FAL_KEY;
if (!KEY) {
  console.error(
    "FAL_KEY missing. Run with:  node --env-file=.env execution/fal-generate.mjs <cmd>"
  );
  process.exit(1);
}

const OUT_DIR = path.resolve("public/generated");
const FAL = (model) => `https://fal.run/${model}`;

async function falRun(model, input) {
  const res = await fetch(FAL(model), {
    method: "POST",
    headers: {
      Authorization: `Key ${KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`fal ${model} -> ${res.status}: ${text.slice(0, 600)}`);
  }
  return JSON.parse(text);
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

// ---- Brand prompt language ------------------------------------------------
// Boutique Sydney tax & advisory. Warm sandstone, golden hour, cream-espresso
// grade. Editorial / award-grade photography, NOT AI-slop. Dark, cinematic so
// cream headline text reads on top; deliberate negative space on the left.
const NEG =
  "cartoon, illustration, 3d render, cgi, plastic skin, oversaturated, " +
  "neon, hdr halos, watermark, text, logo, lens flare clutter, busy, " +
  "people faces in focus, stock-photo cheese, ai artifacts";

const STYLE =
  "shot on Leica, 35mm, shallow depth of field, natural raking golden-hour " +
  "light, warm cream-and-espresso colour grade, fine film grain, editorial " +
  "architectural photography, restrained, expensive, calm, cinematic, " +
  "deep shadow on the left third for text, generous negative space";

const HERO_VARIANTS = [
  {
    name: "hero-sandstone",
    prompt: `Heritage Sydney sandstone facade at golden hour, raking warm light across carved columns, deep espresso shadows, empty quiet street, ${STYLE}`,
  },
  {
    name: "hero-desk",
    prompt: `Quiet boutique advisory office at dusk, dark espresso timber desk, a fountain pen resting on cream legal documents, soft brass lamp glow, blurred warm window light behind, no people, ${STYLE}`,
  },
  {
    name: "hero-light",
    prompt: `Minimal warm interior, golden afternoon light falling through tall window slats onto a textured sandstone-toned wall, long soft shadows, almost abstract, vast negative space, ${STYLE}`,
  },
];

const NOBODY =
  "completely deserted, absolutely no people, no person, no figures, no " +
  "pedestrians, no cars, no vehicles, no bicycles, no signage text, empty and still";

// Concept A — empty heritage sandstone colonnade (establishment / trust).
const HERO_A = [
  {
    name: "heroA-colonnade-1",
    prompt: `An empty heritage Sydney sandstone colonnade at golden hour, a long receding row of carved arches and columns, warm sunlight raking down the deserted arcade, deep espresso shadow in the left third, ${NOBODY}, ${STYLE}`,
  },
  {
    name: "heroA-colonnade-2",
    prompt: `Looking down a long deserted sandstone corridor of arches at golden hour, pools of warm light on the worn stone floor, dust hanging in the air, deep shadow foreground left, ${NOBODY}, ${STYLE}`,
  },
  {
    name: "heroA-colonnade-3",
    prompt: `Low angle inside a grand empty sandstone arcade, soaring carved arches catching the last golden light against deep shadow, monumental and quiet, ${NOBODY}, ${STYLE}`,
  },
];

// Concept B — the scholar's study (intellect / "wrote the thesis").
const HERO_B = [
  {
    name: "heroB-study-1",
    prompt: `A warm wood-panelled private study at golden hour, floor-to-ceiling shelves of old leather-bound law and tax volumes, a single shaft of sunlight through a tall window with dust motes suspended in the beam, an antique desk in soft shadow on the left, ${NOBODY}, ${STYLE}`,
  },
  {
    name: "heroB-study-2",
    prompt: `Close view along a shelf of antique leather-bound legal tomes, warm golden side light raking across the worn spines, fine dust drifting in the air, deep espresso shadow falling to the left, ${NOBODY}, ${STYLE}`,
  },
  {
    name: "heroB-study-3",
    prompt: `A scholar's mahogany desk by a tall window at golden hour, stacked old books, a brass banker's lamp unlit, an open ledger, a shaft of warm light and dust motes, deep shadow left third, ${NOBODY}, ${STYLE}`,
  },
];

// Chess still for the Promise / values section (NOT the hero). 4:3.
const CHESS = [
  {
    name: "chess-pieces",
    prompt: `A premium close-up of a chess endgame on a warm dark espresso timber board, hand-carved wooden pieces, dramatic golden-hour side light and long shadows, shallow depth of field, one knight advanced, contemplative and strategic, no people, no hands, ${STYLE}`,
  },
  {
    name: "chess-hand",
    prompt: `A single composed hand thoughtfully moving a carved wooden knight on a chessboard of warm espresso timber, dramatic golden-hour side light, shallow depth of field, only one hand with exactly five fingers, elegant and deliberate, ${STYLE}`,
  },
];

async function genStill({ name, prompt }, aspect_ratio = "21:9") {
  console.log(`  generating ${name} ...`);
  const out = await falRun("fal-ai/flux-pro/v1.1-ultra", {
    prompt,
    negative_prompt: NEG,
    aspect_ratio,
    num_images: 1,
    output_format: "jpeg",
    safety_tolerance: "2",
    enable_safety_checker: true,
  });
  const url = out.images?.[0]?.url;
  if (!url) throw new Error(`no image url for ${name}: ${JSON.stringify(out).slice(0, 300)}`);
  const dest = path.join(OUT_DIR, `${name}.jpg`);
  const bytes = await download(url, dest);
  console.log(`  saved ${dest} (${(bytes / 1024).toFixed(0)} KB, seed ${out.seed})`);
  return dest;
}

async function cmdVerify() {
  // Cheap probe with Flux schnell to confirm the key works before spending.
  console.log("verifying FAL_KEY with a tiny schnell call ...");
  const out = await falRun("fal-ai/flux/schnell", {
    prompt: "a single warm sandstone pebble on white, studio light",
    image_size: "square",
    num_images: 1,
  });
  if (out.images?.[0]?.url) {
    console.log("OK - key works. (probe image not saved)");
  } else {
    throw new Error("unexpected response: " + JSON.stringify(out).slice(0, 300));
  }
}

async function cmdHero() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log("generating hero still options ->", OUT_DIR);
  for (const v of HERO_VARIANTS) {
    try {
      await genStill(v);
    } catch (e) {
      console.error(`  FAILED ${v.name}: ${e.message}`);
    }
  }
  console.log("done. review options in public/generated/, pick one to wire.");
}

async function uploadIfLocal(imageArg) {
  // Kling needs a public image_url. If a local path is passed, upload to fal storage.
  if (/^https?:\/\//.test(imageArg)) return imageArg;
  const p = path.resolve(imageArg);
  if (!existsSync(p)) throw new Error(`image not found: ${p}`);
  const bytes = readFileSync(p);
  const initRes = await fetch("https://rest.alpha.fal.ai/storage/upload/initiate", {
    method: "POST",
    headers: { Authorization: `Key ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ content_type: "image/jpeg", file_name: path.basename(p) }),
  });
  if (!initRes.ok) throw new Error(`upload init ${initRes.status}: ${await initRes.text()}`);
  const { upload_url, file_url } = await initRes.json();
  const put = await fetch(upload_url, {
    method: "PUT",
    headers: { "Content-Type": "image/jpeg" },
    body: bytes,
  });
  if (!put.ok) throw new Error(`upload put ${put.status}`);
  return file_url;
}

async function cmdAnimate(imageArg, prompt) {
  if (!imageArg) throw new Error("usage: animate <image> [prompt]");
  await mkdir(OUT_DIR, { recursive: true });
  const image_url = await uploadIfLocal(imageArg);
  const motion =
    prompt ||
    "very slow cinematic push-in, gentle drifting golden-hour light, subtle " +
      "dust motes, almost still, elegant and restrained";
  console.log("animating image -> video (this can take 1-3 min) ...");
  // No aspect_ratio: Kling i2v follows the source image's ratio (our still is 21:9).
  const out = await falRun("fal-ai/kling-video/v2.1/standard/image-to-video", {
    prompt: motion,
    image_url,
    duration: "5",
  });
  const url = out.video?.url || out.videos?.[0]?.url;
  if (!url) throw new Error("no video url: " + JSON.stringify(out).slice(0, 300));
  const base = /^https?:\/\//.test(imageArg)
    ? "hero"
    : path.basename(imageArg).replace(/\.[^.]+$/, "");
  const dest = path.join(OUT_DIR, `${base}.mp4`);
  const bytes = await download(url, dest);
  console.log(`saved ${dest} (${(bytes / 1024 / 1024).toFixed(1)} MB)`);
}

// --- Refinement pass: kill the AI tells (smeared books, extra fingers) -------
const PHOTOREAL =
  "a real photograph, photorealistic, captured on Hasselblad medium format, " +
  "razor-sharp focus on the foreground falling into creamy shallow-DOF bokeh, " +
  "authentic natural imperfections, no CGI, no render, no AI artifacts";

const LIBRARY_V2 = [
  {
    name: "lib2-1",
    prompt: `A grand private law library at golden hour, a tall window pouring a warm shaft of light with fine dust motes suspended in it, an antique desk and an empty leather chair in the foreground, walls of leather-bound volumes dissolving into soft out-of-focus bokeh behind, deep espresso shadow on the left third, ${PHOTOREAL}, ${STYLE}`,
  },
  {
    name: "lib2-2",
    prompt: `Interior of a distinguished wood-panelled study, late golden light raking through a tall sash window, dust drifting in the beam, foreground mahogany desk crisp and sharp, the bookshelves deliberately thrown far out of focus into warm bokeh so no individual spines read, quiet and reverent, deep shadow left, ${PHOTOREAL}, ${STYLE}`,
  },
  {
    name: "lib2-3",
    prompt: `A scholar's library bathed in warm golden-hour light, a single dramatic shaft from a tall window with floating dust, shelves of genuinely realistic worn leather books in soft shadow, an old desk and reading chair, cinematic and expensive, deep espresso shadow on the left for text, ${PHOTOREAL}, ${STYLE}`,
  },
];

const CHESS_V2 = [
  {
    name: "chess2-pinch",
    prompt: `Extreme close-up: just the fingertips of one hand pinching the very top of a carved wooden chess knight to move it, only a thumb and one index finger touching the piece, the rest of the hand out of frame, warm espresso timber board, dramatic golden-hour side light, very shallow depth of field, ${PHOTOREAL}, ${STYLE}`,
  },
  {
    name: "chess2-grip",
    prompt: `A single well-groomed male hand lifting a wooden chess piece, anatomically perfect hand with exactly four fingers and one thumb, natural relaxed grip, no extra fingers, warm espresso chessboard, golden-hour side light, shallow depth of field, ${PHOTOREAL}, ${STYLE}`,
  },
  {
    name: "chess2-side",
    prompt: `Side view of one hand resting fingertips on a wooden chess piece mid-decision, seen from the side so only the side profile of the hand shows, exactly five fingers, elegant and deliberate, warm timber board, golden-hour light, shallow depth of field, ${PHOTOREAL}, ${STYLE}`,
  },
  {
    name: "chess2-back",
    prompt: `A hand viewed from behind the knuckles gently moving a carved wooden chess piece, natural anatomy, exactly five fingers no more, warm espresso board, dramatic golden side light, shallow depth of field, ${PHOTOREAL}, ${STYLE}`,
  },
];

// --- Chess realism pass: ditch glossy Flux for genuinely photoreal models ----
// The polished/airbrushed look came from Flux + "premium/cinematic" language.
// Here we use top photoreal models (GPT Image 1.5, Seedream v4) and prompt for
// candid documentary realism: real skin texture, no retouching.
const CHESS_REAL =
  "A candid, photorealistic documentary close-up photograph of a middle-aged " +
  "man's hand about to move a wooden chess piece on a wooden chessboard. " +
  "Real human skin with natural texture, visible pores, fine wrinkles, knuckle " +
  "creases and subtle veins, NOT airbrushed, no retouching, no smooth plastic " +
  "skin, realistic minor imperfections. Anatomically correct hand with exactly " +
  "five fingers, one thumb, natural relaxed pose. Soft natural window light, " +
  "warm wood tones, shot on a 50mm lens at f4 with natural depth of field, " +
  "true-to-life colours, real photograph not a render.";

// Same as the chosen chess3-gpt-1 shot, but the hand is South Asian / Indian
// (the client, Dr Sridaran, is of Indian descent). Knight move, real game board.
const CHESS_INDIAN =
  "A candid, photorealistic documentary close-up photograph of a middle-aged " +
  "Indian (South Asian) man's hand about to move a wooden knight chess piece on " +
  "a wooden chessboard with other pieces in play. Warm brown South Asian skin " +
  "with natural texture, visible pores, fine wrinkles, knuckle creases and " +
  "subtle veins, NOT airbrushed, no retouching, no smooth plastic skin, " +
  "realistic minor imperfections. Anatomically correct hand with exactly five " +
  "fingers, one thumb, natural relaxed pose. Soft natural window light, warm " +
  "wood tones, shot on a 50mm lens at f4 with natural depth of field, " +
  "true-to-life colours, real photograph not a render.";

async function cmdChess4() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log("chess (Indian hand): GPT Image 1.5 ...");
  for (let i = 1; i <= 4; i++) {
    try {
      await genWith("fal-ai/gpt-image-1.5", `chess4-${i}`, {
        prompt: CHESS_INDIAN,
        image_size: "1536x1024",
        quality: "high",
        output_format: "jpeg",
      });
    } catch (e) { console.error(`  FAILED chess4-${i}: ${e.message}`); }
  }
  console.log("done. review chess4-* in public/generated/.");
}

async function genWith(model, name, input, ext = "jpg") {
  console.log(`  ${name} via ${model} ...`);
  const out = await falRun(model, input);
  const url = out.images?.[0]?.url;
  if (!url) throw new Error(`no url for ${name}: ${JSON.stringify(out).slice(0, 300)}`);
  const dest = path.join(OUT_DIR, `${name}.${ext}`);
  const bytes = await download(url, dest);
  console.log(`  saved ${dest} (${(bytes / 1024).toFixed(0)} KB)`);
}

async function cmdChess3() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log("chess realism: GPT Image 1.5 ...");
  for (let i = 1; i <= 2; i++) {
    try {
      await genWith("fal-ai/gpt-image-1.5", `chess3-gpt-${i}`, {
        prompt: CHESS_REAL,
        image_size: "1536x1024",
        quality: "high",
        output_format: "jpeg",
      });
    } catch (e) { console.error(`  FAILED gpt-${i}: ${e.message}`); }
  }
  console.log("chess realism: Seedream v4 ...");
  for (let i = 1; i <= 2; i++) {
    try {
      await genWith("fal-ai/bytedance/seedream/v4/text-to-image", `chess3-seedream-${i}`, {
        prompt: CHESS_REAL,
        image_size: "landscape_4_3",
      });
    } catch (e) { console.error(`  FAILED seedream-${i}: ${e.message}`); }
  }
  console.log("done. review chess3-* in public/generated/.");
}

async function cmdRefine() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log("library v2 (21:9) ...");
  for (const v of LIBRARY_V2) {
    try { await genStill(v, "21:9"); } catch (e) { console.error(`  FAILED ${v.name}: ${e.message}`); }
  }
  console.log("chess v2 (4:3) ...");
  for (const v of CHESS_V2) {
    try { await genStill(v, "4:3"); } catch (e) { console.error(`  FAILED ${v.name}: ${e.message}`); }
  }
  console.log("done. review in public/generated/.");
}

async function cmdConcepts() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log("generating hero concept A + B (21:9) ->", OUT_DIR);
  for (const v of [...HERO_A, ...HERO_B]) {
    try {
      await genStill(v, "21:9");
    } catch (e) {
      console.error(`  FAILED ${v.name}: ${e.message}`);
    }
  }
  console.log("generating chess (4:3) ...");
  for (const v of CHESS) {
    try {
      await genStill(v, "4:3");
    } catch (e) {
      console.error(`  FAILED ${v.name}: ${e.message}`);
    }
  }
  console.log("done. review options in public/generated/.");
}

const [cmd, ...rest] = process.argv.slice(2);
const run = {
  verify: () => cmdVerify(),
  hero: () => cmdHero(),
  concepts: () => cmdConcepts(),
  refine: () => cmdRefine(),
  chess3: () => cmdChess3(),
  chess4: () => cmdChess4(),
  animate: () => cmdAnimate(rest[0], rest[1]),
};
(run[cmd] || (() => {
  console.log("commands: verify | hero | animate <image> [prompt]");
  process.exit(1);
}))().catch((e) => {
  console.error("ERROR:", e.message);
  process.exit(1);
});
