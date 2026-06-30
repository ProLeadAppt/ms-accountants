import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { testimonials } from "@/lib/site";

export function Testimonial() {
  const [featured, ...rest] = testimonials;

  return (
    <section className="scheme-sand py-24 lg:py-32">
      <Container>
        {/* Featured */}
        <Reveal className="flex flex-col items-center text-center">
          <Icon name="quote" className="h-8 w-8 text-brand-red" />
          <EyebrowTag className="mt-8">In their words</EyebrowTag>
          <h2 className="mt-7 max-w-[20ch] font-serif text-3xl leading-[1.08] text-espresso sm:text-4xl lg:text-5xl">
            Brought in for the hard problems. Kept on for years.
          </h2>
          <blockquote className="mt-10 max-w-4xl font-display text-2xl leading-[1.24] text-clay sm:text-3xl lg:text-[1.85rem]">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <footer className="mt-8">
            <p className="font-serif text-lg text-espresso">{featured.name}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              {featured.role}
              {featured.role && featured.company ? " · " : ""}
              {featured.company}
            </p>
          </footer>
        </Reveal>

        {/* Grid of secondary testimonials */}
        <Stagger className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((t) => (
            <blockquote
              key={t.name}
              className="flex flex-col gap-4 bg-[color-mix(in_srgb,var(--color-cream)_50%,transparent)] p-7"
            >
              <Icon name="quote" size={14} className="shrink-0 text-brand-red/40" />
              <p className="line-clamp-6 text-sm leading-relaxed text-[var(--muted)]">
                {t.quote}
              </p>
              <footer className="mt-auto pt-2">
                <p className="font-serif text-sm text-espresso">{t.name}</p>
                <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {t.role
                    ? t.role
                    : t.company}
                  {t.role && t.company ? (
                    <>
                      {" · "}
                      {t.company}
                    </>
                  ) : null}
                </p>
              </footer>
            </blockquote>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
