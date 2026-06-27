import { cn } from "@/lib/cn";

/** Circle-dot + Space Mono caps label. Colour follows `--accent` of the scheme. */
export function EyebrowTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("eyebrow", className)}>
      <span className="eyebrow__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
