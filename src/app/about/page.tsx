import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { StickyPin } from "@/components/motion/StickyPin";
import { PageHero } from "@/components/sections/PageHero";
import { AuthorityMarquee } from "@/components/sections/AuthorityMarquee";
import { CredentialTranslation } from "@/components/sections/CredentialTranslation";
import { PromiseBlock } from "@/components/sections/PromiseBlock";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { site } from "@/lib/site";

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

      <AuthorityMarquee />
      <CredentialTranslation />
      <PromiseBlock />
      <FinalCTA />
    </>
  );
}
