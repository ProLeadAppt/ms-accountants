import { cn } from "@/lib/cn";

/**
 * MS Accountants wordmark — Option A (faithful+ heavy grotesque).
 * Colour inherits from the parent (use `text-brand-red`, `text-cream`, etc.)
 * so it recolours per section scheme. Size with a `text-*` class on the parent
 * or via `className`.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-logo inline-flex items-baseline leading-none tracking-[-0.018em] text-current",
        className,
      )}
      aria-label="MS Accountants"
    >
      <span className="font-black">MS</span>
      <span className="font-extrabold">&nbsp;Accountants</span>
    </span>
  );
}
