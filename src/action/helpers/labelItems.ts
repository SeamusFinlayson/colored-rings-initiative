import OBR, { buildLabel, Math2, type Image } from "@owlbear-rodeo/sdk";
import { getPluginId } from "../../getPluginId";
import type { Token } from "../types/Token";
import { isPlainObject } from "../../contextMenu/helpers";

function getImageDimensions(item: Image, sceneDpi: number) {
  const dpiScale = sceneDpi / item.grid.dpi;
  const width = Math.abs(item.image.width * dpiScale * item.scale.x);
  const height = Math.abs(item.image.height * dpiScale * item.scale.y);
  return { width, height };
}

function getImageCenter(image: Image, sceneDpi: number) {
  // Image center with respect to image center
  let imageCenter = { x: 0, y: 0 };

  // Find image center with respect to image top left corner
  imageCenter = Math2.add(
    imageCenter,
    Math2.multiply(
      {
        x: image.image.width,
        y: image.image.height,
      },
      0.5,
    ),
  );

  // Find image center with respect to item position
  imageCenter = Math2.subtract(imageCenter, image.grid.offset);
  imageCenter = Math2.multiply(imageCenter, sceneDpi / image.grid.dpi); // scale switch from image to scene
  imageCenter = Math2.multiply(imageCenter, image.scale);
  imageCenter = Math2.rotate(imageCenter, { x: 0, y: 0 }, image.rotation);

  // find image center with respect to world
  imageCenter = Math2.add(imageCenter, image.position);

  return imageCenter;
}

function getLabelId(itemId: string) {
  return getPluginId("label-" + itemId);
}

function buildLabels(tokens: Token[], sceneDpi: number) {
  return tokens.map((token) => {
    const bounds = getImageDimensions(token.item, sceneDpi);
    const center = getImageCenter(token.item, sceneDpi);

    const label = buildLabel()
      .id(getLabelId(token.item.id))
      .position({
        x: center.x,
        y: center.y - bounds.height / 2 - sceneDpi / 30,
      })
      .style({
        backgroundColor: "#3D4051",
        backgroundOpacity: 0.7,
        cornerRadius: 8,
        pointerDirection: "DOWN",
        pointerWidth: (sceneDpi / 150) * 8,
        pointerHeight: (sceneDpi / 150) * 8,
      })
      .metadata({ [getPluginId("initiative")]: { isActiveLabel: true } })
      .maxViewScale(1.5)
      .minViewScale(0.8)
      .backgroundOpacity(1)
      .plainText("Your Turn!")
      .attachedTo(token.item.id)
      .visible(token.item.visible)
      .locked(true)
      .build();

    return label;
  });
}

export async function updateLabels(
  updates: { token: Token; active: boolean }[],
) {
  await OBR.scene.items.deleteItems(
    updates
      .filter((val) => !val.active)
      .map((val) => getLabelId(val.token.item.id)),
  );
  const sceneDpi = await OBR.scene.grid.getDpi();

  const labels = buildLabels(
    updates.filter((val) => val.active).map((val) => val.token),
    sceneDpi,
  );

  OBR.scene.items.addItems(labels);
}

export async function clearActiveLabels() {
  const labels = (await OBR.scene.items.getItems()).filter((item) => {
    const metadata = item.metadata[getPluginId("initiative")];
    return isPlainObject(metadata) && metadata.isActiveLabel;
  });

  if (labels.length < 1) return;
  OBR.scene.items.deleteItems(labels.map((label) => label.id));
}
