"use client";

import { useState } from "react";

// Vague prompt output: "add a settings form for the app"
export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [temperature, setTemperature] = useState("0.7");
  const [chunkSize, setChunkSize] = useState("500");
  const [msg, setMsg] = useState("");

  function save() {
    if (!apiKey) {
      setMsg("need api key");
      return;
    }
    if (Number(temperature) < 0 || Number(temperature) > 2) {
      setMsg("bad temperature");
      return;
    }
    localStorage.setItem(
      "settings",
      JSON.stringify({ apiKey, model, temperature, chunkSize })
    );
    setMsg("saved");
  }

  return (
    <div>
      <h1>Settings</h1>
      <div>
        API Key
        <input value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </div>
      <div>
        Model
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          <option>gpt-4o-mini</option>
          <option>gpt-4o</option>
        </select>
      </div>
      <div>
        Temperature
        <input
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </div>
      <div>
        Chunk size
        <input value={chunkSize} onChange={(e) => setChunkSize(e.target.value)} />
      </div>
      <button onClick={save}>Save</button>
      <p>{msg}</p>
    </div>
  );
}
