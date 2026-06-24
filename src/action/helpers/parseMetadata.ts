import type { Metadata } from "@owlbear-rodeo/sdk";

export function parseMetadata<T>(
  metadata: Metadata,
  key: string,
  parser: (value: unknown) => T,
  fallback: T,
) {
  const pluginData = metadata[key];
  if (pluginData === undefined) return fallback;
  try {
    return parser(pluginData);
  } catch (error) {
    console.error(error);
    return fallback;
  }
}
