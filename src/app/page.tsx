"use client";

import { useState, useCallback } from "react";
import { Header } from "@/widgets/header/ui/Header";
import { SpecEditor } from "@/features/editor/ui/SpecEditor";
import { SwaggerPreview } from "@/features/preview/ui/SwaggerPreview";
import { ShareButton } from "@/features/share/ui/ShareButton";
import { parseSpec, isValidSpec } from "@/shared/lib/yaml";

export default function Home() {
  const [input, setInput] = useState("");
  const [spec, setSpec] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((value: string) => {
    setInput(value);
    setError(null);

    if (!value.trim()) {
      setSpec(null);
      return;
    }

    try {
      const parsed = parseSpec(value);
      if (parsed && isValidSpec(parsed)) {
        setSpec(parsed);
      } else {
        setSpec(null);
        if (value.trim()) {
          setError("Invalid OpenAPI spec");
        }
      }
    } catch {
      setSpec(null);
      setError("Invalid JSON/YAML format");
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header actions={<ShareButton spec={spec} disabled={!spec || !!error} />} />
      <main className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
        <div className="flex-1 min-h-0 flex flex-col">
          <SpecEditor value={input} onChange={handleChange} error={error} />
        </div>
        <div className="flex-1 min-h-0 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
          <SwaggerPreview spec={spec} />
        </div>
      </main>
    </div>
  );
}
