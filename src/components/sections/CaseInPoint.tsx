import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { getTestimonial, type Testimonial } from "@/lib/site";

/**
 * A single, quiet proof band: courage shown rather than claimed.
 *
 * Defaults to the real Neda Morris testimonial, where the ATO and the NSW
 * Office of State Revenue both opened audits of her two colleges and the firm
 * defended both, cost-effectively. The editorial `frame` line is drawn strictly
 * from her own words; nothing is invented. Reusable on the homepage and the
 * Tax Disputes service page.
 */
export function CaseInPoint({
  testimonial = getTestimonial("Ms Neda Morris"),
  frame = "When the ATO and the Office of State Revenue both opened audits, the response had to be comprehensive, correct, and cost-effective.",
  scheme = "cream",
}: {
  testimonial?: Testimonial;
  frame?: string;
  scheme?: "cream" | "sand" | "espresso";
}) {
  if (!testimonial) return null;

  const role = testimonial.role;
  const company = testimonial.company;

  return (
    <section className={`scheme-${scheme} py-24 lg:py-32`}>
      <Container size="narrow">
        <Reveal className="flex flex-col items-start">
          <EyebrowTag>A case in point</EyebrowTag>
          <SplitHeadline
            as="h2"
            className="mt-7 font-serif text-3xl leading-[1.12] text-[var(--fg)] sm:text-4xl"
            segments={[{ text: frame }]}
          />

          <figure className="mt-11 border-l-2 border-brand-red pl-6 sm:pl-8">
            <Icon name="quote" size={22} className="text-brand-red" />
            <blockquote className="mt-4 font-display text-xl leading-[1.34] text-clay sm:text-2xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-7">
              <p className="font-serif text-lg text-[var(--fg)]">{testimonial.name}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                {role}
                {role && company ? " · " : ""}
                {company}
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
