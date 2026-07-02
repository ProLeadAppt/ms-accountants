import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { services } from "@/lib/services";

const ICONS: Record<string, IconName> = {
  "tax-advisory-planning": "advisory",
  "tax-disputes-ato": "dispute",
  "tax-compliance-returns": "compliance",
  "business-cfo-advisory": "cfo",
  "self-managed-super": "super",
};

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

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
              className="group relative flex items-center gap-5 overflow-hidden border-b border-[var(--hairline)] py-9 sm:gap-9"
            >
              {/* red wash that wipes across on hover */}
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-[color-mix(in_srgb,var(--color-brand-red)_7%,transparent)] transition-transform duration-[600ms] group-hover:scale-x-100 ${EASE}`}
              />
              <span className="relative z-10 w-7 font-mono text-sm tabular-nums text-brand-red">
                0{i + 1}
              </span>
              <Icon
                name={ICONS[s.slug] ?? "advisory"}
                size={26}
                className={`relative z-10 text-clay transition-colors duration-300 group-hover:text-brand-red`}
              />
              <div
                className={`relative z-10 min-w-0 flex-1 transition-transform duration-[600ms] group-hover:translate-x-2 ${EASE}`}
              >
                <h3 className="font-serif text-2xl leading-tight transition-colors duration-300 group-hover:text-brand-red sm:text-[1.75rem]">
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
              <span className="relative z-10 hidden translate-x-[-0.5rem] text-brand-red opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
                <Icon name="arrow" size={20} />
              </span>
            </Link>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
