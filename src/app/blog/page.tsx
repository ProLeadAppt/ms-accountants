import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Blog", description: "Practical tax guides from MS Accountants in Sydney.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog · MS Accountants", description: "Practical tax guides from MS Accountants in Sydney.",
    url: `${site.url}/blog`, type: "website", siteName: "MS Accountants", locale: "en_AU" },
};

export default function BlogPage() {
  return (
    <>
    <PageHero eyebrow="MS Accountants blog" titleSegments={[{ text: "Practical tax guides" }]} lede="General information to help you understand the next step. For advice on your circumstances, speak with an adviser." />
    <section className="scheme-cream py-12 sm:py-16">
      <Container>
        <article className="max-w-3xl">
          <Image src="/images/blog/ato-letter.png" width={1600} height={1200} sizes="(max-width: 768px) 100vw, 768px" alt="An ATO letter? Start here. Check the request. Gather your records." className="rounded-xl" />
          <p className="eyebrow mt-6">Tax disputes</p>
          <h2 className="mt-3 font-serif text-3xl"><Link href="/blog/what-to-do-ato-audit-letter" className="link-underline">What should you do if you receive an ATO audit letter?</Link></h2>
          <p className="mt-4 leading-relaxed">Check the contact, understand the request and organise your records before responding.</p>
          <p className="mt-4">By MS Accountants</p>
        </article>
      </Container>
    </section>
    </>
  );
}
