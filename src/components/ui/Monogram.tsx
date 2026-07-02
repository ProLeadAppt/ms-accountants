import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  initials: string;
  name: string;
  /** Real portrait path. When present it replaces the monogram in the same frame. */
  photo?: string;
  ratio?: "portrait" | "square";
  /** Tailwind sizes attr for the photo variant. */
  sizes?: string;
  className?: string;
};

/**
 * Typographic stand-in for team photography: serif initials over a hairline
 * rule, set on a quiet scheme-aware surface. Never a gradient blob, never an
 * AI-generated face. When a real photo lands in site.ts the same frame renders
 * it with zero layout change.
 */
export function Monogram({
  initials,
  name,
  photo,
  ratio = "square",
  sizes = "(min-width: 1024px) 20vw, 50vw",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl [container-type:inline-size]",
        "bg-[color-mix(in_srgb,var(--fg)_5%,transparent)]",
        "ring-1 ring-inset ring-[var(--hairline)]",
        ratio === "portrait" ? "aspect-[4/5]" : "aspect-square",
        className,
      )}
    >
      {photo ? (
        <Image src={photo} alt={`Portrait of ${name}.`} fill sizes={sizes} className="object-cover" />
      ) : (
        <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <span className="font-serif text-[clamp(1.6rem,24cqw,3.6rem)] leading-none tracking-[0.04em] text-[var(--fg)] opacity-85">
            {initials}
          </span>
          <span className="h-px w-8 bg-[var(--accent)] opacity-70" />
        </div>
      )}
    </div>
  );
}
