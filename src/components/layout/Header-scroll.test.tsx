import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const harness = vi.hoisted(() => ({
  effects: [] as Array<() => void | (() => void)>,
  setState: vi.fn(),
  createSmoother: vi.fn(),
}));
vi.mock("react", async (importOriginal) => ({
  ...await importOriginal<typeof import("react")>(),
  useState: () => [false, harness.setState],
  useEffect: (effect: () => void) => harness.effects.push(effect),
  useRef: () => ({ current: null }),
}));
vi.mock("@gsap/react", () => ({ useGSAP: (effect: () => void) => effect() }));
vi.mock("gsap/ScrollSmoother", () => ({ ScrollSmoother: { create: harness.createSmoother } }));
vi.mock("@/lib/motion/eases", () => ({ registerGsap: vi.fn() }));
vi.mock("@/lib/motion/useReducedMotion", () => ({ usePrefersReducedMotion: () => false }));
import { Header } from "./Header";
import { SmoothScroll } from "../motion/SmoothScroll";

describe("header contrast after reference anchor navigation", () => {
  let target: EventTarget & { scrollY: number; matchMedia: () => { matches: boolean } };
  let frames: Array<FrameRequestCallback>;
  let cleanups: Array<() => void>;
  const flush = () => { frames.splice(0).forEach(frame => frame(0)); };
  beforeEach(() => {
    harness.effects = [];
    harness.setState.mockClear();
    harness.createSmoother.mockClear();
    frames = [];
    cleanups = [];
    target = Object.assign(new EventTarget(), { scrollY: 0, matchMedia: () => ({ matches: false }) });
    vi.stubGlobal("window", target);
    vi.stubGlobal("document", { getElementById: () => null });
    vi.stubGlobal("navigator", { maxTouchPoints: 0 });
    vi.stubGlobal("requestAnimationFrame", (frame: FrameRequestCallback) => { frames.push(frame); return frames.length; });
    Header();
    const cleanup = harness.effects[0]();
    if (cleanup) cleanups.push(cleanup);
    flush();
    SmoothScroll({ children: null });
  });
  afterEach(() => { cleanups.forEach(cleanup => cleanup()); vi.unstubAllGlobals(); });

  it("updates after an anchor click or initial fragment moves content without either scroll event", () => {
    cleanups.forEach(cleanup => cleanup());
    harness.effects = [];
    const wrapper = { scrollTop: 1292 };
    const marker = { getBoundingClientRect: () => ({ top: 79 - wrapper.scrollTop }) };
    const observe = vi.fn();
    let changed: IntersectionObserverCallback | undefined;
    vi.stubGlobal("document", { getElementById: () => marker });
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) { changed = callback; }
      observe = observe;
      disconnect = vi.fn();
    });
    Header();
    const cleanup = harness.effects[0]();
    if (cleanup) cleanups.push(cleanup);
    expect(observe).toHaveBeenCalledWith(marker);
    changed!([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(target.scrollY).toBe(0);
    expect(wrapper.scrollTop).toBe(1292);
    expect(marker.getBoundingClientRect().top).toBeLessThan(0);
    expect(harness.setState).toHaveBeenLastCalledWith(true);
    changed!([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(harness.setState).toHaveBeenLastCalledWith(false);
  });

  it("still updates for native scrolling on touch and reduced-motion devices", () => {
    target.scrollY = 1200;
    target.dispatchEvent(new Event("scroll"));
    flush();
    expect(harness.setState).toHaveBeenLastCalledWith(true);
  });
});
