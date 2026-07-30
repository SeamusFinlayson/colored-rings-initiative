import { createContext } from "react";
import { inititalInitiatveState } from "./initiailInitiativeState";
import type { InitiativeState } from "./InitiativeState";
import type { ReducerAction } from "./ReducerAction";

export const InitiativeStateContext = createContext<InitiativeState>(
  inititalInitiatveState,
);
export const InitiativeStateDispatchContext = createContext<
  React.ActionDispatch<[action: ReducerAction]>
>(() => console.error("No dispatch provided."));
