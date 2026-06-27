import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

/** Quinn-style custom ease for folder/hero reveals. */
export const FOLDER_EASE_CURVE = "0, 0.47, 0.02, 1";
export const FOLDER_EASE = "folderEase";

let registered = false;

/** Register GSAP plugins + the custom ease exactly once, client-side only. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create(FOLDER_EASE, FOLDER_EASE_CURVE);
  registered = true;
}
