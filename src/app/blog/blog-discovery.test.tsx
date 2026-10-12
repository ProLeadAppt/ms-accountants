import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import sitemap from "../sitemap";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import ServicePage from "../services/[slug]/page";

describe("approved blog discovery", () => {
  it("makes Blog available in the primary navigation", () => {
    const html = renderToStaticMarkup(<Header />);
    expect(html).toContain('aria-label="Primary"');
    expect(html).toContain('href="/blog"');
  });

  it("links the relevant service to the guide without adding it to unrelated services", async () => {
    const disputes = renderToStaticMarkup(await ServicePage({ params: Promise.resolve({ slug: "tax-disputes-ato" }) }));
    const compliance = renderToStaticMarkup(await ServicePage({ params: Promise.resolve({ slug: "tax-compliance-returns" }) }));
    expect(disputes).toContain('href="/blog/what-to-do-ato-audit-letter"');
    expect(compliance).not.toContain('href="/blog/what-to-do-ato-audit-letter"');
  });

  it("adds exactly two blog URLs after the ten existing sitemap entries", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(12);
    expect(entries.slice(10)).toEqual([
      { url: "https://www.msaccountants.com.au/blog", changeFrequency: "monthly", priority: 0.7 },
      { url: "https://www.msaccountants.com.au/blog/what-to-do-ato-audit-letter", changeFrequency: "monthly", priority: 0.7 },
    ]);
  });

  it("adds a single Blog link in the footer without changing existing navigation", () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html.match(/href="\/blog"/g)).toHaveLength(1);
    for (const path of ["/services", "/client-stories", "/about", "/contact"]) {
      expect(html).toContain(`href="${path}"`);
    }
  });
});
