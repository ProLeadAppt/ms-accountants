import { describe, it, expect } from "vitest";
import { site, nav, valueStats, credentialCards, authorityItems } from "./site";
import { services, getService } from "./services";

describe("content library", () => {
  it("has the verbatim primary CTA", () => {
    expect(site.cta).toBe("Book a conversation with Dr Sridaran");
    expect(site.ctaHref).toBe("/contact");
  });

  it("exposes exactly five services with unique slugs", () => {
    expect(services).toHaveLength(5);
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(5);
  });

  it("every service has the required fields", () => {
    for (const s of services) {
      expect(s.slug).toBeTruthy();
      expect(s.navTitle).toBeTruthy();
      expect(s.teaserBlurb).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.tagline).toBeTruthy();
      expect(s.intro.length).toBeGreaterThan(0);
      expect(s.help.length).toBeGreaterThan(0);
      expect(s.why).toBeTruthy();
    }
  });

  it("getService resolves the flagship and rejects unknown slugs", () => {
    const flagship = getService("tax-advisory-planning");
    expect(flagship?.flagship).toBe(true);
    expect(getService("nope")).toBeUndefined();
  });

  it("has no unresolved placeholders in user-facing site fields", () => {
    const blob = JSON.stringify({ site, nav, valueStats, credentialCards, authorityItems });
    expect(blob).not.toContain("[[");
  });
});
