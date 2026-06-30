# Decisions — MS Accountants Website v2

| # | Decision | Reason |
|---|---|---|
| 1 | Scrap v1; rebuild in place (keep scaffold, `/api/contact`, `site.ts` shape, assets) | Client rejected v1 design; project already wired (Next 16 + GSAP + Tailwind v4) — no value throwing away setup. |
| 2 | Borrow Quinn's *motion craft + warmth* only; original layouts | Client wants inspiration, not a clone; design must be Awwwards-calibre and distinctly MS. |
| 3 | Warm cream base + **brick-red as brand lead** | Matches his real/current palette, elevated to premium — keeps brand recognition. |
| 4 | Logo Option A (faithful+ heavy grotesque) over serif (B) / monogram-lockup (C) | Client: truest match to existing heavy wordmark; serif was too big a departure. |
| 5 | GSAP/CSS motion, **no Lottie** | Faithful look without extra dependency/JSON assets; simpler pipeline. |
| 6 | AI-generated imagery via user's tools + drop-in workflow | User has Val.ai/Grok subs; keeps build moving with clean swap slots. Portrait = real client photo. |
| 7 | Copy verbatim from `WEBSITE-COPY-AND-BUILD-SPEC.md` | Already strategist-approved; "never guess at business logic." |
| 8 | Editorial serif headings + classical/architectural imagery | Reinforces gravitas + "wrote the thesis"; matches premium finance refs (Adveris/Maxima). |
| 9 | Added Promise block to Home order | Strong conversion copy already exists (§3); pending user confirm. |
| 10 | Type: Fraunces + Instrument Serif (signature) + Schibsted Grotesk + Space Mono + Archivo logo. **No Inter/Manrope/slop fonts.** | Client demands distinctive, award-bar, non-generic typography; hybrid gives classical base + one unexpected signature face = uniquely MS. |
| 11 | Take Quinn's structure/hierarchy/spacing/marker+scroll animations/GSAP faithfully *in feel*, recombined with our refs into original MS design | Client wants Quinn's craft, not a recognisable copy; target = award-worthy. |
| 12 | **"Also a lawyer" repositioning** (2026-06-30): rebalance the whole site from the narrow PhD-in-CGT hook to "chartered accountant AND lawyer, complete complement of skills for any tax problem at every level, incl. complex tax-authority investigations + litigation" | Dr Sridaran's 29 Jun email: he is a lawyer (LLB Macquarie) with full credentials to handle tax at every level; asked the entire site reflect this. User picked "Rebalance" (CGT stays a proof point, not the whole story). |
| 13 | **Enhance & rename** existing `tax-disputes-ato` service to "Tax Disputes, Investigations & Litigation" rather than add a 6th page; **slug kept** | Adds litigation/investigations capability the client stressed, without diluting a solo-principal firm into 6 services or breaking the SSG `[slug]` route / internal links. |
| 14 | **Use his stated facts, soften firm-tenure**: "over 45 years, 5+ countries, last 25 in Australia, mostly two of the Big Four"; replaced specific "30 years at PwC/EY/Horwath" with "decades / world's leading firms" | His email gives 45y total; the live "30y" was a narrower claim. Avoid asserting an unverified second number, and stop implying WHK Horwath is Big Four (it isn't). "Never guess at business logic." |
| 15 | **No em-dashes** in the new hero copy, despite the approved preview using them | Standing client-driven house rule (em-dashes were previously purged as an AI-tell). Substance of the approved hero unchanged; punctuation set to colon/comma. |
