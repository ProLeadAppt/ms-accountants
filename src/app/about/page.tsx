import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { StickyPin } from "@/components/motion/StickyPin";
import { PageHero } from "@/components/sections/PageHero";
import { AuthorityMarquee } from "@/components/sections/AuthorityMarquee";
import { CredentialTranslation } from "@/components/sections/CredentialTranslation";
import { PromiseBlock } from "@/components/sections/PromiseBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { site, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Dr Maheswaran Sridaran",
  description:
    "A doctorate in Australian capital gains tax, a Master of Taxation, and thirty years across PwC, EY and WHK Horwath. Why he chose to run a boutique Sydney firm.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The principal"
        title={
          <>
            A tax academic who chose to{" "}
            <em className="headline-em text-red-bright">run a small firm</em>.
          </>
        }
        lede={site.credentialLine}
      />

      {/* Origin story */}
      <section className="scheme-cream py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <StickyPin topClassName="lg:top-28" className="h-fit">
              <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/generated/heroB-study-2.jpg"
                  alt="Leather-bound tax and law volumes in Dr Sridaran's study."
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-espresso/10" />
                <figcaption className="absolute bottom-5 left-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cream/80">
                  Dr Maheswaran Sridaran &middot; portrait to follow
                </figcaption>
              </figure>
            </StickyPin>

            <Reveal className="flex flex-col items-start justify-center">
              <EyebrowTag>The story</EyebrowTag>
              <h2 className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl">
                Why he chose the harder, smaller path.
              </h2>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--muted)]">
                <p>
                  Most people with Dr Sridaran&rsquo;s background do not end up
                  running a boutique firm. After a doctorate in Australian
                  capital gains tax and thirty years at the senior end of PwC,
                  Ernst &amp; Young and WHK Horwath, the expected path was a
                  corner office at a global firm.
                </p>
                <p>
                  He chose the opposite. A practice small enough that the person
                  whose name is on the door is the person on your file, where the
                  technical depth of a big firm meets an adviser who knows your
                  business by name.
                </p>
                <p>
                  He has taught tax law at university, published in the
                  Australian Financial Review and the Sydney Morning Herald, and
                  written a book asking whether capital gains are taxed fairly at
                  all. That is the standard of thinking he now applies to a
                  deliberately small number of clients.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="scheme-sand py-24 lg:py-32">
        <Container>
          <Reveal>
            <EyebrowTag>Our people</EyebrowTag>
            <h2 className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl">
              The people on your file.
            </h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] sm:grid-cols-2">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-[color-mix(in_srgb,var(--color-cream)_55%,transparent)] p-8 lg:p-10"
              >
                <div className="relative mb-7 h-16 w-16 overflow-hidden rounded-full bg-[linear-gradient(150deg,#7b3d2c_0%,#3a2419_100%)]">
                  <span className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:10px_10px]" />
                </div>
                <h3 className="font-serif text-2xl text-espresso">{member.name}</h3>
                <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-brand-red">
                  {member.role}
                </p>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {member.credentials.join(" · ")}
                </p>
                <p className="mt-5 text-[0.97rem] leading-relaxed text-[var(--muted)]">
                  {member.bio}
                </p>
                {member.name.includes("Sridaran") && (
                  <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-clay">
                    Portrait to follow
                  </p>
                )}
              </div>
            ))}
          </Stagger>
        </Container>
      </section>

      <AuthorityMarquee />
      <CredentialTranslation />
      <PromiseBlock />
      <FinalCTA />
    </>
  );
}
