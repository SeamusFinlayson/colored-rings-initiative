import type { Item } from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { TokenGroup } from "../types/TokenGroup";
import { parseItems } from "./parseItems";
import { getSelectedGroup } from "./getSelectedGroup";
import { updateContextMenus } from "./updateContextMenus";
import type { AppState } from "../types/AppState";

export function useAppState(): [
  AppState,
  React.Dispatch<React.SetStateAction<AppState>>,
] {
  const [appState, setAppState] = useState<AppState>({
    ...parseItems([]),
    groupSelector: undefined,
    selectedItems: [],
  });
  const items = useRef<Item[]>(undefined);

  const checkInvalidGroupSelector = useEffectEvent(
    (tokenGroups?: TokenGroup[]) => {
      if (!appState.groupSelector) return;
      if (!tokenGroups) tokenGroups = appState.tokenGroups;
      const selectedGroup = getSelectedGroup(
        tokenGroups,
        appState.groupSelector,
      );
      if (selectedGroup?.tokens?.length !== 0) return;
      setAppState({ ...appState, groupSelector: undefined, selectedItems: [] });
    },
  );

  useEffect(() => {
    const updateItemsData = (newItems?: Item[]) => {
      let newItemsData:
        | {
            catagories: string[];
            tokenGroups: TokenGroup[];
          }
        | undefined = undefined;
      if (newItems) {
        items.current = newItems;
        newItemsData = parseItems(newItems);

        setAppState((prev) => ({ ...prev, ...newItemsData }));
        updateContextMenus(newItemsData.tokenGroups, newItems);
      }

      checkInvalidGroupSelector(newItemsData?.tokenGroups);
    };

    if (items.current) updateItemsData();
    else OBR.scene.items.getItems().then((items) => updateItemsData(items));

    return OBR.scene.items.onChange(updateItemsData);
  }, []);

  return [appState, setAppState];
}
