import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { StickyPin } from "@/components/motion/StickyPin";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { PageHero } from "@/components/sections/PageHero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PublishedThinking } from "@/components/sections/PublishedThinking";
import { TeamRoster } from "@/components/sections/TeamRoster";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "About Dr Maheswaran Sridaran",
  description:
    "A chartered accountant and lawyer with a doctorate in Australian tax law and over 45 years across more than five countries. Meet Dr Maheswaran Sridaran and the team he hired at MS Accountants, a boutique Sydney firm.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The director"
        underline
        titleSegments={[
          { text: "An accountant who is also a lawyer who chose to" },
          { text: "run a small firm.", em: true },
        ]}
        lede="Led by Dr Maheswaran Sridaran, Chartered Accountant, lawyer, registered tax agent, PhD Australian tax law (Macquarie University)."
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
                  Dr Maheswaran Sridaran
                </figcaption>
              </figure>
            </StickyPin>

            <Reveal className="flex flex-col items-start justify-center">
              <EyebrowTag>The story</EyebrowTag>
              <SplitHeadline
                as="h2"
                className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl"
                segments={[{ text: "Why he chose the harder, smaller path." }]}
              />
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--muted)]">
                <p>
                  Few people with Dr Sridaran&rsquo;s background end up running
                  a boutique firm. He is a chartered accountant and a
                  lawyer, with a doctorate in Australian tax law and over 45
                  years across more than five countries, mostly with
                  two of the Big Four, the last 25 in Australia. The expected
                  path was a corner office at a global firm.
                </p>
                <p>
                  He built the opposite: a practice deliberately kept small so he can find his voice, and so he can help others in his firm find their voice. The technical depth of a big firm meets an adviser who knows your business by name.
                </p>
                <p>
                  Being both an accountant and a lawyer, he can carry a tax
                  problem the whole distance, from day-to-day advice through to
                  a tax-authority investigation and, where it must go that far,
                  litigation. He taught tax law
                  at Macquarie University, where the Faculty of Law named him its
                  most knowledgeable teacher in his field, and has published in
                  the Australian Financial Review and the Sydney Morning Herald.
                  His first book asked whether the rules are even fair:{" "}
                  <em>Are Capital Gains Equitably Taxed in Australia?</em>{" "}
                  His work is cited in the standard Australian university text,{" "}
                  <em>Australian Taxation Law</em>.
                </p>
                <p>
                  One question runs through all of it: whether the tax system is
                  fair to the people who pay it, and whether the received answer,
                  even from the High Court or the Commissioner, is the right one.
                  That is the standard of thinking he now applies to a
                  deliberately small number of clients.
                </p>
                <p>
                  The rigour comes with a manner his clients describe in
                  consistent terms: patient, generous with his time, and
                  unfailingly courteous, even when the matter is hard. The
                  fairness he argues for in print is the fairness he extends to
                  the person across the table.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <TeamRoster />

      <HowItWorks scheme="espresso-deep" />
      <PublishedThinking scheme="cream" />
      <FinalCTA />
    </>
  );
}
