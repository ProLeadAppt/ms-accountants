import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { WordReveal } from "@/components/motion/WordReveal";

export function Statement() {
  return (
    <section className="scheme-cream py-28 lg:py-40">
      <Container>
        <EyebrowTag>01 / What we do</EyebrowTag>
        <WordReveal
          text="Any firm can file a return. Far fewer can tell you, before you sign, what a sale, a restructure, or passing the business to your children will really cost you. That is the question that matters most, and the one most accountants answer last. We answer it first."
          className="mt-10 max-w-[20ch] font-display text-4xl leading-[1.08] text-clay sm:max-w-[24ch] sm:text-6xl lg:text-7xl"
        />
      </Container>
    </section>
  );
}
