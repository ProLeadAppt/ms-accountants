/**
 * schema.org entity graph for MS Accountants.
 *
 * Everything here is derived from `src/lib/site.ts`, which is the source of
 * truth per the build spec. Nothing in this file may state a fact that is not
 * already recorded there.
 *
 * Deliberately absent, because the facts are not confirmed:
 *   - `geo` coordinates
 *   - `openingHoursSpecification`
 *   - `priceRange`
 *   - `aggregateRating` / `review`
 *   - `foundingDate`
 * Add each only once the real value is supplied. Inventing any of them on a
 * YMYL financial site is worse than omitting it: Google's Search Quality
 * Rater Guidelines weight Trust highest of the four E-E-A-T factors, and a
 * contradicted fact is a trust defect, not a missing-data one.
 *
 * The graph is @id-linked so pages can reference the firm and the principal
 * without restating them:
 *   {url}#organization  the firm (AccountingService)
 *   {url}#website       the site
 *   {url}#sridaran      the principal (Person)
 */
import { site, services, type Service } from "./site";

export const ORGANIZATION_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;
export const PRINCIPAL_ID = `${site.url}/#sridaran`;

const MACQUARIE = {
  "@type": "EducationalOrganization",
  name: "Macquarie University",
  sameAs: "https://en.wikipedia.org/wiki/Macquarie_University",
} as const;

const UNSW = {
  "@type": "EducationalOrganization",
  name: "UNSW Sydney",
  sameAs: "https://en.wikipedia.org/wiki/University_of_New_South_Wales",
} as const;

const postalAddress = {
  "@type": "PostalAddress",
  ...site.contact.officeAddressParts,
} as const;

/**
 * The principal. On a YMYL financial site this is the single strongest
 * E-E-A-T signal available, so the credentials are modelled explicitly as
 * EducationalOccupationalCredential rather than left as prose.
 */
export const principalSchema = {
  "@type": "Person",
  "@id": PRINCIPAL_ID,
  name: "Dr Maheswaran Sridaran",
  jobTitle: "Principal",
  url: `${site.url}/about`,
  email: site.contact.email,
  telephone: site.contact.phoneE164,
  worksFor: { "@id": ORGANIZATION_ID },
  alumniOf: [MACQUARIE, UNSW],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "PhD in Australian tax law",
      educationalLevel: "Doctorate",
      recognizedBy: MACQUARIE,
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "Bachelor of Laws (LLB)",
      recognizedBy: MACQUARIE,
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "Master of Taxation",
      recognizedBy: UNSW,
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "professional certification",
      name: "Chartered Accountant",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "professional licence",
      name: "Registered Tax Agent",
    },
  ],
  knowsAbout: [
    "Australian tax law",
    "Capital gains tax",
    "Tax planning",
    "Tax disputes",
    "Tax litigation",
    "ATO audits and investigations",
    "Business and CFO advisory",
    "Self-managed superannuation",
  ],
} as const;

/** The firm. AccountingService is a LocalBusiness subtype, so the NAP
 *  properties below are what feeds map-pack and citation matching. */
export const organizationSchema = {
  "@type": "AccountingService",
  "@id": ORGANIZATION_ID,
  name: site.name,
  description:
    "Boutique Sydney tax and accounting firm led by Dr Maheswaran Sridaran, a chartered accountant and lawyer with a PhD in Australian tax law.",
  url: site.url,
  address: postalAddress,
  telephone: site.contact.phoneE164,
  faxNumber: site.contact.fax,
  email: site.contact.email,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Sydney, New South Wales, Australia",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.contact.phoneE164,
      email: site.contact.email,
      areaServed: "AU",
      availableLanguage: "en-AU",
    },
  ],
  founder: { "@id": PRINCIPAL_ID },
  employee: { "@id": PRINCIPAL_ID },
  knowsAbout: principalSchema.knowsAbout,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Tax and accounting services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        url: `${site.url}/services/${s.slug}`,
      },
    })),
  },
} as const;

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  inLanguage: "en-AU",
  publisher: { "@id": ORGANIZATION_ID },
} as const;

/** Emitted once, in the root layout. Every other page references it by @id. */
export const rootGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema, principalSchema],
};

/** Per-service graph: the Service itself plus its place in the hierarchy. */
export function serviceGraph(service: Service) {
  const url = `${site.url}/services/${service.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        description: service.tagline,
        url,
        serviceType: service.navTitle,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: organizationSchema.areaServed,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${site.url}/services`,
          },
          { "@type": "ListItem", position: 3, name: service.title, item: url },
        ],
      },
    ],
  };
}
