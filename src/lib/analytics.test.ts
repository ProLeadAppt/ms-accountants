import { afterEach, describe, expect, it, vi } from "vitest";
import { trackConversion } from "./analytics";

afterEach(() => vi.unstubAllGlobals());

describe("conversion delivery", () => {
  it("queues a GA command when a visitor clicks before the Google script loads", () => {
    const browser: { dataLayer?: unknown[] } = {};
    vi.stubGlobal("window", browser);
    trackConversion("phone_click", { event_category: "lead" });
    const command = browser.dataLayer?.[0] as ArrayLike<unknown>;
    expect(Array.from(command)).toEqual(["event", "phone_click", { event_category: "lead" }]);
  });

  it("delivers once through gtag after it is available", () => {
    const gtag = vi.fn();
    const dataLayer: unknown[] = [];
    vi.stubGlobal("window", { gtag, dataLayer });
    trackConversion("email_click", { event_category: "lead" });
    expect(gtag).toHaveBeenCalledExactlyOnceWith("event", "email_click", { event_category: "lead" });
    expect(dataLayer).toEqual([]);
  });

  it("is safe during server rendering", () => {
    vi.stubGlobal("window", undefined);
    expect(() => trackConversion("phone_click")).not.toThrow();
  });
});
