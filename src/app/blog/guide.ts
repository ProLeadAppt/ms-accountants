import { site } from "@/lib/site";
import { ORGANIZATION_ID } from "@/lib/schema";

export const guide = {
  title: "What should you do if you receive an ATO audit letter?",
  path: "/blog/what-to-do-ato-audit-letter",
  published: "2026-10-12",
  author: "MS Accountants",
  readingMinutes: 6, // 1,104 words, estimated at 200 words per minute.
  summary: "Check the contact, understand the request and organise your records before responding.",
  image: "/images/blog/ato-letter.png",
} as const;

export const sections = [
  { id: "verify-contact", label: "Check the contact" },
  { id: "understand-request", label: "Understand the request" },
  { id: "gather-records", label: "Gather your records" },
  { id: "more-time", label: "If you need more time" },
  { id: "speak-to-adviser", label: "When to seek advice" },
  { id: "disagree-with-ato", label: "If you disagree" },
  { id: "common-questions", label: "Common questions" },
  { id: "sources", label: "Official sources" },
] as const;

export const sources = [
  { title: "How to stay scam safe", href: "https://www.ato.gov.au/online-services/scams-cyber-safety-and-identity-protection/how-to-stay-scam-safe" },
  { title: "Our formal notice powers", href: "https://www.ato.gov.au/about-ato/commitments-and-reporting/information-and-privacy/information-management/our-approach-to-information-gathering/our-formal-notice-powers" },
  { title: "Resolving information gathering disputes", href: "https://www.ato.gov.au/about-ato/commitments-and-reporting/information-and-privacy/information-management/our-approach-to-information-gathering/resolving-disputes" },
  { title: "Income tax: objections against income tax assessments (TR 2011/5)", href: "https://www.ato.gov.au/law/view/document?DocID=TXR/TR20115/NAT/ATO/00001" },
] as const;

export const articleGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting", "@id": `${site.url}${guide.path}#article`,
      headline: guide.title, description: guide.summary,
      mainEntityOfPage: `${site.url}${guide.path}`,
      author: { "@type": "Organization", "@id": ORGANIZATION_ID, name: guide.author },
      publisher: { "@id": ORGANIZATION_ID }, datePublished: guide.published,
      image: `${site.url}${guide.image}`, inLanguage: "en-AU",
      citation: sources.map(({ href }) => href),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
        { "@type": "ListItem", position: 3, name: "ATO correspondence", item: `${site.url}${guide.path}` },
      ],
    },
  ],
};
