import { describe, expect, it } from "vitest";
import { GA_MEASUREMENT_ID } from "./GoogleAnalytics";

describe("Google Analytics", () => {
  it("uses the approved GA4 measurement ID", () => {
    expect(GA_MEASUREMENT_ID).toBe("G-B4EJMTDL7F");
  });
});
