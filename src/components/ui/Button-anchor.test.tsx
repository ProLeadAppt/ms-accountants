import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("reference navigation URL integrity", () => {
  it("uses a native full-path anchor that replaces an existing fragment on repeated navigation", () => {
    const link = Button({ href: "/client-stories#the-references", children: "Read the references" });
    expect(link.type).toBe("a");
    const fromStory = new URL(link.props.href, "https://example.com/client-stories#story-dinah-eldridge");
    expect(fromStory.hash).toBe("#the-references");
    const fromTop = new URL(link.props.href, new URL("/client-stories", fromStory));
    expect(fromTop.hash).toBe("#the-references");
  });
});
