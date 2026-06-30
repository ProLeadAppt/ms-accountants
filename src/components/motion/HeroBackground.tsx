import Image from "next/image";
import { HERO_STILL } from "@/lib/heroAsset";

/** Full-bleed hero still. The depth/parallax is applied by the Hero wrapper. */
export function HeroBackground() {
  return (
    <Image
      src={HERO_STILL}
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover object-[55%_45%]"
    />
  );
}
