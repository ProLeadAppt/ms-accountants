import Link from "next/link";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

type Variant = "primary" | "secondary";

const BASE =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-4 font-sans text-[0.95rem] font-medium leading-none transition-[box-shadow,color] duration-300";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand-red text-cream",
  secondary: "text-current ring-1 ring-current/25 hover:ring-current/55",
};

const WIPE: Record<Variant, string> = {
  primary: "bg-red-bright",
  secondary: "bg-current/[0.07]",
};

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/** Two-arrow marquee: the resting arrow slides out right, a fresh one enters from the left. */
function ArrowSlide() {
  return (
    <span aria-hidden="true" className="relative inline-flex h-4 w-4 overflow-hidden">
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-4",
          EASE,
        )}
      >
        <Icon name="arrow" size={16} />
      </span>
      <span
        className={cn(
          "absolute inset-0 flex -translate-x-4 items-center justify-center transition-transform duration-500 group-hover:translate-x-0",
          EASE,
        )}
      >
        <Icon name="arrow" size={16} />
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
  const external =
    href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = cn(BASE, VARIANTS[variant], className);
  const content = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
          EASE,
          WIPE[variant],
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        <span>{children}</span>
        {arrow && <ArrowSlide />}
      </span>
    </>
  );

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
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}
