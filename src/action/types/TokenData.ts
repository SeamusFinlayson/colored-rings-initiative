import z from "zod";

export const TokenData = z.object({
  hasReaction: z.boolean(),
  turnsRemaining: z.boolean(),
  totalTurns: z.boolean(),
});
