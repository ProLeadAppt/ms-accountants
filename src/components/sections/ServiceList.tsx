import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { services } from "@/lib/services";
import type { IconName } from "@/components/ui/Icon";

const ICONS: Record<string, IconName> = {
  "tax-advisory-planning": "advisory",
  "tax-disputes-ato": "dispute",
  "tax-compliance-returns": "compliance",
  "business-cfo-advisory": "cfo",
  "self-managed-super": "super",
};

export function ServiceList() {
  return (
    <section className="scheme-sand py-24 lg:py-32">
      <Container>
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EyebrowTag>Services</EyebrowTag>
            <h2 className="mt-6 max-w-[16ch] font-serif text-4xl leading-[1.05] sm:text-5xl">
              Five disciplines, one principal on every file.
            </h2>
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
              className="group flex items-center gap-6 border-b border-[var(--hairline)] py-8 transition-colors hover:bg-[color-mix(in_srgb,var(--color-brand-red)_5%,transparent)] sm:gap-10 sm:py-10"
            >
              <span className="font-mono text-sm text-brand-red tabular-nums">
                0{i + 1}
              </span>
              <Icon
                name={ICONS[s.slug] ?? "advisory"}
                className="h-7 w-7 shrink-0 text-clay"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-2xl leading-tight sm:text-3xl">
                  {s.navTitle}
                  {s.flagship && (
                    <span className="ml-3 align-middle font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-red">
                      Flagship
                    </span>
                  )}
                </h3>
                <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--muted)]">
                  {s.teaserBlurb}
                </p>
              </div>
              <Icon
                name="arrow"
                className="hidden h-5 w-5 shrink-0 text-clay transition-transform duration-300 group-hover:translate-x-1.5 sm:block"
              />
            </Link>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
