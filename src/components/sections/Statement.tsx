import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { Reveal } from "@/components/motion/Reveal";
import { voiceQuote } from "@/lib/site";

export function Statement() {
  return (
    <section className="scheme-cream section-major">
      <Container>
        <EyebrowTag>What we do</EyebrowTag>
        <SplitHeadline
          as="h2"
          splitType="lines,words"
          className="mt-10 max-w-[20ch] font-display text-4xl leading-[1.08] text-clay sm:max-w-[24ch] sm:text-6xl lg:text-7xl"
          segments={[
            {
              text: "Any firm can file a return. Far fewer can tell you, before you sign, what a sale, a restructure, or passing the business to your children will really cost you. That is the question that matters most. Most accountants answer it last. We answer it first.",
            },
          ]}
        />
        {/* His published voice: the act's single red emphasis. */}
        <Reveal className="mt-14 border-l-2 border-brand-red pl-6 sm:pl-8">
          <p className="max-w-[26ch] font-display text-2xl italic leading-[1.2] text-brand-red sm:text-3xl">
            &ldquo;{voiceQuote.text}&rdquo;
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            {voiceQuote.attribution}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
