import { updateItemInitiaitiveData } from "./itemInitiativeData";

export function switchToCatagory(catagory: string, itemIds: string[]) {
  updateItemInitiaitiveData(
    itemIds.map((itemId) => ({ itemId, data: { catagory } })),
  );
}
