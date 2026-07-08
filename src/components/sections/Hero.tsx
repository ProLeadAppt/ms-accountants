import { Container } from "@/components/layout/Container";
import { Button, TextLink } from "@/components/ui/Button";
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
        {/* Background — library study, quietened for a more private-room feel. */}
        <div
          data-hero="bg"
          data-speed="0.85"
          className="absolute inset-x-0 -top-[8%] z-0 h-[118%] bg-espresso-soft will-change-transform"
          aria-hidden="true"
        >
          <HeroBackground />
          <div
            data-speed="1.12"
            className="absolute inset-0 opacity-[0.22] mix-blend-screen [background-image:radial-gradient(circle,rgba(255,224,170,0.45)_1px,transparent_0)] [background-size:72px_72px]"
          />
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-espresso-deep/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso-deep from-8% via-espresso-deep/78 via-58% to-espresso-deep/18 to-100%" />
          <div className="absolute inset-0 bg-gradient-to-b from-espresso-deep/12 via-transparent to-espresso-soft/92" />
          <div className="absolute inset-0 bg-espresso-soft/18 mix-blend-multiply" />
          <div className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:24px_24px]" />
        </div>

        {/* Content — one cinematic claim, then quiet proof. */}
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-24 pb-16 lg:min-h-[760px] lg:pt-28 lg:pb-24">
          <Container>
            <div className="relative max-w-6xl pt-[3vh] lg:pt-[4vh]">
              <div className="max-w-5xl">
                <div data-hero="rise">
                  <EyebrowTag>Sydney tax advisory</EyebrowTag>
                </div>
                <SplitHeadline
                  as="h1"
                  reveal="hero"
                  underline
                  className="mt-6 max-w-[20ch] font-serif text-[2.55rem] leading-[0.95] tracking-[-0.03em] text-cream sm:text-[4.6rem] lg:text-[4.25rem] xl:text-[4.85rem]"
                  emClassName="headline-em text-red-bright"
                  segments={[
                    { text: "Tax advice for decisions too important to treat as" },
                    { text: "routine.", em: true },
                  ]}
                />
                <p
                  data-hero="rise"
                  className="mt-6 max-w-2xl text-base leading-relaxed text-cream/76 sm:text-lg lg:text-xl"
                >
                  Led by Dr Maheswaran Sridaran, Chartered Accountant, lawyer,
                  registered tax agent, and PhD in Australian tax law.
                </p>
                <div
                  data-hero="rise"
                  className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center"
                >
                  <Button href={site.ctaHref}>Book a conversation</Button>
                  <TextLink href="/about" className="text-cream/78 hover:text-cream">
                    Read Dr Sridaran&apos;s story
                  </TextLink>
                </div>
              </div>

              <div data-hero="rise" className="mt-10 max-w-3xl border-t border-cream/14 pt-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cream/45">
                  Director-led review
                </p>
                <p className="mt-3 text-sm leading-relaxed text-cream/76">
                  Chartered Accountant &middot; Lawyer &middot; Registered Tax Agent &middot;
                  PhD Australian Tax Law
                </p>
                <p className="mt-4 text-sm leading-relaxed text-cream/60">
                  The team prepares the work. Dr Sridaran personally reviews the
                  quality on every engagement.
                </p>
              </div>
            </div>
          </Container>
        </div>
      </HeroTimeline>
    </section>
  );
}
