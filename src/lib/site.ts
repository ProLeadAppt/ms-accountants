// ---------------------------------------------------------------------------
// MS Accountants, site configuration & content
// Source of truth: WEBSITE-COPY-AND-BUILD-SPEC.md (§3–§10).
// [[PLACEHOLDER]] = real-world fact to be supplied by the client (spec §9).
// ---------------------------------------------------------------------------

export const site = {
  name: "MS Accountants",
  tagline: "A boutique Sydney tax & accounting firm.",
  credentialLine: "Led by Dr Maheswaran Sridaran · Chartered Accountant · Lawyer · Registered Tax Agent · PhD in Australian tax law (Macquarie University)",
  url: "https://msaccountants.com.au",
  cta: "Book a conversation with Dr Sridaran",
  ctaHref: "/contact",
  footerTrust:
    "A boutique Sydney firm led by a chartered accountant and lawyer who also holds a doctorate in Australian tax law and has spent his career on the hardest tax questions. His team builds every file. He reviews every one.",
  contact: {
    phone: "02 9739 4837",
    phoneHref: "tel:+61297394837",
    mobile: "0410 588 536",
    mobileHref: "tel:+61410588536",
    fax: "02 8078 6640",
    email: "m.sridaran@msaccountants.com.au",
    emailHref: "mailto:m.sridaran@msaccountants.com.au",
    officeAddress: "Suite 70, WOTSO WorkSpace, 5 George Street, North Strathfield NSW 2137",
    postalAddress: "P O Box 2194, Hornsby Westfield Post Office, Hornsby NSW 1635",
  },
} as const;

// Quantified credential stats (spec §1), Quinn-style "value" band.
export const valueStats = [
  { figure: "PhD", unit: "in tax law", label: "Doctoral-level expertise in Australian tax law" },
  { figure: "CA", unit: "+ lawyer", label: "A chartered accountant who is also a lawyer" },
  { figure: "45+", unit: "years", label: "Across more than five countries, the last 25 in Australia" },
  { figure: "1", unit: "director", label: "Every file that leaves the firm passes across Dr Sridaran's desk" },
] as const;

export const missionPrinciples = {
  eyebrow: "How the firm works",
  heading: "Timely care, responsible judgement, and work the team can be proud of.",
  body:
    "MS Accountants was built around a simple standard: serve clients to the highest level, regardless of their station, while giving the people doing the work the resources, respect, and responsibility they need to do it properly. The firm treats clients and staff as its most important assets, acts constructively and respectfully, and never charges a fee a client cannot sustain.",
  values: [
    "Trustworthiness",
    "Responsibility",
    "Professionalism",
    "Teamwork",
    "Learning from the work",
  ],
} as const;

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

// Published-thinking strip: show what he has written, not only where he is
// cited. Titles are verbatim and real (AFR/SMH op-eds + the book); ordered to
// lead with fairness and the willingness to question the received view.
export const publications = [
  { title: "Tax reform for the best and fairest", outlet: "Australian Financial Review", year: "2008" },
  { title: "High Court gets it right on GST", outlet: "Australian Financial Review", year: "2008" },
  { title: "There's a different way to view takeover concerns", outlet: "Australian Financial Review", year: "2007" },
  { title: "Tax agents deserve a better deal", outlet: "Australian Financial Review", year: "2007" },
  { title: "Top universities serve students first", outlet: "The Sydney Morning Herald", year: "2008" },
] as const;

export const book = {
  title: "Are Capital Gains Equitably Taxed in Australia?",
  detail: "His first book, published in 2012.",
} as const;

// His published voice, single source of truth. Rendered as the Act II thesis's
// single red emphasis (Statement.tsx) and reused verbatim by VoicePullQuote on
// inner pages.
export const voiceQuote = {
  text: "Are Capital Gains Equitably Taxed in Australia?",
  attribution: "Dr Maheswaran Sridaran · his first book, 2012",
} as const;

