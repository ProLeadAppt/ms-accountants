import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { site } from "@/lib/site";
import styles from "../blog.module.css";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: { absolute: "Received an ATO Audit Letter? First Steps | MS Accountants" },
  description: "Received ATO audit correspondence? Learn what to check, which records to gather and when to seek advice. A practical guide from MS Accountants in Sydney.",
  alternates: { canonical: "/blog/what-to-do-ato-audit-letter" },
  authors: [{ name: "MS Accountants" }],
  openGraph: {
    type: "article", title: "What should you do if you receive an ATO audit letter?",
    publishedTime: "2026-10-12",
    description: "Received ATO audit correspondence? Learn what to check, which records to gather and when to seek advice. A practical guide from MS Accountants in Sydney.",
    url: `${site.url}/blog/what-to-do-ato-audit-letter`, siteName: "MS Accountants", locale: "en_AU",
    images: [{ url: "/images/blog/ato-letter.png", width: 1600, height: 1200,
      alt: "An ATO letter? Start here. Check the request. Gather your records." }],
  },
};

export default function AtoLetterArticle() {
  return (
    <>
    <PageHero eyebrow="Tax disputes · MS Accountants" titleSegments={[{ text: "What should you do if you receive an ATO audit letter?" }]} />
    <section className="scheme-cream py-12 sm:py-16">
      <Container>
        <article className={styles.article}>
          <nav aria-label="Breadcrumb"><Link href="/blog">Blog</Link><span aria-hidden="true"> / </span><span>ATO correspondence</span></nav>
          <p className={styles.byline}>By MS Accountants</p>
          <p className={styles.byline}>Published <time dateTime="2026-10-12">12 October 2026</time></p>
          <figure>
            <Image src="/images/blog/ato-letter.png" width={1600} height={1200}
              sizes="(max-width: 768px) 100vw, 768px"
              alt="An ATO letter? Start here. Check the request. Gather your records." />
            <figcaption>Editorial illustration.</figcaption>
          </figure>
<p>First, verify that the contact is genuine, read exactly what the ATO is asking for and note the response date. Keep the letter and relevant records together. If the request is unclear, the deadline is close or the matter is complex, seek advice promptly so you can prepare an accurate response.</p>
<p>An ATO letter can raise several questions at once. Which period is being checked? What information is needed? Who should reply? The most useful starting point is the actual document in front of you.</p>
<p>This guide explains how to organise those first steps. It is general information, not tax or legal advice for your circumstances.</p>
<h2>1. How do you check whether the contact is genuine?</h2>
<p>Before sharing personal information or opening an unexpected link, check the contact through an official ATO channel. Use contact details you find independently on ato.gov.au. If a message or call seems suspicious, the ATO&#x27;s <a href="https://www.ato.gov.au/online-services/scams-cyber-safety-and-identity-protection/how-to-stay-scam-safe">scam-safety guidance</a> explains how to verify it.</p>
<p>Keep the original message, envelope or letter. Make a note of when it arrived, including any follow-up calls. Do not put your tax file number, identity documents or full tax correspondence into a public comment or social-media message when asking for help.</p>
<h2>2. What is the ATO actually asking you to do?</h2>
<p>Read the whole letter, including attachments. Identify:</p>
<ul>
<li>The person or business named in the request</li>
<li>The tax or reporting periods involved</li>
<li>The transactions, figures or issues being examined</li>
<li>The specific records or explanations requested</li>
<li>The response date and method</li>
<li>The contact officer or reference number</li>
</ul>
<p>Avoid working from the word “audit” alone. A request for information, a formal notice and a notice of assessment can involve different steps. The ATO explains that its <a href="https://www.ato.gov.au/about-ato/commitments-and-reporting/information-and-privacy/information-management/our-approach-to-information-gathering/our-formal-notice-powers">formal notices</a> may require information, documents or attendance to give evidence. The notice itself needs careful attention.</p>
<p>If you cannot tell what is required, ask for clarification early. A useful question is: “Which documents or transactions would resolve this part of the request?”</p>
<h2>3. Which records should you gather first?</h2>
<p>Start with the documents relevant to the request. Depending on the issue, these may include tax returns, activity statements, invoices, receipts, bank statements, contracts, payroll records or supporting calculations.</p>
<p>Create a simple working folder:</p>
<ol>
<li>ATO correspondence, in date order</li>
<li>The returns or statements being checked</li>
<li>Supporting documents, grouped by question</li>
<li>A list of missing records and where you are looking for them</li>
<li>Notes of calls, agreed actions and response dates</li>
</ol>
<p>Preserve the original records. If a calculation needs correcting or explaining, keep a separate working note so the original and the explanation are distinguishable. Do not guess at missing figures or create a document that looks like an original receipt.</p>
<p>You may find it useful to number the ATO&#x27;s questions and match each one with its supporting documents. This is an organisation method, not a substitute for checking whether your response is complete.</p>
<h2>4. What if you need more time or cannot find a record?</h2>
<p>Raise the difficulty promptly with the contact officer or your adviser. Explain what is missing, what you have done to find it and what alternative evidence may be available. Ask about the response date before it passes; do not assume that asking changes the deadline.</p>
<p>The ATO&#x27;s <a href="https://www.ato.gov.au/about-ato/commitments-and-reporting/information-and-privacy/information-management/our-approach-to-information-gathering/resolving-disputes">information-gathering dispute guidance</a> encourages early discussion of concerns, clear explanations and accurate responses. It also describes discussing due dates and, where possible, considering information in another format.</p>
<p>Keep a record of any agreement about timing or the information to be supplied. If the document is a formal notice, get advice on the specific obligations rather than treating it like an ordinary email request.</p>
<h2>5. When should you speak with an adviser?</h2>
<p>Consider getting help early if the request covers several entities or years, involves a disputed interpretation, raises possible penalties, refers to deliberate conduct, or asks for records you do not understand. A close deadline is another reason to act promptly.</p>
<p>Before the first conversation, prepare a short summary: what arrived, when the response is due, which periods are involved and what concerns you. Ask how documents should be shared securely before sending the full file.</p>
<p>Agree who will review the records, who will communicate with the ATO and how you will approve the response. Some notices require action or confirmation from the person to whom they are addressed, even where an adviser helps. An adviser should check that against the actual notice.</p>
<p>MS Accountants&#x27; <Link href="/services/tax-disputes-ato">Tax Disputes, Investigations &amp; Litigation service</Link> includes assistance with tax-authority audits and disputed assessments. You can discuss the scope of help needed before deciding how to proceed.</p>
<h2>6. What if you disagree with the ATO&#x27;s position?</h2>
<p>Identify the point of disagreement and the records that support your position. Ask which response or review process applies to the document you have received. An information request, proposed position and issued assessment should not be treated as interchangeable.</p>
<p>Formal objections have requirements and time limits. These vary with the decision and circumstances; there is no single deadline that should be assumed from a general article. The ATO&#x27;s <a href="https://www.ato.gov.au/law/view/document?DocID=TXR/TR20115/NAT/ATO/00001">income-tax objection guidance</a> sets out how those requirements work. Have the current rules and your own notice checked before relying on a date.</p>
<h2>Questions people ask</h2>
<h3>Does an ATO letter mean I have done something wrong?</h3>
<p>Read what the letter actually says. A request for information asks for material to examine an issue; it should not be treated as a final conclusion about your position. If an assessment or decision has already been issued, review that document and its next steps separately.</p>
<h3>How long do I have to respond?</h3>
<p>Check the date in the letter or notice and confirm any uncertainty promptly. The relevant period depends on the request or decision. Do not assume a general online example gives you the right deadline.</p>
<h3>Can my accountant respond for me?</h3>
<p>An appropriately authorised adviser may help organise records and communicate with the ATO. Confirm the scope of that authority and whether anything still needs your own response, approval or attendance.</p>
<h3>What should I bring to the first meeting?</h3>
<p>The complete letter, its attachments, the response date, earlier correspondence and a short outline of the issue are a useful start. Ask for a secure way to provide the supporting records.</p>
<h2>Need help understanding the next step?</h2>
<p>If you have received ATO correspondence and would like help reviewing what it requires, <Link href="/contact">book a conversation with MS Accountants</Link>. Start with the type of request and the response date. The team can explain the next step for sharing your documents.</p>
<p>General information only. Tax and legal outcomes depend on the facts, the applicable law and the documents involved. Obtain advice for your circumstances before acting.</p>
        </article>
      </Container>
    </section>
    </>
  );
}
