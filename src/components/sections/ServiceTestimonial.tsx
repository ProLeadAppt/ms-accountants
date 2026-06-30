import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { getTestimonialForService } from "@/lib/site";

/**
 * One relevant, un-truncated client testimonial at the service-page decision
 * point. Renders nothing when a service has no honest match (e.g. Tax Disputes,
 * which carries the CaseInPoint band instead). Mapping lives in site.ts.
 */
export function ServiceTestimonial({ slug }: { slug: string }) {
  const t = getTestimonialForService(slug);
  if (!t) return null;

  return (
    <section className="scheme-sand py-24 lg:py-32">
      <Container size="narrow">
        <Reveal className="flex flex-col items-start">
          <Icon name="quote" size={32} className="text-brand-red" />
          <EyebrowTag className="mt-6">What clients say</EyebrowTag>
          <blockquote className="mt-7 font-display text-2xl leading-[1.3] text-clay sm:text-3xl">
            &ldquo;{t.quote}&rdquo;
          </blockquote>
          <footer className="mt-7">
            <p className="font-serif text-lg text-[var(--fg)]">{t.name}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              {t.role}
              {t.role && t.company ? " · " : ""}
              {t.company}
            </p>
          </footer>
        </Reveal>
      </Container>
    </section>
  );
}
