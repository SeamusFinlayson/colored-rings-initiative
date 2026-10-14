import OBR, { type Item } from "@owlbear-rodeo/sdk";
import { updateItemInitiaitiveData } from "./itemInitiativeData";
import { updateLabels } from "./labelItems";
import type { PartialInitiativeData } from "../types/InitiativeData";
import type { Token } from "../types/Token";
import { updateActionInitiativeData } from "./updateActionInitiativeData";

export function processTurnUpdates(
  updates: {
    token: Token;
    data: PartialInitiativeData;
  }[],
  onMapTurnIndicator: "NONE" | "SELECT" | "LABEL",
  items: Item[],
  updateItems: (items: Item[]) => void,
) {
  const simpleUpdates = updates.map((val) => ({
    itemId: val.token.item.id,
    data: val.data,
  }));
  updateItemInitiaitiveData(simpleUpdates);
  updateActionInitiativeData(simpleUpdates, items, updateItems);

  if (onMapTurnIndicator === "LABEL") {
    updateLabels(
      updates.map((val) => ({
        token: val.token,
        active: !!val.data.active,
      })),
    );
  } else if (onMapTurnIndicator === "SELECT") {
    OBR.player.select(
      updates.filter((val) => val.data.active).map((val) => val.token.item.id),
      true,
    );
  }
}
