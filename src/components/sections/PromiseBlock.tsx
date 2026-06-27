import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export function PromiseBlock() {
  return (
    <section className="bg-brand-red py-24 text-cream lg:py-32">
      <Container>
        <Reveal className="max-w-4xl">
          <span className="eyebrow text-cream/70">
            <span className="eyebrow__dot" aria-hidden="true" />
            The promise
          </span>
          <h2 className="mt-7 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            You hired the expert. You should{" "}
            <em className="headline-em">get</em> the expert.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85">
            At most firms, the partner wins the work and a junior does it. At MS
            Accountants, Dr Sridaran personally reviews the quality on every
            engagement — because the whole point of a boutique is that the person
            whose name is on the door is the person on your file.
          </p>
          <div className="mt-11">
            <Button
              href={site.ctaHref}
              variant="secondary"
              className="text-cream ring-cream/40 hover:bg-cream/10 hover:ring-cream/70"
            >
              Talk to Dr Sridaran directly
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
