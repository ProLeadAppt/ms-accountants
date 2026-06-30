import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { WordReveal } from "@/components/motion/WordReveal";

/**
 * A single oversized display moment that lets his published voice carry the
 * page. To stay honest, the line is a verbatim real title (his first book is
 * literally a question about fairness, the spine of his whole positioning), not
 * a fabricated quotation. Attribution names the source.
 *
 * scheme-espresso is applied to the section itself (no separate bg wrapper), so
 * the -z-10 background gotcha does not apply here.
 */
export function VoicePullQuote({
  text = "Are Capital Gains Equitably Taxed in Australia?",
  attribution = "Dr Maheswaran Sridaran · his first book, 2012",
  scheme = "espresso",
}: {
  text?: string;
  attribution?: string;
  scheme?: "cream" | "sand" | "espresso";
}) {
  return (
    <section className={`scheme-${scheme} py-28 lg:py-40`}>
      <Container>
        <EyebrowTag>In his own words</EyebrowTag>
        <WordReveal
          text={text}
          className="mt-10 max-w-[18ch] font-display text-4xl leading-[1.05] text-[var(--fg)] sm:max-w-[22ch] sm:text-6xl lg:text-7xl"
        />
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          {attribution}
        </p>
      </Container>
    </section>
  );
}
