import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export function PromiseBlock() {
  return (
    <section className="bg-brand-red py-24 text-cream lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow text-cream/70">
              <span className="eyebrow__dot" aria-hidden="true" />
              The promise
            </span>
            <h2 className="mt-7 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              You hired the expert. You should{" "}
              <em className="headline-em">get</em> the expert.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/85">
              Elsewhere, a partner wins the work and a junior does it. Here, Dr
              Sridaran reviews the quality on every engagement himself. That is the
              whole point of a boutique. The person whose name is on the door is
              the person on your file.
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
