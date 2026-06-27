import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Testimonial slot. Quikstar quote + 1–3 more are pending client sign-off
 * (spec §9.2). Built as a marked placeholder for clean swap.
 */
export function Testimonial() {
  return (
    <section className="scheme-sand py-24 lg:py-32">
      <Container size="narrow">
        <Reveal className="flex flex-col items-center text-center">
          <Icon name="quote" className="h-10 w-10 text-brand-red" />
          <EyebrowTag className="mt-8">In their words</EyebrowTag>
          <blockquote className="mt-7 font-display text-3xl leading-[1.18] text-clay sm:text-4xl">
            A client testimonial will sit here — selected with the client once
            permission is confirmed, to let the people Dr Sridaran has helped do
            the talking.
          </blockquote>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
            Testimonial — pending client sign-off
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
