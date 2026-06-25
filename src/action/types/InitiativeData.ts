import z from "zod";

export const PartialInitiativeDataZod = z.object({
  type: z.union([z.literal("ALWAYS"), z.literal("RING")]).optional(),
  reactions: z.number().optional(),
  reactionsMaximum: z.number().optional(),
  turns: z.number().optional(),
  turnsMaximum: z.number().optional(),
  catagory: z.string().optional(),
  active: z.boolean().optional(),
});

export const InitiativeDataZod = z.object({
  type: z.union([z.literal("ALWAYS"), z.literal("RING")]),
  reactions: z.number(),
  reactionsMaximum: z.number(),
  turns: z.number(),
  turnsMaximum: z.number(),
  catagory: z.string(),
  active: z.boolean(),
});

export type PartialInitiativeData = z.infer<typeof PartialInitiativeDataZod>;
export type InitiativeData = z.infer<typeof InitiativeDataZod>;
