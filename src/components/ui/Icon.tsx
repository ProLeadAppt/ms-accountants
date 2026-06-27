import { cn } from "@/lib/cn";

export type IconName =
  | "arrow"
  | "quote"
  | "menu"
  | "close"
  | "advisory"
  | "dispute"
  | "compliance"
  | "cfo"
  | "super";

const PATHS: Record<IconName, React.ReactNode> = {
  // UI
  arrow: <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  menu: (
    <>
      <path d="M3 7h18" />
      <path d="M3 13h18" />
    </>
  ),
  close: <path d="m5 5 14 14M19 5 5 19" />,
  quote: (
    <path
      d="M9.5 7C6.5 8 5 10.5 5 14v3h5v-6H7.2c.1-1.4.9-2.4 2.3-3L9.5 7Zm9 0c-3 1-4.5 3.5-4.5 7v3h5v-6h-2.8c.1-1.4.9-2.4 2.3-3L18.5 7Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  // Services
  advisory: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
      <circle cx="12" cy="12" r="2.2" />
    </>
  ),
  dispute: (
    <>
      <path d="M12 4v16M5 8h14" />
      <path d="M5 8 3 14h4L5 8ZM19 8l-2 6h4l-2-6Z" />
      <path d="M9 20h6" />
    </>
  ),
  compliance: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M9 9h6M9 12.5h6M9 16h3" />
      <path d="m14.5 16.5 1.4 1.4 2.6-2.8" />
    </>
  ),
  cfo: (
    <>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="m7 15 3.5-4 3 2.5L20 6.5" />
    </>
  ),
  super: (
    <>
      <path d="M12 3.5 5 6.2v5c0 4.2 2.9 7.4 7 9.3 4.1-1.9 7-5.1 7-9.3v-5L12 3.5Z" />
      <path d="m9 11.8 2.2 2.2L15.5 9.5" />
    </>
  ),
};

export function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-6 w-6", className)}
    >
      {PATHS[name]}
    </svg>
  );
}
