import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { getTestimonial, testimonials, publications, caseFrame } from "@/lib/site";

/**
 * Act V — Proof. The dark drama band mid-scroll: the Neda Morris case as
 * centerpiece, a second client voice as counter-signature, and his published
 * titles as a footnote row. Merges CaseInPoint + Testimonial + PublishedThinking.
 */
export function ProofAct() {
  const caseTestimonial = getTestimonial("Ms Neda Morris");
  const counter =
    testimonials.find((t) => t.name === "Ms Anne Truong") ??
    testimonials.find((t) => t.name !== "Ms Neda Morris");

  return (
    <section className="scheme-espresso-deep section-major">
      <Container size="narrow">
        <Reveal className="flex flex-col items-start">
          <EyebrowTag>A case in point</EyebrowTag>
          <SplitHeadline
            as="h2"
            className="mt-7 font-serif text-3xl leading-[1.12] text-[var(--fg)] sm:text-4xl"
            segments={[{ text: caseFrame }]}
          />

          {caseTestimonial && (
            <figure className="mt-11 border-l-2 border-red-bright pl-6 sm:pl-8">
              <Icon name="quote" size={22} className="text-red-bright" />
              <blockquote className="mt-4 font-display text-xl leading-[1.34] text-cream/90 sm:text-2xl">
                &ldquo;{caseTestimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7">
                <p className="font-serif text-lg text-[var(--fg)]">
                  {caseTestimonial.name}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {caseTestimonial.role}
                  {caseTestimonial.role && caseTestimonial.company ? " · " : ""}
                  {caseTestimonial.company}
                </p>
              </figcaption>
            </figure>
          )}

          {/* Counter-signature: a second voice, kept quiet. */}
          {counter && (
            <blockquote className="mt-14 max-w-2xl border-t border-[var(--hairline)] pt-8">
              <p className="text-base leading-relaxed text-[var(--muted)]">
                &ldquo;{counter.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <p className="font-serif text-base text-[var(--fg)]">
                  {counter.name}
                </p>
                <p className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {counter.role}
                  {counter.role && counter.company ? " · " : ""}
                  {counter.company}
                </p>
              </footer>
            </blockquote>
          )}

          {/* Published record — footnote row, real titles. */}
          <div className="mt-14 w-full border-t border-[var(--hairline)] pt-7">
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--muted)]">
              His published record
            </div>
            <ul className="mt-4 space-y-2">
              {publications.slice(0, 3).map((p) => (
                <li
                  key={p.title}
                  className="font-mono text-xs leading-relaxed tracking-[0.04em] text-cream/60"
                >
                  &ldquo;{p.title}&rdquo; &middot; {p.outlet} &middot; {p.year}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
