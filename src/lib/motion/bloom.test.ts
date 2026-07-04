import { describe, it, expect } from "vitest";
import { BLOOM, heroEmStart } from "./bloom";

describe("bloom config", () => {
  it("keeps the slow-mo per-word durations the operator approved", () => {
    expect(BLOOM.hero.wordDur).toBe(1.6);
    expect(BLOOM.section.wordDur).toBe(1.2);
  });

  it("holds the hero em phrase back until after the base cascade plus the gap", () => {
    // 12 base words * 0.11 stagger + 0.25 gap
    expect(heroEmStart(12)).toBeCloseTo(12 * BLOOM.hero.stagger + BLOOM.hero.gap, 5);
  });

  it("never starts the em before the gap even with no base words", () => {
    expect(heroEmStart(0)).toBeCloseTo(BLOOM.hero.gap, 5);
  });

  it("presses the hero em heavier than it settles", () => {
    expect(BLOOM.hero.emWeightPeak).toBeGreaterThan(BLOOM.hero.emWeightSettle);
    expect(BLOOM.hero.emWeightSettle).toBeGreaterThan(BLOOM.hero.weightTo);
  });
});
