import OBR from "@owlbear-rodeo/sdk";
import { useEffect, useState } from "react";

export function usePlayerSelection() {
  const [playerSelection, setPlayerSelection] = useState<string[]>([]);
  useEffect(() => {
    const handleItems = (selection: string[] | undefined) => {
      setPlayerSelection(selection ? selection : []);
    };

    OBR.player.getSelection().then(handleItems);
    return OBR.player.onChange((player) => handleItems(player.selection));
  }, []);

  return playerSelection;
}
