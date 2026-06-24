import { RefreshCcwIcon } from "lucide-react";
import { updateInitiaitiveData } from "../../helpers/initiativeData";
import { Button } from "../../ui/button";
import type { TokenGroup } from "../../types/TokenGroup";

export function ResetButton({
  tokenGroups,
  round,
  updateround,
}: {
  tokenGroups: TokenGroup[];
  round: number;
  updateround: (round: number) => void;
}) {
  const turnsRemaining = tokenGroups
    .flatMap((tokenGroup) =>
      tokenGroup.tokens.flatMap((token) => token.data.turnsRemaining),
    )
    .reduce((acc, val) => acc + val, 0);
  const totalTurns = tokenGroups
    .flatMap((tokenGroup) =>
      tokenGroup.tokens.flatMap((token) => token.data.totalTurns),
    )
    .reduce((acc, val) => acc + val, 0);

  const lastTurn = turnsRemaining === 0 && totalTurns;

  return (
    <Button
      size={"icon"}
      data-dim={!lastTurn}
      className="data-[dim=true]:opacity-50"
      disabled={totalTurns === 0}
      variant={lastTurn ? "purple" : "ghost"}
      onClick={() => {
        const tokens = tokenGroups.flatMap((group) => group.tokens);
        updateInitiaitiveData(
          tokens.map((token) => ({
            itemId: token.item.id,
            data: {
              hasReaction: true,
              turnsRemaining: token.data.totalTurns,
            },
          })),
        );
        if (lastTurn) updateround(round + 1);
      }}
    >
      <RefreshCcwIcon />
    </Button>
  );
}
