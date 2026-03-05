"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const generateCaption = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  console.log(
    result,
    "result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
  );

  return (
    <main className="px-5 py-4">
      <h1 className="text-3xl font-bold text-center py-2.5">
        AI Caption Generator
      </h1>

      <input
        className="border border-gray-400 p-3 mt-4 w-full rounded-lg"
        placeholder="Describe your photo..."
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={generateCaption}
        className="bg-black text-white mt-3 rounded-xl px-5 py-2.5"
      >
        Generate
      </button>

      {result && (
        <div className="mt-6 text-lg border border-gray-300 py-4 px-3 rounded-lg">
          {result}
        </div>
      )}
    </main>
  );
}
