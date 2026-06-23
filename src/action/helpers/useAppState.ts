import type { Item } from "@owlbear-rodeo/sdk";
import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { TokenGroup } from "../types/TokenGroup";
import type { GroupSelector } from "../types/GroupSelector";
import { parseItems } from "./parseItems";
import { getSelectedGroup } from "./getSelectedGroup";
import { updateContextMenus } from "./updateContextMenus";

type AppState = {
  tokenGroups: TokenGroup[];
  catagories: string[];
  selectedGroup: TokenGroup | undefined;
  setGroupSelector: (groupSelector: GroupSelector | undefined) => void;
};

export function useAppState(): AppState {
  const [groupSelector, setGroupSelector] = useState<GroupSelector>();
  const [itemsData, setItemsData] = useState(parseItems([]));
  const items = useRef<Item[]>(undefined);

  const checkInvalidGroupSelector = useEffectEvent(
    (tokenGroups?: TokenGroup[]) => {
      if (!groupSelector) return;
      if (!tokenGroups) tokenGroups = itemsData.tokenGroups;
      const selectedGroup = getSelectedGroup(tokenGroups, groupSelector);
      if (selectedGroup) return;
      setGroupSelector(undefined);
    },
  );

  useEffect(() => {
    const updateItemsData = (newItems?: Item[]) => {
      let newItemsData = undefined;
      if (newItems) {
        items.current = newItems;
        newItemsData = parseItems(newItems);

        setItemsData(newItemsData);
        updateContextMenus(newItemsData.tokenGroups, newItems);
      }

      checkInvalidGroupSelector(newItemsData?.tokenGroups);
    };

    if (items.current) updateItemsData();
    else OBR.scene.items.getItems().then((items) => updateItemsData(items));

    return OBR.scene.items.onChange(updateItemsData);
  }, []);

  const selectedGroup = getSelectedGroup(itemsData.tokenGroups, groupSelector);

  return { ...itemsData, selectedGroup, setGroupSelector };
}
