/** Split a stat figure into a countable integer plus any prefix/suffix.
 *  "45+" -> {prefix:"",value:45,suffix:"+"};  "PhD" -> null (not countable). */
export function parseFigure(
  figure: string,
): { prefix: string; value: number; suffix: string } | null {
  const m = figure.match(/^(\D*)(\d+)(\D*)$/);
  if (!m) return null;
  return { prefix: m[1], value: parseInt(m[2], 10), suffix: m[3] };
}
