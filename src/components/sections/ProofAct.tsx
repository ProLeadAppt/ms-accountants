import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { ClientStoryCard } from "@/components/proof/ClientStoryCard";
import { TextLink } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { getClientStory } from "@/lib/testimonials";

const feature = getClientStory("bianca-fletcher")!;
const supporting = [getClientStory("murali-pitchai")!, getClientStory("qing-ouyang")!];

/** Homepage proof chapter: one consequential outcome, then two independent perspectives. */
export function ProofAct() {
  return (
    <section className="scheme-espresso-deep section-major relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:24px_24px]"
      />
      <Container className="relative">
        <Reveal className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <EyebrowTag>Client proof</EyebrowTag>
            <h2 className="mt-7 max-w-[17ch] font-serif text-4xl leading-[1.06] text-cream sm:text-5xl lg:text-6xl">
              What earns trust is what happens when the matter is difficult.
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-xl text-lg leading-relaxed text-cream/66">
              These references were supplied by clients or approved by them in writing. Each one is published with permission and a clear attribution.
            </p>
            <div className="mt-6">
              <TextLink href="/client-stories" className="text-cream/80 hover:text-cream">
                Explore all 14 references
              </TextLink>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.36fr_0.64fr]">
          <Reveal>
            <ClientStoryCard story={feature} quote="full" variant="feature" index="01 / ATO matter" />
          </Reveal>
          <Stagger className="grid gap-6">
            {supporting.map((story, index) => (
              <ClientStoryCard
                key={story.id}
                story={story}
                variant="card"
                index={`0${index + 2} / Independent voice`}
                className="bg-cream/[0.035]"
              />
            ))}
          </Stagger>
        </div>

        <Reveal className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-cream/12 bg-cream/12 sm:grid-cols-3">
          {[
            ["14", "approved client references"],
            ["2010", "relationships documented from the firm's beginning"],
            ["35+", "years in the longest client relationship described"],
          ].map(([figure, label]) => (
            <div key={figure} className="bg-espresso-deep px-7 py-7 sm:px-8">
              <p className="font-serif text-3xl text-red-bright">{figure}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/58">{label}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
