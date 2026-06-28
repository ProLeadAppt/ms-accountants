import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { HeroBackground } from "@/components/motion/HeroBackground";
import { HeroTimeline } from "@/components/motion/HeroTimeline";
import { MaskHeadline } from "@/components/motion/MaskHeadline";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="scheme-espresso relative min-h-[100svh] overflow-hidden">
      {/* Background — golden-hour Sydney sandstone (fal.ai Flux 1.1 Ultra). */}
      <div
        data-hero="bg"
        className="absolute inset-x-0 -top-[8%] z-0 h-[118%] bg-[#1a130f]"
        aria-hidden="true"
      >
        <HeroBackground />
        {/* Top fade so the cream nav stays legible over the bright facade. */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#160f0b]/85 to-transparent" />
        {/* Left-to-right espresso scrim: headline legibility, right third left to glow. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#160f0b] from-10% via-[#160f0b]/62 via-58% to-transparent to-96%" />
        <div className="absolute inset-0 bg-[#1a130f]/10 mix-blend-multiply" />
        {/* Fine dot grain (kept from v1). */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1a130f] to-transparent" />
      </div>

      <HeroTimeline className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-20">
        <Container>
          <div data-hero="rise">
            <EyebrowTag>Boutique Sydney tax, accounting &amp; advisory</EyebrowTag>
          </div>
          <MaskHeadline
            className="mt-8 max-w-[18ch] font-serif text-[2.7rem] leading-[0.98] text-cream sm:text-6xl lg:text-[5.5rem]"
            emClassName="headline-em text-red-bright"
            segments={[
              { text: "Your accountant should know tax. Ours" },
              { text: "wrote the thesis", em: true },
              { text: "on it." },
            ]}
          />
          <p
            data-hero="rise"
            className="mt-9 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
          >
            MS Accountants is a boutique Sydney firm led by Dr Maheswaran
            Sridaran: a PhD in Australian tax, a Master of Taxation, and thirty
            years inside the world&rsquo;s leading firms. From the hardest
            capital gains question to your annual return, he reviews every
            engagement himself.
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
