import { type Image, type Shape } from "@owlbear-rodeo/sdk";
import type { InitiativeData } from "./InitiativeData";

export type Token = {
  item: Image;
  data: InitiativeData;
  rings: Shape[];
};
