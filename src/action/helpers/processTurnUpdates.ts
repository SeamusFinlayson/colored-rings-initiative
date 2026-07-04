import OBR from "@owlbear-rodeo/sdk";
import { updateInitiaitiveData } from "./initiativeData";
import { updateLabels } from "./labelItems";
import type { PartialInitiativeData } from "../types/InitiativeData";
import type { Token } from "../types/Token";

export function processTurnUpdates(
  updates: {
    token: Token;
    data: PartialInitiativeData;
  }[],
  onMapTurnIndicator: "NONE" | "SELECT" | "LABEL",
) {
  updateInitiaitiveData(
    updates.map((val) => ({
      itemId: val.token.item.id,
      data: val.data,
    })),
  );
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
