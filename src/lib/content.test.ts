import { describe, it, expect } from "vitest";
import {
  site,
  nav,
  valueStats,
  credentialCards,
  authorityItems,
  team,
  getTeamMember,
  teamCollective,
  publications,
  book,
  voiceQuote,
  howItWorksSteps,
  promiseCopy,
  missionPrinciples,
  directorProfile,
  servicesPageDescription,
} from "./site";
import { services, getService } from "./services";
import {
  clientStories,
  serviceStoryIds,
  getClientStoriesForService,
} from "./testimonials";

describe("content library", () => {
  it("publishes the client-approved mission statement verbatim in two paragraphs", () => {
    expect(missionPrinciples.paragraphs).toEqual([
      "Ours is a professional services firm that seeks to always employ the best staff, staff who are committed to serving all our clients to the highest standard (irrespective of the stations of our clients). To provide our staff a working environment in which they have access to all the resources they need for optimally serving our clients, we must generate sufficient profits to fulfil the commitments we owe to all our stakeholders: all our clients, staff, suppliers, government, community, and owners.",
      "Our clients and our staff are our most important assets. We will always do our utmost to provide our clients timely care, which is responsible, constructive, and respectful. We will never charge our clients a fee they cannot sustain. Through our unfailing adherence to these principles, we strive to ensure that all our staff can rightly feel proud of their work, and thereby find their voice.",
    ]);
  });

  it("has the verbatim primary CTA", () => {
    expect(site.cta).toBe("Book a conversation with Dr Sridaran");
    expect(site.ctaHref).toBe("/contact");
  });

  it("uses the indexed www origin as the canonical site URL", () => {
    expect(site.url).toBe("https://www.msaccountants.com.au");
  });

  it("links each featured article to its authoritative Macquarie publication record", () => {
    expect(publications).toEqual([
      {
        title: "Tax reforms for the best and fairest",
        outlet: "Australian Financial Review",
        year: "2008",
        href: "https://researchers.mq.edu.au/en/publications/tax-reforms-for-the-best-and-fairest/",
      },
      {
        title: "High Court gets it right on GST",
        outlet: "Australian Financial Review",
        year: "2008",
        href: "https://researchers.mq.edu.au/en/publications/high-court-gets-it-right-on-gst/",
      },
      {
        title: "There's a different way to view takeover concerns",
        outlet: "Australian Financial Review",
        year: "2007",
        href: "https://researchers.mq.edu.au/en/publications/theres-a-different-way-to-view-takeover-concerns/",
      },
      {
        title: "Tax agents deserve a better deal",
        outlet: "Australian Financial Review",
        year: "2007",
        href: "https://researchers.mq.edu.au/en/publications/tax-agents-deserve-a-better-deal/",
      },
      {
        title: "Top universities serve students first",
        outlet: "The Sydney Morning Herald",
        year: "2008",
        href: "https://researchers.mq.edu.au/en/publications/top-universities-serve-students-first/",
      },
    ]);
  });

  it("publishes the client-approved director credential and teaching wording", () => {
    expect(directorProfile.homeCredential).toBe(
      "Led by Dr Maheswaran Sridaran, chartered accountant, lawyer, registered tax agent, and PhD in Australian tax law.",
    );
    expect(directorProfile.aboutCredential).toBe(
      "Led by Dr Maheswaran Sridaran, chartered accountant, lawyer, registered tax agent, PhD Australian tax law (Macquarie University).",
    );
    expect(directorProfile.teaching).toBe(
      "He taught Australian tax law and commercial law at Macquarie University, Sydney, the third largest university in Sydney, where students chose him as “The most knowledgeable teacher in their chosen field”, an award made by the university.",
    );
    expect(credentialCards).toContainEqual({
      title: "Taught Australian tax law and commercial law. Published in the AFR and SMH. Wrote the book.",
      body: "If your accountant can teach the law, publish on it nationally, and argue it when it is tested, they can explain your position clearly enough for you to act, and defend it when it counts.",
    });
    expect(JSON.stringify(getService("tax-disputes-ato"))).toContain(
      "taught Australian tax law and commercial law at Macquarie University",
    );
  });

  it("exposes exactly five services with unique slugs", () => {
    expect(services).toHaveLength(5);
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(5);
  });

  it("keeps SMSF positioning compliance-only and scopes finance support accurately", () => {
    expect(servicesPageDescription).toBe(
      "Tax advisory and planning; disputes, investigations and litigation; compliance; CFO advisory; and SMSF compliance. Five disciplines, led by a chartered accountant who is also a lawyer, with Dr Sridaran reviewing every engagement personally.",
    );
    expect(servicesPageDescription).not.toMatch(/SMSF audit/i);

    const finance = getService("business-cfo-advisory");
    expect(finance?.help).toContainEqual({
      term: "Loan finance support and introductions",
      desc: "preparing financial information and coordinating with established loans professionals and banking contacts when clients need finance.",
    });
    expect(JSON.stringify(finance)).not.toContain("equity finance");
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
    const blob = JSON.stringify({
      site, nav, valueStats, credentialCards, authorityItems, team, teamCollective,
      voiceQuote, howItWorksSteps, promiseCopy,
    });
    expect(blob).not.toContain("[[");
  });

  it("contains no em-dashes anywhere in the content library (house rule)", () => {
    const blob = JSON.stringify({
      site, nav, valueStats, credentialCards, authorityItems,
      team, teamCollective, services, publications, book,
      voiceQuote, howItWorksSteps, promiseCopy,
    });
    expect(blob).not.toContain("—");
  });
});

