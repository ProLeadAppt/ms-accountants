---
name: seo-site-context
description: "Site facts for msaccountants.com.au: domain, stack, business model, existing SEO surface and known gaps. Load this before any SEO work in this repo so /seo commands reason about the real site instead of generic assumptions. Triggers on: SEO, audit, schema, sitemap, robots, metadata, canonical, local SEO, E-E-A-T, YMYL, GEO, AI Overviews, structured data."
---

# Site context: msaccountants.com.au

Read this before running any `/seo` command in this repo.

## Business

MS Accountants, a boutique Sydney tax and accounting firm led by
Dr Maheswaran Sridaran: chartered accountant, lawyer, registered tax agent,
PhD in Australian tax law (Macquarie University). The differentiator is
doctoral-level tax expertise in a small firm, not price or volume.

**Industry classification for `/seo audit`:** local professional services,
single-principal firm. This is **YMYL** content. Google's Search Quality
Rater Guidelines treat financial and legal advice as your-money-or-your-life,
so E-E-A-T is weighted harder here than on any other site in this portfolio,
and Trust is the heaviest of the four factors.

Source of truth for all site content: `WEBSITE-COPY-AND-BUILD-SPEC.md`.
`src/lib/site.ts` is the config. Entries marked `[[PLACEHOLDER]]` are facts
the client still has to supply. Never invent a value for one of these.

## NAP, use these exact strings

```
Name:    MS Accountants
Phone:   02 9739 4837   (tel:+61297394837)
Mobile:  0410 588 536   (tel:+61410588536)
Email:   m.sridaran@msaccountants.com.au
Office:  Suite 70, WOTSO WorkSpace, 5 George Street, North Strathfield NSW 2137
Postal:  P O Box 2194, Hornsby Westfield Post Office, Hornsby NSW 1635
```

Use the **office** address for LocalBusiness schema and citations, never the
PO box. NAP consistency work in `/seo local` should treat these as canonical.

## Stack

- Next.js 16, App Router, React 19, TypeScript, Tailwind 4
- GSAP for motion
- Hosted on Vercel (`vercel.json`)
- Vitest configured

## Existing SEO surface

| Artefact | Location |
|---|---|
| robots | `src/app/robots.ts` (9 lines, allow-all) |
| sitemap | `src/app/sitemap.ts` |
| site config | `src/lib/site.ts` |
| JSON-LD | 1 block |

Schema types currently emitted: AccountingService, Person. That is all.

Indexable routes: `/`, `/about`, `/services`, `/contact`,
`/services/[slug]` (slugs from `services` in `src/lib/site.ts`).

## Known gaps

This is the thinnest SEO surface of the seven repos. Highest leverage per
hour of work.

1. **No local schema.** Full NAP, geo-locatable office and opening context all
   exist in `src/lib/site.ts` but none of it reaches structured data. There is
   no `LocalBusiness` / `AccountingService` with `address`, `geo`,
   `openingHoursSpecification`, `areaServed` or `telephone`. Start here.
   `/seo schema` and `/seo local` are the relevant commands.

2. **No BreadcrumbList** on `/services/[slug]`, despite a real hierarchy.

3. **No WebSite or Organization node**, so nothing ties the pages into a
   single entity graph via `@id` references.

4. **No Person credential markup.** `Dr Sridaran` has PhD, CA, lawyer and
   registered tax agent credentials. `Person` with `hasCredential`
   (`EducationalOccupationalCredential`), `alumniOf` and `knowsAbout` is the
   single strongest E-E-A-T signal available on a YMYL site, and it is
   currently absent.

5. **No `llms.txt`, no FAQ content, no article or insight surface.** There is
   no content layer to be cited by AI answer engines. `/seo cluster` and
   `/seo content-brief` are the tools for planning one.

6. **Minimal robots.** No AI crawler directives, no disallow list.

## Verification

```bash
npm run lint && npm run test && npm run build
```

Then `/seo schema` against the built output to confirm the JSON-LD parses and
validates.
