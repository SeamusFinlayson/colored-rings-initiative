import { isImage, isShape } from "@owlbear-rodeo/sdk";
import { useItems } from "./helpers/useItems";
import { isPlainObject } from "../contextMenu/helpers";
import { getPluginId } from "../getPluginId";
import type { RingGroup } from "./types/RingGroup";
import { useState } from "react";
import { SingleGroupView } from "./components/SingleGroupView";
import { MainView } from "./components/MainView";
import type { Token } from "./types/Token";
import { getInitiativeData } from "./helpers/initiativeData";
import { colors } from "../contextMenu/colors";
import type { GroupSelector } from "./types/GroupSelector";

export function ActionMenu() {
  const items = useItems();

  const [groupSelector, setGroupSelector] = useState<GroupSelector>();

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

  const tokens: Token[] = items
    .filter((item) => isImage(item))
    .filter((item) => item.layer === "CHARACTER")
    .filter((item) => rings.some((ring) => ring.attachedTo === item.id))
    .map((item) => {
      return {
        item,
        data: getInitiativeData(item),
        rings: rings
          .filter((ring) => ring.attachedTo === item.id)
          .sort((a, b) => b.scale.x - a.scale.x),
      };
    });

  const catagories = [
    ...new Set([
      "Party",
      "Adversaries",
      ...tokens.map((token) => token.data.catagory),
    ]),
  ];

  let nameIndex = 1;
  const ringGroups: RingGroup[] = catagories
    .flatMap((catagory) =>
      colors.map((color) => {
        const groupTokens = tokens
          .filter((token) => token.data.catagory === catagory)
          .filter((token) => token.rings[0].style.strokeColor === color)
          .map((token) => {
            const ring = token.rings.at(1);
            const color = ring
              ? ring.style.strokeColor
              : token.rings[0].style.strokeColor;
            const colorNumber = parseInt("0x" + color.substring(1));
            return { color, colorNumber, token };
          })
          .sort((a, b) => a.colorNumber - b.colorNumber)
          .sort((a) => (a.color === color ? -1 : 0))
          .map((val) => val.token);

        let name = groupTokens[0]?.item.name;
        for (const token of groupTokens) {
          if (token.item.name !== name) {
            name = `Group ${nameIndex++}`;
            break;
          }
        }
        return {
          name,
          color,
          catagory,
          tokens: groupTokens,
        };
      }),
    )
    .filter((group) => group.tokens.length > 0)
    .sort((a, b) => a.tokens[0].item.name.localeCompare(b.tokens[0].item.name));

  const selectedGroup = groupSelector
    ? ringGroups.find(
        (group) =>
          group.color === groupSelector.color &&
          group.catagory === groupSelector.catagory,
      )
    : undefined;

  return (
    <div className="text-black dark:bg-transparent dark:text-white">
      {selectedGroup ? (
        <SingleGroupView
          group={selectedGroup}
          onBackClick={() => setGroupSelector(undefined)}
        />
      ) : (
        <MainView
          catagories={catagories}
          ringGroups={ringGroups}
          onSelect={(selector) => setGroupSelector(selector)}
        />
      )}
    </div>
  );
}
