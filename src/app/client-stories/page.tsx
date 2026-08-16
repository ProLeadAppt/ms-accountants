import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { ClientStoryCard } from "@/components/proof/ClientStoryCard";
import { Button } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHero } from "@/components/sections/PageHero";
import { clientStoriesGraph } from "@/lib/schema";
import {
  clientStories,
  getClientStories,
  storyChapters,
} from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Client Stories",
  description:
    "Read 14 attributed client references for MS Accountants covering long-term accounting relationships, ATO reviews, complex tax matters, audit, compliance, and business advice.",
  alternates: { canonical: "/client-stories" },
};

const proofRules = [
  {
    label: "Supplied or approved in writing",
    body: "Every quotation comes from a supplied client reference or text the client approved in writing. Short extracts are taken directly from the full reference.",
  },
  {
    label: "Names stay attached",
    body: "Names, roles, organisations, dates, and locations appear only where the client supplied them. Nothing has been inferred to fill a gap.",
  },
  {
    label: "No manufactured rating",
    body: "The clients did not provide star scores, so this page does not turn their references into one. It also uses no client logos.",
  },
] as const;

export default function ClientStoriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clientStoriesGraph(clientStories)) }}
      />

      <PageHero
        eyebrow="Client stories"
        underline
        titleSegments={[
          { text: "What clients say" },
          { text: "after the work is done.", em: true },
        ]}
        lede="Fourteen attributed client references, published with permission. They describe long-standing advice, difficult ATO matters, audit and compliance, and what it was like to work with the people involved."
      >
        <Button href="#the-references" variant="secondary" className="text-cream">
          Read the references
        </Button>
      </PageHero>

      <section className="scheme-cream py-20 lg:py-28" aria-labelledby="proof-method">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <EyebrowTag>How to read this page</EyebrowTag>
              <h2 id="proof-method" className="mt-6 max-w-[13ch] font-serif text-4xl leading-[1.08] sm:text-5xl">
                A reference should be traceable to a person.
              </h2>
              <p className="mt-6 max-w-md text-[var(--muted)]">
                This is not a carousel of anonymous praise. It is a record of who said what, and the context they chose to provide.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--hairline)]">
              {proofRules.map((rule, index) => (
                <div key={rule.label} className="grid gap-4 bg-cream p-7 sm:grid-cols-[3rem_1fr] sm:p-8">
                  <span className="font-mono text-xs tracking-[0.16em] text-brand-red">0{index + 1}</span>
                  <div>
                    <h3 className="font-serif text-xl">{rule.label}</h3>
                    <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-[var(--muted)]">
                      {rule.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <div id="the-references" className="scroll-mt-24">
        {storyChapters.map((chapter, chapterIndex) => {
          const stories = getClientStories(chapter.storyIds);
          const dark = chapterIndex === 1;
          return (
            <section
              key={chapter.id}
              id={chapter.id}
              className={`${dark ? "scheme-espresso-deep" : chapterIndex === 2 ? "scheme-sand" : "scheme-paper"} py-24 lg:py-36`}
              aria-labelledby={`chapter-${chapter.id}`}
            >
              <Container>
                <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
                  <Reveal className="h-fit lg:sticky lg:top-28">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--accent)]">
                      Chapter {chapter.index}
                    </p>
                    <EyebrowTag className="mt-6">{chapter.eyebrow}</EyebrowTag>
                    <h2
                      id={`chapter-${chapter.id}`}
                      className={`mt-7 max-w-[13ch] font-serif text-4xl leading-[1.08] sm:text-5xl ${dark ? "text-cream" : ""}`}
                    >
                      {chapter.title}
                    </h2>
                    <p className="mt-6 max-w-md text-[var(--muted)]">{chapter.lede}</p>
                    <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                      {stories.length} client {stories.length === 1 ? "reference" : "references"}
                    </p>
                  </Reveal>

                  <Stagger className="grid gap-7">
                    {stories.map((story, index) => (
                      <ClientStoryCard
                        key={story.id}
                        story={story}
                        quote="full"
                        variant="card"
                        index={`${chapter.index}.${String(index + 1).padStart(2, "0")}`}
                        className={dark ? "bg-cream/[0.035]" : undefined}
                      />
                    ))}
                  </Stagger>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <FinalCTA />
    </>
  );
}
