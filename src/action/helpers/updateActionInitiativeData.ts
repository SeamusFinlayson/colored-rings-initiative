import type { Item } from "@owlbear-rodeo/sdk";
import {
  type PartialInitiativeData,
  PartialInitiativeDataZod,
} from "../types/InitiativeData";
import { INITIATIVE_METADATA_KEY } from "./itemInitiativeData";

export function updateActionInitiativeData(
  updates: { itemId: string; data: PartialInitiativeData }[],
  items: Item[],
  updateItems: (items: Item[]) => void,
) {
  updateItems(
    items.map((item) => {
      const update = updates.find((update) => update.itemId === item.id);
      if (!update) return item;
      const existingData = item.metadata[INITIATIVE_METADATA_KEY];
      const data = PartialInitiativeDataZod.parse({
        ...(existingData ? existingData : {}),
        ...update.data,
      });
      item.metadata[INITIATIVE_METADATA_KEY] = data;
      return item;
    }),
  );
}
