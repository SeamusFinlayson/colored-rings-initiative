import { updateInitiaitiveData } from "../helpers/initiativeData";
import type { GroupSelector } from "../types/GroupSelector";
import type { RingGroup } from "../types/RingGroup";
import { GroupCard } from "./GroupCard";

export function MainView({
  catagories,
  ringGroups,
  onSelect,
}: {
  catagories: string[];
  ringGroups: RingGroup[];
  onSelect: (selector: GroupSelector) => void;
}) {
  return (
    <div>
      <div className="flex justify-between px-4 py-3 font-bold">
        <div>Initiative</div>
        <button
          className="hover:bg-white/10"
          onClick={() => {
            const tokens = ringGroups.flatMap((group) => group.tokens);
            updateInitiaitiveData(
              tokens.map((token) => ({
                itemId: token.item.id,
                data: {
                  ...token.data,
                  hasReaction: true,
                  turnsRemaining: token.data.totalTurns,
                },
              })),
            );
          }}
        >
          reset
        </button>
      </div>
      <div className="space-y-1">
        {catagories.map((catagory) => (
          <div key={catagory} className="flex flex-col">
            <div className="ml-1.5">{catagory}</div>
            {ringGroups
              .filter((group) => group.catagory === catagory)
              .map((group) => (
                <GroupCard
                  key={group.color + group.catagory}
                  color={group.color}
                  name={group.name}
                  tokens={group.tokens}
                  onGroupClick={() =>
                    onSelect({ color: group.color, catagory: group.catagory })
                  }
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
