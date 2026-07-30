import type { Item } from "@owlbear-rodeo/sdk";
import type { GroupSelector } from "../../types/GroupSelector";
import type { TokenGroup } from "../../types/TokenGroup";

export type InitiativeState = {
  sceneIsReady: boolean;
  items: Item[];
  playerRole: "PLAYER" | "GM";
  tokenGroups: TokenGroup[];
  catagories: string[];
  groupSelector: GroupSelector | undefined;
  selectedItems: string[];
};
