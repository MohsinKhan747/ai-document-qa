import { describe, expect, it } from "vitest";
import { parseSettings } from "@/lib/settings-schema";

describe("parseSettings", () => {
  it("accepts valid settings", () => {
    const result = parseSettings({
      apiKey: "sk-test-123456",
      model: "gpt-4o-mini",
      temperature: "0.2",
      chunkSize: "800",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        apiKey: "sk-test-123456",
        model: "gpt-4o-mini",
        temperature: 0.2,
        chunkSize: 800,
      });
    }
  });

  it("rejects an empty API key", () => {
    const result = parseSettings({
      apiKey: "   ",
      model: "gpt-4o-mini",
      temperature: "0.2",
      chunkSize: "800",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.apiKey).toMatch(/required|short/i);
    }
  });

  it("rejects temperature outside 0–2", () => {
    const result = parseSettings({
      apiKey: "sk-test-123456",
      model: "gpt-4o-mini",
      temperature: "2.5",
      chunkSize: "800",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.temperature).toMatch(/at most 2/i);
    }
  });

  it("rejects non-integer chunk size below minimum", () => {
    const result = parseSettings({
      apiKey: "sk-test-123456",
      model: "gpt-4o-mini",
      temperature: "0.2",
      chunkSize: "50.5",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.chunkSize).toBeTruthy();
    }
  });
});
