"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/shared/ui/Button";

type HeaderProps = {
  actions?: ReactNode;
};

export function Header({ actions }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
      <Link href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
        Swag
      </Link>
      {actions && <div className="flex gap-2">{actions}</div>}
    </header>
  );
}

type CopyLinkButtonProps = {
  className?: string;
};

export function CopyLinkButton({ className }: CopyLinkButtonProps) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Button variant="secondary" onClick={handleCopyLink} className={className}>
      Copy Link
    </Button>
  );
}

export function NewButton() {
  return (
    <Link href="/">
      <Button variant="secondary">New</Button>
    </Link>
  );
}
