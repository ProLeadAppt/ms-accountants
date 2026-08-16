import { Container } from "@/components/layout/Container";
import { TextLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { getFeaturedStories, storyAttribution } from "@/lib/testimonials";

/** A compact, high-trust bridge between the homepage claim and the body. */
export function ClientProofRail() {
  const stories = getFeaturedStories();

  return (
    <section className="scheme-espresso border-t border-cream/12 py-10 lg:py-12" aria-label="Selected client references">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.68fr_2.32fr] lg:gap-12">
          <div className="flex flex-col items-start justify-between gap-5">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-red-bright">
                In their words
              </p>
              <p className="mt-3 max-w-[15rem] font-serif text-xl leading-snug text-cream">
                Long relationships. Difficult matters. Directly attributed.
              </p>
            </div>
            <TextLink href="/client-stories" className="text-cream/78 hover:text-cream">
              Read all client stories
            </TextLink>
          </div>

          <div className="grid gap-8 border-t border-cream/12 pt-7 sm:grid-cols-3 sm:gap-0 sm:border-t-0 sm:pt-0">
            {stories.map((story, index) => {
              const attribution = storyAttribution(story);
              return (
                <article
                  key={story.id}
                  className="flex flex-col border-cream/12 sm:border-l sm:px-7 first:sm:pl-0 last:sm:pr-0"
                >
                  <div className="flex items-center justify-between gap-4">
                    <Icon name="quote" size={20} className="text-red-bright" />
                    <span className="font-mono text-[0.58rem] tracking-[0.15em] text-cream/34">
                      0{index + 1}
                    </span>
                  </div>
                  <blockquote className="mt-4 font-serif text-[1.03rem] leading-relaxed text-cream/88">
                    &ldquo;{story.excerpt}&rdquo;
                  </blockquote>
                  <footer className="mt-auto pt-5">
                    <p className="font-serif text-sm text-cream">{story.name}</p>
                    {attribution.length > 0 && (
                      <p className="mt-1 font-mono text-[0.55rem] uppercase leading-relaxed tracking-[0.13em] text-cream/46">
                        {attribution.join(" · ")}
                      </p>
                    )}
                  </footer>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
