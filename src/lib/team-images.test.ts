import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { team } from "./site";

function readWebPDimensions(buffer: Buffer) {
  expect(buffer.subarray(0, 4).toString("ascii")).toBe("RIFF");
  expect(buffer.subarray(8, 12).toString("ascii")).toBe("WEBP");

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.subarray(offset, offset + 4).toString("ascii");
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (chunkType === "VP8 ") {
      expect(buffer.subarray(dataOffset + 3, dataOffset + 6).toString("hex")).toBe(
        "9d012a",
      );
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff,
      };
    }

    if (chunkType === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(dataOffset + 4, 3),
        height: 1 + buffer.readUIntLE(dataOffset + 7, 3),
      };
    }

    offset = dataOffset + chunkSize + (chunkSize % 2);
  }

  throw new Error("Unsupported WebP image: no VP8 or VP8X dimensions found");
}

describe("team portrait source quality", () => {
  it("keeps every published team portrait high-resolution and web-optimised", () => {
    const portraits = team.filter(
      (member): member is (typeof team)[number] & { photo: string } =>
        Boolean(member.photo),
    );
    expect(portraits).toHaveLength(team.length);

    for (const member of portraits) {
      const portraitPath = join(
        process.cwd(),
        "public",
        member.photo.replace(/^\/+/, ""),
      );
      const source = readFileSync(portraitPath);
      const { width, height } = readWebPDimensions(source);
      const fileSize = statSync(portraitPath).size;

      expect(width, `${member.name} portrait width`).toBeGreaterThanOrEqual(1400);
      expect(height, `${member.name} portrait height`).toBeGreaterThanOrEqual(1875);
      expect(width / height, `${member.name} portrait aspect ratio`).toBeCloseTo(
        0.75,
        1,
      );
      expect(fileSize, `${member.name} portrait file size`).toBeLessThan(350_000);
    }
  });
});
