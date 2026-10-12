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
    expect(html.match(/<h2\b/g)).toHaveLength(8);
    expect(html).toContain('href="/services/tax-disputes-ato"');
    expect(html).toContain('href="/contact"');
    expect(html).toContain("By MS Accountants");
    expect(html).toContain("General information only.");
    expect(html).toContain("Editorial illustration.");
    expect(html).toContain("our-formal-notice-powers");
    expect(html).not.toContain("in-detail/privacy-and-information-gathering");
    expect(html).not.toContain("PiT=20240503000001");
    expect(html).not.toContain('"@type":"Article"');
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
