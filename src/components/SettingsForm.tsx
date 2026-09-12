"use client";

import { FormEvent, useId, useState } from "react";
import {
  MODEL_OPTIONS,
  SETTINGS_STORAGE_KEY,
  defaultSettingsInput,
  parseSettings,
  type SettingsInput,
} from "@/lib/settings-schema";

type SettingsFormProps = {
  storage?: Pick<Storage, "getItem" | "setItem">;
};

export function SettingsForm({
  storage = typeof window !== "undefined" ? window.localStorage : undefined,
}: SettingsFormProps) {
  const formId = useId();
  const [values, setValues] = useState<SettingsInput>(defaultSettingsInput);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof SettingsInput, string>>
  >({});
  const [status, setStatus] = useState<string | null>(null);

  function updateField<K extends keyof SettingsInput>(
    key: K,
    value: SettingsInput[K]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
    setStatus(null);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = parseSettings(values);
    if (!parsed.success) {
      setFieldErrors(parsed.fieldErrors);
      setStatus("Fix the highlighted fields and try again.");
      return;
    }

    storage?.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(parsed.data));
    setFieldErrors({});
    setStatus("Settings saved locally.");
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby={status ? `${formId}-status` : undefined}
    >
      <fieldset>
        <legend>Retrieval and model settings</legend>

        <div>
          <label htmlFor={`${formId}-apiKey`}>API key</label>
          <input
            id={`${formId}-apiKey`}
            name="apiKey"
            type="password"
            autoComplete="off"
            value={values.apiKey}
            onChange={(event) => updateField("apiKey", event.target.value)}
            aria-invalid={Boolean(fieldErrors.apiKey)}
            aria-describedby={
              fieldErrors.apiKey ? `${formId}-apiKey-error` : undefined
            }
          />
          {fieldErrors.apiKey ? (
            <p id={`${formId}-apiKey-error`} role="alert">
              {fieldErrors.apiKey}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-model`}>Model</label>
          <select
            id={`${formId}-model`}
            name="model"
            value={values.model}
            onChange={(event) => updateField("model", event.target.value)}
            aria-invalid={Boolean(fieldErrors.model)}
            aria-describedby={
              fieldErrors.model ? `${formId}-model-error` : undefined
            }
          >
            {MODEL_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldErrors.model ? (
            <p id={`${formId}-model-error`} role="alert">
              {fieldErrors.model}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-temperature`}>Temperature (0–2)</label>
          <input
            id={`${formId}-temperature`}
            name="temperature"
            type="number"
            inputMode="decimal"
            step="0.1"
            min={0}
            max={2}
            value={values.temperature}
            onChange={(event) => updateField("temperature", event.target.value)}
            aria-invalid={Boolean(fieldErrors.temperature)}
            aria-describedby={
              fieldErrors.temperature
                ? `${formId}-temperature-error`
                : undefined
            }
          />
          {fieldErrors.temperature ? (
            <p id={`${formId}-temperature-error`} role="alert">
              {fieldErrors.temperature}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-chunkSize`}>Chunk size (100–4000)</label>
          <input
            id={`${formId}-chunkSize`}
            name="chunkSize"
            type="number"
            inputMode="numeric"
            step={1}
            min={100}
            max={4000}
            value={values.chunkSize}
            onChange={(event) => updateField("chunkSize", event.target.value)}
            aria-invalid={Boolean(fieldErrors.chunkSize)}
            aria-describedby={
              fieldErrors.chunkSize ? `${formId}-chunkSize-error` : undefined
            }
          />
          {fieldErrors.chunkSize ? (
            <p id={`${formId}-chunkSize-error`} role="alert">
              {fieldErrors.chunkSize}
            </p>
          ) : null}
        </div>
      </fieldset>

      <button type="submit">Save settings</button>

      {status ? (
        <p id={`${formId}-status`} role="status" aria-live="polite">
          {status}
        </p>
      ) : null}
    </form>
  );
}
