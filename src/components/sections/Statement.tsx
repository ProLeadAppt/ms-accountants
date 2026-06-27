import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { WordReveal } from "@/components/motion/WordReveal";

export function Statement() {
  return (
    <section className="scheme-cream py-28 lg:py-40">
      <Container>
        <EyebrowTag>What we do</EyebrowTag>
        <WordReveal
          text="Every firm files returns. Far fewer can tell you, before you sign, exactly what a sale, a restructure, or a succession will cost you in tax. That is the difference here."
          className="mt-10 max-w-[20ch] font-display text-4xl leading-[1.08] text-clay sm:max-w-[24ch] sm:text-6xl lg:text-7xl"
        />
      </Container>
    </section>
  );
}
