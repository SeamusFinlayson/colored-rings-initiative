import type { Item, KeyFilter } from "@owlbear-rodeo/sdk";
import OBR, { isImage } from "@owlbear-rodeo/sdk";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import type { TokenGroup } from "../types/TokenGroup";
import type { GroupSelector } from "../types/GroupSelector";
import { parseItems } from "./parseItems";
import { getSelectedGroup } from "./getSelectedGroup";
import { setDifference } from "./setDifference";
import { listPlus, listX } from "../assets/iconAssets";
import { getPluginId } from "../../getPluginId";
import { updateInitiaitiveData } from "./initiativeData";
import { removeFromInitiative } from "./removeFromInitiative";

type AppState = {
  tokenGroups: TokenGroup[];
  catagories: string[];
  selectedGroup: TokenGroup | undefined;
  setGroupSelector: (groupSelector: GroupSelector | undefined) => void;
};

export function updateContextMenus(tokenGroups: TokenGroup[], items: Item[]) {
  const trackedTokens = tokenGroups.flatMap((group) => group.tokens);
  const trackedItemIds = trackedTokens.map((token) => token.item.id);

  const allItemIds = items
    .filter((item) => isImage(item))
    .filter((item) => item.layer === "CHARACTER")
    .map((item) => item.id);

  const untrackedItemIds = setDifference(allItemIds, trackedItemIds);

  OBR.contextMenu.create({
    id: getPluginId("add-initiative"),
    icons: [
      {
        icon: listPlus,
        label: "Add Initiative",
        filter: {
          every: [
            { key: "type", value: "IMAGE" },
            { key: "layer", value: "CHARACTER" },
            ...trackedItemIds.map(
              (id) =>
                ({ key: "id", operator: "!=", value: id }) satisfies KeyFilter,
            ),
          ],
          permissions: ["UPDATE"],
        },
      },
    ],
    onClick: (context) =>
      updateInitiaitiveData(
        context.items.map((item) => ({
          itemId: item.id,
          data: { type: "ALWAYS" },
        })),
      ),
  });

  OBR.contextMenu.create({
    id: getPluginId("remove-initiative"),
    icons: [
      {
        icon: listX,
        label: "Remove Initiative",
        filter: {
          some: [
            { key: "type", value: "IMAGE" },
            { key: "layer", value: "CHARACTER" },
            ...untrackedItemIds.map(
              (id) =>
                ({ key: "id", operator: "!=", value: id }) satisfies KeyFilter,
            ),
          ],
          permissions: ["UPDATE"],
        },
      },
    ],
    onClick: (context) =>
      removeFromInitiative(
        context.items
          .map((item) =>
            trackedTokens.find((token) => token.item.id === item.id),
          )
          .filter((token) => token !== undefined),
      ),
  });

  return { tracked: trackedItemIds, untracked: untrackedItemIds };
}

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
        console.log(items);
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
