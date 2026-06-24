import z from "zod";

export const SceneDataZod = z.object({
  round: z.number(),
});
