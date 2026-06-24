import OBR from "@owlbear-rodeo/sdk";
import HeightMatch from "../helpers/HeightMatch";
import { updateInitiaitiveData } from "../helpers/initiativeData";
import type { TokenGroup } from "../types/TokenGroup";
import { GroupCard } from "./GroupCard";
import { RefreshCcwIcon } from "lucide-react";
import { ScrollArea } from "../ui/scrollArea";
import { Button } from "../ui/button";
import type { AppState } from "../types/AppState";
import { RoundCounter } from "./RoundCounter";

export function MainView({
  catagories,
  tokenGroups,
  roundNumber,
  updateRoundNumber,
  setAppState,
}: {
  catagories: string[];
  tokenGroups: TokenGroup[];
  roundNumber: number;
  updateRoundNumber: (number: number) => void;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
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
    <div className="flex h-screen flex-col">
      <div className="flex h-12 items-center justify-between font-bold">
        <div className="ml-2.5">Initiative</div>

        <div className="flex">
          <RoundCounter
            roundNumber={roundNumber}
            updateRoundNumber={updateRoundNumber}
          />
          <Button
            size={"icon"}
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
              if (lastTurn) updateRoundNumber(roundNumber + 1);
            }}
          >
            <RefreshCcwIcon />
          </Button>
        </div>
      </div>
      <div className="mx-2.5 border-b border-white/12" />
      <ScrollArea className="h-0 grow">
        <HeightMatch
          setHeight={(height) =>
            OBR.action.setHeight(Math.max(300, height + 48 + 1))
          }
        >
          <div className="pb-4">
            {catagories.map((catagory) => (
              <div key={catagory} className="flex flex-col">
                <div className="mt-2 mb-2 ml-2.5 text-sm text-black/60 uppercase dark:text-white/70">
                  {catagory}
                </div>
                {tokenGroups
                  .filter((group) => group.catagory === catagory)
                  .map((group) => (
                    <GroupCard
                      key={
                        group.tokens[0].item.id +
                        group.catagory +
                        group.name +
                        group.color
                      }
                      color={group.color}
                      name={group.name}
                      tokens={group.tokens}
                      onClick={() =>
                        setAppState((prev) => ({
                          ...prev,
                          groupSelector: {
                            color: group.color,
                            catagory: group.catagory,
                            name: group.name,
                          },
                        }))
                      }
                      onDoubleClick={() =>
                        setAppState((prev) => ({
                          ...prev,
                          selectedItems: group.tokens.map(
                            (token) => token.item.id,
                          ),
                          groupSelector: {
                            color: group.color,
                            catagory: group.catagory,
                            name: group.name,
                          },
                        }))
                      }
                    />
                  ))}
              </div>
            ))}
          </div>
        </HeightMatch>
      </ScrollArea>
    </div>
  );
}