// Credential-translation grid (spec §3)
export const credentialCards = [
  {
    title: "A doctorate in Australian tax law.",
    body: "His doctorate looked past how Australia taxes capital gains to whether it taxes them fairly, or whether the rules quietly treat equals unequally. The same expensive questions arise when a business sells, restructures, or passes to the next generation, and the ATO's hardest positions on them are familiar ground here, not new research.",
  },
  {
    title: "A chartered accountant who is also a lawyer.",
    body: "Most accountants stop where the law begins. Dr Sridaran does not. He holds the complete complement of skills to handle any tax problem at every level, from the day-to-day advice through to complex tax-authority investigations and litigation.",
  },
  {
    title: "Over 45 years, across more than five countries.",
    body: "Mostly with two of the Big Four, the last 25 in Australia. You get that seniority applied to your file directly, without big-firm overhead, handoffs, or a rotating cast of account managers.",
  },
  {
    title: "Taught tax law. Published in the AFR and SMH. Wrote the book.",
    body: "If your accountant can teach the law, publish on it nationally, and argue it when it is tested, they can explain your position clearly enough for you to act, and defend it when it counts.",
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
  image?: string;
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
      "This is the work Dr Maheswaran Sridaran built his career on. His doctoral thesis examined how Australia taxes capital gains; his book asked the harder question still, whether it taxes them fairly. As both a chartered accountant and a lawyer, he reads the rules the way the courts do, not just the way the form does, and he has spent a career asking whether the rules, as written, produce the right answer. You feel that difference when your position is the one being tested.",
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
    why: "Dr Sridaran did not stop at applying the capital gains rules. He studied them to doctoral level, then published on whether they are even fair. When a question is hard enough to matter, that is the difference between a position you can defend and an expensive guess.",
    image: "/generated/tax-advisory-2.jpg",
  },
  {
    slug: "tax-disputes-ato",
    navTitle: "Tax Disputes, Investigations & Litigation",
    teaserTitle: "Tax Disputes, Investigations & Litigation",
    teaserBlurb:
      "Audits, complex investigations, litigation. Your accountant is also a lawyer, so your case is argued by someone qualified to run it all the way.",
    title: "Tax Disputes, Investigations & Litigation",
    tagline: "When the tax authorities come knocking, your accountant being a lawyer is your best defence.",
    intro: [
      "An audit. A complex investigation. A disputed assessment you need to fight, and may have to litigate. These are the moments where it pays to have someone who knows the law cold and is qualified to argue your case all the way, not hand you off to a barrister at the first sign of a courtroom.",
      "Dr Maheswaran Sridaran is a chartered accountant and a lawyer. He taught tax law at university and led a national tax practice before founding MS Accountants. He does not just know the rules; he understands the reasoning behind them, and where that reasoning is weaker than it looks. Because he is qualified on both sides, your matter can go from the first audit query to the courtroom in the same hands. He has represented clients in tax disputes before the Administrative Appeals Tribunal and, with leave, the New South Wales District Court. That is what it takes to push back on the tax authorities and be taken seriously.",
    ],
    helpHeading: "What we help with",
    help: [
      {
        term: "ATO and state revenue audits",
        desc: "guiding you through the process, managing the correspondence, and protecting your position from start to finish.",
      },
      {
        term: "Complex tax-authority investigations",
        desc: "handling the hard, high-stakes investigations the tax authorities reserve for the cases that matter, with a lawyer's eye on every step.",
      },
      {
        term: "Challenging assessments",
        desc: "building and arguing the case, through objections and appeals, when the tax office gets it wrong.",
      },
      {
        term: "Tax litigation",
        desc: "running the dispute through to the tribunals and the courts when it has to go that far, argued by someone qualified to do it.",
      },
      {
        term: "Private ruling applications",
        desc: "getting certainty from the ATO before you commit to a transaction, so you act with confidence rather than hope.",
      },
    ],
    why: "Arguing a tax position is part technical, part advocacy. Few accountants have taught the law, published on it, and argued the disputes; fewer still are also lawyers, qualified to take a matter all the way to litigation. Dr Sridaran is, and he has questioned in print whether the High Court, the Full Federal Court and the Commissioner got it right. The tax authority's position is not the last word; it is an argument, and arguments can be answered, and if necessary, litigated. You want someone who works that way before you respond, not after.",
    image: "/generated/tax-disputes-1.jpg",
  },
  {
    slug: "tax-compliance-returns",
    navTitle: "Tax Compliance & Returns",
    teaserTitle: "Tax Compliance & Returns",
    teaserBlurb: "Every return, every obligation, handled accurately and on time.",
    title: "Tax Compliance & Returns",
    tagline: "Every obligation, handled accurately and on time.",
    intro: [
      "Compliance is the part no one thanks you for, until it goes wrong. Late lodgements, missed obligations and small errors carry real cost. The job is to make all of it quiet and predictable, so you can stop thinking about it.",
      "At MS Accountants, routine work still passes under Dr Sridaran personally, a chartered accountant who is also a lawyer that specialises in Australian tax law. Even your compliance benefits from that standard.",
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
    why: "Accuracy is the floor, not the ceiling. Compliance here is the starting point, not the whole job. Your returns are prepared by a supervised, credentialled team, reviewed by Dr Sridaran, then read for the opportunities most people file away without noticing.",
    image: "/generated/tax-compliance-1.jpg",
  },
  {
    slug: "business-cfo-advisory",
    navTitle: "Business & CFO Advisory",
    teaserTitle: "Business & CFO Advisory",
    teaserBlurb:
      "The strategic financial support of an in-house CFO, without the headcount.",
    title: "Business & CFO Advisory",
    tagline: "An in-house CFO's judgement, without the headcount.",
    intro: [
      "Growing businesses hit a point where they need senior financial thinking, someone to weigh a major decision, scrutinise an acquisition, or raise finance, but aren't ready to carry a full-time chief financial officer.",
      "That's the gap MS Accountants fills. To corporate clients, we offer the assistance an in-house CFO would, grounded in over 45 years at the senior end of accounting and finance.",
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
    why: "Does that calibre of financial judgement only come with a full-time hire? It does not. Dr Sridaran has sat at the senior end of global firms and advised property conglomerates, listed companies and financial services licensees. You get that judgement applied to your business, at boutique scale, with direct access to the principal.",
    image: "/generated/cfo-advisory-1.jpg",
  },
  {
    slug: "self-managed-super",
    navTitle: "Self-Managed Super",
    teaserTitle: "Self-Managed Super",
    teaserBlurb: "Your SMSF compliance work done properly.",
    title: "Self-Managed Superannuation",
    tagline: "Your SMSF compliance work done properly.",
    intro: [
      "A self-managed super fund gives you control, and a set of obligations that have to be met precisely. Contributions, pensions, records, lodgements, and tax positions all have to stand up to scrutiny.",
      "MS Accountants handles SMSF compliance to the standard you'd expect from a firm led by a chartered accountant, lawyer, registered tax agent, and PhD in Australian tax law.",
    ],
    helpHeading: "What we help with",
    help: [
      {
        term: "SMSF compliance",
        desc: "handled by people who understand both the superannuation rules and the tax consequences behind them.",
      },
    ],
    why: "SMSF work is easy to treat as routine, which is exactly why funds get exposed. It sits where superannuation, tax and compliance meet, areas Dr Sridaran has worked across his entire career. Your fund is reviewed by someone who understands the whole position, not just one part of it.",
    image: "/generated/smsf-2.jpg",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

export type TeamMember = {
  slug: string;
  name: string;
  /** Given name (or "Dr Sridaran") for compact contexts. */
  shortName: string;
  role: string;
  /** Full credential list, shown on the About roster. */
  credentials: readonly string[];
  /** Compact credential line for the homepage bench strip. */
  credentialShort: string;
  bio: string;
  /** Prior-firm pedigree, e.g. "EY, Sri Lanka". */
  lineage?: string;
  /** Year they joined MS Accountants. */
  joined?: string;
  /** Monogram initials shown until real photography lands. */
  initials: string;
  /** Slug of the person they report to. */
  reportsTo?: string;
  /** Path to a real portrait photograph. Never AI-generated. */
  photo?: string;
  /** The principal's featured treatment on the roster. */
  featured?: boolean;
};

export const team: readonly TeamMember[] = [
  {
    slug: "maheswaran-sridaran",
    name: "Dr Maheswaran Sridaran",
    shortName: "Dr Sridaran",
    role: "Director",
    credentials: ["PhD (Tax), Macquarie University", "LLB, Macquarie University", "Master of Taxation, UNSW", "Chartered Accountant", "Lawyer (admitted in NSW)", "Registered Tax Agent"],
    credentialShort: "CA · Lawyer · PhD (Tax)",
    bio: "A chartered accountant, lawyer, registered tax agent, and the holder of a doctorate in Australian tax law, with over 45 years across more than five countries, mostly with two of the Big Four, the last 25 in Australia. His doctoral thesis examined Australian capital gains tax; his first book asked whether capital gains are taxed equitably in Australia. He founded MS Accountants in 2010 and remains its sole director. Ask him what the firm rests on and he will not point to his own credentials. He will tell you a firm is only as good as the people it hires, which is why he hires carefully, and why every engagement that leaves the practice is reviewed by him first.",
    initials: "MS",
    featured: true,
  },
  {
    slug: "niroshi-rathnayakage",
    name: "Ms Niroshi Rathnayakage",
    shortName: "Niroshi",
    role: "Senior Accountant",
    credentials: ["CPA (Australia)", "Registered Tax Agent (Australia)", "BSc Management, University of Sri Jayewardenepura"],
    credentialShort: "CPA (Aust) · Registered Tax Agent",
    bio: "The senior accountant of the firm, with MS Accountants since 2013. Every accountant on the team works under Niroshi's direct supervision, and she reports only to Dr Sridaran. A CPA and a registered tax agent in her own right, she built her Australian tax experience across several firms after immigrating, on top of nearly a decade as an accountant in Sri Lanka, latterly with one of that country's largest fund managers. She began her career as an auditor at EY in Sri Lanka, holds a bachelor's degree in management from the University of Sri Jayewardenepura, and was formerly an associate member of the Institute of Chartered Accountants of Sri Lanka.",
    lineage: "EY, Sri Lanka",
    joined: "2013",
    initials: "NR",
    reportsTo: "maheswaran-sridaran",
  },
  {
    slug: "lakshika-subramaniam",
    name: "Ms Lakshika Subramaniam",
    shortName: "Lakshika",
    role: "Accountant",
    credentials: ["CPA (Australia)", "ACMA, Chartered Institute of Management Accountants (UK)", "Advanced Diploma in Business Administration, Association of Business Executives (UK)"],
    credentialShort: "CPA (Aust) · ACMA (UK)",
    bio: "An accountant with the firm since 2025, bringing at least 15 years of working experience in Australia, preceded by many years in Sri Lanka in the commercial sector and in professional accounting firms, including EY. A CPA and an associate of the Chartered Institute of Management Accountants in the UK, Lakshika is currently studying to become a registered tax agent. She prepares compliance work for the firm's clients, largely independently, under Niroshi's supervision.",
    lineage: "EY, Sri Lanka",
    joined: "2025",
    initials: "LS",
    reportsTo: "niroshi-rathnayakage",
  },
  {
    slug: "eshani-rathnayake",
    name: "Ms Eshani Rathnayake",
    shortName: "Eshani",
    role: "Assistant Accountant",
    credentials: ["CPA (Australia)", "ACA, Institute of Chartered Accountants of Sri Lanka", "BSc Accounting (Special, First Class), University of Sri Jayewardenepura"],
    credentialShort: "CPA (Aust) · ACA (Sri Lanka)",
    bio: "An assistant accountant with the firm since 2024, joining soon after immigrating to Australia. Eshani spent nearly ten years as an accountant across Sri Lanka, Jamaica, where she worked for KPMG, and the United Kingdom. She graduated with first-class honours in accounting from the University of Sri Jayewardenepura, widely regarded as Sri Lanka's preeminent university for business education, and is an associate member of the Institute of Chartered Accountants of Sri Lanka. Since arriving in Australia she has gained membership of CPA Australia and is studying for the Chartered Tax Adviser credential conferred by The Tax Institute. She prepares compliance work for the firm's clients under Niroshi's supervision.",
    lineage: "KPMG, Jamaica",
    joined: "2024",
    initials: "ER",
    reportsTo: "niroshi-rathnayakage",
  },
  {
    slug: "lakshika-senaviratne",
    name: "Ms Lakshika Senaviratne",
    shortName: "Lakshika",
    role: "Assistant Accountant",
    credentials: ["Associate member, CPA Australia", "Master of Professional Accounting & Finance, Deakin University", "BSc Accounting & Finance (Special), Rajarata University, Sri Lanka"],
    credentialShort: "CPA Australia (Assoc.) · MPAF, Deakin",
    bio: "An assistant accountant with the firm since 2024, a couple of years after arriving in Australia. Lakshika worked for nearly ten years as an accountant in Sri Lanka, in the commercial sector and in professional accounting firms including EY. Since arriving in Australia she has added a Master of Professional Accounting & Finance from Deakin University to her bachelor's degree in accounting and finance from Rajarata University, Sri Lanka, and is completing the CPA Australia program. She prepares compliance work for the firm's clients under Niroshi's supervision.",
    lineage: "EY, Sri Lanka",
    joined: "2024",
    initials: "LS",
    reportsTo: "niroshi-rathnayakage",
  },
  {
    slug: "anne-tran",
    name: "Ms Anne Tran",
    shortName: "Anne",
    role: "Practice Manager",
    credentials: ["Bachelor of Commerce (Accounting), Macquarie University"],
    credentialShort: "BCom (Accounting), Macquarie",
    bio: "The practice manager of the firm since 2024, responsible for everything administrative so the accountants can stay on client work; by design she carries out none of the client engagements herself. Anne's working career began in 1999 and includes founding her own branded garments business in greater Sydney, so she runs the firm's operations with an owner's eye. She holds a Bachelor of Commerce in accounting from Macquarie University and reports directly to Dr Sridaran.",
    joined: "2024",
    initials: "AT",
    reportsTo: "maheswaran-sridaran",
  },
] as const;

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}

// Collective proof lines for the homepage bench strip. Both claims are
// verbatim-verifiable against the resumes in docs/ (see memory/decisions.md
// entry 25 for the phrasing constraints).
export const teamCollective = {
  eyebrow: "The bench",
  heading: "He reviews every file. These are the people who build them.",
  hooks: [
    "Every accountant on the team came through EY or KPMG before arriving here.",
    "Every one of them holds, or is completing, the CPA Australia credential.",
  ],
  cta: "Meet the whole team",
  ctaHref: "/about#team",
} as const;

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Sri has, in the first half of 2010, assisted our group in a number of complex areas: tax (federal, as well as state), strategic management, financing, rationalisation of leases, and formulation of internal audit arrangements. In all that work, Sri has impressed us as a professional who has complete mastery over the theoretical aspects of his work who, at the same time, does not neglect properly addressing all practical tasks required to accomplish sound outcomes for us. We are convinced that his approach for serving us always had foremost regard for what was in the best interest of our group. We highly commend his reliability and his unfailing professional courtesy with which he has engaged with all our staff and other stakeholders he has worked with.",
    name: "Mr Ambi Thind",
    role: "Group CEO, Managing Director",
    company: "The Education Group Pty Ltd",
  },
  {
    quote: "Sridaran has assisted me with the accounting and tax affairs of my company, Visa Investments Portfolio Pty Ltd, ever since the company was incorporated. His assistance to me has always been most conscientious and patient. He has, on occasion, had to devote a lot of time to provide me that assistance. I have total confidence in Sridaran's professional competence, integrity and reliability.",
    name: "Ms Araliya De Silva",
    role: "Director",
    company: "Visa Investments Portfolio Pty Ltd",
  },
  {
    quote: "Sri has taken care of the tax work for our company, Quikstar Pty Ltd, for several years. He has always generously given us his time to address any concerns and has always advised us of what we should do; mindful of what is best for us. We have always had complete confidence of his professional competence and reliability and would highly recommend his services to any company.",
    name: "Ms Anne Truong",
    role: "",
    company: "Quikstar Pty Ltd",
  },
  {
    quote: "I have been a client of Maheswaran Sridaran for over seven years uninterrupted. I regard Sridaran as a completely reliable and competent professional, with a good mastery of all taxes that I, as a health care professional and property-company owner, am exposed to: income tax, Medicare levy, GST, and land tax. I highly commend the promptness, maturity, patience, and professional courtesy that have been consistent features of my professional relationship with Maheswaran Sridaran.",
    name: "Ms Manya Scheftsik",
    role: "Registered Psychologist",
    company: "",
  },
  {
    quote: "Sri assisted us to manage our dealings with the Australian Taxation Office and NSW Office of State Revenue in relation to audits they had initiated of our two colleges. Sri most competently oversaw the work required, providing comprehensive, appropriate and timely responses to both authorities. He also ensured that work was carried out in a manner that was cost-effective to us.",
    name: "Ms Neda Morris",
    role: "Principal Executive Officer, Director",
    company: "Caprock International Pty Ltd",
  },
];

export function getTestimonial(name: string): Testimonial | undefined {
  return testimonials.find((t) => t.name === name);
}

// Act V case-in-point frame, single source of truth. Rendered by ProofAct
// (homepage) and reused verbatim as CaseInPoint's default frame prop (inner
// pages). Drawn strictly from Ms Neda Morris's own testimonial wording;
// nothing is invented.
export const caseFrame =
  "When the ATO and the Office of State Revenue both opened audits, the response had to be comprehensive, correct, and cost-effective.";

// Act VII promise headline + body, single source of truth. Rendered by
// ConversationAct (homepage, red crescendo) and PromiseBlock (inner pages).
export const promiseCopy = {
  headlineLead: "You hired the expert. You should",
  headlineEm: "get",
  headlineTail: "the expert",
  body: "Elsewhere, a partner wins the work and a junior does it. Here, Dr Sridaran reviews the quality on every engagement himself. That is the whole point of a boutique firm built on trustworthiness, responsibility, and professional care. The person whose name is on the door is the person on your file.",
} as const;

// Act VI "How it works" steps, single source of truth. Rendered by HowRail
// (homepage, compressed to one rail) and HowItWorks (inner pages, full detail).
export const howItWorksSteps = [
  {
    title: "You speak with the director.",
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
] as const;

// ---------------------------------------------------------------------------
// Service to testimonial mapping
// One relevant, real testimonial surfaced on each service detail page, chosen
// by genuine relevance. Honest by design:
//  - tax-disputes-ato is intentionally absent: that page carries the Neda Morris
//    "case in point" band, so a second quote from her would be redundant.
//  - self-managed-super maps to a general competence/reliability quote that makes
//    no SMSF-specific claim (no testimonial mentions SMSF; nothing is invented).
// ---------------------------------------------------------------------------
export const relatedTestimonial: Record<string, string> = {
  "tax-advisory-planning": "Ms Manya Scheftsik",
  "tax-compliance-returns": "Ms Araliya De Silva",
  "business-cfo-advisory": "Mr Ambi Thind",
  "self-managed-super": "Ms Anne Truong",
};

export function getTestimonialForService(slug: string): Testimonial | undefined {
  const name = relatedTestimonial[slug];
  return name ? getTestimonial(name) : undefined;
}
