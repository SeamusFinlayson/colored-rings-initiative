export function getTokenMargin(count: number, containerWidth: number) {
  if (count < 4 && containerWidth < 145) return 4;
  if (count < 5 && containerWidth > 191) return 4;

  const itemWidth = 40;
  const rightMargin = 4;

  const availableSpace = containerWidth - rightMargin;
  const targetSpace = availableSpace / count;

  const overflowMargin = itemWidth + 1 - targetSpace;
  const perItemMargin = overflowMargin / count;

  const margin = targetSpace - perItemMargin - itemWidth;

  return margin;
}
