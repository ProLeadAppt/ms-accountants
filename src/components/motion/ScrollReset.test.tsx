import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const harness = vi.hoisted(() => ({ effect: undefined as undefined | (() => void | (() => void)), get: vi.fn(), refresh: vi.fn() }));
vi.mock("react", () => ({ useEffect: (effect: () => void) => { harness.effect = effect; }, useLayoutEffect: (effect: () => void) => { harness.effect = effect; } }));
vi.mock("next/navigation", () => ({ usePathname: () => "/client-stories" }));
vi.mock("gsap/ScrollSmoother", () => ({ ScrollSmoother: { get: harness.get } }));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: { refresh: harness.refresh } }));
import { ScrollReset } from "./ScrollReset";

describe("initial client-story fragment restoration", () => {
  let frame: FrameRequestCallback;
  let nativeScroll: ReturnType<typeof vi.fn>;
  let target: { scrollIntoView: ReturnType<typeof vi.fn> };
  beforeEach(() => {
    harness.get.mockReset();
    harness.refresh.mockClear();
    nativeScroll = vi.fn();
    target = { scrollIntoView: nativeScroll };
    vi.stubGlobal("window", { location: { hash: "#story-dinah-eldridge" } });
    vi.stubGlobal("getComputedStyle", () => ({ scrollMarginTop: "112px" }));
    vi.stubGlobal("document", { querySelector: (selector: string) => selector === "header" ? { getBoundingClientRect: () => ({ height: 99 }) } : target });
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frame = callback; return 1; });
    ScrollReset();
  });
  afterEach(() => vi.unstubAllGlobals());

  it("uses the smoother that initializes after the restoration effect but before the scheduled frame", () => {
    harness.get.mockReturnValue(null);
    harness.effect!();
    const smoother = { scrollTo: vi.fn() };
    harness.get.mockReturnValue(smoother);
    frame(0);
    expect(smoother.scrollTo).toHaveBeenCalledWith(target, false, "top 112px");
    expect(nativeScroll).not.toHaveBeenCalled();
  });

  it("retains native fragment restoration when no smoother initializes", () => {
    harness.get.mockReturnValue(null);
    harness.effect!();
    frame(0);
    expect(nativeScroll).toHaveBeenCalledOnce();
  });
  it("waits for font layout before measuring and applies the target margin once", async () => {
    let loaded!: () => void;
    const ready = new Promise<void>(resolve => { loaded = resolve; });
    Object.assign(document, { fonts: { ready } });
    const smoother = { scrollTo: vi.fn() };
    harness.get.mockReturnValue(smoother);
    harness.effect!();
    frame(0);
    expect(smoother.scrollTo).not.toHaveBeenCalled();
    loaded();
    await ready;
    frame(0);
    expect(smoother.scrollTo).toHaveBeenCalledExactlyOnceWith(target, false, "top 112px");
  });

  it("does not restore an interrupted fragment after fonts finish loading", async () => {
    const ready = Promise.resolve();
    Object.assign(document, { fonts: { ready } });
    const smoother = { scrollTo: vi.fn() };
    harness.get.mockReturnValue(smoother);
    const cleanup = harness.effect!();
    frame(0);
    if (cleanup) cleanup();
    await ready;
    frame(0);
    expect(smoother.scrollTo).not.toHaveBeenCalled();
  });

});
