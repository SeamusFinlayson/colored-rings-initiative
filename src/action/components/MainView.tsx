import { updateInitiaitiveData } from "../helpers/initiativeData";
import type { RingGroup } from "../types/RingGroup";
import { GroupCard } from "./GroupCard";

export function MainView({
  ringGroups,
  onGroupClick,
}: {
  ringGroups: RingGroup[];
  onGroupClick: (group: RingGroup) => void;
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
      <div className="flex flex-col">
        {ringGroups.map((group) => (
          <GroupCard
            key={group.color}
            group={group}
            onGroupClick={onGroupClick}
          />
        ))}
      </div>
    </div>
  );
}
