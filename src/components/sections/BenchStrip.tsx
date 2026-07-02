import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Monogram } from "@/components/ui/Monogram";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { team, teamCollective } from "@/lib/site";

/**
 * Compact homepage strip for the bench Dr Sridaran hired: the five people
 * who build the files he reviews. Full profiles live on /about#team.
 */
export function BenchStrip() {
  const bench = team.filter((m) => !m.featured);

  return (
    <section className="scheme-espresso py-24 lg:py-32">
      <Container>
        <Reveal className="max-w-3xl">
          <EyebrowTag>{teamCollective.eyebrow}</EyebrowTag>
          <h2 className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl">
            {teamCollective.heading}
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {bench.map((member) => (
            <div key={member.slug}>
              <Monogram
                initials={member.initials}
                name={member.name}
                photo={member.photo}
                sizes="(min-width: 1024px) 18vw, 45vw"
              />
              <h3 className="mt-5 font-serif text-lg leading-snug">
                {member.name}
              </h3>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-red-bright">
                {member.role}
              </p>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                {member.credentialShort}
              </p>
            </div>
          ))}
        </Stagger>

        <Reveal className="mt-14 flex flex-col gap-8 border-t border-[var(--hairline)] pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-2">
            {teamCollective.hooks.map((hook) => (
              <p key={hook} className="text-lg leading-relaxed text-[var(--muted)]">
                {hook}
              </p>
            ))}
          </div>
          <Link
            href={teamCollective.ctaHref}
            className="link-underline shrink-0 font-sans text-base font-medium"
          >
            {teamCollective.cta}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
