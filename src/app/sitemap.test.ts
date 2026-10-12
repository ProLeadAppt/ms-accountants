import { afterEach, describe, expect, it, vi } from "vitest";
import sitemap from "./sitemap";

afterEach(() => {
  vi.useRealTimers();
});

describe("sitemap", () => {
  it("preserves all twelve canonical route URLs, priorities and monthly frequency", () => {
    const entries = sitemap();
    expect(entries.map(({ url }) => url)).toEqual([
      "https://www.msaccountants.com.au",
      "https://www.msaccountants.com.au/about",
      "https://www.msaccountants.com.au/services",
      "https://www.msaccountants.com.au/client-stories",
      "https://www.msaccountants.com.au/contact",
      "https://www.msaccountants.com.au/services/tax-advisory-planning",
      "https://www.msaccountants.com.au/services/tax-disputes-ato",
      "https://www.msaccountants.com.au/services/tax-compliance-returns",
      "https://www.msaccountants.com.au/services/business-cfo-advisory",
      "https://www.msaccountants.com.au/services/self-managed-super",
      "https://www.msaccountants.com.au/blog",
      "https://www.msaccountants.com.au/blog/what-to-do-ato-audit-letter",
    ]);
    expect(entries.map(({ priority }) => priority)).toEqual([
      1, 0.8, 0.8, 0.8, 0.8, 0.9, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7,
    ]);
    expect(entries.every(({ changeFrequency }) => changeFrequency === "monthly")).toBe(true);
  });

  it("returns identical metadata across two build dates without invented modification dates", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-01T00:00:00Z"));
    const firstBuild = sitemap();
    vi.setSystemTime(new Date("2026-11-01T00:00:00Z"));
    const secondBuild = sitemap();

    expect(secondBuild).toEqual(firstBuild);
    for (const entry of secondBuild) {
      expect(entry).not.toHaveProperty("lastModified");
    }
  });
});
