import { describe, expect, it } from "vitest";
import { buildContactEmailHref } from "./contact";

describe("buildContactEmailHref", () => {
  it("creates an encoded draft addressed to the firm with every supplied field", () => {
    const href = buildContactEmailHref({
      name: "Jane Citizen",
      email: "jane@example.com.au",
      phone: "0400 123 456",
      topic: "Tax Advisory & Planning",
      message: "I am considering a business sale next year.",
    });

    expect(href.startsWith("mailto:m.sridaran@msaccountants.com.au?")).toBe(true);

    const url = new URL(href);
    expect(url.searchParams.get("subject")).toBe(
      "Website enquiry: Tax Advisory & Planning",
    );
    expect(url.searchParams.get("body")).toBe(
      [
        "Name: Jane Citizen",
        "Email: jane@example.com.au",
        "Phone: 0400 123 456",
        "Service: Tax Advisory & Planning",
        "",
        "Message:",
        "I am considering a business sale next year.",
      ].join("\n"),
    );
  });

  it("omits optional blank fields without leaving misleading labels", () => {
    const href = buildContactEmailHref({
      name: "Jane Citizen",
      email: "jane@example.com.au",
      phone: "",
      topic: "",
      message: "Please call me.",
    });

    const url = new URL(href);
    expect(url.searchParams.get("subject")).toBe("Website enquiry");
    const body = url.searchParams.get("body") ?? "";
    expect(body).not.toContain("Phone:");
    expect(body).not.toContain("Service:");
    expect(body).toContain("Message:\nPlease call me.");
  });
});
