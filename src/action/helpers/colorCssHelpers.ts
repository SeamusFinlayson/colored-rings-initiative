export const fallbackColor = "#79697B";

export function getTintedBackground(
  hex: string | null,
  themeMode: "DARK" | "LIGHT",
) {
  if (!hex) hex = fallbackColor;
  if (themeMode === "LIGHT") {
    return `hsl(from ${hex} h calc(s * 0.8) calc(l * 0.1 + 30) / 0.3)`;
  }
  return `hsl(from ${hex} h s calc(l * 0.25 + 50) / 0.3)`;
}

export function getDimTintedBackground(
  hex: string | null,
  themeMode: "DARK" | "LIGHT",
) {
  if (!hex) hex = fallbackColor;
  if (themeMode === "LIGHT") {
    return `hsl(from ${hex} h s calc(l * 0.8) / 0.2)`;
  }
  return `hsl(from ${hex} h s calc(l * 0.2 + 5) / 0.2)`;
}

export function getColorfulSurface(
  hex: string | null,
  themeMode: "DARK" | "LIGHT",
) {
  if (!hex) hex = fallbackColor;
  if (themeMode === "LIGHT") {
    return `hsl(from ${hex} h calc(s * 0.6) calc(l * 0.3 + 60))`;
  }
  return `hsl(from ${hex} h calc(s * 0.55 + 3) calc(l * 0.1 + 30))`;
}

export function getMutedSurface(
  hex: string | null,
  themeMode: "DARK" | "LIGHT",
) {
  if (!hex) hex = fallbackColor;
  if (themeMode === "LIGHT") {
    return `hsl(from ${hex} h calc(s * 0.4) calc(l * 0.2 + 75))`;
  }
  return `hsl(from ${hex} h calc(s * 0.25) calc(l * 0.2 + 20))`;
}
