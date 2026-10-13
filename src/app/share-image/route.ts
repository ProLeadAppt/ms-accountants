import { createElement } from "react";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/ms-accountants-logo.png"));
  return new ImageResponse(
    createElement("div", { style: {
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      justifyContent: "space-between", padding: "90px", background: "#f4eee6", color: "#241c18",
    } },
      createElement("img", { src: `data:image/png;base64,${logo.toString("base64")}`, width: 660, height: 137, alt: site.name }),
      createElement("div", { style: { display: "flex", fontSize: 40, maxWidth: 950 } }, site.tagline),
      createElement("div", { style: { display: "flex", borderTop: "2px solid #8e1b16", paddingTop: "24px", fontSize: 26, color: "#7b3d2c" } }, "www.msaccountants.com.au"),
    ),
    { width: 1200, height: 630 },
  );
}
