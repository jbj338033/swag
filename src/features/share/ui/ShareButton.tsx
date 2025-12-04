"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";

type ShareButtonProps = {
  spec: object | null;
  disabled?: boolean;
};

export function ShareButton({ spec, disabled }: ShareButtonProps) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!spec) return;

    setLoading(true);
    try {
      const res = await fetch("/api/specs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spec }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save");
      }

      const data = await res.json();
      await navigator.clipboard.writeText(data.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleShare} disabled={disabled || loading || !spec}>
      {loading ? "Saving..." : copied ? "Link Copied!" : "Save & Share"}
    </Button>
  );
}
