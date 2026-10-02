import { describe, expect, it } from "vitest";
import approvedBodies from "./approved-reference-bodies.json";
import { clientStoriesGraph } from "./schema";
import {
  clientStories,
  featuredStoryIds,
  getClientStory,
  getClientStoriesForService,
  storyChapters,
} from "./testimonials";

const retiredNames = [
  "Mr Ambi Thind",
  "Ms Neda Morris",
  "Ms Anne Truong",
  "Ms Manya Scheftsik",
];

const normalise = (value: string) => value.replace(/\s+/g, " ").trim();

describe("client testimonial proof corpus", () => {
  it("matches all six approved source bodies, allowing only display whitespace", () => {
    for (const [id, body] of Object.entries(approvedBodies)) {
      expect(normalise(getClientStory(id)!.fullQuote)).toBe(normalise(body));
    }
  });

  it("keeps Kanini legal coordination outside operational and CFO proof", () => {
    const kanini = getClientStory("srinivasan-karunakaran")!;
    expect(kanini.fullQuote).toContain("not at all with respect to any operational matters");
    expect(kanini.excerpt).toContain("not at all with respect to any operational matters");
    expect(kanini.serviceSlugs).toEqual([]);
    expect(getClientStoriesForService("business-cfo-advisory")).not.toContain(kanini);
    expect(kanini.chapter).toBe("entity-establishment");
    expect(getClientStoriesForService("tax-compliance-returns").map(s => s.id)).toContain("poomahal-kumar");
  });
  it("contains the 20 approved references with unique IDs", () => {
    expect(clientStories).toHaveLength(20);
    expect(new Set(clientStories.map((story) => story.id)).size).toBe(clientStories.length);
    expect(getClientStory("ken-su")?.name).toBe("Ms Jian He Su (Ken)");
  });

  it("keeps every excerpt inside its approved full reference", () => {
    for (const story of clientStories) {
      expect(normalise(story.fullQuote)).toContain(normalise(story.excerpt));
      expect(story.fullQuote.length).toBeGreaterThanOrEqual(story.excerpt.length);
    }
  });

  it("requires complete public attribution and forbids client logos", () => {
    for (const story of clientStories) {
      expect(story.name).toBeTruthy();
      expect(story.approvalStatus).toBe("approved");
      expect(story.useLogo).toBe(false);
      expect(story.source).toBeTruthy();
      expect(story.sourceType).toMatch(/client-reference|client-email|client-supplied-text/);
    }
  });

  it("contains no retired website testimonials", () => {
    const corpus = JSON.stringify(clientStories);
    for (const name of retiredNames) expect(corpus).not.toContain(name);
  });

  it("preserves the approved identity corrections", () => {
    expect(getClientStory("amarjit-singh-thind")?.name).toBe("Mr Amarjit Singh Thind");
    const murali = getClientStory("murali-pitchai");
    expect(murali?.company).toBe("HTC Global Services");
    expect(murali?.role).toBe("CFO - ROW (Rest of the world)");
    expect(murali?.date).toBe("30 July 2026");
    expect(murali?.sourceType).toBe("client-email");
    expect(murali?.source).toBe("Murali Pitchai approval email - 30 July 2026");
    expect(murali?.fullQuote).toBe(
      "Dr. Sridaran and his team at MS Accountants have been our trusted advisors for all our accounting, taxation, and compliance requirements across Australasia (Australia and New Zealand) for more than ten consecutive years. Throughout this long-standing association, they have consistently delivered services of the highest professional standard, demonstrating exceptional reliability, technical expertise, and responsiveness. What distinguishes Dr. Sridaran and his team is their ability to work seamlessly with our finance and operations teams, most of whom are based in Chennai, India. Their proactive approach, clear communication, and deep understanding of our business have enabled them to integrate effortlessly with our organization. In many respects, we regard MS Accountants as an extension of our own team rather than an external professional firm. Dr. Sridaran and the team at MS Accountants have consistently exceeded our expectations. Best Wishes.",
    );

    const facilio = getClientStory("krishnamoorthi-rangasamy");
    expect(facilio?.fullQuote).toContain("MS Accountants has been our trusted partner");
    expect(facilio?.fullQuote).toContain("Sridaran's attention to detail");
    expect(facilio?.fullQuote).toContain("compliance standpoint");
    expect(facilio?.fullQuote).not.toContain("MS Accountant has");
    expect(facilio?.fullQuote).not.toContain("Sridharan");
    expect(facilio?.fullQuote).not.toContain("stand point");

    const daniel = getClientStory("daniel-jones");
    expect(daniel?.name).toBe("Daniel Jones");
    expect(daniel?.company).toBe("The DAN JONES Label Pty Ltd");
    expect(JSON.stringify(daniel)).not.toContain("Daniel Robert Jones");

    const logan = getClientStory("logan-nirmalananda");
    expect(logan?.role).toBe("CEO");
    expect(logan?.company).toBe("AEQURA");
  });

  it("preserves the three new references without manufacturing a rating or outcome", () => {
    expect(normalise(getClientStory("shanthini-tambimuttu")!.fullQuote)).toBe(
      "Sridaran was a good friend of my late husband’s, and my late husband and I have known Sridaran for nearly 40 years, since 1988, when Sridaran, and my late husband and I, were living and working in Port Moresby, the capital of Papua New Guinea. Even as far back as then, my late husband considered Sridaran to be an accountant who displayed promise. Sridaran and his firm, MS Accountants, have served as my accountants from the very inception of his firm in February 2010, and, throughout that long period that they have served me, I have always found Sridaran to be highly reliable, professional, and respectful, and his team of staff at MS Accountants to bear those same attributes.",
    );
    expect(getClientStory("daniel-jones")?.fullQuote).toBe(
      "For at least four consecutive years up to now, Sridaran has both been a friend and an adviser to me in relation to tax and legal matters applicable to myself personally and my businesses, even at times my businesses were facing some severe problems (during the Covid pandemic). During that same period, Sridaran’s firm, MS Accountants, has been the accountants of myself and my business, a responsibility which that firm, as has Sridaran, always discharged at a high standard. I have always found Sridaran and his team at MS Accountants to be professionals who are both “people” that one can very easily relate to and professionals whose competence that one can entirely rely on.",
    );
    const dinah = getClientStory("dinah-eldridge");
    expect(dinah?.fullQuote).toBe(
      "⭐⭐⭐⭐⭐\n\nI am pleased to recommend Dr Sridaran whom I consulted regarding an accumulated income tax issue. His firm, MS Accountants, appointed as my accountants, managed this matter with exceptional expertise. This issue had been a significant concern for me over an extended period, and I have been thoroughly impressed by Dr Sridaran’s reliability, kindness and unwavering professionalism.",
    );
    expect(dinah?.fullQuote).toContain("⭐⭐⭐⭐⭐");
    expect(dinah?.fullQuote).not.toContain("Australian Taxation Office");
  });

  it("does not invent a date or location for Priyantha Cooray", () => {
    const story = getClientStory("priyantha-cooray");
    expect(story?.name).toBe("Mr Priyantha Cooray");
    expect(story?.role).toBe("Director");
    expect(story?.company).toBe("Opt-Us Holdings Pty Ltd");
    expect(story?.date).toBeUndefined();
    expect(story?.location).toBeUndefined();
  });

  it("uses only approved stories in each editorial chapter", () => {
    const storyIds = new Set(clientStories.map((story) => story.id));
    const chapterIds = storyChapters.flatMap((chapter) => chapter.storyIds);
    for (const chapter of storyChapters) {
      expect(chapter.storyIds.length).toBeGreaterThan(0);
      for (const id of chapter.storyIds) expect(storyIds.has(id)).toBe(true);
    }
    expect(chapterIds).toHaveLength(clientStories.length);
    expect(new Set(chapterIds).size).toBe(clientStories.length);
    expect(storyChapters.find((chapter) => chapter.id === "difficult-matters")?.storyIds).toContain(
      "dinah-eldridge",
    );
    expect(storyChapters.find((chapter) => chapter.id === "long-view")?.storyIds).toContain(
      "shanthini-tambimuttu",
    );
    expect(storyChapters.find((chapter) => chapter.id === "business-side")?.storyIds).toContain(
      "daniel-jones",
    );
  });

  it("maps relevant proof to every service without inventing service-specific claims", () => {
    const slugs = [
      "tax-advisory-planning",
      "tax-disputes-ato",
      "tax-compliance-returns",
      "business-cfo-advisory",
      "self-managed-super",
    ];
    for (const slug of slugs) {
      const stories = getClientStoriesForService(slug);
      expect(stories.length).toBeGreaterThan(0);
      expect(stories.length).toBeLessThanOrEqual(2);
    }
    expect(getClientStoriesForService("tax-disputes-ato").map((story) => story.id)).toEqual([
      "bianca-fletcher",
      "priyantha-cooray",
    ]);
    expect(getClientStoriesForService("tax-advisory-planning").map((story) => story.id)).toEqual([
      "qing-ouyang",
      "daniel-jones",
    ]);
  });

  it("has three distinct approved voices for the homepage proof rail", () => {
    expect(featuredStoryIds).toHaveLength(3);
    expect(new Set(featuredStoryIds).size).toBe(3);
    for (const id of featuredStoryIds) expect(getClientStory(id)).toBeDefined();
    expect(featuredStoryIds).toContain("murali-pitchai");
    expect(featuredStoryIds).toContain("daniel-jones");
  });

  it("publishes every reference as structured data without inferred ratings", () => {
    const graph = JSON.stringify(clientStoriesGraph(clientStories));
    expect(graph).toContain(`"numberOfItems":${clientStories.length}`);
    expect(graph).toContain('"Client reference from Daniel Jones"');
    expect(graph).not.toContain("reviewRating");
    expect(graph).not.toContain("aggregateRating");
    expect(graph).toContain("Ms Jian He Su (Ken)");
  });
});
