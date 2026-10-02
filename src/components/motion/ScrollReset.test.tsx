import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const harness = vi.hoisted(() => ({ effect: undefined as undefined | (() => void), get: vi.fn(), refresh: vi.fn() }));
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
    vi.stubGlobal("document", { querySelector: () => target });
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
    expect(smoother.scrollTo).toHaveBeenCalledWith(target, false);
    expect(nativeScroll).not.toHaveBeenCalled();
  });

  it("retains native fragment restoration when no smoother initializes", () => {
    harness.get.mockReturnValue(null);
    harness.effect!();
    frame(0);
    expect(nativeScroll).toHaveBeenCalledOnce();
  });
});
