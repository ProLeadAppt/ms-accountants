import { cn } from "@/lib/cn";

/**
 * CSS sticky pin — content stays fixed while siblings scroll past.
 * Pure CSS (no JS), so it is inherently reduced-motion safe.
 */
export function StickyPin({
  children,
  className,
  topClassName = "top-0",
}: {
  children: React.ReactNode;
  className?: string;
  topClassName?: string;
}) {
  return (
    <div className={cn("sticky", topClassName, className)}>{children}</div>
  );
}
