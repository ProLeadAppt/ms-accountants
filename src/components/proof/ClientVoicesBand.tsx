import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { ClientStoryCard } from "@/components/proof/ClientStoryCard";
import { TextLink } from "@/components/ui/Button";
import { EyebrowTag } from "@/components/ui/EyebrowTag";
import { getClientStories } from "@/lib/testimonials";

const schemes = {
  cream: "scheme-cream",
  sand: "scheme-sand",
  paper: "scheme-paper",
  espresso: "scheme-espresso",
} as const;

type Props = {
  eyebrow: string;
  title: string;
  lede?: string;
  storyIds: readonly string[];
  scheme?: keyof typeof schemes;
};

export function ClientVoicesBand({
  eyebrow,
  title,
  lede,
  storyIds,
  scheme = "cream",
}: Props) {
  const stories = getClientStories(storyIds);

  return (
    <section className={`${schemes[scheme]} py-24 lg:py-32`}>
      <Container>
        <Reveal className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <EyebrowTag>{eyebrow}</EyebrowTag>
            <h2 className="mt-6 max-w-[16ch] font-serif text-4xl leading-[1.08] sm:text-5xl">{title}</h2>
          </div>
          <div className="lg:pb-2">
            {lede && <p className="max-w-xl text-[var(--muted)]">{lede}</p>}
            <div className="mt-5">
              <TextLink href="/client-stories" className="text-[var(--accent)]">
                See every client reference
              </TextLink>
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-12 grid gap-7 md:grid-cols-3">
          {stories.map((story, index) => (
            <ClientStoryCard
              key={story.id}
              story={story}
              variant="compact"
              index={`0${index + 1}`}
            />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
