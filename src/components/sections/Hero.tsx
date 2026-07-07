import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { HeroBackground } from "@/components/motion/HeroBackground";
import { HeroTimeline } from "@/components/motion/HeroTimeline";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { site, authorityItems } from "@/lib/site";

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
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso-soft to-transparent" />
        </div>

        {/* Content — Quiet-Luxury split: claim left, credentials panel right. */}
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-28 pb-28">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[1.55fr_0.95fr] lg:gap-16">
              <div>
                <div data-hero="rise">
                  <EyebrowTag>Tax &middot; Advisory &middot; Disputes</EyebrowTag>
                </div>
                <SplitHeadline
                  as="h1"
                  reveal="hero"
                  underline
                  className="mt-8 max-w-[18ch] font-serif text-[2.7rem] leading-[0.98] text-cream sm:text-6xl lg:text-[5.5rem]"
                  emClassName="headline-em text-red-bright"
                  segments={[
                    { text: "Your accountant should know tax. Ours not only" },
                    { text: "wrote a doctoral thesis", em: true },
                    { text: "on it, published a book on it, and is also a lawyer who specialises in it." },
                  ]}
                />
                <div data-hero="rise" className="mt-11">
                  <Button href={site.ctaHref}>{site.cta}</Button>
                </div>
              </div>

              {/* Credentials hairline panel — fades in after the claim. */}
              <div
                data-hero="rise"
                className="hidden flex-col gap-7 border-l border-cream/15 pl-8 lg:flex"
              >
                <div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45">
                    Director
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-cream/85">
                    Dr Maheswaran Sridaran
                    <br />
                    Chartered Accountant &middot; Lawyer &middot; Registered Tax Agent &middot; PhD Australian tax law (Macquarie University)
                  </p>
                </div>
                <div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45">
                    The practice
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-cream/85">
                    Over 45 years, in more than five countries, mostly with two
                    of the Big Four, the last 25 in Australia. Nothing leaves
                    the firm without passing his eye.
                  </p>
                </div>
                <div>
                  <div className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45">
                    Based
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-cream/85">
                    Sydney, servicing nationally
                  </p>
                </div>
              </div>
            </div>
          </Container>

          {/* Authority strip — replaces the AuthorityMarquee section. */}
          <div data-hero="rise" className="absolute inset-x-0 bottom-0">
            <Container>
              <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-cream/15 py-5">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45">
                  As cited in
                </span>
                {authorityItems.slice(0, 3).map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-cream/55"
                  >
                    {item}
                  </span>
                ))}
                <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45 sm:inline">
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
