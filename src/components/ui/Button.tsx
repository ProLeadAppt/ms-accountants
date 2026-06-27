import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary";

const BASE =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-sans text-[0.95rem] font-medium leading-none transition-colors duration-300 px-7 py-4";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-red text-cream hover:bg-red-bright",
  secondary:
    "ring-1 ring-current/25 text-current hover:ring-current/55 hover:bg-current/[0.04]",
};

/** Sliding-arrow that marches right on hover (Quinn-grade micro). */
function ArrowSlide() {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-3.5 w-3.5 overflow-hidden"
    >
      <span className="absolute inset-0 flex w-[200%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1/2">
        <Icon name="arrow" className="h-3.5 w-1/2 shrink-0" />
        <Icon name="arrow" className="h-3.5 w-1/2 shrink-0" />
      </span>
    </span>
  );
}

type Props = {
  children: React.ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  arrow = true,
  onClick,
}: Props) {
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowSlide />}
    </>
  );
  const classes = cn(BASE, VARIANTS[variant], className);

  if (external) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}

/** Text link with wipe-underline + arrow nudge. */
export function TextLink({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-sans text-[0.95rem] font-medium text-current",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <Icon
        name="arrow"
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}
