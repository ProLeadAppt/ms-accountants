# Inner-Page Elevation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring every inner page up to the premium homepage's motion and composition — a crescendo close, drama bands, image parallax, and hover parity — and fix the two interaction gaps (`#team` anchor, universal scroll-to-top).

**Architecture:** A small kit of moves applied per page, reusing existing components (`SplitHeadline`, `WordReveal`, ScrollSmoother `data-speed`, `.scheme-espresso-deep`). No new copy or page structure. The one shared closer (`FinalCTA`) is elevated once and inherited everywhere.

**Tech Stack:** Next 16 (App Router), React 19, GSAP 3.15 (ScrollSmoother/ScrollTrigger already registered), Tailwind v4, Vitest.

## Global Constraints

- **Branch:** `redesign-v2`. No merge to `master`, no deploy (operator-gated).
- **Composition + motion only.** No copy changes, no page-structure changes beyond removing the retired `AuthorityMarquee` and the duplicate `PromiseBlock` close on About. Type scale and scheme tokens unchanged.
- **No em-dashes** in copy (1/page baseline = Header aria-label). AU spelling.
- **Every motion path stays reduced-motion safe** (the components used already gate on `usePrefersReducedMotion()`).
- **Verification is the gate, not unit tests:** these are visual/composition changes with no meaningful unit to TDD. Each task ends green on `npm run lint` · `npx vitest run` 27/27 · `npx next build` 16 routes, plus a prerendered-HTML check where copy/structure is touched. Final proof is the localhost visual pass.
- **Standing rule:** finish by serving a **verified** localhost (poll to HTTP 200) and handing Tyson the URL before any Vercel talk.

## File Structure

- **Modify** `src/components/sections/FinalCTA.tsx` — elevate to the crescendo close (Task 1).
- **Modify** `src/components/sections/HowItWorks.tsx` — widen `scheme` union (Task 2).
- **Modify** `src/app/about/page.tsx` — retire marquee, drop duplicate close, drama band (Task 2).
- **Modify** `src/app/services/[slug]/page.tsx` — drama band, parallax, WordReveal (Task 3).
- **Modify** `src/app/services/page.tsx` — card arrow parity (Task 4).
- **Modify** `src/components/motion/ScrollReset.tsx` — `#anchor` scroll under ScrollSmoother (Task 5).

---

### Task 1: Crescendo close — elevate `FinalCTA`

**Files:**
- Modify: `src/components/sections/FinalCTA.tsx`

**Interfaces:**
- Consumes: `SplitHeadline` (already imported) with `underline` + em segment.

- [ ] **Step 1: Elevate the section**

Replace the `<section>` open tag and the `<SplitHeadline>` in `src/components/sections/FinalCTA.tsx`:

```tsx
    <section className="scheme-espresso-deep py-28 lg:py-40">
      <Container>
        <Reveal className="flex flex-col items-start">
          <EyebrowTag>Book a conversation</EyebrowTag>
          <SplitHeadline
            as="h2"
            underline
            className="mt-7 max-w-[16ch] font-serif text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl"
            emClassName="headline-em"
            segments={[
              { text: "When the tax question is hard," },
              { text: "who do you call?", em: true },
            ]}
          />
```

(Everything below the heading — the `<p>` and `<Button>` — stays unchanged. Only the section scheme and the heading segments/underline change.)

- [ ] **Step 2: Gate**

Run: `npm run lint && npx vitest run && npx next build`
Expected: lint clean · 27 tests · 16 routes.

- [ ] **Step 3: Verify the close still reads (spacing) in prerendered HTML**

