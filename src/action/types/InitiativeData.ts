import z from "zod";

export const PatrialInitiativeDataZod = z.object({
  type: z.union([z.literal("ALWAYS"), z.literal("RING")]).optional(),
  hasReaction: z.boolean().optional(),
  turnsRemaining: z.number().optional(),
  totalTurns: z.number().optional(),
});

export const InitiativeDataZod = z.object({
  type: z.union([z.literal("ALWAYS"), z.literal("RING")]),
  hasReaction: z.boolean(),
  turnsRemaining: z.number(),
  totalTurns: z.number(),
});

export type PatrialInitiativeData = z.infer<typeof PatrialInitiativeDataZod>;
export type InitiativeData = z.infer<typeof InitiativeDataZod>;
