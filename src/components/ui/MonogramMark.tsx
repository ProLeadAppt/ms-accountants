import { cn } from "@/lib/cn";

/**
 * "MS" monogram — compact mark for favicon, nav-when-scrolled, social avatar.
 * Size + radius via `className` (e.g. "h-10 w-10 rounded-[10px] text-lg").
 */
export function MonogramMark({
  className,
  variant = "solid",
}: {
  className?: string;
  variant?: "solid" | "outline";
}) {
  return (
    <span
      className={cn(
        "font-logo inline-flex select-none items-center justify-center font-black leading-none tracking-[-0.02em]",
        variant === "solid"
          ? "bg-brand-red text-cream"
          : "border-2 border-brand-red text-brand-red",
        className,
      )}
      aria-label="MS Accountants"
    >
      MS
    </span>
  );
}
