import z from "zod";

export const SceneDataZod = z.object({
  round: z.number(),
});
export const PartialSceneDataZod = SceneDataZod.partial();

export type PartialSceneData = z.infer<typeof PartialSceneDataZod>;
export type SceneData = z.infer<typeof SceneDataZod>;
