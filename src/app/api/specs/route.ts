import { NextRequest, NextResponse } from "next/server";
import { createSpec } from "@/entities/spec/api";
import { parseSpec, isValidSpec } from "@/shared/lib/yaml";

const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_SIZE) {
      return NextResponse.json(
        { error: "Spec too large (max 5MB)" },
        { status: 413 }
      );
    }

    const body = await request.json();
    const { spec } = body;

    if (!spec) {
      return NextResponse.json({ error: "Spec is required" }, { status: 400 });
    }

    let parsedSpec: object;

    if (typeof spec === "string") {
      const parsed = parseSpec(spec);
      if (!parsed) {
        return NextResponse.json(
          { error: "Invalid spec format" },
          { status: 400 }
        );
      }
      parsedSpec = parsed;
    } else if (typeof spec === "object") {
      parsedSpec = spec;
    } else {
      return NextResponse.json(
        { error: "Spec must be a JSON object or YAML string" },
        { status: 400 }
      );
    }

    if (!isValidSpec(parsedSpec)) {
      return NextResponse.json(
        { error: "Invalid OpenAPI spec" },
        { status: 400 }
      );
    }

    const title =
      (parsedSpec as { info?: { title?: string } }).info?.title ?? null;
    const saved = await createSpec(parsedSpec, title);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      request.headers.get("origin") ||
      "http://localhost:3000";

    return NextResponse.json({
      id: saved.id,
      url: `${baseUrl}/${saved.id}`,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to save spec" },
      { status: 500 }
    );
  }
}
