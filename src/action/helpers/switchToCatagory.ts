import { updateInitiaitiveData } from "./initiativeData";

export function switchToCatagory(catagory: string, itemIds: string[]) {
  updateInitiaitiveData(
    itemIds.map((itemId) => ({ itemId, data: { catagory } })),
  );
}
