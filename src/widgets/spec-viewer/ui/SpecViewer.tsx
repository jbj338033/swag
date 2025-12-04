"use client";

import { useState } from "react";
import { Header, CopyLinkButton, NewButton } from "@/widgets/header/ui/Header";
import { SwaggerPreview } from "@/features/preview/ui/SwaggerPreview";
import { Button } from "@/shared/ui/Button";
import YAML from "yaml";

type SpecViewerProps = {
  spec: object;
};

export function SpecViewer({ spec }: SpecViewerProps) {
  const [copied, setCopied] = useState<"json" | "yaml" | null>(null);

  const copyAs = async (format: "json" | "yaml") => {
    const text = format === "json"
      ? JSON.stringify(spec, null, 2)
      : YAML.stringify(spec);
    await navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header
        actions={
          <>
            <Button variant="secondary" onClick={() => copyAs("json")}>
              {copied === "json" ? "Copied!" : "Copy JSON"}
            </Button>
            <Button variant="secondary" onClick={() => copyAs("yaml")}>
              {copied === "yaml" ? "Copied!" : "Copy YAML"}
            </Button>
            <CopyLinkButton />
            <NewButton />
          </>
        }
      />
      <main className="flex-1 overflow-auto">
        <SwaggerPreview spec={spec} />
      </main>
    </div>
  );
}
