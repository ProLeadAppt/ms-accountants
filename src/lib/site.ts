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
    phone: "02 9739 4837",
    phoneHref: "tel:+61297394837",
    mobile: "0410 588 536",
    mobileHref: "tel:+61410588536",
    fax: "02 8078 6640",
    email: "m.sridaran@msaccountants.com.au",
    emailHref: "mailto:m.sridaran@msaccountants.com.au",
    officeAddress: "Suite 70, WOTSO WorkSpace, 9 George Street, North Strathfield NSW 2137",
    postalAddress: "P O Box 2194, Hornsby Westfield Post Office, Hornsby NSW 1635",
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
      "This is the work Dr Maheswaran Sridaran built his career on. His doctoral thesis examined how Australia taxes capital gains; his book asked the harder question still, whether it taxes them fairly. Most advisers apply the rules as written. He has spent a career asking whether the rules, as written, produce the right answer. That is the difference when your position is the one being tested.",
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
    why: "Most accountants apply the capital gains rules. Dr Sridaran studied them to doctoral level, then published on whether they are even fair. When a question is hard enough to matter, that is the difference between a position you can defend and an expensive guess.",
    image: "/generated/tax-advisory-2.jpg",
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
      "Dr Maheswaran Sridaran taught tax law at university and led a national tax practice before founding MS Accountants. He does not just know the rules. He understands the reasoning behind them, and where that reasoning is weaker than it looks. That is what it takes to push back on an assessment and be taken seriously.",
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
    why: "Arguing a tax position is part technical, part advocacy. Few accountants have taught the law, published on it, and argued the disputes. Dr Sridaran has done all three. The ATO's position is not the last word; it is an argument, and arguments can be answered. You want someone who works that way before you respond, not after.",
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
    why: "Accuracy is the floor, not the ceiling. Most firms treat compliance as the whole job; here it is the starting point. With Dr Sridaran reviewing quality across the practice, your obligations are met precisely, then read for the opportunities most people file away without noticing.",
    image: "/generated/tax-compliance-1.jpg",
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
    why: "Most growing businesses assume that calibre of financial judgement comes only with a full-time hire. It does not. Dr Sridaran has sat at the senior end of global firms and advised property conglomerates, listed companies and financial services licensees. You get that judgement applied to your business, at boutique scale, with direct access to the principal.",
    image: "/generated/cfo-advisory-1.jpg",
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
    why: "An SMSF audit is easy to treat as a formality, which is exactly why it is where funds get exposed. It sits where superannuation, tax and audit meet, three areas Dr Sridaran has worked across his entire career. Your fund is reviewed by someone who understands all three, not just one.",
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
  name: string;
  role: string;
  credentials: readonly string[];
  bio: string;
};

export const team: readonly TeamMember[] = [
  {
    name: "Dr Maheswaran Sridaran",
    role: "Principal",
    credentials: ["PhD, Macquarie University", "CA", "M.Tax, UNSW"],
    bio: "A chartered accountant and registered tax agent with thirty years across PwC, EY, WHK Horwath and Macquarie University. His doctoral thesis examined Australian capital gains tax; his first book asked whether capital gains are taxed equitably in Australia. He is the chief quality controller of the practice: every engagement is reviewed personally by him.",
  },
  {
    name: "Ms Niroshi Rathnayakage",
    role: "Senior Accountant",
    credentials: ["CPA (Australia)", "ACA, Sri Lanka", "BSc Management"],
    bio: "Senior accountant of the firm and member of CPA Australia. Niroshi brings extensive Australian tax experience gained across several firms, and nearly a decade as an accountant in Sri Lanka, including early career auditing at Ernst & Young. She holds a bachelor's degree in management from the University of Sri Jayewardenapura.",
  },
] as const;

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
