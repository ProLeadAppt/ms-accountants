import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  preload?: boolean;
  sizes?: string;
};

/** The client-approved signature wordmark, flattened to one solid red. */
export function Logo({ className, preload = false, sizes }: LogoProps) {
  return (
    <Image
      src="/ms-accountants-logo.png"
      alt="MS Accountants"
      width={480}
      height={135}
      sizes={sizes}
      preload={preload}
      className={cn("h-auto object-contain", className)}
    />
  );
}
