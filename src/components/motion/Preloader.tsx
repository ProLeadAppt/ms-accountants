"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { registerGsap, FOLDER_EASE } from "@/lib/motion/eases";
import { usePrefersReducedMotion } from "@/lib/motion/useReducedMotion";
import { shouldShowPreloader, markPreloaded } from "@/lib/motion/preloader";

export function Preloader({ heroSrc }: { heroSrc: string }) {
  const reduced = usePrefersReducedMotion();
  // Shown by DEFAULT so the overlay is in the server HTML and covers the page
  // from the very first paint (loader first, page second). Server and first
  // client render agree on `true`, so there is no hydration mismatch; the
  // skip cases are hidden pre-paint by the body-top inline script (CSS) and
  // then removed here after mount.
  const [show, setShow] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  // Decide on mount (client only) whether to KEEP the overlay. Remove it when
  // it should not run this load: reduced motion, or it already ran this
  // session. The inline head script has already hidden it via CSS in these
  // cases, so this removal only cleans the DOM (no flash).
  useEffect(() => {
    if (reduced || !shouldShowPreloader(window.sessionStorage)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only one-shot decision
      setShow(false);
    }
  }, [reduced]);

  useEffect(() => {
    if (!show || !rootRef.current) return;
    // Do not spin up GSAP on a load where the overlay is being removed.
    if (reduced || !shouldShowPreloader(window.sessionStorage)) return;
    registerGsap();

    const progress = { p: 0 };
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      markPreloaded(window.sessionStorage);
      gsap.to(progress, {
        p: 100,
        duration: 0.4,
        ease: "power2.out",
        onUpdate: render,
        onComplete: lift,
      });
    };

    const render = () => {
      const v = Math.round(progress.p);
      if (numRef.current) numRef.current.textContent = String(v);
      if (barRef.current) barRef.current.style.width = v + "%";
    };

    const lift = () => {
      gsap.to(rootRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: FOLDER_EASE,
        onComplete: () => setShow(false),
      });
    };

    // Creep toward 90% so there is always motion, real readiness finishes it.
    const creep = gsap.to(progress, {
      p: 90,
      duration: 3,
      ease: "power1.out",
      onUpdate: render,
    });

    const heroImg = new Image();
    heroImg.src = heroSrc;
    const ready = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      heroImg.decode ? heroImg.decode().catch(() => {}) : Promise.resolve(),
    ]);
    ready.then(() => {
      creep.kill();
      finish();
    });

    const cap = window.setTimeout(() => {
      creep.kill();
      finish();
    }, 4000);

    return () => {
      window.clearTimeout(cap);
      creep.kill();
    };
  }, [show, heroSrc, reduced]);

  if (!show) return null;

  return (
    <div
      ref={rootRef}
      id="ms-preloader"
      aria-hidden="true"
      className="scheme-espresso fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-espresso"
    >
      <div className="font-logo flex h-12 w-12 items-center justify-center rounded-[12px] bg-brand-red text-lg font-black text-cream">
        MS
      </div>
      <div className="mt-7 h-px w-56 overflow-hidden bg-cream/15">
        <span ref={barRef} className="block h-full w-0 bg-red-bright" />
      </div>
      <div className="mt-7 font-serif text-6xl font-medium text-cream sm:text-7xl">
        <span ref={numRef}>0</span>
        <span className="ml-1 align-top text-2xl text-cream/50">%</span>
      </div>
    </div>
  );
}
