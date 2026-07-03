import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { DrawUnderlineOnScroll } from "@/components/motion/DrawUnderlineOnScroll";
import { promiseCopy, site } from "@/lib/site";

/**
 * Act VII — The Conversation. The single red band on the page: the promise
 * as the headline, the booking CTA as the only action. Merges
 * PromiseBlock + FinalCTA. Headline/body are the shared `promiseCopy`
 * export (single source of truth with PromiseBlock, retained for inner
 * pages).
 */
export function ConversationAct() {
  return (
    <section className="scheme-red section-major">
      <Container>
        <Reveal className="flex flex-col items-start">
          <EyebrowTag>The promise</EyebrowTag>
          <h2 className="mt-7 max-w-[16ch] font-serif text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
            {promiseCopy.headlineLead}{" "}
            <DrawUnderlineOnScroll>
              <em className="headline-em">{promiseCopy.headlineEm}</em>{" "}
              {promiseCopy.headlineTail}
            </DrawUnderlineOnScroll>
            .
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85">
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
      </Container>
    </section>
  );
}
