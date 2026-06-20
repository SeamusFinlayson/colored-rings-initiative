import OBR, {
  Math2,
  type Vector2,
  type ViewportTransform,
} from "@owlbear-rodeo/sdk";

async function getCenteringViewportTransform(
  point: Vector2,
  viewportScale: number,
  screenWidth: number,
  screenHeight: number,
): Promise<ViewportTransform> {
  // Wrt - with respect to
  const screenOriginWrtScreen = { x: 0, y: 0 };
  const screenCenterWrtScreen: Vector2 = Math2.multiply(
    {
      x: screenWidth,
      y: screenHeight,
    },
    0.5,
  );
  const [screenOriginWrtWorld, screenCenterWrtWorld] = await Promise.all([
    OBR.viewport.inverseTransformPoint(screenOriginWrtScreen),
    OBR.viewport.inverseTransformPoint(screenCenterWrtScreen),
  ]);

  const screenCenteringOffset = Math2.subtract(
    screenOriginWrtWorld,
    screenCenterWrtWorld,
  );

  const viewportPosition = Math2.add(point, screenCenteringOffset);

  return {
    scale: viewportScale,
    position: Math2.multiply(viewportPosition, -viewportScale),
  };
}

export async function focusItems(itemIds: string[]) {
  if (itemIds.length === 0) return;

  const [bounds, viewportScale, screenWidth, screenHeight] = await Promise.all([
    OBR.scene.items.getItemBounds(itemIds),
    OBR.viewport.getScale(),
    OBR.viewport.getWidth(),
    OBR.viewport.getHeight(),
  ]);

  await OBR.viewport.animateTo(
    await getCenteringViewportTransform(
      bounds.center,
      viewportScale,
      screenWidth,
      screenHeight,
    ),
  );
}
