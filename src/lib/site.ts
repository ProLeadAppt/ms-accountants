// ---------------------------------------------------------------------------
// MS Accountants, site configuration & content
// Source of truth: WEBSITE-COPY-AND-BUILD-SPEC.md (§3–§10).
// [[PLACEHOLDER]] = real-world fact to be supplied by the client (spec §9).
// ---------------------------------------------------------------------------

export const site = {
  name: "MS Accountants",
  tagline: "A boutique Sydney tax & accounting firm.",
  credentialLine: "Led by Dr Maheswaran Sridaran · PhD (Tax), M.Tax, CA",
  url: "https://msaccountants.com.au",
  cta: "Book a conversation with Dr Sridaran",
  ctaHref: "/contact",
  footerTrust:
    "A boutique Sydney firm where the principal does the work. PhD-level tax expertise, personally applied to your business.",
  contact: {
    // Phone is published on the current msaccountants.com.au site.
    phone: "02 9739 4837",
    phoneHref: "tel:+61297394837",
    // NOTE (spec §9): email + address pending client confirmation.
    email: "hello@msaccountants.com.au",
    emailHref: "mailto:hello@msaccountants.com.au",
    address: "Sydney, NSW, Australia",
  },
} as const;

// Quantified credential stats (spec §1), Quinn-style "value" band.
export const valueStats = [
  { figure: "PhD", unit: "in CGT", label: "Doctoral research into Australian capital gains tax" },
  { figure: "30", unit: "years", label: "At the senior end of PwC, EY & WHK Horwath" },
  { figure: "5", unit: "countries", label: "Cross-border experience, handled in-house" },
  { figure: "1", unit: "principal", label: "Dr Sridaran reviews every engagement personally" },
] as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Borrowed-authority band (spec §3)
export const authorityItems = [
  "Australian Financial Review",
  "The Sydney Morning Herald",
  "Macquarie University",
  "UNSW",
  "McKell Institute",
  "Chifley Research Centre",
] as const;

// Credential-translation grid (spec §3)
export const credentialCards = [
  {
    title: "A doctorate in Australian capital gains tax.",
    body: "When your business sells, restructures, or passes to the next generation, the CGT questions are the expensive ones. They're also the ones Dr Sridaran studied to doctoral level, so the ATO's hardest positions are familiar ground, not new research.",
  },
  {
    title: "30 years across PwC, EY and Horwath.",
    body: "You get top-tier technical firepower, the kind usually reserved for big-end-of-town clients, without big-firm overhead, handoffs, or a rotating cast of account managers.",
  },
  {
    title: "Practised across five countries.",
    body: "Cross-border income, expat tax, foreign assets: none of it gets outsourced or guessed at. It's lived experience, handled in-house.",
  },
  {
    title: "Taught tax law. Published in the AFR and SMH. Wrote the book.",
    body: "If your accountant can explain tax clearly enough to teach it and write about it nationally, they can explain your position clearly enough for you to act with confidence.",
  },
] as const;

export type HelpItem = { term: string; desc: string } | string;

export type Service = {
  slug: string;
  navTitle: string;
  teaserTitle: string;
  teaserBlurb: string;
  flagship?: boolean;
  title: string;
  tagline: string;
  intro: string[];
  helpHeading: string;
  help: HelpItem[];
  note?: string;
  why: string;
};

