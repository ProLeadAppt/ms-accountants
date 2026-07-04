import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { SplitHeadline } from "@/components/motion/SplitHeadline";
import { services } from "@/lib/services";

export function ServiceList() {
  return (
    <section className="scheme-paper section">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EyebrowTag>Services</EyebrowTag>
            <SplitHeadline
              as="h2"
              className="mt-6 max-w-[16ch] font-serif text-4xl leading-[1.05] sm:text-5xl"
              emClassName="text-brand-red"
              segments={[
                { text: "Five disciplines, one" },
                { text: "principal", em: true },
                { text: "on every file." },
              ]}
            />
          </div>
          <Button href="/services" variant="secondary" className="shrink-0">
            Explore all services
          </Button>
        </Reveal>

        <Stagger className="mt-16 border-t border-[var(--hairline)]">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex items-baseline gap-6 border-b border-[var(--hairline)] py-8 sm:gap-10"
            >
              <span className="w-8 shrink-0 font-mono text-sm tabular-nums text-brand-red">
                0{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-2xl leading-tight transition-colors duration-150 group-hover:text-brand-red sm:text-[1.75rem]">
                  {s.navTitle}
                  {s.flagship && (
                    <span className="ml-3 align-middle font-mono text-[0.58rem] uppercase tracking-[0.18em] text-brand-red">
                      Flagship
                    </span>
                  )}
                </h3>
                <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--muted)]">
                  {s.teaserBlurb}
                </p>
              </div>
            </Link>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
