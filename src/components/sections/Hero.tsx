import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { HeroTimeline } from "@/components/motion/HeroTimeline";
import { MaskHeadline } from "@/components/motion/MaskHeadline";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="scheme-espresso relative min-h-[100svh] overflow-hidden">
      {/* Background — IMAGE SLOT: replace with next/image hero.jpg (Phase 12) */}
      <div
        data-hero="bg"
        className="absolute inset-x-0 -top-[8%] -z-10 h-[118%] bg-[radial-gradient(120%_120%_at_15%_0%,#3a2419_0%,#241c18_55%,#1a130f_100%)]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1a130f] to-transparent" />
      </div>

      <HeroTimeline className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-20">
        <Container>
          <div data-hero="rise">
            <EyebrowTag>Boutique Sydney tax &amp; advisory</EyebrowTag>
          </div>
          <MaskHeadline
            className="mt-8 max-w-[18ch] font-serif text-[2.7rem] leading-[0.98] text-cream sm:text-6xl lg:text-[5.5rem]"
            emClassName="headline-em text-red-bright"
            segments={[
              { text: "Your accountant should know capital gains tax. Ours" },
              { text: "wrote the thesis", em: true },
              { text: "on it." },
            ]}
          />
          <p
            data-hero="rise"
            className="mt-9 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
          >
            Dr Maheswaran Sridaran holds a PhD in Australian capital gains tax, a
            Master of Taxation, and thirty years inside the world&rsquo;s top
            firms. He reviews every engagement himself.
          </p>
          <div data-hero="rise" className="mt-11 flex flex-wrap items-center gap-4">
            <Button href={site.ctaHref}>{site.cta}</Button>
            <Button href="/about" variant="secondary">
              See how we think about tax
            </Button>
          </div>
        </Container>

        <div data-hero="rise" className="absolute inset-x-0 bottom-8">
          <Container>
            <div className="flex items-center justify-between border-t border-cream/15 pt-5">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/55">
                Scroll
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/55">
                Sydney, Australia
              </span>
            </div>
          </Container>
        </div>
      </HeroTimeline>
    </section>
  );
}
