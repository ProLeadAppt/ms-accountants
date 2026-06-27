import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { StickyPin } from "@/components/motion/StickyPin";

export function AboutTeaser() {
  return (
    <section className="scheme-cream py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* IMAGE SLOT: replace with next/image origin.jpg / portrait (Phase 12) */}
          <StickyPin topClassName="lg:top-28" className="h-fit">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#7b3d2c,#3a2419)]">
              <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:20px_20px]" />
              <span className="absolute bottom-5 left-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cream/70">
                Dr Maheswaran Sridaran — portrait to follow
              </span>
            </div>
          </StickyPin>

          <Reveal className="flex flex-col items-start justify-center">
            <EyebrowTag>The principal does the work</EyebrowTag>
            <h2 className="mt-7 font-serif text-4xl leading-[1.06] sm:text-5xl">
              Why a tax academic chose to run a small firm.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
              Most people with Dr Sridaran&rsquo;s background don&rsquo;t end up
              here — running a boutique where the principal does the work. The
              reason explains how MS Accountants works: the person whose name is
              on the door is the person on your file.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
              The technical depth of a global firm, with the access of one
              adviser who knows your business.
            </p>
            <div className="mt-10">
              <Button href="/about" variant="secondary">
                Read the full story
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
