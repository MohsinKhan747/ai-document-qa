import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SettingsForm } from "@/components/SettingsForm";
import { SETTINGS_STORAGE_KEY } from "@/lib/settings-schema";

describe("SettingsForm", () => {
  it("shows field errors for invalid input and does not save", async () => {
    const user = userEvent.setup();
    const storage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

    render(<SettingsForm storage={storage} />);

    await user.clear(screen.getByLabelText(/api key/i));
    await user.clear(screen.getByLabelText(/temperature/i));
    await user.type(screen.getByLabelText(/temperature/i), "3");
    await user.click(screen.getByRole("button", { name: /save settings/i }));

    expect(await screen.findByText(/api key is required/i)).toBeInTheDocument();
    expect(screen.getByText(/temperature must be at most 2/i)).toBeInTheDocument();
    expect(storage.setItem).not.toHaveBeenCalled();
  });

  it("saves valid settings to storage and announces success", async () => {
    const user = userEvent.setup();
    const storage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };

    render(<SettingsForm storage={storage} />);

    await user.type(screen.getByLabelText(/api key/i), "sk-live-abcdef");
    await user.selectOptions(screen.getByLabelText(/^model$/i), "gpt-4o");
    await user.clear(screen.getByLabelText(/temperature/i));
    await user.type(screen.getByLabelText(/temperature/i), "0.4");
    await user.clear(screen.getByLabelText(/chunk size/i));
    await user.type(screen.getByLabelText(/chunk size/i), "1200");
    await user.click(screen.getByRole("button", { name: /save settings/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      /settings saved locally/i
    );
    expect(storage.setItem).toHaveBeenCalledWith(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({
        apiKey: "sk-live-abcdef",
        model: "gpt-4o",
        temperature: 0.4,
        chunkSize: 1200,
      })
    );
  });
});
