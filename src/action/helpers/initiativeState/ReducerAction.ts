import type { Item } from "@owlbear-rodeo/sdk";
import type { GroupSelector } from "../../types/GroupSelector";
import type { PartialInitiativeData } from "../../types/InitiativeData";
import type { Token } from "../../types/Token";

export type ReducerAction =
  | { type: "handleSceneIsReadyChange"; sceneIsReady: boolean }
  | { type: "handleItemsChange"; items: Item[] }
  | { type: "handlePlayerRoleChange"; playerRole: "PLAYER" | "GM" }
  | {
      type: "updateTokens";
      updates: {
        token: Token;
        data: PartialInitiativeData;
      }[];
      onMapTurnIndicator: "NONE" | "SELECT" | "LABEL";
    }
  | { type: "setSelectedItems"; selectedItems: string[] }
  | {
      type: "setGroupSelector";
      groupSelector: GroupSelector | undefined;
    };
