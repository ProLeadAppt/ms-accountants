import { describe, expect, it } from "vitest";
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
  it("contains exactly the 14 approved references with unique IDs", () => {
    expect(clientStories).toHaveLength(14);
    expect(new Set(clientStories.map((story) => story.id)).size).toBe(14);
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
    expect(chapterIds).toHaveLength(14);
    expect(new Set(chapterIds).size).toBe(14);
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
  });

  it("has three distinct approved voices for the homepage proof rail", () => {
    expect(featuredStoryIds).toHaveLength(3);
    expect(new Set(featuredStoryIds).size).toBe(3);
    for (const id of featuredStoryIds) expect(getClientStory(id)).toBeDefined();
  });
});
