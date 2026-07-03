# Premium Homepage 10x Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the homepage as a seven-act guided journey in the Quiet-Luxury register with Zodiak + General Sans type, per `docs/superpowers/specs/2026-07-03-premium-homepage-10x-design.md`.

**Architecture:** Next.js 15 App Router site on branch `redesign-v2`. Homepage acts are React server components in `src/components/sections/`; motion is client components in `src/components/motion/` riding GSAP/ScrollSmoother. Merged acts become NEW components (`PeopleAct`, `ProofAct`, `ConversationAct`) — the old section components are NOT deleted (inner pages still use `CaseInPoint`, `HowItWorks`, `PublishedThinking`, `VoicePullQuote`).

**Tech Stack:** Next.js 15, Tailwind v4 (`@theme` in globals.css), GSAP (ScrollSmoother/SplitText/DrawSVG), next/font (localFont), vitest.

## Global Constraints

- Branch: `redesign-v2`. **Deploy is HELD** — never run `vercel` in this plan.
- No em-dashes anywhere in content (vitest guard in `src/lib/content.test.ts` enforces).
- Every motion path must degrade static-correct: keep `data-anim`/`.is-visible` no-JS pattern and `usePrefersReducedMotion` gates.
- Reuse existing approved copy verbatim when merging; trims allowed, rewrites not.
- Max 3 type levels per viewport; italic+red = one emphasis per act.
- Scheme rhythm on homepage: dark → cream → paper → cream → dark → paper → red.
- Kill list: count-up stats, non-hero parallax, hover effects beyond 150ms color/hairline.
- Gate on every task: `npm run lint` clean, `npx vitest run` green, `npx next build` completes 16 pages.
- Commit after every task. Windows: run npm/npx via PowerShell or bash as available.

---

### Task 1: Commit the in-flight design tokens

The working tree already contains the espresso tokens, `.scheme-red`, and the `.section`/`.section-major` scale (uncommitted edits to `src/app/globals.css` + `src/components/sections/Hero.tsx`). Also add the missing `.scheme-paper`.

**Files:**
- Modify: `src/app/globals.css` (add `.scheme-paper` after `.scheme-sand`, ~line 52)
- Already-modified: `src/components/sections/Hero.tsx` (token swap, keep as-is)

**Interfaces:**
- Produces: CSS classes `.section`, `.section-major`, `.scheme-paper`, `.scheme-red`; tokens `--color-espresso-deep`, `--color-espresso-soft`. All later tasks use these.

- [ ] **Step 1: Add `.scheme-paper`** to `src/app/globals.css` directly after the `.scheme-sand` block:

```css
.scheme-paper {
  --bg: var(--color-white);
  --fg: var(--color-espresso);
  --muted: color-mix(in srgb, var(--color-espresso) 70%, var(--color-white));
  --accent: var(--color-brand-red);
  --hairline: #eee6d8;
  background-color: var(--bg);
  color: var(--fg);
}
```

- [ ] **Step 2: Verify** — run `npm run lint && npx vitest run && npx next build`. Expected: lint clean, 23 tests pass, build 16 pages.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/components/sections/Hero.tsx
git commit -m "Tokens: espresso-deep/soft, scheme-red/paper, section spacing scale"
```

---

### Task 2: Type swap — Zodiak + General Sans (self-hosted)

**Files:**
- Create: `src/fonts/` (woff2 files: `Zodiak-Variable.woff2`, `Zodiak-VariableItalic.woff2`, `GeneralSans-Variable.woff2`, `GeneralSans-VariableItalic.woff2`)
- Modify: `src/lib/fonts.ts` (full rewrite below)
- Modify: `src/app/globals.css:22-27` (@theme font vars)

**Interfaces:**
- Produces: exports `zodiak`, `generalSans`, `spaceMono`, `archivo`, `fontVariables` from `src/lib/fonts.ts`. CSS vars `--font-zodiak`, `--font-general-sans`. `--font-serif`/`--font-display` resolve to Zodiak; `--font-sans` to General Sans. No component-level changes needed (everything consumes `font-serif`/`font-sans`/`font-display` utilities).

- [ ] **Step 1: Download the fonts** (Fontshare free license):

```bash
cd "/d/Dev/MS Accountants"
mkdir -p src/fonts .tmp/fonts
curl -L -o .tmp/fonts/zodiak.zip "https://api.fontshare.com/v2/fonts/download/zodiak"
curl -L -o .tmp/fonts/general-sans.zip "https://api.fontshare.com/v2/fonts/download/general-sans"
unzip -o .tmp/fonts/zodiak.zip -d .tmp/fonts/zodiak
unzip -o .tmp/fonts/general-sans.zip -d .tmp/fonts/general-sans
# Locate the VARIABLE woff2s (paths inside the zip look like Zodiak_Complete/Fonts/WEB/fonts/Zodiak-Variable.woff2)
find .tmp/fonts -iname "*variable*.woff2"
# Copy the four files:
cp "$(find .tmp/fonts/zodiak -iname 'Zodiak-Variable.woff2' | head -1)" src/fonts/
cp "$(find .tmp/fonts/zodiak -iname 'Zodiak-VariableItalic.woff2' | head -1)" src/fonts/
cp "$(find .tmp/fonts/general-sans -iname 'GeneralSans-Variable.woff2' | head -1)" src/fonts/
cp "$(find .tmp/fonts/general-sans -iname 'GeneralSans-VariableItalic.woff2' | head -1)" src/fonts/
ls src/fonts
```

Expected: 4 woff2 files in `src/fonts/`. If exact names differ, use what `find` returns (variable + variable-italic for each family) and adjust paths in Step 2 to match.

- [ ] **Step 2: Rewrite `src/lib/fonts.ts`:**

```ts
import localFont from "next/font/local";
import { Space_Mono, Archivo } from "next/font/google";

