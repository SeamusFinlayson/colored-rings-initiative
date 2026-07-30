import type { Item } from "@owlbear-rodeo/sdk";
import type { GroupSelector } from "../../types/GroupSelector";

export type ReducerAction =
  | { type: "handleSceneIsReadyChange"; sceneIsReady: boolean }
  | { type: "handleItemsChange"; items: Item[] }
  | { type: "handlePlayerRoleChange"; playerRole: "PLAYER" | "GM" }
  | { type: "setSelectedItems"; selectedItems: string[] }
  | {
      type: "setGroupSelector";
      groupSelector: GroupSelector | undefined;
    };
