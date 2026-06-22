import { isShape, isImage, type Item, type Shape } from "@owlbear-rodeo/sdk";
import { isPlainObject } from "../../contextMenu/helpers";
import { getPluginId } from "../../getPluginId";
import type { Token } from "../types/Token";
import type { TokenGroup } from "../types/TokenGroup";
import { getInitiativeData } from "./initiativeData";
import { colors } from "../../contextMenu/colors";

function getRings(items: Item[]) {
  return items
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
}

function getTokens(items: Item[], rings: Shape[]) {
  return items
    .filter((item) => isImage(item))
    .filter((item) => item.layer === "CHARACTER")
    .map((item) => ({ item, data: getInitiativeData(item) }))
    .filter(
      (val) =>
        rings.some((ring) => ring.attachedTo === val.item.id) ||
        val.data.type === "ALWAYS",
    )
    .map((val) => {
      return {
        item: val.item,
        data: val.data,
        rings: rings
          .filter((ring) => ring.attachedTo === val.item.id)
          .sort((a, b) => b.scale.x - a.scale.x),
      };
    });
}

function getCatagories(tokens: Token[]) {
  return [
    ...new Set([
      "Party",
      "Adversaries",
      ...tokens.map((token) => token.data.catagory),
    ]),
  ];
}

function getTokenGroups(catagories: string[], tokens: Token[]) {
  let nameIndex = 1;
  const ringGroups: TokenGroup[] = catagories
    .flatMap((catagory) =>
      colors.map((color) => {
        const groupTokens = tokens
          .filter((token) => token.data.catagory === catagory)
          .filter((token) => token.rings[0]?.style.strokeColor === color)
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

  const ringlessGroups: TokenGroup[] = catagories.flatMap((catagory) =>
    tokens
      .filter((token) => token.data.catagory === catagory)
      .filter(
        (token) => token.data.type === "ALWAYS" && token.rings.length === 0,
      )
      .sort((a, b) => a.item.name.localeCompare(b.item.name))
      .map((token) => ({
        name: token?.item.name,
        catagory,
        color: null,
        tokens: [token],
      })),
  );

  const tokenGroups = [...ringlessGroups, ...ringGroups];

  return tokenGroups;
}

export function parseItems(items: Item[]) {
  const rings = getRings(items);
  const tokens = getTokens(items, rings);
  const catagories = getCatagories(tokens);
  const tokenGroups = getTokenGroups(catagories, tokens);

  return { catagories, tokenGroups };
}
