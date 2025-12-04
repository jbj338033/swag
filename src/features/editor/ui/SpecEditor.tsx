"use client";

import { ChangeEvent } from "react";

type SpecEditorProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
};

export function SpecEditor({ value, onChange, error }: SpecEditorProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col h-full">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="Paste your OpenAPI spec (JSON or YAML)..."
        spellCheck={false}
        className="flex-1 w-full p-4 font-mono text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600"
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
