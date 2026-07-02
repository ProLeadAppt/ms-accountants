import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { LineDraw } from "@/components/motion/LineDraw";
import { CountUp } from "@/components/motion/CountUp";
import { credentialCards, valueStats } from "@/lib/site";

/**
 * Translates Dr Sridaran's credentials into what they mean for the client.
 * Carries the count-up stat band that used to be its own CredentialGrid
 * section; one credential moment on the page instead of two.
 */
export function CredentialTranslation() {
  return (
    <section className="scheme-sand py-24 lg:py-32">
      <Container>
        <Reveal className="max-w-2xl">
          <EyebrowTag>The credentials, translated</EyebrowTag>
          <h2 className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl">
            What the letters after his name actually buy you.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {valueStats.map((stat) => (
            <div key={stat.figure + stat.unit} className="relative flex gap-5 py-4 pr-6">
              <LineDraw className="w-px shrink-0 bg-brand-red" />
              <div>
                <div className="font-serif text-4xl leading-none sm:text-5xl">
                  <CountUp figure={stat.figure} />
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-brand-red">
                  {stat.unit}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </Stagger>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] sm:grid-cols-2">
          {credentialCards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col gap-4 bg-[color-mix(in_srgb,var(--color-cream)_55%,transparent)] p-8 lg:p-10"
            >
              <h3 className="font-serif text-2xl leading-snug text-espresso">
                {card.title}
              </h3>
              <p className="text-[0.97rem] leading-relaxed text-[var(--muted)]">
                {card.body}
              </p>
            </article>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
