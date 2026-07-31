import storyData from "@/data/testimonials.json";

export type StoryChapterId = "difficult-matters" | "long-view" | "business-side";

export type ClientStory = {
  id: string;
  name: string;
  role?: string;
  company?: string;
  location?: string;
  date?: string;
  fullQuote: string;
  excerpt: string;
  chapter: StoryChapterId;
  serviceSlugs: string[];
  approvalStatus: "approved";
  useLogo: false;
  sourceType: "client-reference" | "client-email" | "client-supplied-text";
  source: string;
};

export const clientStories = storyData as ClientStory[];

export const featuredStoryIds = [
  "murali-pitchai",
  "qing-ouyang",
  "kingsgrove-sports-centre",
] as const;

export const storyChapters: Array<{
  id: StoryChapterId;
  index: string;
  eyebrow: string;
  title: string;
  lede: string;
  storyIds: string[];
}> = [
  {
    id: "difficult-matters",
    index: "01",
    eyebrow: "When the matter was difficult",
    title: "Proof matters most when the answer is not obvious.",
    lede:
      "ATO reviews, complex tax positions, and decisions where technical judgement had to produce a defensible result.",
    storyIds: ["bianca-fletcher", "priyantha-cooray", "qing-ouyang"],
  },
  {
    id: "long-view",
    index: "02",
    eyebrow: "Built over the long view",
    title: "The strongest recommendation is the relationship that continues.",
    lede:
      "Clients who have worked with Dr Sridaran and MS Accountants over ten, fifteen, twenty, and more than thirty years.",
    storyIds: [
      "murali-pitchai",
      "kingsgrove-sports-centre",
      "amarjit-singh-thind",
      "logan-nirmalananda",
      "arusha-cooray",
      "araliya-de-silva",
    ],
  },
  {
    id: "business-side",
    index: "03",
    eyebrow: "At the business side",
    title: "A good adviser becomes part of how the business operates.",
    lede:
      "Audit, compliance, accounting, and practical counsel delivered with responsiveness, care, and an understanding of the organisation behind the numbers.",
    storyIds: [
      "krishnamoorthi-rangasamy",
      "yannick-samarasinghe",
      "laura-cristina-mathias",
      "virginia-stalenberg",
      "mahmoud-alahmad",
    ],
  },
];

export const serviceStoryIds: Record<string, string[]> = {
  "tax-advisory-planning": ["qing-ouyang", "kingsgrove-sports-centre"],
  "tax-disputes-ato": ["bianca-fletcher", "priyantha-cooray"],
  "tax-compliance-returns": ["krishnamoorthi-rangasamy", "araliya-de-silva"],
  "business-cfo-advisory": ["murali-pitchai", "amarjit-singh-thind"],
  "self-managed-super": ["kingsgrove-sports-centre"],
};

export function getClientStory(id: string): ClientStory | undefined {
  return clientStories.find((story) => story.id === id);
}

export function getClientStories(ids: readonly string[]): ClientStory[] {
  return ids
    .map((id) => getClientStory(id))
    .filter((story): story is ClientStory => Boolean(story));
}

export function getFeaturedStories(): ClientStory[] {
  return getClientStories(featuredStoryIds);
}

export function getClientStoriesForService(slug: string): ClientStory[] {
  return getClientStories(serviceStoryIds[slug] ?? []);
}

export function getChapterStories(chapter: StoryChapterId): ClientStory[] {
  const config = storyChapters.find((item) => item.id === chapter);
  return config ? getClientStories(config.storyIds) : [];
}

export function storyAttribution(story: ClientStory): string[] {
  return [story.role, story.company, story.location].filter(
    (value): value is string => Boolean(value),
  );
}
