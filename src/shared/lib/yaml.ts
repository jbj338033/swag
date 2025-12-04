import YAML from "yaml";

export function parseSpec(input: string): object | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("{")) {
    return JSON.parse(trimmed);
  }

  return YAML.parse(trimmed);
}

export function isValidSpec(spec: unknown): spec is object {
  if (!spec || typeof spec !== "object") return false;
  const s = spec as Record<string, unknown>;
  return "openapi" in s || "swagger" in s;
}
