import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { HeroBackground } from "@/components/motion/HeroBackground";
import { HeroTimeline } from "@/components/motion/HeroTimeline";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="scheme-espresso relative min-h-[100svh] overflow-hidden">
      {/* HeroTimeline scopes the GSAP timeline. The background lives INSIDE it so
          the load scale-in and the scroll parallax actually target it, while the
          z-0/z-10 split keeps the media behind the content. */}
      <HeroTimeline className="relative block min-h-[100svh]">
        {/* Background — library study, drifting dust motes (fal.ai Kling i2v). */}
        <div
          data-hero="bg"
          data-speed="0.85"
          className="absolute inset-x-0 -top-[8%] z-0 h-[118%] bg-espresso-soft will-change-transform"
          aria-hidden="true"
        >
          <HeroBackground />
          {/* Dust + light layer, drifts faster than the still for depth. */}
          <div
            data-speed="1.12"
            className="absolute inset-0 opacity-[0.5] mix-blend-screen [background-image:radial-gradient(circle,rgba(255,224,170,0.5)_1px,transparent_0)] [background-size:64px_64px]"
          />
          {/* Top fade so the cream nav stays legible over the bright facade. */}
          <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-espresso-deep/85 to-transparent" />
          {/* Left-to-right espresso scrim: headline legibility, right third left to glow. */}
          <div className="absolute inset-0 bg-gradient-to-r from-espresso-deep from-10% via-espresso-deep/62 via-58% to-transparent to-96%" />
          <div className="absolute inset-0 bg-espresso-soft/10 mix-blend-multiply" />
          {/* Fine dot grain (kept from v1). */}
          <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1a130f] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-20">
          <Container>
            <div data-hero="rise">
              <EyebrowTag>Boutique Sydney tax, accounting &amp; advisory</EyebrowTag>
            </div>
            <SplitHeadline
              as="h1"
              splitType="lines"
              className="mt-8 max-w-[18ch] font-serif text-[2.7rem] leading-[0.98] text-cream sm:text-6xl lg:text-[5.5rem]"
              emClassName="headline-em text-red-bright"
              segments={[
                { text: "Your accountant should know tax. Ours" },
                { text: "wrote the thesis", em: true },
                { text: "on it, and is a" },
                { text: "lawyer", em: true },
                { text: "too." },
              ]}
            />
            <p
              data-hero="rise"
              className="mt-9 max-w-xl text-lg leading-relaxed text-[var(--muted)]"
            >
              MS Accountants is a boutique Sydney firm led by Dr Maheswaran
              Sridaran: a chartered accountant, a lawyer, and a PhD in Australian
              tax law. Over 45 years across more than five countries, the early
              years with two of the Big Four. From a complex ATO investigation or
              tax litigation to your annual return, nothing leaves the firm
              without passing under his eye.
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
        </div>
      </HeroTimeline>
    </section>
  );
}
