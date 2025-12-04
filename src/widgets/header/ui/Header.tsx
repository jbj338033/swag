"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/shared/ui/Button";

type HeaderProps = {
  showActions?: boolean;
  specId?: string;
  actions?: ReactNode;
};

export function Header({ showActions, specId, actions }: HeaderProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
      <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
        Swag
      </Link>
      {actions}
      {showActions && specId && (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleCopyLink}>
            Copy Link
          </Button>
          <Link href="/">
            <Button variant="secondary">New</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
