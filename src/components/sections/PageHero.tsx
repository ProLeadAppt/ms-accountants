import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
};

/** Compact inner-page hero. Espresso scheme, clears the fixed header. */
export function PageHero({ eyebrow, title, lede, children }: Props) {
  return (
    <section className="scheme-espresso relative overflow-hidden pt-40 pb-20 lg:pt-48 lg:pb-28">
      {/* Warm radial wash to echo the homepage hero, no imagery. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-0 bg-[radial-gradient(120%_120%_at_15%_0%,#3a2419_0%,#241c18_55%,#1a130f_100%)]"
      >
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]" />
      </div>
      <Container className="relative z-10">
        <Reveal className="flex flex-col items-start">
          <EyebrowTag>{eyebrow}</EyebrowTag>
          <h1 className="mt-7 max-w-[20ch] font-serif text-[2.6rem] leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {lede && (
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
              {lede}
            </p>
          )}
          {children && <div className="mt-10 flex flex-wrap gap-4">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
