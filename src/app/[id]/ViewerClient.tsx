"use client";

import { Header } from "@/widgets/header/ui/Header";
import { SwaggerPreview } from "@/features/preview/ui/SwaggerPreview";

type ViewerClientProps = {
  spec: object;
  id: string;
};

export function ViewerClient({ spec, id }: ViewerClientProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header showActions specId={id} />
      <main className="flex-1 overflow-auto">
        <SwaggerPreview spec={spec} />
      </main>
    </div>
  );
}
