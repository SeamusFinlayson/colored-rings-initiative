import {
  InitiativeStateContext,
  InitiativeStateDispatchContext,
} from "./inititativeStateContext";
import { useInitiativeState } from "./useInitiativeState";

export function InitiativeStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initiativeState, initiativeStateDispatch] = useInitiativeState();

  return (
    <InitiativeStateContext value={initiativeState}>
      <InitiativeStateDispatchContext value={initiativeStateDispatch}>
        {children}
      </InitiativeStateDispatchContext>
    </InitiativeStateContext>
  );
}
