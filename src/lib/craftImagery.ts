/**
 * Conceptual "craft" imagery for the people sections.
 *
 * The firm does not use headshots, so rather than fabricate faces (which would
 * misrepresent real people) each team member is paired with a warm still-life
 * that evokes the work. These are shared by the homepage PeopleAct and the
 * About TeamRoster so a given person maps to the SAME tile on both pages, and
 * the principal shows the same study image site-wide.
 *
 * The tiles are atmospheric, not portraits, so their alt text is empty
 * (decorative) at the call site and the name/role text carries the meaning.
 */
export const PRINCIPAL_STUDY_IMAGE = "/generated/principal-study.jpg";

/** Descriptive alt for the principal study (it is a composed scene, not a face). */
export const PRINCIPAL_STUDY_ALT =
  "A quiet study at dusk: a brass desk lamp, leather-bound law reports and soft Sydney light through a tall window.";

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
