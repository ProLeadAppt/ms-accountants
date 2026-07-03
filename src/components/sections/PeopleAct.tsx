import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { team, teamCollective, credentialCards } from "@/lib/site";

const CREDENTIAL_LABELS = ["Doctorate", "CA + Lawyer", "45+ years"] as const;

/**
 * Conceptual "craft" tiles for the bench. The firm does not use headshots, so
 * rather than fabricate faces (which would misrepresent real people) each
 * member is paired with a warm still-life that evokes the work. The images are
 * atmospheric, not portraits, so their alt text is empty (decorative) and the
 * name/role text below carries the actual meaning.
 */
const CRAFT_TILES = [
  "/generated/craft-pen.jpg",
  "/generated/craft-magnifier.jpg",
  "/generated/craft-folio.jpg",
  "/generated/craft-glasses.jpg",
  "/generated/craft-clock.jpg",
] as const;

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
          {/* Conceptual study image (no headshots) evoking the principal's work. */}
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-inset ring-[var(--hairline)]">
              <Image
                src="/generated/principal-study.jpg"
                alt="A quiet study at dusk: a brass desk lamp, leather-bound law reports and soft Sydney light through a tall window."
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
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
        <Reveal className="mt-24 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <EyebrowTag>{teamCollective.eyebrow}</EyebrowTag>
            <h3 className="mt-6 font-serif text-3xl leading-[1.08] sm:text-4xl">
              {teamCollective.heading}
            </h3>
          </div>
          <Link
            href={teamCollective.ctaHref}
            className="link-underline shrink-0 font-sans text-base font-medium"
          >
            {teamCollective.cta}
          </Link>
        </Reveal>
        <Stagger className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {bench.map((member, i) => (
            <div key={member.slug}>
              <div className="relative aspect-square overflow-hidden rounded-2xl ring-1 ring-inset ring-[var(--hairline)]">
                <Image
                  src={CRAFT_TILES[i % CRAFT_TILES.length]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 18vw, 45vw"
                  className="object-cover"
                />
              </div>
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
