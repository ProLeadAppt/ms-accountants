import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { site } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="scheme-espresso py-28 lg:py-40">
      <Container>
        <Reveal className="flex flex-col items-start">
          <EyebrowTag>Book a conversation</EyebrowTag>
          <SplitHeadline
            as="h2"
            className="mt-7 max-w-[16ch] font-serif text-5xl leading-[1.02] text-cream sm:text-6xl lg:text-7xl"
            segments={[{ text: "When the tax question is hard, who do you call?" }]}
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
            {site.footerTrust}
          </p>
          <div className="mt-11">
            <Button href={site.ctaHref}>{site.cta}</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
