import type { GroupSelector } from "../types/GroupSelector";
import type { TokenGroup } from "../types/TokenGroup";

export function getSelectedGroup(
  tokenGroups: TokenGroup[],
  groupSelector: GroupSelector | undefined,
) {
  return groupSelector
    ? tokenGroups.find(
        (group) =>
          group.name === groupSelector.name &&
          group.color === groupSelector.color &&
          group.catagory === groupSelector.catagory,
      )
    : undefined;
}
