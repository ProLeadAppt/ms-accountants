import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = readFileSync(resolve(process.cwd(), "src/components/layout/Footer.tsx"), "utf8");

describe("footer maker signature", () => {
  it("preserves one exact accessible credit, destination and client credentials", () => {
    expect(source.match(/href="https:\/\/munyal\.com\.au"/g)).toHaveLength(1);
    expect(source).toContain('aria-label="Built by Munyal · Personally crafted by Tyson Kaye"');
    expect(source).toMatch(/href="https:\/\/munyal\.com\.au"\s+target="_blank"\s+rel="noopener noreferrer"/);
    expect(source).toContain("· Personally crafted by");
    expect(source).toContain("{site.credentialLine}");
  });

  it("keeps the signature legible, touch-friendly and able to wrap", () => {
    expect(source).toContain("min-h-11 min-w-0 max-w-full");
    expect(source).toContain("text-[13px] leading-5");
    expect(source).toContain("focus-visible:outline-2 focus-visible:outline-offset-4");
    expect(source).toContain("lg:flex-row");
    expect(source).not.toContain("whitespace-nowrap");
  });
});
