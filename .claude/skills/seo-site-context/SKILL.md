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

Schema types currently emitted (from `src/lib/schema.ts`, one @id-linked
graph): AccountingService, WebSite, Person, PostalAddress, ContactPoint,
AdministrativeArea, OfferCatalog, Offer, EducationalOccupationalCredential,
EducationalOrganization, plus Service and BreadcrumbList per service page.

Indexable routes: `/`, `/about`, `/services`, `/contact`,
`/services/[slug]` (slugs from `services` in `src/lib/site.ts`).

## Known gaps

This is the thinnest SEO surface of the seven repos. Highest leverage per
hour of work.

1. **Facts still missing from the graph.** `src/lib/schema.ts` deliberately
   omits `geo`, `openingHoursSpecification`, `priceRange`, `aggregateRating`
   and `foundingDate` because the real values are not recorded anywhere in the
   repo. Supply them in `src/lib/site.ts` and add them to the graph. Do not
   guess: on a YMYL financial site a contradicted fact is a Trust defect,
   which Google weights highest of the four E-E-A-T factors.

2. **No `llms.txt`, no FAQ content, no article or insight surface.** There is
   still no content layer for AI answer engines to cite. `/seo cluster` and
   `/seo content-brief` are the tools for planning one. Note the `seo-geo`
   evidence that llms.txt itself is not a citation lever, so build the content,
   not the file.

3. **Minimal robots.** `src/app/robots.ts` is 9 lines, allow-all, with no AI
   crawler directives and no disallow list. Compare with
   `Aussie-Loan-Office/app/robots.ts`, which is the reference implementation
   across this portfolio.

4. **NAP is not yet verified against live citations.** The schema now carries
   the office address, but `/seo local` should check it matches Google
   Business Profile and the major directories. The PO box is deliberately
   excluded from the graph so it cannot split the NAP signal.

## Resolved 2026-07-28

Built the entity graph in `src/lib/schema.ts`, replacing a single flat
AccountingService block:

- `AccountingService` (`#organization`) with structured PostalAddress, E.164
  telephone, fax, email, areaServed, contactPoint and an OfferCatalog covering
  all five services.
- `Person` (`#sridaran`) with five explicit
  `EducationalOccupationalCredential` entries (PhD, LLB, Master of Taxation,
  Chartered Accountant, Registered Tax Agent), `alumniOf` as real
  EducationalOrganization nodes, and `worksFor` linking back to the firm. This
  is the strongest E-E-A-T signal available on a YMYL site and was previously
  absent.
- `WebSite` (`#website`) with publisher reference.
- Per service page: `Service` with a provider reference, plus `BreadcrumbList`.
- `src/lib/site.ts` gained `officeAddressParts` and E.164 phone forms so the
  structured data and the visible NAP cannot drift apart.

## Verification

```bash
npm run lint && npm run test && npm run build
```

Then `/seo schema` against the built output to confirm the JSON-LD parses and
validates.
