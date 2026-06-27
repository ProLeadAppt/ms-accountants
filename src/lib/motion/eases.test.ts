import { describe, it, expect } from "vitest";
import { FOLDER_EASE_CURVE, FOLDER_EASE } from "./eases";

describe("eases", () => {
  it("exposes the Quinn folder ease curve verbatim", () => {
    expect(FOLDER_EASE_CURVE).toBe("0, 0.47, 0.02, 1");
  });

  it("names the ease folderEase", () => {
    expect(FOLDER_EASE).toBe("folderEase");
  });
});
