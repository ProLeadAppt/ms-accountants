"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";

export function ConversionTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const el = target.closest<HTMLElement>("[data-track-event]");
      if (!el) return;

      trackConversion(el.dataset.trackEvent || "site_click", {
        event_category: el.dataset.trackCategory || "engagement",
        event_label: el.dataset.trackLabel || el.textContent?.trim() || undefined,
        link_url:
          el instanceof HTMLAnchorElement ? el.href : el.getAttribute("href") || undefined,
      });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
