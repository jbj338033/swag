import { notFound } from "next/navigation";
import { getSpec } from "@/entities/spec/api";
import { ViewerClient } from "./ViewerClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ViewerPage({ params }: PageProps) {
  const { id } = await params;
  const spec = await getSpec(id);

  if (!spec) {
    notFound();
  }

  return <ViewerClient spec={spec.spec} id={spec.id} />;
}
