"use client";

import { useEffect, useRef } from "react";
import "swagger-ui-dist/swagger-ui.css";
import SwaggerUIBundle from "swagger-ui-dist/swagger-ui-bundle";

type SwaggerPreviewProps = {
  spec: object | null;
};

export function SwaggerPreview({ spec }: SwaggerPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spec || !containerRef.current) return;

    containerRef.current.innerHTML = "";

    SwaggerUIBundle({
      spec,
      domNode: containerRef.current,
      presets: [SwaggerUIBundle.presets.apis],
      layout: "BaseLayout",
    });
  }, [spec]);

  if (!spec) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-400 dark:text-zinc-600">
        Preview will appear here
      </div>
    );
  }

  return <div ref={containerRef} className="h-full overflow-auto swagger-wrapper" />;
}
