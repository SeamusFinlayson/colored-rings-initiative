import type { GroupSelector } from "./GroupSelector";
import type { TokenGroup } from "./TokenGroup";

export type AppState = {
  tokenGroups: TokenGroup[];
  catagories: string[];
  groupSelector: GroupSelector | undefined;
  selectedItems: string[];
};
