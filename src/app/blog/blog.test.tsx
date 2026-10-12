import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import BlogPage, { metadata as blogMetadata } from "./page";
import Article, { metadata } from "./what-to-do-ato-audit-letter/page";

describe("blog routes", () => {
  it("links the listing to the prepared article with its own canonical", () => {
    expect(blogMetadata.alternates?.canonical).toBe("/blog");
    const html = renderToStaticMarkup(<BlogPage />);
    expect(html).toContain('href="/blog/what-to-do-ato-audit-letter"');
    expect(html.match(/<h1\b/g)).toHaveLength(1);
  });

  it("renders the complete educational article with existing service and contact links", () => {
    const html = renderToStaticMarkup(<Article />);
    expect(html.match(/<h1\b/g)).toHaveLength(1);
    for (const id of ["verify-contact", "understand-request", "gather-records", "more-time", "speak-to-adviser", "disagree-with-ato", "common-questions", "sources"]) {
      expect(html).toContain(`id="${id}"`);
      expect(html).toContain(`href="#${id}"`);
    }
    expect(html).toContain('href="/services/tax-disputes-ato"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain("By MS Accountants");
    expect(html).toContain("General information only.");
    expect(html).toContain("Editorial illustration.");
    expect(html).toContain("our-formal-notice-powers");
    expect(html).not.toContain("in-detail/privacy-and-information-gathering");
    expect(html).not.toContain("PiT=20240503000001");
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/)?.[1] ?? "{}");
    expect(graph["@graph"][0]).toMatchObject({
      "@type": "BlogPosting",
      headline: "What should you do if you receive an ATO audit letter?",
      author: { "@type": "Organization", name: "MS Accountants" },
      datePublished: "2026-10-12",
      mainEntityOfPage: "https://www.msaccountants.com.au/blog/what-to-do-ato-audit-letter",
    });
    expect(graph["@graph"][0]).not.toHaveProperty("dateModified");
    expect(graph["@graph"][0].citation).toHaveLength(4);
    expect(graph["@graph"][1]).toMatchObject({ "@type": "BreadcrumbList" });
    expect(graph["@graph"][1].itemListElement.map(({ name }: { name: string }) => name)).toEqual(["Home", "Blog", "ATO correspondence"]);
    expect(html).not.toContain('"@type":"FAQPage"');
  });

  it("uses the article canonical, business author and approved release date", () => {
    expect(metadata.alternates?.canonical).toBe("/blog/what-to-do-ato-audit-letter");
    expect(metadata.authors).toEqual([{ name: "MS Accountants" }]);
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: "https://www.msaccountants.com.au/blog/what-to-do-ato-audit-letter",
    });
    expect(metadata.openGraph).toHaveProperty("publishedTime", "2026-10-12");
    expect(metadata.openGraph).not.toHaveProperty("modifiedTime");
  });
});
