import type { GroupSelector } from "../types/GroupSelector";
import type { TokenGroup } from "../types/TokenGroup";

export function getSelectedGroup(
  tokenGroups: TokenGroup[],
  groupSelector: GroupSelector | undefined,
): TokenGroup | undefined {
  if (!groupSelector) return undefined;
  const group = {
    ...tokenGroups.find(
      (group) =>
        group.name === groupSelector.name &&
        group.color === groupSelector.color &&
        group.catagory === groupSelector.catagory,
    ),
  } as TokenGroup;

  if (!group) return undefined;
  if (group.color) return group;

  group.tokens = tokenGroups
    .filter((group) => group.color === null)
    .filter((group) => group.catagory === groupSelector.catagory)
    .flatMap((group) => group.tokens);

  return group;
}
