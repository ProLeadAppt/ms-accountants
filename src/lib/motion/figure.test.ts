import { describe, it, expect } from "vitest";
import { parseFigure } from "./figure";

describe("parseFigure", () => {
  it("parses a trailing-suffix number", () => {
    expect(parseFigure("45+")).toEqual({ prefix: "", value: 45, suffix: "+" });
  });
  it("parses a bare number", () => {
    expect(parseFigure("1")).toEqual({ prefix: "", value: 1, suffix: "" });
  });
  it("returns null for non-numeric figures", () => {
    expect(parseFigure("PhD")).toBeNull();
    expect(parseFigure("CA")).toBeNull();
  });
});
