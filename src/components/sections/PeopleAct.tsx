import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Monogram } from "@/components/ui/Monogram";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { team, teamCollective, credentialCards } from "@/lib/site";

const CREDENTIAL_LABELS = ["Doctorate", "CA + Lawyer", "45+ years"] as const;

/**
 * Act IV — The People. One act, one message: the team builds, he reviews.
 * Merges the old AboutTeaser + CredentialTranslation + BenchStrip stops.
 */
export function PeopleAct() {
  const bench = team.filter((m) => !m.featured);
  const credentialLines = credentialCards.slice(0, 3).map((card, i) => ({
    label: CREDENTIAL_LABELS[i],
    title: card.title,
  }));

  return (
    <section className="scheme-cream section">
      <Container>
        {/* The principal */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* IMAGE SLOT: real portrait lands here (photo shoot in progress). */}
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#7b3d2c,#3a2419)]">
              <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:20px_20px]" />
              <span className="absolute bottom-5 left-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cream/70">
                Dr Maheswaran Sridaran &middot; portrait to follow
              </span>
            </div>
          </Reveal>

          <Reveal className="flex flex-col items-start justify-center">
            <EyebrowTag>The principal</EyebrowTag>
            <h2 className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl">
              Why an accountant and lawyer chose to run a small firm.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
              People with his background usually end up in a corner office at a
              global firm. He built the opposite: a practice small enough that
              his own eyes pass over every piece of work that leaves it.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
              You get the technical depth of a global firm and the access of one
              adviser who knows your business by name.
            </p>
            {/* Credentials, translated — three compact lines. */}
            <dl className="mt-9 w-full max-w-xl space-y-4 border-t border-[var(--hairline)] pt-7">
              {credentialLines.map((line) => (
                <div key={line.label} className="flex gap-5">
                  <dt className="w-28 shrink-0 font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-brand-red">
                    {line.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-[var(--muted)]">
                    {line.title}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-9">
              <Button href="/about" variant="secondary">
                Read the full story
              </Button>
            </div>
          </Reveal>
        </div>

        {/* The bench — the five people behind the files he reviews. */}
        <Reveal className="mt-24 max-w-3xl">
          <EyebrowTag>{teamCollective.eyebrow}</EyebrowTag>
          <h3 className="mt-6 font-serif text-3xl leading-[1.08] sm:text-4xl">
            {teamCollective.heading}
          </h3>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {bench.map((member) => (
            <div key={member.slug}>
              <Monogram
                initials={member.initials}
                name={member.name}
                photo={member.photo}
                sizes="(min-width: 1024px) 18vw, 45vw"
              />
              <h4 className="mt-5 font-serif text-lg leading-snug">
                {member.name}
              </h4>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-brand-red">
                {member.role}
              </p>
              <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                {member.credentialShort}
              </p>
            </div>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
