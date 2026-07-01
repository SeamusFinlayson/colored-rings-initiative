import z from "zod";

const OnMapIndicator = z.literal(["NONE", "SELECT", "LABEL"]);

export const RoomDataZod = z.object({
  disableRoundBroadcasting: z.boolean(),
  hideReaction: z.boolean(),
  onMapTurnIndicator: OnMapIndicator,
});
export const PartialRoomDataZod = RoomDataZod.partial();

export type RoomData = z.infer<typeof RoomDataZod>;
export type PartialRoomData = z.infer<typeof PartialRoomDataZod>;
