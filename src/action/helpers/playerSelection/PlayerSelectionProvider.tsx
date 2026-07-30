import type React from "react";
import { PlayerSelectionContext } from "./playerSelectionContext";
import { usePlayerSelection } from "./usePlayerSelection";

export function PlayerSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const playerSelection = usePlayerSelection();

  return (
    <PlayerSelectionContext value={playerSelection}>
      {children}
    </PlayerSelectionContext>
  );
}
