import type { Token } from "./Token";

export type TokenGroup = {
  name: string;
  color: string | null;
  catagory: string;
  tokens: Token[];
};
