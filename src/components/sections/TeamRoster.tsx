import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { team } from "@/lib/site";
import {
  PRINCIPAL_STUDY_IMAGE,
  PRINCIPAL_STUDY_ALT,
  craftTileFor,
} from "@/lib/craftImagery";

/**
 * The full "Our people" roster on the About page: the principal featured
 * first, then the bench he hired, in the order the firm actually works,
 * Niroshi supervising, the accountants building, Anne running the practice.
 */
export function TeamRoster() {
  const principal = team.find((m) => m.featured)!;
  const bench = team.filter((m) => !m.featured);

  return (
    <section id="team" className="scheme-sand scroll-mt-24 py-24 lg:py-32">
      <Container>
        <Reveal>
          <EyebrowTag>Our people</EyebrowTag>
          <SplitHeadline
            as="h2"
            className="mt-7 max-w-3xl font-serif text-4xl leading-[1.06] sm:text-5xl"
            segments={[{ text: "The people on your file." }]}
          />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            Everything the firm sends out is built by the people on this page,
            and reviewed by the one at the top.
          </p>
        </Reveal>

        {/* Featured: the director */}
        <Reveal className="mt-14">
          <div className="grid gap-8 rounded-2xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--color-cream)_55%,transparent)] p-8 lg:grid-cols-[300px_1fr] lg:gap-12 lg:p-12">
            <div className="relative aspect-[4/5] max-w-[300px] overflow-hidden rounded-2xl ring-1 ring-inset ring-[var(--hairline)]">
              <Image
                src={PRINCIPAL_STUDY_IMAGE}
                alt={PRINCIPAL_STUDY_ALT}
                fill
                sizes="(min-width: 1024px) 300px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-serif text-3xl text-espresso">{principal.name}</h3>
              <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-red">
                {principal.role}
              </p>
              <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                {principal.credentials.join(" · ")}
              </p>
              <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--muted)]">
                {principal.bio}
              </p>
            </div>
          </div>
        </Reveal>

        {/* The bench he hired */}
        <Stagger className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-3">
          {bench.map((member, i) => (
            <article
              key={member.slug}
              className="flex flex-col bg-[color-mix(in_srgb,var(--color-cream)_55%,transparent)] p-8 lg:p-10"
            >
              {/* Conceptual craft still-life, paired to this member the same way
                  as the homepage bench (decorative; the name/role carries it). */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-inset ring-[var(--hairline)]">
                <Image
                  src={craftTileFor(i)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-7 font-serif text-2xl text-espresso">{member.name}</h3>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-red">
                {member.role}
              </p>
              <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                {member.credentials.join(" · ")}
              </p>
              <p className="mt-5 max-w-2xl text-[0.97rem] leading-relaxed text-[var(--muted)]">
                {member.bio}
              </p>
              {(member.lineage || member.joined) && (
                <p className="mt-auto pt-6 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-clay">
                  {[member.lineage, member.joined && `With the firm since ${member.joined}`]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </article>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