Run: `npx next build >/dev/null 2>&1; sed 's/<[^>]*>//g' .next/server/app/services.html | grep -o "When the tax question is hard, who do you call?" | head -1`
Expected: prints `When the tax question is hard, who do you call?` (one clean line, no stray space before `?`).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/FinalCTA.tsx
git commit -m "feat(sections): elevate FinalCTA into the crescendo close (deep drama band + drawn underline)"
```

---

### Task 2: About — retire stale sections + drama band

**Files:**
- Modify: `src/components/sections/HowItWorks.tsx` (widen `scheme` type)
- Modify: `src/app/about/page.tsx`

**Interfaces:**
- Produces: `HowItWorks` `scheme` prop accepts `"espresso-deep"`.

- [ ] **Step 1: Widen the HowItWorks scheme union**

In `src/components/sections/HowItWorks.tsx`, change the prop type:

```tsx
  scheme = "sand",
}: {
  scheme?: "cream" | "sand" | "espresso" | "espresso-deep";
```

(The section already renders `className={`scheme-${scheme} …`}`, and `.scheme-espresso-deep` exists in `globals.css`, so no other change is needed.)

- [ ] **Step 2: Retire the marquee + duplicate close, add the drama band**

In `src/app/about/page.tsx`:
1. Remove the import `import { AuthorityMarquee } from "@/components/sections/AuthorityMarquee";`
2. Remove the import `import { PromiseBlock } from "@/components/sections/PromiseBlock";`
3. Change the closing block from:

```tsx
      <TeamRoster />

      <HowItWorks scheme="espresso" />
      <PublishedThinking scheme="cream" />
      <AuthorityMarquee />
      <PromiseBlock />
      <FinalCTA />
```

to:

```tsx
      <TeamRoster />

      <HowItWorks scheme="espresso-deep" />
      <PublishedThinking scheme="cream" />
      <FinalCTA />
```

- [ ] **Step 3: Confirm scheme rhythm (no two adjacent sections share a scheme)**

Read the resulting order: PageHero `espresso` → origin `cream` → TeamRoster (its own scheme) → HowItWorks `espresso-deep` → PublishedThinking `cream` → FinalCTA `espresso-deep`. Verify `TeamRoster`'s scheme is not `cream` (which would clash with the origin section before it). Run `grep -n "scheme-" src/components/sections/TeamRoster.tsx`. If TeamRoster is `cream`/`sand`, the rhythm is fine (origin cream → team sand/other → howitworks deep). If a clash appears, flip the origin section (`src/app/about/page.tsx`, the `scheme-cream py-24` section) to `scheme-sand` to break it. Note the outcome in the commit.

- [ ] **Step 4: Gate + prerendered em-dash guard**

Run: `npm run lint && npx vitest run && npx next build && grep -c "—" .next/server/app/about.html`
Expected: all green, 16 routes, em-dash count `1` (Header aria-label only).

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/HowItWorks.tsx src/app/about/page.tsx
git commit -m "feat(about): retire marquee + duplicate close, add espresso-deep drama band"
```

---

### Task 3: Service detail — drama band, parallax, WordReveal

**Files:**
- Modify: `src/app/services/[slug]/page.tsx`

**Interfaces:**
- Consumes: `WordReveal` from `@/components/motion/WordReveal` (signature `WordReveal({ text, className })`, renders a `<p data-anim>` with word spans).

- [ ] **Step 1: Add the WordReveal import**

At the top of `src/app/services/[slug]/page.tsx`, add:

```tsx
import { WordReveal } from "@/components/motion/WordReveal";
```

- [ ] **Step 2: Parallax on the 21:9 editorial band**

Replace the editorial-band `<figure>` inner (the `<Image>` currently sits directly in the figure) so the image lives in an oversized `data-speed` wrapper that drifts within the clipped figure:

```tsx
              <figure className="relative aspect-[21/9] overflow-hidden rounded-2xl">
                <div data-speed="0.9" className="absolute inset-x-0 -inset-y-[11%]">
                  <Image
                    src={service.image}
                    alt={`${service.title} at MS Accountants.`}
                    fill
                    priority
                    sizes="(min-width: 1280px) 1152px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-espresso/10" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(26,19,15,0.45),transparent)]" />
              </figure>
```

(The wrapper is ~22% taller than the figure and vertically centred, so the ScrollSmoother drift never reveals a hard edge.)

- [ ] **Step 3: Drama band + WordReveal on "Why us"**

Replace the "Why us" `<section>`:

```tsx
      {/* Why us */}
      <section className="scheme-espresso-deep py-24 lg:py-32">
        <Container size="narrow">
          <Reveal className="flex flex-col items-start">
            <EyebrowTag>Why us</EyebrowTag>
            <WordReveal
              text={service.why}
              className="mt-7 font-serif text-3xl leading-[1.12] text-cream sm:text-4xl"
            />
          </Reveal>
        </Container>
      </section>
```

- [ ] **Step 4: Gate**

Run: `npm run lint && npx vitest run && npx next build`
Expected: all green, 16 routes.

- [ ] **Step 5: Confirm the "why" copy still renders as text (no-JS legibility)**

Run: `sed 's/<[^>]*>//g' .next/server/app/services/tax-disputes-ato.html | grep -o "put beyond doubt" | head -1` — expected: a fragment of the disputes `why` text prints (confirms WordReveal renders the words server-side). If the exact fragment differs, grep any 3-word run from that service's `why` in `src/lib/services.ts`.

- [ ] **Step 6: Commit**

```bash
git add src/app/services/[slug]/page.tsx
git commit -m "feat(service-detail): espresso-deep Why-us band, 21:9 image parallax, WordReveal statement"
```

---

### Task 4: Services index — card arrow parity

**Files:**
- Modify: `src/app/services/page.tsx`

**Interfaces:**
- Consumes: existing `Icon` (already imported), `TextLink` (already imported).

- [ ] **Step 1: Add the arrow-slide affordance to each card**

In `src/app/services/page.tsx`, the `<TextLink>` block inside each card already reads "Explore …". Add the sliding arrow so the card matches the service-detail "other services" cards. Change the `<div className="relative z-10 mt-6">` block to:

```tsx
                    <div className="relative z-10 mt-6 inline-flex items-center gap-2">
                      <TextLink href={`/services/${s.slug}`} className="text-brand-red">
                        Explore {s.navTitle}
                      </TextLink>
                      <Icon
                        name="arrow"
                        size={16}
                        className="text-brand-red transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
```

- [ ] **Step 2: Gate**

Run: `npm run lint && npx vitest run && npx next build`
Expected: all green, 16 routes.

- [ ] **Step 3: Commit**

```bash
git add src/app/services/page.tsx
git commit -m "feat(services): card arrow-slide affordance for hover parity"
```

---

### Task 5: `#team` anchor scroll under ScrollSmoother

**Files:**
- Modify: `src/components/motion/ScrollReset.tsx`

**Interfaces:**
- Same component, same mount point. Behaviour change: on a route change WITH a hash, scroll to the target element instead of doing nothing.

- [ ] **Step 1: Handle the hash branch**

Replace the effect body in `src/components/motion/ScrollReset.tsx`:

```tsx
  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const smoother = ScrollSmoother.get();
    const hash = window.location.hash;

    if (hash) {
      // In-page anchor (e.g. /about#team). ScrollSmoother intercepts native
      // anchor scrolling, so resolve the target ourselves — after a frame so
      // the new page's layout is measured and triggers are refreshed.
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        let el: Element | null = null;
        try {
          el = document.querySelector(hash);
        } catch {
          el = null;
        }
        if (!el) return;
        if (smoother) smoother.scrollTo(el as HTMLElement, false);
        else (el as HTMLElement).scrollIntoView();
      });
      return;
    }

    if (smoother) {
      smoother.scrollTo(0, false);
    }
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);
```

- [ ] **Step 2: Gate**

Run: `npm run lint && npx vitest run && npx next build`
Expected: all green, 16 routes.

- [ ] **Step 3: Confirm the anchor target exists**

Run: `grep -n 'id="team"' src/components/sections/TeamRoster.tsx`
Expected: one match (the `/about#team` target renders).

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/ScrollReset.tsx
git commit -m "fix(nav): scroll to in-page anchors under ScrollSmoother (fixes /about#team)"
```

---

### Task 6: Full verification + verified localhost handoff

**Files:** none (verification).

- [ ] **Step 1: Final gate**

Run: `npm run lint && npx vitest run && npx next build`
Expected: lint clean · 27/27 · 16 routes.

- [ ] **Step 2: Site-wide em-dash guard**

Run: `for f in index about services contact services/tax-advisory-planning _not-found; do echo "$f: $(grep -c "—" ".next/server/app/$f.html")"; done`
Expected: every page prints `1` (Header aria-label only).

- [ ] **Step 3: Confirm the crescendo close and drama bands landed (per route)**

Run the heading/scheme audit from the prior sweep and confirm: About no longer contains an `AuthorityMarquee` marquee track and has a single `FinalCTA`; each service detail's "Why us" section carries `scheme-espresso-deep`. `grep -c "AuthorityMarquee\|marquee" .next/server/app/about.html` should trend to 0 marquee markup; `grep -c "scheme-espresso-deep" .next/server/app/services/tax-disputes-ato.html` should be `>= 1`.

- [ ] **Step 4: Serve a verified localhost (standing rule)**

Start the dev server from the project root in the background, then poll until HTTP 200:
```bash
npm run dev &
# poll:
for i in $(seq 1 10); do c=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/); [ "$c" = "200" ] && echo "UP" && break; done
```
Hand Tyson `http://localhost:3000` with the review checklist: crescendo close on each inner page, the two drama bands, the 21:9 parallax drift, `/about#team` scrolling to the team section, scroll-to-top on service clicks, then reduced-motion emulation (everything static + native scroll).

