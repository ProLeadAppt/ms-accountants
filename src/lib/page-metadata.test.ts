import { describe, expect, it } from "vitest";
import { withPageSocial } from "./page-metadata";
import { generateMetadata } from "@/app/services/[slug]/page";
import { organizationSchema } from "./schema";

describe("page sharing metadata", () => {
  it("identifies the firm with its existing genuine logo", () => {
    expect(organizationSchema.logo).toBe("https://www.msaccountants.com.au/ms-accountants-logo.png");
  });
  it("shares the actual service URL and approved copy rather than the homepage", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "tax-advisory-planning" }) });
    expect(metadata.openGraph).toMatchObject({
      url: "https://www.msaccountants.com.au/services/tax-advisory-planning",
      title: "Tax Advisory & Planning · MS Accountants",
      description: "The expensive questions deserve the deepest expertise.",
      images: [{ url: "/share-image", width: 1200, height: 630 }],
    });
    expect(metadata.alternates?.canonical).toBe("/services/tax-advisory-planning");
  });

  it("preserves an absolute blog title and its own illustration", () => {
    const metadata = withPageSocial({
      title: { absolute: "Received an ATO Audit Letter? First Steps | MS Accountants" },
      description: "Approved article description",
      openGraph: { type: "article", publishedTime: "2026-10-12", images: [{ url: "/images/blog/ato-letter.png" }] },
    }, "/blog/what-to-do-ato-audit-letter");
    expect(metadata.openGraph).toMatchObject({ type: "article", publishedTime: "2026-10-12", images: [{ url: "/images/blog/ato-letter.png" }] });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image", images: ["/images/blog/ato-letter.png"] });
    expect(metadata.title).toEqual({ absolute: "Received an ATO Audit Letter? First Steps | MS Accountants" });
  });

  it("keeps the homepage's approved social copy and supplies a brand preview", () => {
    const metadata = withPageSocial({ title: { default: "MS Accountants", template: "%s · MS Accountants" }, openGraph: { title: "Approved title", description: "Approved social description" } }, "");
    expect(metadata.openGraph).toMatchObject({ url: "https://www.msaccountants.com.au", title: "Approved title", description: "Approved social description" });
  });
});
