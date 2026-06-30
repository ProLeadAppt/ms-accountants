import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Icon } from "@/components/ui/Icon";
import { TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { PageHero } from "@/components/sections/PageHero";
import { CaseInPoint } from "@/components/sections/CaseInPoint";
import { ServiceTestimonial } from "@/components/sections/ServiceTestimonial";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { services, getService } from "@/lib/services";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.tagline,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.flagship ? "Flagship service" : "Service"}
        title={service.title}
        lede={service.tagline}
      />

      {/* Editorial image band */}
      {service.image && (
        <section className="scheme-cream pt-16 lg:pt-20">
          <Container>
            <Reveal>
              <figure className="relative aspect-[21/9] overflow-hidden rounded-2xl">
                <Image
                  src={service.image}
                  alt={`${service.title} at MS Accountants.`}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-espresso/10" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(26,19,15,0.45),transparent)]" />
              </figure>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Intro */}
      <section className="scheme-cream py-20 lg:py-28">
        <Container size="narrow">
          <Reveal className="space-y-6 text-xl leading-relaxed text-espresso">
            {service.intro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* What we help with */}
      <section className="scheme-sand py-20 lg:py-28">
        <Container>
          <Reveal>
            <EyebrowTag>{service.helpHeading}</EyebrowTag>
          </Reveal>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] sm:grid-cols-2">
            {service.help.map((item, i) => {
              const term = typeof item === "string" ? item : item.term;
              const desc = typeof item === "string" ? null : item.desc;
              return (
                <div
                  key={i}
                  className="flex gap-4 bg-[color-mix(in_srgb,var(--color-cream)_50%,transparent)] p-7 lg:p-8"
                >
                  <Icon name="arrow" size={18} className="mt-1.5 shrink-0 text-brand-red" />
                  <div>
                    <h3 className="font-serif text-lg leading-snug text-espresso">
                      {term}
                    </h3>
                    {desc && (
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--muted)]">
                        {desc}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </Stagger>

          {service.note && (
            <Reveal className="mt-10">
              <p className="max-w-3xl border-l-2 border-brand-red pl-6 text-lg leading-relaxed text-clay">
                {service.note}
              </p>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Why us */}
      <section className="scheme-espresso py-24 lg:py-32">
        <Container size="narrow">
          <Reveal className="flex flex-col items-start">
            <EyebrowTag>Why us</EyebrowTag>
            <p className="mt-7 font-serif text-3xl leading-[1.12] text-cream sm:text-4xl">
              {service.why}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Decision-point proof: courage shown on Disputes, a relevant client
          voice on the rest. Both render in the same slot; never both at once. */}
      {service.slug === "tax-disputes-ato" && <CaseInPoint scheme="sand" />}
      <ServiceTestimonial slug={service.slug} />

      {/* Other services */}
      <section className="scheme-cream py-20 lg:py-28">
        <Container>
          <Reveal>
            <EyebrowTag>Other services</EyebrowTag>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-[color-mix(in_srgb,var(--color-cream)_55%,transparent)] p-7 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-brand-red)_6%,transparent)]"
              >
                <h3 className="font-serif text-xl leading-snug transition-colors duration-300 group-hover:text-brand-red">
                  {s.navTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {s.teaserBlurb}
                </p>
                <span className="mt-4 inline-flex text-brand-red">
                  <Icon
                    name="arrow"
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <TextLink href="/services" className="text-brand-red">
              All services
            </TextLink>
          </div>
        </Container>
      </section>

      <FinalCTA />
    </>
  );
}
