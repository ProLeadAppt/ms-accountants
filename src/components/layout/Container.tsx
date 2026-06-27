import { cn } from "@/lib/cn";

type Size = "default" | "wide" | "narrow";

const MAX: Record<Size, string> = {
  default: "max-w-[78rem]",
  wide: "max-w-[90rem]",
  narrow: "max-w-3xl",
};

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: Size;
}) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", MAX[size], className)}>
      {children}
    </div>
  );
}
