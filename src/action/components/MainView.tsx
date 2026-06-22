import OBR from "@owlbear-rodeo/sdk";
import HeightMatch from "../helpers/HeightMatch";
import { updateInitiaitiveData } from "../helpers/initiativeData";
import type { GroupSelector } from "../types/GroupSelector";
import type { TokenGroup } from "../types/TokenGroup";
import { GroupCard } from "./GroupCard";
import { RefreshCcwIcon } from "lucide-react";
import { ScrollArea } from "./ui/ScrollArea";

export function MainView({
  catagories,
  tokenGroups,
  onSelect,
}: {
  catagories: string[];
  tokenGroups: TokenGroup[];
  onSelect: (selector: GroupSelector | undefined) => void;
}) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-12 items-center justify-between font-bold">
        <div className="ml-2.5">Initiative</div>
        <button
          className="flex size-12 items-center justify-center hover:bg-white/20"
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
          }}
        >
          <RefreshCcwIcon />
        </button>
      </div>
      <div className="mx-2.5 border-b border-white/12" />
      <ScrollArea className="h-32 grow">
        <HeightMatch setHeight={(height) => OBR.action.setHeight(height + 48)}>
          <div>
            {catagories.map((catagory) => (
              <div key={catagory} className="flex flex-col">
                <div className="mt-2 mb-2 ml-2.5 text-sm text-black/60 uppercase dark:text-white/70">
                  {catagory}
                </div>
                {tokenGroups
                  .filter((group) => group.catagory === catagory)
                  .map((group) => (
                    <GroupCard
                      key={group.color + group.catagory}
                      color={group.color}
                      name={group.name}
                      tokens={group.tokens}
                      onGroupClick={() =>
                        onSelect({
                          color: group.color,
                          catagory: group.catagory,
                          name: group.name,
                        })
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
