/**
 * Single source of truth for the "Ink" reveal timing. Per-word `wordDur`
 * carries the slow, deliberate press the operator approved and must not be
 * lowered; `stagger` and `gap` are the only knobs for shortening the sequence.
 * All values in seconds / unitless font-weights.
 */
export const BLOOM = {
  hero: {
    weightFrom: 300,
    weightTo: 450,
    emWeightPeak: 650, // the held-back phrase presses hardest
    emWeightSettle: 560,
    wordDur: 1.6,
    stagger: 0.11,
    gap: 0.25, // pause after the base cascade before the red phrase blooms
    emDur: 1.9,
    rise: 30, // yPercent
    blur: 6, // px
    underlineDur: 1.2,
  },
  section: {
    weightFrom: 320,
    weightTo: 440,
    emWeightTo: 600, // the single accent word
    wordDur: 1.2,
    stagger: 0.07,
    rise: 12,
    blur: 3,
  },
} as const;

/** When (seconds into the hero timeline) the held-back em phrase begins. */
export function heroEmStart(
  baseWordCount: number,
  cfg: typeof BLOOM.hero = BLOOM.hero,
): number {
  return baseWordCount * cfg.stagger + cfg.gap;
}
