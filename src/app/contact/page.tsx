import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a conversation with Dr Sridaran. A boutique Sydney tax firm where the principal does the work.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a conversation"
        title={
          <>
            When the tax question is hard,{" "}
            <em className="headline-em text-red-bright">start here</em>.
          </>
        }
        lede="Tell us what you are weighing up. You will be speaking with the principal, not a call centre."
      />

      <section className="scheme-cream py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            {/* Details */}
            <Reveal className="flex flex-col gap-10">
              <div>
                <EyebrowTag>Direct line</EyebrowTag>
                <div className="mt-6 space-y-5">
                  <ContactItem label="Phone" value={site.contact.phone} href={site.contact.phoneHref} />
                  <ContactItem label="Email" value={site.contact.email} href={site.contact.emailHref} />
                  <ContactItem label="Location" value={site.contact.address} />
                </div>
              </div>
              <p className="max-w-sm text-[var(--muted)]">
                {site.footerTrust}
              </p>
            </Reveal>

            {/* Form */}
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <div className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-clay">
        {label}
      </div>
      {href ? (
        <a
          href={href}
          className="mt-1 inline-block font-serif text-xl text-espresso transition-colors duration-200 hover:text-brand-red"
        >
          {value}
        </a>
      ) : (
        <div className="mt-1 font-serif text-xl text-espresso">{value}</div>
      )}
    </div>
  );
}
