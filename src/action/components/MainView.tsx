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
      <div className="px-4 py-3 font-bold">Initiative</div>
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
