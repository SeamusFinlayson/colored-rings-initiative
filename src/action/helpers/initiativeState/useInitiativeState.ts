import type { Item } from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useReducer } from "react";
import type { TokenGroup } from "../../types/TokenGroup";
import { parseItems } from "../parseItems";
import { getSelectedGroup } from "../getSelectedGroup";
import { updateContextMenus } from "../updateContextMenus";
import type { GroupSelector } from "../../types/GroupSelector";
import type { InitiativeState } from "./InitiativeState";
import { inititalInitiatveState } from "./initiailInitiativeState";
import type { ReducerAction } from "./ReducerAction";

const checkGroupIsInvalid = (
  tokenGroups: TokenGroup[],
  groupSelector: GroupSelector | undefined,
) => {
  const selectedGroup = getSelectedGroup(tokenGroups, groupSelector);
  if (!selectedGroup) return true;
  if (selectedGroup.tokens.length === 0) return true;
  return false;
};

const getListProperties = (
  items: Item[],
  sceneIsReady: boolean,
  playerRole: "PLAYER" | "GM",
  groupSelector: GroupSelector | undefined,
) => {
  if (!sceneIsReady) items = [];
  const { catagories, tokenGroups } = parseItems(items, playerRole);

  updateContextMenus(tokenGroups, items);

  const groupIsInvalid = checkGroupIsInvalid(tokenGroups, groupSelector);

  return {
    catagories,
    tokenGroups,
    ...(groupIsInvalid ? { groupSelector: undefined, selectedItems: [] } : {}),
  };
};

function reducer(
  state: InitiativeState,
  action: ReducerAction,
): InitiativeState {
  switch (action.type) {
    case "handleSceneIsReadyChange": {
      return {
        ...state,
        sceneIsReady: action.sceneIsReady,
        ...getListProperties(
          state.items,
          action.sceneIsReady,
          state.playerRole,
          state.groupSelector,
        ),
      };
    }
    case "handleItemsChange": {
      return {
        ...state,
        items: action.items,
        ...getListProperties(
          action.items,
          state.sceneIsReady,
          state.playerRole,
          state.groupSelector,
        ),
      };
    }
    case "handlePlayerRoleChange": {
      return {
        ...state,
        playerRole: action.playerRole,
        ...getListProperties(
          state.items,
          state.sceneIsReady,
          action.playerRole,
          state.groupSelector,
        ),
      };
    }
    case "setSelectedItems": {
      return { ...state, selectedItems: action.selectedItems };
    }
    case "setGroupSelector": {
      return { ...state, groupSelector: action.groupSelector };
    }
  }
}

export function useInitiativeState(): [
  InitiativeState,
  React.ActionDispatch<[action: ReducerAction]>,
] {
  const [initiativeState, initiativeStateDispatch] = useReducer(
    reducer,
    inititalInitiatveState,
  );

  useEffect(() => {
    const handleRole = (playerRole: "PLAYER" | "GM") => {
      initiativeStateDispatch({ type: "handlePlayerRoleChange", playerRole });
    };
    OBR.player.getRole().then(handleRole);
    return OBR.player.onChange((player) => handleRole(player.role));
  }, []);

  useEffect(() => {
    const handleReady = (sceneIsReady: boolean) => {
      initiativeStateDispatch({
        type: "handleSceneIsReadyChange",
        sceneIsReady,
      });
    };
    OBR.scene.isReady().then(handleReady);
    return OBR.scene.onReadyChange(handleReady);
  }, []);

  useEffect(() => {
    const handleItems = (items: Item[]) => {
      initiativeStateDispatch({ type: "handleItemsChange", items });
    };
    OBR.scene.items.getItems().then(handleItems);
    return OBR.scene.items.onChange(handleItems);
  }, []);

  return [initiativeState, initiativeStateDispatch];
}
