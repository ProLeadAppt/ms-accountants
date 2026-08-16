import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { storyAttribution, type ClientStory } from "@/lib/testimonials";

type Props = {
  story: ClientStory;
  quote?: "full" | "excerpt";
  variant?: "feature" | "card" | "compact";
  index?: string;
  className?: string;
};

export function ClientStoryCard({
  story,
  quote = "excerpt",
  variant = "card",
  index,
  className,
}: Props) {
  const attribution = storyAttribution(story);
  const copy = quote === "full" ? story.fullQuote : story.excerpt;

  return (
    <article
      id={`story-${story.id}`}
      className={cn(
        "relative flex h-full scroll-mt-28 flex-col border-[var(--hairline)]",
        variant === "feature" && "rounded-2xl border bg-cream/[0.045] p-8 sm:p-10 lg:p-12",
        variant === "card" && "rounded-2xl border bg-[color-mix(in_srgb,var(--bg)_82%,white_18%)] p-7 sm:p-9",
        variant === "compact" && "border-t pt-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-6">
        <Icon name="quote" size={variant === "feature" ? 34 : 26} className="text-[var(--accent)]" />
        {index && (
          <span className="font-mono text-[0.62rem] tracking-[0.18em] text-[var(--muted)]">
            {index}
          </span>
        )}
      </div>

      <blockquote
        className={cn(
          "mt-7 text-[var(--fg)]",
          variant === "feature" && "font-display text-[1.9rem] leading-[1.28] sm:text-[2.35rem]",
          variant === "card" && "font-serif text-[1.3rem] leading-[1.5] sm:text-[1.45rem]",
          variant === "compact" && "font-serif text-lg leading-[1.55]",
        )}
      >
        &ldquo;{copy}&rdquo;
      </blockquote>

      <footer className={cn("mt-auto", variant === "feature" ? "pt-10" : "pt-8")}>
        <p className="font-serif text-lg text-[var(--fg)]">{story.name}</p>
        {attribution.length > 0 && (
          <p className="mt-1 max-w-xl font-mono text-[0.63rem] uppercase leading-relaxed tracking-[0.15em] text-[var(--muted)]">
            {attribution.join(" · ")}
          </p>
        )}
        {story.date && (
          <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-[var(--muted)] opacity-75">
            Client reference · {story.date}
          </p>
        )}
      </footer>
    </article>
  );
}
