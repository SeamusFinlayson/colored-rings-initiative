import OBR, { type Item, isImage, type KeyFilter } from "@owlbear-rodeo/sdk";
import { getPluginId } from "../../getPluginId";
import { listPlus, listX } from "../assets/iconAssets";
import type { TokenGroup } from "../types/TokenGroup";
import { updateInitiaitiveData } from "./initiativeData";
import { removeFromInitiative } from "./removeFromInitiative";
import { setDifference } from "./setDifference";

export function updateContextMenus(tokenGroups: TokenGroup[], items: Item[]) {
  const trackedTokens = tokenGroups.flatMap((group) => group.tokens);
  const trackedItemIds = trackedTokens.map((token) => token.item.id);

  const allItemIds = items
    .filter((item) => isImage(item))
    .filter((item) => item.layer === "CHARACTER" || item.layer === "MOUNT")
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
            { key: "layer", value: "MOUNT", coordinator: "||" },
            { key: "layer", value: "CHARACTER" },
            { key: "type", value: "IMAGE" },
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
            { key: "layer", value: "MOUNT", coordinator: "||" },
            { key: "layer", value: "CHARACTER" },
            { key: "type", value: "IMAGE" },
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
