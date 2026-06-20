import { isImage, isShape } from "@owlbear-rodeo/sdk";
import { useItems } from "../useItems";
import { isPlainObject } from "../contextMenu/helpers";
import { getPluginId } from "../getPluginId";
import { colors } from "../contextMenu/colors";
import type { RingGroup } from "./types/RingGroup";
import { useState } from "react";
import { SingleGroupView } from "./components/SingleGroupView";
import { MainView } from "./components/MainView";

type Selection = { color: string; division: string };

export function ActionMenu() {
  const items = useItems();

  const [groupSelector, setGroupSelector] = useState<Selection>();

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
        rings: rings
          .filter((ring) => ring.attachedTo === item.id)
          .sort((a, b) => b.scale.x - a.scale.x),
      };
    });

  let nameIndex = 1;

  const ringGroups: RingGroup[] = colors
    .map((color) => {
      const tokens = tokensWithRings.filter(
        (tokenWithRings) => tokenWithRings.rings[0].style.strokeColor === color,
      );
      let name = tokens[0]?.item.name;
      for (const token of tokens) {
        if (token.item.name !== name) {
          name = `Group ${nameIndex++}`;
          break;
        }
      }
      return {
        name,
        color,
        tokens,
      };
    })
    .filter((group) => group.tokens.length > 0)
    .sort((a, b) => a.tokens[0].item.name.localeCompare(b.tokens[0].item.name));

  const selectedGroup = groupSelector
    ? ringGroups.find((group) => group.color === groupSelector.color)
    : undefined;

  return (
    <div className="dark">
      <div className="h-screen bg-black/10 text-black dark:bg-transparent dark:text-white">
        {selectedGroup ? (
          <SingleGroupView
            group={selectedGroup}
            onBackClick={() => setGroupSelector(undefined)}
          />
        ) : (
          <MainView
            ringGroups={ringGroups}
            onGroupClick={(group) =>
              setGroupSelector({
                color: group.color,
                division: "",
              })
            }
          />
        )}
      </div>
    </div>
  );
}
