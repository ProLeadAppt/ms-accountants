import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ClientStoryCard } from "@/components/proof/ClientStoryCard";
import { TextLink } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { getClientStoriesForService } from "@/lib/testimonials";

export function ServiceProof({ slug }: { slug: string }) {
  const stories = getClientStoriesForService(slug);
  if (!stories.length) return null;

  const isDisputes = slug === "tax-disputes-ato";

  return (
    <section className="scheme-sand py-24 lg:py-32" aria-labelledby={`proof-${slug}`}>
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <EyebrowTag>{isDisputes ? "Proof under pressure" : "Relevant client proof"}</EyebrowTag>
            <h2 id={`proof-${slug}`} className="mt-6 max-w-[15ch] font-serif text-4xl leading-[1.08] sm:text-5xl">
              {isDisputes
                ? "Two ATO matters. Two independently described outcomes."
                : "What the working relationship feels like."}
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-xl text-[var(--muted)]">
              {isDisputes
                ? "Each reference describes a different business and a different ATO matter. Both are published in the client's own words."
                : "The reference below is selected for its relevance to this service. It does not claim a service or outcome the client did not describe."}
            </p>
            <div className="mt-5">
              <TextLink href="/client-stories" className="text-brand-red">
                Read the complete client collection
              </TextLink>
            </div>
          </div>
        </Reveal>

        <div className={`mt-12 grid gap-6 ${stories.length > 1 ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-[1fr_0.42fr]"}`}>
          <Reveal>
            <ClientStoryCard
              story={stories[0]}
              quote={isDisputes ? "full" : "excerpt"}
              variant="feature"
              index="01 / Client reference"
              className="bg-cream/35"
            />
          </Reveal>
          {stories.length > 1 ? (
            <Reveal delay={0.08}>
              <ClientStoryCard
                story={stories[1]}
                quote={isDisputes ? "excerpt" : "excerpt"}
                variant="card"
                index="02 / Supporting voice"
                className="bg-cream/28"
              />
            </Reveal>
          ) : (
            <Reveal className="flex items-end">
              <p className="border-l border-brand-red/45 pl-6 font-serif text-xl leading-relaxed text-clay">
                General competence and reliability only. No SMSF-specific claim is implied.
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