describe("team", () => {
  it("publishes the six client-approved MS Accountants work contacts", () => {
    const approvedEmailBySlug = {
      "maheswaran-sridaran": "m.sridaran@msaccountants.com.au",
      "niroshi-rathnayakage": "niroshi@msaccountants.com.au",
      "anne-tran": "anne@msaccountants.com.au",
      "lakshika-subramaniam": "lakshika.subramaniam@msaccountants.com.au",
      "eshani-rathnayake": "eshani@msaccountants.com.au",
      "lakshika-senaviratne": "lakshika@msaccountants.com.au",
    } as const;

    expect(Object.fromEntries(team.map((member) => [member.slug, member.email]))).toEqual(
      approvedEmailBySlug,
    );
    expect(new Set(team.map((member) => member.email)).size).toBe(team.length);
    expect(team.every((member) => member.email.endsWith("@msaccountants.com.au"))).toBe(
      true,
    );

    const publishedTeamContent = JSON.stringify(team);
    for (const supersededPersonalAddress of [
      "nsewwandika0@gmail.com",
      "anne@quikstar.com.au",
      "lakshikasp@gmail.com",
      "lakshikasenaviratne@gmail.com",
    ]) {
      expect(publishedTeamContent).not.toContain(supersededPersonalAddress);
    }
  });

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

  it("publishes the approved Niroshi and Anne portraits with direct email contacts", () => {
    const niroshi = getTeamMember("niroshi-rathnayakage");
    expect(niroshi?.name).toBe("Ms Niroshi Rathnayakage");
    expect(niroshi?.email).toBe("niroshi@msaccountants.com.au");
    expect(niroshi?.photo).toBe("/images/team/niroshi-sewwandika-editorial.webp");

    const anne = getTeamMember("anne-tran");
    expect(anne?.name).toBe("Ms Anne Tran");
    expect(anne?.email).toBe("anne@msaccountants.com.au");
    expect(anne?.photo).toBe("/images/team/anne-tran-editorial.webp");
  });

  it("publishes both confirmed Lakshika portraits with direct email contacts", () => {
    const subramaniam = getTeamMember("lakshika-subramaniam");
    expect(subramaniam?.name).toBe("Ms Lakshika Subramaniam");
    expect(subramaniam?.email).toBe("lakshika.subramaniam@msaccountants.com.au");
    expect(subramaniam?.photo).toBe("/images/team/lakshika-subramaniam-editorial.webp");
    expect(subramaniam?.joined).toBe("2024");
    expect(subramaniam?.bio).toContain("with the firm since 2024");
    expect(subramaniam?.credentials).toContain("Registered BAS Agent");

    const senaviratne = getTeamMember("lakshika-senaviratne");
    expect(senaviratne?.name).toBe("Ms Lakshika Senaviratne");
    expect(senaviratne?.email).toBe("lakshika@msaccountants.com.au");
    expect(senaviratne?.photo).toBe("/images/team/lakshika-senaviratne-editorial.webp");
  });

  it("publishes Eshani Rathnayake's approved portrait with her supplied work email", () => {
    const eshani = getTeamMember("eshani-rathnayake");
    expect(eshani?.name).toBe("Ms Eshani Rathnayake");
    expect(eshani?.photo).toBe("/images/team/eshani-rathnayake-editorial.webp");
    expect(eshani?.email).toBe("eshani@msaccountants.com.au");
  });

  it("bench strip content is complete", () => {
    expect(teamCollective.heading).toBeTruthy();
    expect(teamCollective.hooks.length).toBeGreaterThan(0);
    expect(teamCollective.ctaHref).toBe("/about#team");
  });
});

describe("service to client-proof mapping", () => {
  const slugs = new Set(services.map((s) => s.slug));
  const storyIds = new Set(clientStories.map((story) => story.id));

  it("every mapping key is a real service slug", () => {
    for (const slug of Object.keys(serviceStoryIds)) {
      expect(slugs.has(slug)).toBe(true);
    }
  });

  it("every mapping value resolves to an approved client story", () => {
    for (const ids of Object.values(serviceStoryIds)) {
      for (const id of ids) expect(storyIds.has(id)).toBe(true);
    }
  });

  it("maps two independently supplied ATO references to Tax Disputes", () => {
    expect(getClientStoriesForService("tax-disputes-ato").map((story) => story.id)).toEqual([
      "bianca-fletcher",
      "priyantha-cooray",
    ]);
  });

  it("returns an empty collection for unknown slugs", () => {
    expect(getClientStoriesForService("nope")).toEqual([]);
  });
});
