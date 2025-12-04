import { prisma } from "@/shared/lib/prisma";
import { generateId } from "@/shared/lib/nanoid";
import type { Spec } from "./model";

export async function createSpec(
  spec: object,
  title?: string | null
): Promise<Spec> {
  const id = generateId();
  const result = await prisma.spec.create({
    data: {
      id,
      title: title ?? null,
      spec,
    },
  });
  return {
    id: result.id,
    title: result.title,
    spec: result.spec as object,
    createdAt: result.createdAt,
  };
}

export async function getSpec(id: string): Promise<Spec | null> {
  const result = await prisma.spec.findUnique({
    where: { id },
  });
  if (!result) return null;
  return {
    id: result.id,
    title: result.title,
    spec: result.spec as object,
    createdAt: result.createdAt,
  };
}
