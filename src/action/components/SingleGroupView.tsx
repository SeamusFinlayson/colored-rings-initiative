import type { RingGroup } from "../types/RingGroup";
import { GroupCard } from "./GroupCard";

export function SingleGroupView({
  group,
  onBackClick,
}: {
  group: RingGroup;
  onBackClick: () => void;
}) {
  return (
    <div>
      <div
        style={{
          backgroundColor: group.color + "40",
        }}
        className="flex px-4 py-3 font-bold"
      >
        <button
          className="grid size-6 place-items-center hover:bg-white/20"
          onClick={onBackClick}
        >
          <div>{"<-"}</div>
        </button>
        <div className="truncate">{group.name}</div>
      </div>
      {group.tokens
        .map((token) => {
          const ring = token.rings.at(1);
          const color = ring
            ? ring.style.strokeColor
            : token.rings[0].style.strokeColor;
          return {
            name: token.item.name,
            color,
            tokens: [token],
          };
        })
        .sort((a, b) =>
          a.color === group.color ? -5 : a.color.localeCompare(b.color),
        )
        .map((val) => (
          <GroupCard key={val.tokens[0].item.id} group={val} />
        ))}
    </div>
  );
}
