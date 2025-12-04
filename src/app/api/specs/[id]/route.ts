import { NextRequest, NextResponse } from "next/server";
import { getSpec } from "@/entities/spec/api";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const spec = await getSpec(id);

    if (!spec) {
      return NextResponse.json({ error: "Spec not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: spec.id,
      title: spec.title,
      spec: spec.spec,
      createdAt: spec.createdAt.toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch spec" },
      { status: 500 }
    );
  }
}
