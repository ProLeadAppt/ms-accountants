import { describe, it, expect } from "vitest";
import {
  site,
  nav,
  valueStats,
  credentialCards,
  authorityItems,
  testimonials,
  relatedTestimonial,
  getTestimonialForService,
} from "./site";
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

  it("has working click-to-call and click-to-email contact links", () => {
    expect(site.contact.phoneHref).toBe("tel:+61297394837");
    expect(site.contact.mobileHref).toBe("tel:+61410588536");
    expect(site.contact.emailHref).toBe("mailto:m.sridaran@msaccountants.com.au");
  });

  it("has no unresolved placeholders in user-facing site fields", () => {
    const blob = JSON.stringify({ site, nav, valueStats, credentialCards, authorityItems });
    expect(blob).not.toContain("[[");
  });
});

describe("service to testimonial mapping", () => {
  const slugs = new Set(services.map((s) => s.slug));
  const names = new Set(testimonials.map((t) => t.name));

  it("every mapping key is a real service slug", () => {
    for (const slug of Object.keys(relatedTestimonial)) {
      expect(slugs.has(slug)).toBe(true);
    }
  });

  it("every mapping value resolves to a real testimonial", () => {
    for (const name of Object.values(relatedTestimonial)) {
      expect(names.has(name)).toBe(true);
      expect(getTestimonialForService(
        Object.keys(relatedTestimonial).find((k) => relatedTestimonial[k] === name)!,
      )?.name).toBe(name);
    }
  });

  it("deliberately omits Tax Disputes (it carries the CaseInPoint band instead)", () => {
    expect(relatedTestimonial["tax-disputes-ato"]).toBeUndefined();
    expect(getTestimonialForService("tax-disputes-ato")).toBeUndefined();
  });

  it("returns undefined for unknown slugs", () => {
    expect(getTestimonialForService("nope")).toBeUndefined();
  });
});
