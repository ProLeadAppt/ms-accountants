import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Tax advisory and planning; disputes, investigations and litigation; compliance; CFO advisory; and SMSF audits. Five disciplines, led by a chartered accountant who is also a lawyer, with Dr Sridaran reviewing every engagement personally.",
  alternates: { canonical: "/services" },
};

const ICONS: Record<string, IconName> = {
  "tax-advisory-planning": "advisory",
  "tax-disputes-ato": "dispute",
  "tax-compliance-returns": "compliance",
  "business-cfo-advisory": "cfo",
  "self-managed-super": "super",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        titleSegments={[
          { text: "Five disciplines, one" },
          { text: "director", em: true },
          { text: "on every file." },
        ]}
        lede="The work spans planning; disputes, investigations and litigation; compliance; advisory; and SMSF compliance. What does not change is who reviews it. Every engagement passes under Dr Sridaran personally, a chartered accountant who is also a lawyer that specialises in Australian tax law."
      />

      <section className="scheme-cream py-20 lg:py-28">
        <Container>
          <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)]">
            {services.map((s, i) => (
              <article
                key={s.slug}
                className="group relative bg-[color-mix(in_srgb,var(--color-cream)_60%,transparent)] p-8 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-brand-red)_5%,transparent)] sm:p-10"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                  <div className="flex items-center gap-4 sm:w-16 sm:flex-col sm:items-start sm:gap-3">
                    <span className="font-mono text-sm tabular-nums text-brand-red">
                      0{i + 1}
                    </span>
                    <Icon
                      name={ICONS[s.slug] ?? "advisory"}
                      size={28}
                      className="text-clay transition-colors duration-300 group-hover:text-brand-red"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-2xl leading-tight sm:text-[1.9rem]">
                      <Link
                        href={`/services/${s.slug}`}
                        className="transition-colors duration-300 group-hover:text-brand-red"
                      >
                        <span className="absolute inset-0" aria-hidden="true" />
                        {s.title}
                      </Link>
                      {s.flagship && (
                        <span className="ml-3 align-middle font-mono text-[0.58rem] uppercase tracking-[0.18em] text-brand-red">
                          Flagship
                        </span>
                      )}
                    </h2>
                    <p className="mt-2 font-serif text-lg italic text-clay">
                      {s.tagline}
                    </p>
                    <p className="mt-4 max-w-2xl text-[0.97rem] leading-relaxed text-[var(--muted)]">
                      {s.teaserBlurb}
                    </p>
                    <div className="relative z-10 mt-6 inline-flex items-center gap-2">
                      <TextLink href={`/services/${s.slug}`} className="text-brand-red">
                        Explore {s.navTitle}
                      </TextLink>
                      <Icon
                        name="arrow"
                        size={16}
                        className="text-brand-red transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </Stagger>

          <Reveal className="mt-12">
            <p className="max-w-2xl text-[var(--muted)]">
              Not sure which fits? Most engagements start with a conversation
              about the question in front of you, and the right service follows
              from there.
            </p>
          </Reveal>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