// Display + headline serif — Zodiak (Indian Type Foundry via Fontshare).
// Sharp, high-contrast; the barrister's serif. Variable weight + true italic.
export const zodiak = localFont({
  src: [
    { path: "../fonts/Zodiak-Variable.woff2", style: "normal" },
    { path: "../fonts/Zodiak-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-zodiak",
  display: "swap",
});

// UI grotesk — General Sans. Nav, labels, body, buttons.
export const generalSans = localFont({
  src: [
    { path: "../fonts/GeneralSans-Variable.woff2", style: "normal" },
    { path: "../fonts/GeneralSans-VariableItalic.woff2", style: "italic" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

// Eyebrows / mono labels — kept for tabular/footnote figures only.
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

// Logo wordmark — heavy grotesque (unchanged).
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const fontVariables = [
  zodiak.variable,
  generalSans.variable,
  spaceMono.variable,
  archivo.variable,
].join(" ");
```

- [ ] **Step 3: Update `src/app/globals.css` @theme font vars** (lines 22-27) to:

```css
  /* Type families (next/font vars set in layout) */
  --font-sans: var(--font-general-sans), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-zodiak), Georgia, "Times New Roman", serif;
  --font-display: var(--font-zodiak), Georgia, serif;
  --font-mono: var(--font-space-mono), ui-monospace, monospace;
  --font-logo: var(--font-archivo), ui-sans-serif, system-ui, sans-serif;
```

Also update the header comment block (lines 4-8) to name Zodiak/General Sans, and in `h1,h2,h3,h4` (line ~124) change `font-weight: 500` to `font-weight: 400` (Zodiak carries more contrast; 400 is the display cut). Remove `font-optical-sizing: auto` (no opsz axis).

- [ ] **Step 4: Check layout consumes `fontVariables`** — `grep -n "fontVariables\|newsreader\|schibsted" src/app/layout.tsx src/lib/motion/*.ts src/components -r`. Fix any import of the removed `newsreader`/`schibsted` exports (expected: only `layout.tsx` uses `fontVariables`; nothing else imports font objects). SplitText already waits on `document.fonts.ready` — verify with `grep -rn "fonts.ready" src/`.

- [ ] **Step 5: Verify** — `npm run lint && npx vitest run && npx next build`, then `npx next dev` briefly / or check `.next` output; confirm no `next/font` errors. Expected: build 16 pages, Zodiak renders (spot-check by grepping built CSS for `--font-zodiak`).

- [ ] **Step 6: Commit**

```bash
git add src/fonts src/lib/fonts.ts src/app/globals.css
git commit -m "Type: retire Newsreader/Schibsted for Zodiak + General Sans (self-hosted)"
```

---

### Task 3: Act I — Hero (Quiet-Luxury split + authority strip)

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx` (remove `AuthorityMarquee`)

**Interfaces:**
- Consumes: `site`, `authorityItems` from `@/lib/site`; existing `HeroTimeline`, `HeroBackground`, `SplitHeadline`, `Button`, `EyebrowTag`, `Container`.
- Produces: `Hero` renders the full Act I including the authority strip; `AuthorityMarquee` no longer used on the homepage (component file kept).

- [ ] **Step 1: Restructure Hero content** — in `src/components/sections/Hero.tsx`, replace the content `<div className="relative z-10 ...">` block (lines 40-89) with the split layout: claim left, credentials hairline panel right, one CTA, authority strip on the bottom edge. Keep the background block (lines 17-37) untouched.

```tsx
        {/* Content — Quiet-Luxury split: claim left, credentials panel right. */}
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-28">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[1.55fr_0.95fr] lg:gap-16">
              <div>
                <div data-hero="rise">
                  <EyebrowTag>Tax &middot; Advisory &middot; Disputes</EyebrowTag>
                </div>
                <SplitHeadline
                  as="h1"
                  splitType="lines"
                  className="mt-8 max-w-[18ch] font-serif text-[2.7rem] leading-[0.98] text-cream sm:text-6xl lg:text-[5.5rem]"
                  emClassName="headline-em text-red-bright"
                  segments={[
                    { text: "Your accountant should know tax. Ours" },
                    { text: "wrote the thesis", em: true },
                    { text: "on it, and is a lawyer too." },
                  ]}
                />
                <div data-hero="rise" className="mt-11">
                  <Button href={site.ctaHref}>{site.cta}</Button>
                </div>
              </div>

              {/* Credentials hairline panel — fades in after the claim. */}
              <div
                data-hero="rise"
                className="hidden flex-col gap-7 border-l border-cream/15 pl-8 lg:flex"
              >
                <div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45">
                    Principal
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-cream/85">
                    Dr Maheswaran Sridaran
                    <br />
                    PhD (tax law) &middot; Chartered Accountant &middot; Lawyer
                  </p>
                </div>
                <div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45">
                    The practice
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-cream/85">
                    Over 45 years across more than five countries, the early
                    years with two of the Big Four. Nothing leaves the firm
                    without passing under his eye.
                  </p>
                </div>
                <div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45">
                    Based
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-cream/85">
                    Sydney, servicing nationally
                  </p>
                </div>
              </div>
            </div>
          </Container>

          {/* Authority strip — replaces the AuthorityMarquee section. */}
          <div data-hero="rise" className="absolute inset-x-0 bottom-0">
            <Container>
              <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-cream/15 py-5">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45">
                  As cited in
                </span>
                {authorityItems.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cream/55"
                  >
                    {item}
                  </span>
                ))}
                <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45 sm:inline">
                  Sydney, Australia
                </span>
              </div>
            </Container>
          </div>
        </div>
```

Update the import line: `import { site, authorityItems } from "@/lib/site";` (check `authorityItems` is exported from `src/lib/site.ts` — it is; `AuthorityMarquee.tsx` imports it today). The mobile credentials panel is intentionally hidden (`hidden lg:flex`) — on mobile the claim + CTA carry the hero.

- [ ] **Step 2: Remove AuthorityMarquee from the homepage** — in `src/app/page.tsx` delete the import line and the `<AuthorityMarquee />` element. Do NOT delete the component file.

- [ ] **Step 3: Verify** — gate commands; then `npx next dev` and eyeball `/` (hero split renders, strip pinned at bottom, no marquee band below hero). Expected: lint/tests/build green.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx src/app/page.tsx
git commit -m "Act I: quiet-luxury hero split + authority strip; retire marquee band"
```

---

### Task 4: Act II — Thesis absorbs the voice line

**Files:**
- Modify: `src/components/sections/Statement.tsx`
- Modify: `src/app/page.tsx` (remove `VoicePullQuote`)

**Interfaces:**
- Consumes: existing `SplitHeadline`, `EyebrowTag`, `Container`.
- Produces: `Statement` = Act II, `.section-major`, cream; contains the italic red voice line + attribution.

**PRE-FLIGHT DECISION (governs over the code below):** Do not hardcode the voice quote. Add `export const voiceQuote = { text: "Are Capital Gains Equitably Taxed in Australia?", attribution: "Dr Maheswaran Sridaran · his first book, 2012" };` to `src/lib/site.ts` (follow the file's existing export style; read it first). Import `voiceQuote` in `Statement.tsx` and render `voiceQuote.text` / `voiceQuote.attribution`. Also update `src/components/sections/VoicePullQuote.tsx` so its `text`/`attribution` prop defaults reference `voiceQuote.text`/`voiceQuote.attribution` (single source of truth; VoicePullQuote is retained for inner pages). Commit both files together with Statement.

- [ ] **Step 1: Rewrite `Statement.tsx`:**

```tsx
import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { Reveal } from "@/components/motion/Reveal";

export function Statement() {
  return (
    <section className="scheme-cream section-major">
      <Container>
        <EyebrowTag>What we do</EyebrowTag>
        <SplitHeadline
          as="h2"
          splitType="lines,words"
          className="mt-10 max-w-[20ch] font-display text-4xl leading-[1.08] text-clay sm:max-w-[24ch] sm:text-6xl lg:text-7xl"
          segments={[
            {
              text: "Any firm can file a return. Far fewer can tell you, before you sign, what a sale, a restructure, or passing the business to your children will really cost you. That is the question that matters most. Most accountants answer it last. We answer it first.",
            },
          ]}
        />
        {/* His published voice — the act's single red emphasis. */}
        <Reveal className="mt-14 border-l-2 border-brand-red pl-6 sm:pl-8">
          <p className="max-w-[26ch] font-display text-2xl italic leading-[1.2] text-brand-red sm:text-3xl">
            &ldquo;Are Capital Gains Equitably Taxed in Australia?&rdquo;
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Dr Maheswaran Sridaran &middot; his first book, 2012
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Remove `VoicePullQuote` from `src/app/page.tsx`** (import + element). Component file stays (About page rhythm may use it later).

- [ ] **Step 3: Verify** gate commands + visual check of `/`.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Statement.tsx src/app/page.tsx
git commit -m "Act II: thesis absorbs the voice pull-quote"
```

---

### Task 5: Act III — Services as a numbered editorial index

**Files:**
- Modify: `src/components/sections/ServiceList.tsx`

**Interfaces:**
- Consumes: `services` from `@/lib/services` (fields used: `slug`, `navTitle`, `teaserBlurb`, `flagship`).
- Produces: `ServiceList` = Act III, `.scheme-paper .section`, no icons/cards.

- [ ] **Step 1: Rewrite `ServiceList.tsx`** — drop `Icon`/`ICONS`, the red wash, and the card feel; keep the numbered rows as a strict index. Hover = 150ms color shift only (kill-list compliance):

```tsx
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { services } from "@/lib/services";

export function ServiceList() {
  return (
    <section className="scheme-paper section">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EyebrowTag>Services</EyebrowTag>
            <h2 className="mt-6 max-w-[16ch] font-serif text-4xl leading-[1.05] sm:text-5xl">
              Five disciplines, one principal on every file.
            </h2>
          </div>
          <Button href="/services" variant="secondary" className="shrink-0">
            Explore all services
          </Button>
        </Reveal>

        <Stagger className="mt-16 border-t border-[var(--hairline)]">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex items-baseline gap-6 border-b border-[var(--hairline)] py-8 sm:gap-10"
            >
              <span className="w-8 shrink-0 font-mono text-sm tabular-nums text-brand-red">
                0{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-2xl leading-tight transition-colors duration-150 group-hover:text-brand-red sm:text-[1.75rem]">
                  {s.navTitle}
                  {s.flagship && (
                    <span className="ml-3 align-middle font-mono text-[0.58rem] uppercase tracking-[0.18em] text-brand-red">
                      Flagship
                    </span>
                  )}
                </h3>
                <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--muted)]">
                  {s.teaserBlurb}
                </p>
              </div>
            </Link>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
```

Note: `ServiceList` is homepage-only (verify with `grep -rn "ServiceList" src/app src/components`); if another page imports it, this restyle applies there too and that is acceptable.

- [ ] **Step 2: Verify** gate commands + visual check.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/ServiceList.tsx
git commit -m "Act III: services as numbered editorial index (icons/cards retired)"
```

---

### Task 6: Act IV — PeopleAct (principal + bench + credentials, merged)

**Files:**
- Create: `src/components/sections/PeopleAct.tsx`
- Modify: `src/app/page.tsx` (swap `AboutTeaser` + `BenchStrip` + `CredentialTranslation` for `PeopleAct`)

**Interfaces:**
- Consumes: `team`, `teamCollective`, `credentialCards` from `@/lib/site` (NOT `valueStats` — count-ups are killed); `Monogram`, `Button`, `EyebrowTag`, `Reveal`, `Stagger`, `Container`.
- Produces: `export function PeopleAct(): JSX.Element` — Act IV, `.scheme-cream .section`.

- [ ] **Step 1: Create `src/components/sections/PeopleAct.tsx`:**

```tsx
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Monogram } from "@/components/ui/Monogram";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { team, teamCollective, credentialCards } from "@/lib/site";

/**
 * Act IV — The People. One act, one message: the team builds, he reviews.
 * Merges the old AboutTeaser + CredentialTranslation + BenchStrip stops.
 */
export function PeopleAct() {
  const bench = team.filter((m) => !m.featured);

  return (
    <section className="scheme-cream section">
      <Container>
        {/* The principal */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* IMAGE SLOT: real portrait lands here (photo shoot in progress). */}
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#7b3d2c,#3a2419)]">
              <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:20px_20px]" />
              <span className="absolute bottom-5 left-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cream/70">
                Dr Maheswaran Sridaran &middot; portrait to follow
              </span>
            </div>
          </Reveal>

          <Reveal className="flex flex-col items-start justify-center">
            <EyebrowTag>The principal</EyebrowTag>
            <h2 className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl">
              Why an accountant and lawyer chose to run a small firm.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
              People with his background usually end up in a corner office at a
              global firm. He built the opposite: a practice small enough that
              his own eyes pass over every piece of work that leaves it.
            </p>
            {/* Credentials, translated — three compact lines. */}
            <dl className="mt-9 w-full max-w-xl space-y-4 border-t border-[var(--hairline)] pt-7">
              {credentialCards.slice(0, 3).map((card) => (
                <div key={card.title} className="flex gap-5">
                  <dt className="w-28 shrink-0 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-brand-red">
                    {card.title}
                  </dt>
                  <dd className="text-sm leading-relaxed text-[var(--muted)]">
                    {card.body}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-9">
              <Button href="/about" variant="secondary">
                Read the full story
              </Button>
            </div>
          </Reveal>
        </div>

        {/* The bench — the five people behind the files he reviews. */}
        <Reveal className="mt-24 max-w-3xl">
          <EyebrowTag>{teamCollective.eyebrow}</EyebrowTag>
          <h3 className="mt-6 font-serif text-3xl leading-[1.08] sm:text-4xl">
            {teamCollective.heading}
          </h3>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {bench.map((member) => (
            <div key={member.slug}>
              <Monogram
                initials={member.initials}
                name={member.name}
                photo={member.photo}
                sizes="(min-width: 1024px) 18vw, 45vw"
              />
              <h4 className="mt-5 font-serif text-lg leading-snug">
                {member.name}
              </h4>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-red">
                {member.role}
              </p>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                {member.credentialShort}
              </p>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
```

Check `credentialCards` shape first (`grep -n "credentialCards" src/lib/site.ts` and read the entries): if titles are long sentences rather than short labels, swap `card.title` into the `dd` and use a hand-written 1-2 word `dt` per entry (PhD / CA / Lawyer) while keeping `card.body` verbatim.

- [ ] **Step 2: Update `src/app/page.tsx`** — remove imports/elements for `AboutTeaser`, `BenchStrip`, `CredentialTranslation`; add `PeopleAct` in their slot.

- [ ] **Step 3: Verify** gate commands. Watch vitest: if content tests referenced the removed homepage structure, update them to point at `PeopleAct` content (keep assertions on the same copy strings).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/PeopleAct.tsx src/app/page.tsx src/lib/content.test.ts
git commit -m "Act IV: PeopleAct merges principal, credentials, and bench"
```

---

### Task 7: Act V — ProofAct (case + testimonial + publications footnote)

**Files:**
- Create: `src/components/sections/ProofAct.tsx`
- Modify: `src/app/page.tsx` (swap `CaseInPoint` + `Testimonial` + `PublishedThinking` for `ProofAct`)

**Interfaces:**
- Consumes: `getTestimonial`, `testimonials`, `publications` from `@/lib/site`; `Icon`, `EyebrowTag`, `Reveal`, `SplitHeadline`, `Container`.
- Produces: `export function ProofAct(): JSX.Element` — Act V, `.scheme-espresso .section-major` with espresso-deep background override.

**PRE-FLIGHT DECISION (governs over the code below):** Do not hardcode the case `frame` sentence. Add `export const caseFrame = "When the ATO and the Office of State Revenue both opened audits, the response had to be comprehensive, correct, and cost-effective.";` to `src/lib/site.ts` (follow existing export style). Import `caseFrame` in `ProofAct.tsx` and pass it into the `SplitHeadline` segment. Also update `src/components/sections/CaseInPoint.tsx` so its `frame` prop default references `caseFrame` (single source of truth; CaseInPoint is retained for inner pages). Commit both files together with ProofAct.

- [ ] **Step 1: Create `src/components/sections/ProofAct.tsx`:**

```tsx
import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { getTestimonial, testimonials, publications } from "@/lib/site";

/**
 * Act V — Proof. The dark drama band mid-scroll: the Neda Morris case as
 * centerpiece, a second client voice as counter-signature, and his published
 * titles as a footnote row. Merges CaseInPoint + Testimonial + PublishedThinking.
 */
export function ProofAct() {
  const caseTestimonial = getTestimonial("Ms Neda Morris");
  const counter = testimonials.find((t) => t.name !== "Ms Neda Morris");

  return (
    <section className="scheme-espresso section-major bg-espresso-deep">
      <Container size="narrow">
        <Reveal className="flex flex-col items-start">
          <EyebrowTag>A case in point</EyebrowTag>
          <SplitHeadline
            as="h2"
            className="mt-7 font-serif text-3xl leading-[1.12] text-[var(--fg)] sm:text-4xl"
            segments={[
              {
                text: "When the ATO and the Office of State Revenue both opened audits, the response had to be comprehensive, correct, and cost-effective.",
              },
            ]}
          />

          {caseTestimonial && (
            <figure className="mt-11 border-l-2 border-red-bright pl-6 sm:pl-8">
              <Icon name="quote" size={22} className="text-red-bright" />
              <blockquote className="mt-4 font-display text-xl leading-[1.34] text-cream/90 sm:text-2xl">
                &ldquo;{caseTestimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7">
                <p className="font-serif text-lg text-[var(--fg)]">
                  {caseTestimonial.name}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {caseTestimonial.role}
                  {caseTestimonial.role && caseTestimonial.company ? " · " : ""}
                  {caseTestimonial.company}
                </p>
              </figcaption>
            </figure>
          )}

          {/* Counter-signature: a second voice, kept quiet. */}
          {counter && (
            <blockquote className="mt-14 max-w-2xl border-t border-[var(--hairline)] pt-8">
              <p className="text-base leading-relaxed text-[var(--muted)]">
                &ldquo;{counter.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <p className="font-serif text-base text-[var(--fg)]">
                  {counter.name}
                </p>
                <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {counter.role}
                  {counter.role && counter.company ? " · " : ""}
                  {counter.company}
                </p>
              </footer>
            </blockquote>
          )}

          {/* Published record — footnote row, real titles. */}
          <div className="mt-14 w-full border-t border-[var(--hairline)] pt-7">
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--muted)]">
              His published record
            </div>
            <ul className="mt-4 space-y-2">
              {publications.slice(0, 3).map((p) => (
                <li
                  key={p.title}
                  className="font-mono text-xs leading-relaxed tracking-[0.04em] text-cream/60"
                >
                  &ldquo;{p.title}&rdquo; &middot; {p.outlet} &middot; {p.year}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

Check `testimonials` ordering (`grep -n "testimonials" src/lib/site.ts`): `counter` must be a real, distinct client. If the featured Testimonial section used `testimonials[0]` and that IS Neda Morris, `find` handles it; just confirm the chosen counter quote reads well at this length (trim via the existing data, do not rewrite).

- [ ] **Step 2: Update `src/app/page.tsx`** — remove imports/elements for `CaseInPoint`, `Testimonial`, `PublishedThinking`; add `ProofAct`. (All three component files stay — inner pages use them.)

- [ ] **Step 3: Verify** gate commands; update `content.test.ts` if homepage-structure assertions broke.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/ProofAct.tsx src/app/page.tsx src/lib/content.test.ts
git commit -m "Act V: ProofAct merges case, testimonial, and published record"
```

---

### Task 8: Act VI — How, compressed to one rail

**Files:**
- Create: `src/components/sections/HowRail.tsx`
- Modify: `src/app/page.tsx` (swap `HowItWorks` for `HowRail`)

**Interfaces:**
- Consumes: `EyebrowTag`, `Reveal`, `Stagger`, `LineDraw`, `Container`. Steps copy is duplicated verbatim from `HowItWorks.tsx` (that component keeps its own copy for inner pages).
- Produces: `export function HowRail(): JSX.Element` — Act VI, `.scheme-paper .section`, ~10s read: three steps on one hairline rail, contrast table dropped from the homepage.

**PRE-FLIGHT DECISION (governs over the code below):** Do not duplicate the `steps` array. Add `export const howItWorksSteps = [ ...the three {title, body} objects... ];` to `src/lib/site.ts` (move the exact array from `HowItWorks.tsx`, follow existing export style). Import `howItWorksSteps` in BOTH `HowRail.tsx` (this task) and `HowItWorks.tsx` (replace its local `const steps` with the import; leave its `contrast` array local). This is the single source of truth for the step copy. Commit `HowItWorks.tsx` + `site.ts` together with `HowRail.tsx`.

- [ ] **Step 1: Create `src/components/sections/HowRail.tsx`:**

```tsx
import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { LineDraw } from "@/components/motion/LineDraw";

/**
 * Act VI — How. Three steps on one hairline rail; a ten-second read.
 * The homepage-compressed sibling of HowItWorks (which inner pages keep).
 */
const steps = [
  {
    title: "You speak with the principal.",
    body: "Not an account manager, and not a rotating cast. From the first conversation, you deal with Dr Sridaran.",
  },
  {
    title: "The position is modelled before you commit.",
    body: "The tax consequences of a sale or restructure are worked out in advance, as the courts would read them, with no surprises after you sign.",
  },
  {
    title: "He stays on the file.",
    body: "The team prepares the work; he signs off on all of it. Even compliance-only clients receive senior time on the strategic issues each year.",
  },
];

export function HowRail() {
  return (
    <section className="scheme-paper section">
      <Container>
        <Reveal>
          <EyebrowTag>How it works</EyebrowTag>
          <h2 className="mt-7 max-w-[22ch] font-serif text-4xl leading-[1.06] sm:text-5xl">
            One principal. On your file, start to finish.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-10 border-t border-[var(--hairline)] pt-10 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title}>
              <LineDraw className="h-10 w-px bg-brand-red" />
              <div className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-brand-red">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-serif text-xl leading-snug">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-[var(--muted)]">
                {s.body}
              </p>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Update `src/app/page.tsx`** — swap `HowItWorks` for `HowRail`.

- [ ] **Step 3: Verify** gate commands.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/HowRail.tsx src/app/page.tsx
git commit -m "Act VI: HowRail, three steps on one hairline rail"
```

---

### Task 9: Act VII — ConversationAct (promise + CTA crescendo)

**Files:**
- Create: `src/components/sections/ConversationAct.tsx`
- Create: `src/components/motion/PromiseUnderline.tsx` (DrawSVG flourish)
- Modify: `src/app/page.tsx` (swap `PromiseBlock` + `FinalCTA` for `ConversationAct`)

**Interfaces:**
- Consumes: `site` from `@/lib/site`; `Button`, `Reveal`, `Container`; GSAP DrawSVGPlugin (already registered in `registerGsap()`); `usePrefersReducedMotion` from `@/lib/motion` (verify exact path: `grep -rn "usePrefersReducedMotion" src/ | head -3` and match it).
- Produces: `ConversationAct` — Act VII, `.scheme-red .section-major`, the page's single red band and single DrawSVG flourish. `PromiseUnderline` wraps a phrase and draws an SVG underline on scroll-enter.

- [ ] **Step 1: Create `src/components/motion/PromiseUnderline.tsx`** — model it directly on the existing `DrawUnderline.tsx` (read `src/components/motion/DrawUnderline.tsx` first; if it already accepts children + a color prop, SKIP this file and reuse `DrawUnderline` with a cream stroke). Only if `DrawUnderline` is hard-wired to brand-red, create this cream-stroke variant as a copy of that file with the stroke color changed to `var(--color-cream)` and the export renamed `PromiseUnderline`. No other behavior changes — same ScrollTrigger config, same reduced-motion gate.

**PRE-FLIGHT DECISION (governs over the code below):** Do not hardcode the promise headline/body. Add `export const promiseCopy = { headlineLead: "You hired the expert. You should", headlineEm: "get", headlineTail: "the expert", body: "Elsewhere, a partner wins the work and a junior does it. Here, Dr Sridaran reviews the quality on every engagement himself. That is the whole point of a boutique. The person whose name is on the door is the person on your file." };` to `src/lib/site.ts` (follow existing export style). Import `promiseCopy` in `ConversationAct.tsx` and render the headline as `{promiseCopy.headlineLead} <DrawUnderline><em ...>{promiseCopy.headlineEm}</em> {promiseCopy.headlineTail}</DrawUnderline>.` and the paragraph as `{promiseCopy.body}`. Also update `src/components/sections/PromiseBlock.tsx` to render the same `promiseCopy` values (single source of truth; PromiseBlock is retained for inner pages). Commit `PromiseBlock.tsx` + `site.ts` together with ConversationAct.

- [ ] **Step 2: Create `src/components/sections/ConversationAct.tsx`:**

```tsx
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { DrawUnderline } from "@/components/motion/DrawUnderline";
import { site } from "@/lib/site";

/**
 * Act VII — The Conversation. The single red band on the page: the promise
 * as the headline, the booking CTA as the only action. Merges
 * PromiseBlock + FinalCTA.
 */
export function ConversationAct() {
  return (
    <section className="scheme-red section-major">
      <Container>
        <Reveal className="flex flex-col items-start">
          <span className="eyebrow text-cream/70">
            <span className="eyebrow__dot" aria-hidden="true" />
            The promise
          </span>
          <h2 className="mt-7 max-w-[16ch] font-serif text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
            You hired the expert. You should{" "}
            <DrawUnderline>
              <em className="headline-em">get</em> the expert
            </DrawUnderline>
            .
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85">
            Elsewhere, a partner wins the work and a junior does it. Here, Dr
            Sridaran reviews the quality on every engagement himself. That is
            the whole point of a boutique. The person whose name is on the door
            is the person on your file.
          </p>
          <div className="mt-11">
            <Button
              href={site.ctaHref}
              variant="secondary"
              className="text-cream ring-cream/40 hover:bg-cream/10 hover:ring-cream/70"
            >
              {site.cta}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

Adjust the `DrawUnderline` usage to its real API (read the file first — if it takes a `text` prop instead of children, pass the phrase that way; if Step 1 created `PromiseUnderline`, import and use that instead). The chess image from `PromiseBlock` is retired on the homepage (single-focus band); the file `public/generated/chess4-1.jpg` stays on disk.

- [ ] **Step 3: Update `src/app/page.tsx`** — remove `PromiseBlock` + `FinalCTA`, add `ConversationAct` as the last section. Final `page.tsx`:

```tsx
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { ServiceList } from "@/components/sections/ServiceList";
import { PeopleAct } from "@/components/sections/PeopleAct";
import { ProofAct } from "@/components/sections/ProofAct";
import { HowRail } from "@/components/sections/HowRail";
import { ConversationAct } from "@/components/sections/ConversationAct";

// Seven acts: hook → thesis → the work → the people → proof → how → act.
// Scheme rhythm: dark → cream → paper → cream → dark → paper → red.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <ServiceList />
      <PeopleAct />
      <ProofAct />
      <HowRail />
      <ConversationAct />
    </>
  );
}
```

- [ ] **Step 4: Verify** gate commands; visual check that the red band closes the page and the underline draws once on enter (fresh scroll).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ConversationAct.tsx src/components/motion src/app/page.tsx
git commit -m "Act VII: ConversationAct crescendo; seven-act homepage assembled"
```

---

### Task 10: Motion polish + full verification packet

**Files:**
- Modify: `src/components/motion/Preloader.tsx` (Zodiak restyle: confirm it inherits `font-serif`; if it hard-codes Newsreader classes, swap to `font-serif`)
- Modify: `src/lib/content.test.ts` (only if earlier tasks left gaps)
- Test: whole site

**Interfaces:**
- Consumes: everything above.
- Produces: verified homepage; screenshots for the sign-off packet.

- [x] **Step 1: Kill-list sweep** — `grep -rn "CountUp\|data-speed" src/components/sections src/app/page.tsx`. Expected: `CountUp` unused by any homepage act (only `CredentialTranslation.tsx`, which the homepage no longer imports); `data-speed` only inside `Hero.tsx`. Fix any stragglers.

- [x] **Step 2: Reveal audit (one reveal per act)** — confirm each act uses a single `Reveal`/`SplitHeadline` group entrance; no nested `Stagger` inside `Stagger`. Adjust if any act double-animates.

- [x] **Step 3: Reduced-motion + no-JS** — `npx next build && npx next start`, then check the prerendered HTML: `curl -s http://localhost:3000 | grep -c "data-anim"` returns > 0 and the page content (all seven act headlines) is present in the HTML source. Also grep the built HTML for em-dashes: expect only the pre-existing Header `aria-label`.

- [x] **Step 4: Full gate** — `npm run lint && npx vitest run && npx next build`. Expected: clean / green / 16 pages.

- [ ] **Step 5: Screenshots** — viewport captures (NOT fullPage — broken on this site) of each act at 1440×900 and 390×844 into `.tmp/premium-10x/`, for the sign-off packet. (SKIPPED this pass; controller handles visual verification separately.)

- [x] **Step 6: Update memory + commit**

Append to `memory/progress.md` a dated HANDOFF entry (what shipped, verification results, deploy still HELD) and tick `task_plan.md`.

```bash
git add -A
git commit -m "Verify: seven-act premium homepage, full gate green (deploy held)"
```

---

## Self-review notes

- Spec coverage: fonts (T2), spacing/tokens (T1), all seven acts (T3-T9), motion rules + kill list + verification (T10), deploy-held (global constraints). Out-of-scope items (inner pages, headshots) correctly absent.
- Data-shape checks are built into T6/T7/T9 (credentialCards, testimonials, DrawUnderline API) since those shapes were not fully read at plan time — each task verifies before using.
- Old section components intentionally retained for inner pages; only `page.tsx` wiring changes.
