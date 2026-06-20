import type { Token } from "./Token";

export type RingGroup = {
  name: string;
  color: string | null;
  catagory: string;
  tokens: Token[];
};
