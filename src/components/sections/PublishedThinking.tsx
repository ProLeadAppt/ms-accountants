import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { publications, book } from "@/lib/site";

/**
 * Published-thinking strip. The authority marquee shows where he is cited;
 * this shows what he actually wrote. The titles carry his voice: fairness,
 * and a willingness to question the received view.
 *
 * `scheme` lets the strip sit cleanly in different page rhythms (sand on the
 * homepage between cream and espresso; cream on About after a sand section).
 */
export function PublishedThinking({
  scheme = "sand",
}: {
  scheme?: "sand" | "cream";
}) {
  return (
    <section className={`scheme-${scheme} py-24 lg:py-32`}>
      <Container>
        <Reveal className="max-w-2xl">
          <EyebrowTag>In his own words</EyebrowTag>
          <h2 className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl">
            Not just advice. A public case for fairness.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            Dr Sridaran has argued in the national press that the tax system
            should be fairer, and that the received answer, even from the High
            Court, is worth questioning. A sample of the record.
          </p>
        </Reveal>

        <Stagger className="mt-14 border-t border-[var(--hairline)]">
          {publications.map((p) => (
            <article
              key={p.title}
              className="flex flex-col gap-3 border-b border-[var(--hairline)] py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
            >
              <h3 className="font-serif text-2xl leading-snug sm:max-w-3xl sm:text-3xl">
                &ldquo;{p.title}&rdquo;
              </h3>
              <div className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-brand-red">
                {p.outlet}{" "}
                <span className="text-[var(--muted)]">· {p.year}</span>
              </div>
            </article>
          ))}
        </Stagger>

        <Reveal className="mt-12">
          <div className="flex flex-col gap-5 rounded-2xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--color-cream)_55%,transparent)] p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <div>
              <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-brand-red">
                And a book
              </div>
              <h3 className="mt-3 font-serif text-2xl leading-snug sm:text-3xl">
                <em>{book.title}</em>
              </h3>
            </div>
            <p className="shrink-0 text-sm leading-relaxed text-[var(--muted)] sm:max-w-xs sm:text-right">
              {book.detail}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
