import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { nav, site } from "./site";

describe("legacy URLs and discovery", () => {
  it("permanently redirects the legacy firm-differentiation page to About", async () => {
    const redirects = await nextConfig.redirects!();
    expect(redirects.filter(({ source }) => source === "/why-us.html")).toEqual([
      { source: "/why-us.html", destination: "/about", permanent: true },
    ]);
    expect(redirects.some(({ source }) => source === "/about")).toBe(false);
  });

  it("preserves the existing people redirect", async () => {
    expect(await nextConfig.redirects!()).toContainEqual({
      source: "/our-people.html", destination: "/about", permanent: true,
    });
  });

  it.each(["/services", "/contact"])("keeps %s discoverable from navigation and the sitemap", (path) => {
    expect(nav.map(({ href }) => href)).toContain(path);
    expect(sitemap().map(({ url }) => url)).toContain(`${site.url}${path}`);
    expect(robots().rules).toEqual({ userAgent: "*", allow: "/" });
  });
});
