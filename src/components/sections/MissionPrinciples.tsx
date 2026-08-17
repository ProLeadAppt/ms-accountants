import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { missionPrinciples } from "@/lib/site";

export function MissionPrinciples() {
  return (
    <section className="scheme-sand section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <EyebrowTag>{missionPrinciples.eyebrow}</EyebrowTag>
            <SplitHeadline
              as="h2"
              className="mt-7 max-w-[18ch] font-serif text-4xl leading-[1.06] sm:text-5xl"
              segments={[{ text: missionPrinciples.heading }]}
            />
          </Reveal>

          <Reveal className="flex flex-col justify-end gap-5">
            {missionPrinciples.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-[var(--muted)]">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-5">
          {missionPrinciples.values.map((value) => (
            <div
              key={value}
              className="bg-[color-mix(in_srgb,var(--color-cream)_55%,transparent)] p-6"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-red">
                {value}
              </p>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
