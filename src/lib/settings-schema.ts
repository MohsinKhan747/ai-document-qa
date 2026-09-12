import { z } from "zod";

export const SETTINGS_STORAGE_KEY = "ai-document-qa.settings";

export const MODEL_OPTIONS = ["gpt-4o-mini", "gpt-4o"] as const;

export const settingsSchema = z.object({
  apiKey: z
    .string()
    .trim()
    .min(1, "API key is required")
    .min(8, "API key looks too short"),
  model: z.enum(MODEL_OPTIONS, {
    errorMap: () => ({ message: "Choose a supported model" }),
  }),
  temperature: z.coerce
    .number({ invalid_type_error: "Temperature must be a number" })
    .min(0, "Temperature must be at least 0")
    .max(2, "Temperature must be at most 2"),
  chunkSize: z.coerce
    .number({ invalid_type_error: "Chunk size must be a number" })
    .int("Chunk size must be a whole number")
    .min(100, "Chunk size must be at least 100")
    .max(4000, "Chunk size must be at most 4000"),
});

export type SettingsValues = z.infer<typeof settingsSchema>;

export type SettingsInput = {
  apiKey: string;
  model: string;
  temperature: string;
  chunkSize: string;
};

export const defaultSettingsInput: SettingsInput = {
  apiKey: "",
  model: "gpt-4o-mini",
  temperature: "0.2",
  chunkSize: "800",
};

export function parseSettings(
  input: SettingsInput
):
  | { success: true; data: SettingsValues }
  | { success: false; fieldErrors: Partial<Record<keyof SettingsInput, string>> } {
  const result = settingsSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const fieldErrors: Partial<Record<keyof SettingsInput, string>> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0];
    if (
      typeof key === "string" &&
      (key === "apiKey" ||
        key === "model" ||
        key === "temperature" ||
        key === "chunkSize") &&
      !fieldErrors[key]
    ) {
      fieldErrors[key] = issue.message;
    }
  }
  return { success: false, fieldErrors };
}
