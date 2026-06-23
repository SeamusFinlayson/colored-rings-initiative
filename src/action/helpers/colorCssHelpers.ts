export function getTintedBackground(hex: string | null) {
  if (!hex) return "#00000020";
  return `hsl(from ${hex} h s calc(l * 0.3) / 0.4)`;
}

export function getColorfulSurface(hex: string | null) {
  if (!hex) hex = "grey";
  return `hsl(from ${hex} h calc(s * 0.8) calc(l * 0.45))`;
}

export function getMutedSurface(hex: string | null) {
  if (!hex) hex = "grey";
  return `hsl(from ${hex} h calc(s * 0.25) calc(l * 0.2 + 20))`;
}