export const services: Service[] = [
  {
    slug: "tax-advisory-planning",
    navTitle: "Tax Advisory & Planning",
    teaserTitle: "Tax Advisory & Planning",
    teaserBlurb:
      "The hard questions: capital gains, restructures, succession, transaction tax. Studied to doctoral level, applied to your situation.",
    flagship: true,
    title: "Tax Advisory & Planning",
    tagline: "The expensive questions deserve the deepest expertise.",
    intro: [
      "Selling a business. Restructuring. Passing assets to the next generation. These are the moments where the tax bill is largest, and where a generalist working it out as they go can cost you more than they save.",
      "This is the work Dr Maheswaran Sridaran built his career on. His PhD examined Australian capital gains tax; his book asked whether those gains are even taxed fairly. So when a capital gains question lands on your desk, you're not getting a best guess. You're getting the person who studied it to doctoral level, and who reviews your file personally.",
    ],
    helpHeading: "What we help with",
    help: [
      {
        term: "Tax minimisation, federal and state",
        desc: "finding every legitimate way to reduce what you owe, across income tax, GST, payroll tax, land tax and more.",
      },
      {
        term: "Transaction tax, modelled before you commit",
        desc: "the tax consequences of a deal, sale or restructure worked out in advance, so there are no surprises after you sign.",
      },
      {
        term: "Capital gains",
        desc: "on business sales, asset disposals, restructures and succession. The hardest CGT positions are familiar ground here.",
      },
      {
        term: "Estate planning with tax built in",
        desc: "passing on wealth and assets in the way that protects the most value for the people you're passing it to.",
      },
      {
        term: "Valuation of company shares",
        desc: "defensible valuations for transactions, disputes and succession.",
      },
    ],
    why: "Most accountants apply the capital gains rules. Dr Sridaran studied them to doctoral level and has written publicly on whether they're fair. When the question is hard enough to matter, that depth is the difference between a defensible position and an expensive guess.",
  },
  {
    slug: "tax-disputes-ato",
    navTitle: "Tax Disputes & ATO Matters",
    teaserTitle: "Tax Disputes & ATO Matters",
    teaserBlurb:
      "Audits, assessments, private rulings. The expertise to argue your position with authority.",
    title: "Tax Disputes & ATO Matters",
    tagline: "When the ATO comes knocking, expertise is your best defence.",
    intro: [
      "An audit. A disputed assessment. A position you need the tax office to confirm before you act. These are the moments where it pays to have someone who knows the law cold, and can argue your case with genuine authority.",
      "Dr Maheswaran Sridaran taught tax law at university and led a national tax practice before founding MS Accountants. He doesn't just know the rules; he understands the reasoning behind them. That's what it takes to push back on an assessment and be taken seriously.",
    ],
    helpHeading: "What we help with",
    help: [
      {
        term: "ATO and state revenue audits",
        desc: "guiding you through the process, managing the correspondence, and protecting your position from start to finish.",
      },
      {
        term: "Challenging assessments",
        desc: "building and arguing the case when the tax office gets it wrong.",
      },
      {
        term: "Private ruling applications",
        desc: "getting certainty from the ATO before you commit to a transaction, so you act with confidence rather than hope.",
      },
    ],
    why: "Arguing a tax position is part technical, part advocacy. Few accountants have taught the law, published on it, and run the disputes. Dr Sridaran has done all three. You want that in your corner before you respond to the ATO, not after.",
  },
  {
    slug: "tax-compliance-returns",
    navTitle: "Tax Compliance & Returns",
    teaserTitle: "Tax Compliance & Returns",
    teaserBlurb: "Every return, every obligation, handled accurately and on time.",
    title: "Tax Compliance & Returns",
    tagline: "Every obligation, handled accurately and on time.",
    intro: [
      "Compliance is the part no one thanks you for, until it goes wrong. Late lodgements, missed obligations and small errors carry real cost. The job is to make all of it quiet, accurate and predictable, so you can stop thinking about it.",
      "At MS Accountants, routine work still passes under the eye of a Chartered Accountant and registered tax agent who has spent 30 years getting it right at the highest level. Even your compliance benefits from that standard.",
    ],
    helpHeading: "What we help with",
    help: [
      "Income tax returns",
      "Business activity statements (BAS)",
      "Instalment activity statements (IAS)",
      "Fringe benefits tax (FBT) returns",
      "Annual GST returns",
      "Payroll tax returns",
      "Land tax returns",
      "Workers' compensation insurance declarations",
    ],
    note: "More than ticking boxes: even clients who come to us only for compliance receive at least an hour of senior time each year on strategic issues, at no charge. Because the point of doing the returns is to spot the opportunities hiding in them.",
    why: "Accuracy is the floor, not the ceiling. With Dr Sridaran reviewing quality across the practice, your compliance is done properly, and used as a starting point to find what you could be doing better.",
  },
  {
    slug: "business-cfo-advisory",
    navTitle: "Business & CFO Advisory",
    teaserTitle: "Business & CFO Advisory",
    teaserBlurb:
      "The strategic financial support of an in-house CFO, without the headcount.",
    title: "Business & CFO Advisory",
    tagline: "The financial brain of a big company, without the headcount.",
    intro: [
      "Growing businesses hit a point where they need senior financial thinking, someone to weigh a major decision, scrutinise an acquisition, or raise finance, but aren't ready to carry a full-time chief financial officer.",
      "That's the gap MS Accountants fills. To corporate clients, we offer the assistance an in-house CFO would: strategic, hands-on, and grounded in 30 years across some of the world's leading firms.",
    ],
    helpHeading: "What we help with",
    help: [
      {
        term: "Outsourced CFO support",
        desc: "the strategic financial management an in-house chief financial officer would provide, on demand.",
      },
      {
        term: "Due diligence for acquisitions",
        desc: "knowing exactly what you're buying before you buy it.",
      },
      {
        term: "Raising loan and equity finance",
        desc: "structuring and supporting the case to lenders and investors.",
      },
      {
        term: "Financial statements and forecasts",
        desc: "clear numbers you can actually make decisions on.",
      },
      {
        term: "Accounting policy and transaction treatment",
        desc: "getting the technical accounting right on the decisions that matter.",
      },
    ],
    why: "Dr Sridaran has sat at the senior end of global firms and advised property conglomerates, listed companies and financial services licensees. You get that calibre of judgement applied to your business, at boutique scale, with direct access to the principal.",
  },
  {
    slug: "self-managed-super",
    navTitle: "Self-Managed Super",
    teaserTitle: "Self-Managed Super",
    teaserBlurb: "SMSF audits, done properly.",
    title: "Self-Managed Superannuation",
    tagline: "Your SMSF audit, done properly.",
    intro: [
      "A self-managed super fund gives you control, and a set of obligations that have to be met precisely. The annual audit isn't a formality; it's what keeps your fund compliant and your retirement savings protected.",
      "MS Accountants conducts SMSF audits to the standard you'd expect from a firm led by a Chartered Accountant with three decades of audit and tax experience at the highest level.",
    ],
    helpHeading: "What we help with",
    help: [
      {
        term: "SMSF audits",
        desc: "thorough, compliant, and handled by people who understand both the audit standards and the tax consequences behind them.",
      },
    ],
    why: "An SMSF audit sits where superannuation, tax and audit meet, three areas Dr Sridaran has worked across his entire career. Your fund is reviewed by a firm that understands all three, not just one.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
