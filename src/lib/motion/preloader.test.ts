import { describe, it, expect } from "vitest";
import { shouldShowPreloader, markPreloaded } from "./preloader";

function memStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => (m.has(k) ? m.get(k)! : null),
    setItem: (k: string, v: string) => void m.set(k, v),
  };
}

describe("preloader session guard", () => {
  it("shows on a fresh session, then not after marking", () => {
    const s = memStorage();
    expect(shouldShowPreloader(s)).toBe(true);
    markPreloaded(s);
    expect(shouldShowPreloader(s)).toBe(false);
  });
});
