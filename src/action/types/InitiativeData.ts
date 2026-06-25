import z from "zod";

export const PartialInitiativeDataZod = z.object({
  type: z.union([z.literal("ALWAYS"), z.literal("RING")]).optional(),
  hasReaction: z.boolean().optional(),
  turnsRemaining: z.number().optional(),
  totalTurns: z.number().optional(),
  catagory: z.string().optional(),
  active: z.boolean().optional(),
});

export const InitiativeDataZod = z.object({
  type: z.union([z.literal("ALWAYS"), z.literal("RING")]),
  hasReaction: z.boolean(),
  turnsRemaining: z.number(),
  totalTurns: z.number(),
  catagory: z.string(),
  active: z.boolean(),
});

export type PartialInitiativeData = z.infer<typeof PartialInitiativeDataZod>;
export type InitiativeData = z.infer<typeof InitiativeDataZod>;
