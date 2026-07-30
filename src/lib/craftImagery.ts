/**
 * People imagery.
 *
 * Dr Sridaran's approved editorial portrait leads the series. Team members keep
 * their warm craft still-lifes until their individual headshots arrive. Both
 * homepage and About page resolve each person to the same asset.
 */
export const PRINCIPAL_PORTRAIT_IMAGE =
  "/images/team/dr-maheswaran-sridaran-editorial.webp";

export const PRINCIPAL_PORTRAIT_ALT =
  "Dr Maheswaran Sridaran in a warm Sydney tax-law study.";

export const CRAFT_TILES = [
  "/generated/craft-pen.jpg",
  "/generated/craft-magnifier.jpg",
  "/generated/craft-folio.jpg",
  "/generated/craft-glasses.jpg",
  "/generated/craft-clock.jpg",
] as const;

/** The craft tile for the bench member at `index` (stable across pages). */
export function craftTileFor(index: number): string {
  return CRAFT_TILES[index % CRAFT_TILES.length];
}
