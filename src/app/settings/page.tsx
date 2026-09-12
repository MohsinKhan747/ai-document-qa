import { SettingsForm } from "@/components/SettingsForm";

export default function SettingsPage() {
  return (
    <main>
      <h1>Settings</h1>
      <p>
        Configure the model and chunking used when answering questions from your
        documents. Values stay in this browser only.
      </p>
      <SettingsForm />
    </main>
  );
}
