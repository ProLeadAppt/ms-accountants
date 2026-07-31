import { describe, expect, it, vi } from "vitest";
import { POST } from "./route";

describe("POST /api/contact", () => {
  it("never reports delivery success while no delivery provider is configured", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const request = new Request("https://www.msaccountants.com.au/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Jane Citizen",
        email: "jane@example.com.au",
        message: "Please contact me.",
      }),
    });

    const response = await POST(request);
    const body = (await response.json()) as { error?: string };

    expect(response.status).toBe(503);
    expect(body.error).toBe(
      "Online form delivery is not configured. Please email m.sridaran@msaccountants.com.au or call 02 9739 4837.",
    );
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
