import { RefreshCcwIcon } from "lucide-react";
import { updateItemInitiaitiveData } from "../../helpers/itemInitiativeData";
import { Button } from "../../ui/button";
import type { TokenGroup } from "../../types/TokenGroup";
import { clearActiveLabels } from "../../helpers/labelItems";
import { updateActionInitiativeData } from "../../helpers/updateActionInitiativeData";
import type { Item } from "@owlbear-rodeo/sdk";

export function ResetButton({
  tokenGroups,
  round,
  updateround,
  items,
  updateItems,
}: {
  tokenGroups: TokenGroup[];
  round: number;
  updateround: (round: number) => void;
  items: Item[];
  updateItems: (items: Item[]) => void;
}) {
  const turnsRemaining = tokenGroups
    .flatMap((tokenGroup) =>
      tokenGroup.tokens.flatMap((token) => token.data.turns),
    )
    .reduce((acc, val) => acc + val, 0);
  const totalTurns = tokenGroups
    .flatMap((tokenGroup) =>
      tokenGroup.tokens.flatMap((token) => token.data.turnsMaximum),
    )
    .reduce((acc, val) => acc + val, 0);

  const lastTurn = turnsRemaining === 0 && totalTurns;

  return (
    <Button
      size={"icon"}
      data-dim={!lastTurn}
      className=""
      disabled={totalTurns === 0}
      variant={lastTurn ? "pink" : "ghost"}
      onClick={() => {
        const tokens = tokenGroups.flatMap((group) => group.tokens);
        const updates = tokens.map((token) => ({
          itemId: token.item.id,
          data: {
            reactions: token.data.reactionsMaximum,
            turns: token.data.turnsMaximum,
            active: false,
          },
        }));
        updateItemInitiaitiveData(updates);
        updateActionInitiativeData(updates, items, updateItems);
        clearActiveLabels();
        if (lastTurn) updateround(round + 1);
      }}
    >
      <RefreshCcwIcon />
    </Button>
  );
}
