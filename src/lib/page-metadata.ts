import type { Metadata } from "next";
import { site } from "./site";

// Search snippets are separate from approved page and social copy. The
// summaries are grounded in the existing visible services and credentials;
// no changes to testimonials, approved claims, canonicals or routing.
const searchDescriptions: Readonly<Record<string, string>> = {
  "": "Sydney tax and accounting firm led by Dr Maheswaran Sridaran, a chartered accountant and lawyer with a doctorate in Australian tax law.",
  "/services": "Explore tax planning, tax disputes, compliance, CFO advisory and SMSF compliance at MS Accountants, a boutique Sydney tax and accounting firm.",
  "/client-stories": "Read attributed client references about MS Accountants, covering long-term accounting relationships, ATO matters, tax compliance and business advice.",
  "/about": "Meet Dr Maheswaran Sridaran, a chartered accountant and lawyer with a doctorate in Australian tax law, and the team at MS Accountants in Sydney.",
  "/contact": "Speak with Dr Sridaran at MS Accountants in Sydney about your tax or accounting matter. Find our phone, email and North Strathfield office details.",
  "/blog": "Read practical tax guides from MS Accountants in Sydney, including what to check when you receive ATO correspondence and how to gather records.",
  "/services/tax-disputes-ato": "Get help with ATO audits, investigations, objections, appeals and tax litigation from MS Accountants, led by a chartered accountant and lawyer.",
  "/services/business-cfo-advisory": "Explore outsourced CFO support, due diligence, financial forecasts and loan finance support for corporate clients at MS Accountants in Sydney.",
  "/services/self-managed-super": "MS Accountants in Sydney helps with self-managed superannuation fund compliance, including contributions, pensions, records and lodgements.",
  "/services/tax-compliance-returns": "MS Accountants in Sydney assists with income tax returns, BAS, GST, FBT, payroll tax and other compliance obligations, with senior review.",
  "/services/tax-advisory-planning": "Explore Australian tax planning for capital gains, business sales, restructures and succession with MS Accountants, a boutique Sydney firm."
};

export const shareImage = {
  url: "/share-image",
  width: 1200,
  height: 630,
  alt: "MS Accountants — a boutique Sydney tax and accounting firm",
};

/** Keep approved page copy while giving each page its own sharing identity. */
export function withPageSocial(metadata: Metadata, path: string): Metadata {
  const rawTitle = typeof metadata.title === "string"
    ? metadata.title
    : metadata.title && "absolute" in metadata.title ? metadata.title.absolute
    : metadata.title && "default" in metadata.title ? metadata.title.default
    : site.name;
  const title = rawTitle.includes(site.name) ? rawTitle : `${rawTitle} · ${site.name}`;
  const images = metadata.openGraph?.images ?? [shareImage];
  const imageList = Array.isArray(images) ? images : [images];
  const imageUrls = imageList.map((image) => typeof image === "string" || image instanceof URL ? image : image.url);
  return {
    ...metadata,
    description: searchDescriptions[path] ?? metadata.description,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_AU",
      ...metadata.openGraph,
      title: metadata.openGraph?.title ?? title,
      description: metadata.openGraph?.description ?? metadata.description ?? undefined,
      url: `${site.url}${path}`,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.openGraph?.title ?? title,
      description: metadata.openGraph?.description ?? metadata.description ?? undefined,
      images: imageUrls,
      ...metadata.twitter,
    },
  };
}
