import { isImage, isShape } from "@owlbear-rodeo/sdk";
import { useItems } from "../useItems";
import TokenImage from "./TokenImage";
import { isPlainObject } from "../contextMenu/helpers";
import { getPluginId } from "../getPluginId";
import { colors } from "../contextMenu/colors";

export function ActionMenu() {
  const items = useItems();

  const tokens = items
    .filter((item) => isImage(item))
    .filter((item) => item.layer === "CHARACTER");

  const rings = items
    .filter((item) => isShape(item))
    .filter((item) => {
      const metadata = item.metadata[getPluginId("metadata")];
      return (
        isPlainObject(metadata) &&
        metadata.enabled &&
        isShape(item) &&
        item.attachedTo
      );
    });

  const tokensWithRings = tokens
    .filter((item) => rings.some((ring) => ring.attachedTo === item.id))
    .map((item) => {
      return {
        item,
        rings: rings.filter((ring) => ring.attachedTo === item.id),
      };
    });

  const ringGroups = colors
    .map((color) => ({
      color,
      tokens: tokensWithRings.filter(
        (tokenWithRings) => tokenWithRings.rings[0].style.strokeColor === color,
      ),
    }))
    .filter((group) => group.tokens.length > 0);

  return (
    <div className="text-white">
      <div className="p-4">Initiative</div>
      <div className="flex flex-col">
        {ringGroups.map((group) => (
          <div style={{ backgroundColor: group.color + "C0" }} className="p-2">
            <div className="flex flex-wrap">
              {group.tokens.map((token) => (
                <div>
                  <TokenImage src={token.item.image.url} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
