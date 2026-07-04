"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Run before paint on the client (kills the mid-scroll flash on navigation),
// fall back to useEffect on the server so SSR doesn't warn.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Force every client-side navigation to start at the top of the page.
 *
 * ScrollSmoother owns the scroll position through a transform on
 * #smooth-content, and the instance lives in the root layout, so it PERSISTS
 * across App Router navigations. When the page content swaps, that transform is
 * not reset — the new page renders wherever the previous one was left, and
 * returning to a page restores the old position. Next's own scroll-to-top can't
 * fix this because normalizeScroll has taken scrolling away from the window.
 *
 * So reset explicitly on each pathname change. Anchor navigations (/about#team)
 * are left alone so in-page links still land on their target.
 */
export function ScrollReset() {
  const pathname = usePathname();

  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const smoother = ScrollSmoother.get();
    const hash = window.location.hash;

    if (hash) {
      // In-page anchor (e.g. /about#team). ScrollSmoother intercepts native
      // anchor scrolling, so resolve the target ourselves — after a frame so
      // the new page's layout is measured and triggers are refreshed.
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        let el: Element | null = null;
        try {
          el = document.querySelector(hash);
        } catch {
          el = null;
        }
        if (!el) return;
        if (smoother) smoother.scrollTo(el as HTMLElement, false);
        else (el as HTMLElement).scrollIntoView();
      });
      return;
    }

    if (smoother) {
      smoother.scrollTo(0, false); // instant jump, no smooth glide
    }
    window.scrollTo(0, 0); // covers the reduced-motion / no-smoother path

    // The new page has a different height; recompute triggers so pinned and
    // scrubbed sections measure against the page the visitor is now on.
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
