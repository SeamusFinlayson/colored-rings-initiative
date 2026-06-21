import OBR from "@owlbear-rodeo/sdk";
import type { Token } from "../types/Token";
import { INITIATIVE_METADATA_KEY } from "./initiativeData";

export function removeFromInitiative(tokens: Token[]) {
  const ringIds = tokens.flatMap((token) => token.rings.map((ring) => ring.id));
  OBR.scene.items.deleteItems(ringIds);
  OBR.scene.items.updateItems(
    tokens.map((token) => token.item.id),
    (items) =>
      items.forEach((item) => delete item.metadata[INITIATIVE_METADATA_KEY]),
  );
}
