import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";
import { guide } from "./guide";
import styles from "./blog.module.css";

export const metadata: Metadata = {
  title: { absolute: "Tax Insights & Practical Guides | MS Accountants" }, description: "Practical tax guides from MS Accountants in Sydney.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Tax Insights & Practical Guides | MS Accountants", description: "Practical tax guides from MS Accountants in Sydney.",
    url: `${site.url}/blog`, type: "website", siteName: "MS Accountants", locale: "en_AU" },
};

export default function BlogPage() {
  return (
    <>
      <section className={`scheme-espresso ${styles.hero}`}>
        <Container>
          <p className={styles.kicker}>MS Accountants / The blog</p>
          <div className={styles.indexIntro}>
            <h1>Tax insights.<br /><em>Practical guides.</em></h1>
            <p>Practical guidance to help you check the facts and understand your next step.</p>
          </div>
          <a href="#guides" className={styles.heroLink}>Explore the guide <span aria-hidden="true">↓</span></a>
        </Container>
      </section>
      <section id="guides" className={`scheme-cream ${styles.indexSection}`}>
        <Container>
          <div className={styles.sectionLabel}><h2>Start with your question</h2><span>01 published guide</span></div>
          <article className={styles.feature}>
            <Link href={guide.path} className={styles.featureImage} tabIndex={-1} aria-hidden="true">
              <Image src={guide.image} width={1600} height={1200} sizes="(max-width: 767px) 100vw, 44vw" alt="" />
            </Link>
            <div className={styles.featureCopy}>
              <p className={styles.topic}>Tax disputes / ATO correspondence</p>
              <h3><Link href={guide.path}>{guide.title}</Link></h3>
              <p>{guide.summary}</p>
              <p className={styles.meta}><time dateTime={guide.published}>12 October 2026</time><span aria-hidden="true"> · </span>Approx. {guide.readingMinutes} min read</p>
              <Link href={guide.path} className={styles.readLink}>Read the guide <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
          <nav className={styles.questionLinks} aria-label="Jump into the ATO-letter guide">
            <p className={styles.topic}>Jump into this guide</p>
            <div>
              <Link href={`${guide.path}#verify-contact`}><span>01</span>Is the contact genuine?<span aria-hidden="true">↗</span></Link>
              <Link href={`${guide.path}#gather-records`}><span>02</span>Which records should I gather?<span aria-hidden="true">↗</span></Link>
              <Link href={`${guide.path}#response-deadline`}><span>03</span>How long do I have to respond?<span aria-hidden="true">↗</span></Link>
            </div>
          </nav>
          <p className={styles.indexNote}>General information, not advice for your circumstances. <Link href="/contact">Speak with MS Accountants</Link> if you need help understanding your next step.</p>
        </Container>
      </section>
    </>
  );
}
