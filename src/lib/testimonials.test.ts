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
    expect(getClientStory("murali-pitchai")?.company).toBe("HTC Global Services");

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
