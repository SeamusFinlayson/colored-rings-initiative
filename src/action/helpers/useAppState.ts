import type { Item } from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { TokenGroup } from "../types/TokenGroup";
import { parseItems } from "./parseItems";
import { getSelectedGroup } from "./getSelectedGroup";
import { updateContextMenus } from "./updateContextMenus";
import type { AppState } from "../types/AppState";
import { useSceneIsReady } from "./useSceneReady";

export function useAppState(): [
  AppState,
  React.Dispatch<React.SetStateAction<AppState>>,
] {
  const [appState, setAppState] = useState<AppState>({
    ...parseItems([]),
    groupSelector: undefined,
    selectedItems: [],
  });
  const sceneIsReady = useSceneIsReady();
  const items = useRef<Item[]>(undefined);

  const checkGroupIsInvalid = useEffectEvent((tokenGroups: TokenGroup[]) => {
    const selectedGroup = getSelectedGroup(tokenGroups, appState.groupSelector);
    if (!selectedGroup) return true;
    if (selectedGroup.tokens.length === 0) return true;
    return false;
  });

  useEffect(() => {
    const updateItemsData = (newItems?: Item[]) => {
      items.current = newItems;
      newItems ??= [];
      const { catagories, tokenGroups } = parseItems(newItems);

      updateContextMenus(tokenGroups, newItems);

      const groupIsInvalid = checkGroupIsInvalid(tokenGroups);

      setAppState((prev) => ({
        ...prev,
        catagories,
        tokenGroups,
        ...(groupIsInvalid
          ? { groupSelector: undefined, selectedItems: [] }
          : {}),
      }));
    };

    if (!sceneIsReady) {
      updateItemsData();
    } else if (!items.current) {
      OBR.scene.items.getItems().then(updateItemsData);
    }

    return OBR.scene.items.onChange(updateItemsData);
  }, [sceneIsReady]);

  return [appState, setAppState];
}