- [ ] **Step 5: Commit any final touch-ups and STOP for the visual pass**

No deploy. Await Tyson's visual pass; tune per feedback; deploy only on his explicit go.

---

## Self-Review

**Spec coverage:**
- Move 1 crescendo close → Task 1. ✓
- Move 2 retire stale bits (marquee + duplicate close) → Task 2. ✓
- Move 3 drama bands (service "Why us" + About How-it-works) → Task 3 + Task 2. ✓
- Move 4 image parallax (service 21:9 band) → Task 3. ✓
- Move 5 motion/hover parity (WordReveal on "why" + services card arrow) → Task 3 + Task 4. ✓
- Fix 6 `#team` anchor → Task 5. ✓
- Fix 7 scroll-to-top confirmation → Task 6 Step 4 (live). ✓
- Contact kept light / 404 unchanged → no task (correct, per spec). ✓
- Verification + verified localhost → Task 6. ✓

**Placeholder scan:** No TBD/TODO. Task 3 Step 5's grep names a fallback (grep any 3-word run from the service `why`), not a vague instruction.

**Type consistency:** `HowItWorks` `scheme` union widened in Task 2 Step 1 and consumed in Task 2 Step 2 (`"espresso-deep"`). `WordReveal({ text, className })` used in Task 3 matches its signature. `SplitHeadline` `underline` + em segments in Task 1 match the component's existing API. `ScrollReset` keeps its `pathname` dependency and `useIsoLayoutEffect` from the existing file.
