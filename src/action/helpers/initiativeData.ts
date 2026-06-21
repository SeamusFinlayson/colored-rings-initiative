import type { Item } from "@owlbear-rodeo/sdk";
import {
  PartialInitiativeDataZod,
  type InitiativeData,
  type PartialInitiativeData,
} from "../types/InitiativeData";
import { getPluginId } from "../../getPluginId";
import OBR from "@owlbear-rodeo/sdk";

const defaultInitiativeData: InitiativeData = {
  type: "RING",
  hasReaction: true,
  turnsRemaining: 1,
  totalTurns: 1,
  catagory: "Adversaries",
};

export const INITIATIVE_METADATA_KEY = getPluginId("initiative");

export function getInitiativeData(item: Item): InitiativeData {
  const data = item.metadata[INITIATIVE_METADATA_KEY];
  const parseResult = PartialInitiativeDataZod.safeParse(data);
  if (!parseResult.success) return defaultInitiativeData;
  return { ...defaultInitiativeData, ...parseResult.data };
}

export function updateInitiaitiveData(
  updates: { itemId: string; data: PartialInitiativeData }[],
) {
  const itemIds = updates.map((update) => update.itemId);

  OBR.scene.items.updateItems(itemIds, (items) =>
    items.forEach((item) => {
      const update = updates.find((update) => update.itemId === item.id);
      if (!update) throw new Error("Could not find item.");
      const existingData = item.metadata[INITIATIVE_METADATA_KEY];
      const data = PartialInitiativeDataZod.parse({
        ...(existingData ? existingData : {}),
        ...update.data,
      });
      item.metadata[INITIATIVE_METADATA_KEY] = data;
    }),
  );
}
