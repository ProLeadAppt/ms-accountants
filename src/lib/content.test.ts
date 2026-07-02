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
  team,
  getTeamMember,
  teamCollective,
  publications,
  book,
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
    const blob = JSON.stringify({ site, nav, valueStats, credentialCards, authorityItems, team, teamCollective });
    expect(blob).not.toContain("[[");
  });

  it("contains no em-dashes anywhere in the content library (house rule)", () => {
    const blob = JSON.stringify({
      site, nav, valueStats, credentialCards, authorityItems,
      team, teamCollective, services, testimonials, publications, book,
    });
    expect(blob).not.toContain("—");
  });
});

describe("team", () => {
  it("has all six members with unique slugs and names", () => {
    expect(team).toHaveLength(6);
    expect(new Set(team.map((m) => m.slug)).size).toBe(6);
    expect(new Set(team.map((m) => m.name)).size).toBe(6);
  });

  it("every member has the fields the roster and bench strip render", () => {
    for (const m of team) {
      expect(m.name).toBeTruthy();
      expect(m.shortName).toBeTruthy();
      expect(m.role).toBeTruthy();
      expect(m.credentials.length).toBeGreaterThan(0);
      expect(m.credentialShort).toBeTruthy();
      expect(m.bio.length).toBeGreaterThan(80);
      expect(m.initials).toMatch(/^[A-Z]{2}$/);
    }
  });

  it("features exactly one member (the principal)", () => {
    const featured = team.filter((m) => m.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0].slug).toBe("maheswaran-sridaran");
  });

  it("every reportsTo resolves to a real member", () => {
    for (const m of team) {
      if (m.reportsTo) {
        expect(getTeamMember(m.reportsTo)).toBeDefined();
      }
    }
  });

  it("getTeamMember resolves slugs and rejects unknowns", () => {
    expect(getTeamMember("niroshi-rathnayakage")?.role).toBe("Senior Accountant");
    expect(getTeamMember("nope")).toBeUndefined();
  });

  it("bench strip content is complete", () => {
    expect(teamCollective.heading).toBeTruthy();
    expect(teamCollective.hooks.length).toBeGreaterThan(0);
    expect(teamCollective.ctaHref).toBe("/about#team");
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
