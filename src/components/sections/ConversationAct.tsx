import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { promiseCopy, site } from "@/lib/site";

/**
 * Act VII — The Conversation. The red crescendo band: the promise as the
 * headline, the booking CTA as the only action, beside the chess image (a
 * considered move, played slowly). Merges PromiseBlock + FinalCTA.
 * Headline/body are the shared `promiseCopy` export (single source of truth
 * with PromiseBlock, retained for inner pages).
 */
export function ConversationAct() {
  return (
    <section className="scheme-red section-major">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col items-start">
            <EyebrowTag>The promise</EyebrowTag>
            <SplitHeadline
              as="h2"
              underline
              className="mt-7 max-w-[16ch] font-serif text-4xl leading-[1.03] text-cream sm:text-5xl lg:text-6xl"
              emClassName="headline-em"
              segments={[
                { text: promiseCopy.headlineLead },
                { text: `${promiseCopy.headlineEm} ${promiseCopy.headlineTail}.`, em: true },
              ]}
            />
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/85">
              {promiseCopy.body}
            </p>
            <div className="mt-11">
              <Button
                href={site.ctaHref}
                variant="secondary"
                className="text-cream ring-cream/40 hover:bg-cream/10 hover:ring-cream/70"
              >
                {site.cta}
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl ring-1 ring-cream/20">
              <Image
                src="/generated/chess4-1.jpg"
                alt="A considered move, played slowly and deliberately."
                fill
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="object-cover"
              />
              {/* Inner edge to seat the image against the brand-red field. */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/15" />
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
