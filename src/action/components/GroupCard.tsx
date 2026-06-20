import { useState } from "react";
import { ReactionFilled } from "../icons/ReactionFilled";
import { ReactionOutline } from "../icons/ReactionOutline";
import { ReadyFilled } from "../icons/ReadyFilled";
import { ReadyOutline } from "../icons/ReadyOutline";
import type { RingGroup } from "../types/RingGroup";
import TokenImage from "./TokenImage";
import { cn } from "../../cn";
import { IconToggle } from "./IconToggle";

export function GroupCard({
  group,
  onGroupClick,
}: {
  group: RingGroup;
  onGroupClick: (group: RingGroup) => void;
}) {
  const [hasReaction, setHasReaction] = useState(true);
  const [hasTurn, setHasTurn] = useState(true);

  const groupSize = group.tokens.length;
  const reactionsRemaining = groupSize * (hasReaction ? 1 : 0);
  const turnsRemaining = groupSize * (hasTurn ? 1 : 0);

  const reactionText =
    groupSize > 1 ? `${reactionsRemaining}/${groupSize}` : undefined;
  const turnText = groupSize > 1 ? `${turnsRemaining}/${groupSize}` : undefined;

  const backgroundColor = group.color
    ? group.color + (hasTurn ? "40" : "20")
    : null;
  const barColor = group.color ? group.color + (hasTurn ? "" : "70") : null;

  return (
    <div
      style={backgroundColor ? { backgroundColor } : {}}
      className="flex h-12 items-stretch justify-between transition-colors"
    >
      <div
        style={barColor ? { backgroundColor: barColor } : {}}
        className="w-1.5"
      />

      <button
        className="grid grow transition-colors hover:bg-white/8"
        onClick={() => onGroupClick(group)}
      >
        <div className="col-start-1 row-start-1 ml-1 flex self-center">
          {group.tokens
            .filter((_val, index) => index < 8)
            .map((token, index) => (
              <div
                key={token.item.id}
                style={{ zIndex: -index + 40 }}
                className={cn({
                  "-mr-1.5": group.tokens.length > 3,
                  "-mr-3.75": group.tokens.length > 4,
                  "-mr-5": group.tokens.length > 5,
                  "-mr-5.75": group.tokens.length > 6,
                  "mr-[-25.5px]": group.tokens.length > 7,
                })}
              >
                <TokenImage key={token.item.id} src={token.item.image.url} />
              </div>
            ))}
        </div>
        <div className="relative z-50 col-start-1 row-start-1 w-full self-end justify-self-start truncate bg-linear-to-r from-white/70 via-white/70 to-white/0 px-1 dark:from-black/60 dark:via-black/20 dark:to-black/0">
          <div
            data-dim={!hasTurn}
            className="max-w-full truncate text-left text-xs font-semibold text-nowrap text-ellipsis transition-opacity data-[dim=true]:opacity-50"
          >
            {group.name}
          </div>
        </div>
        <div className="z-50 col-start-1 row-start-1 flex gap-1 self-start justify-self-start px-1 pt-0.5 text-xs">
          {group.tokens.length > 8 && (
            <div className="rounded-full bg-white/70 px-1 font-semibold dark:bg-black/20">{`+${group.tokens.length - 8}`}</div>
          )}
          {/*<div className="font-semibold  bg-white/70 dark:bg-black/40 rounded-full px-1">
            2 hidden
          </div>*/}
        </div>
      </button>

      <IconToggle
        checked={hasReaction}
        onClick={() => setHasReaction(!hasReaction)}
        text={reactionText}
        checkedIcon={<ReactionFilled />}
        unCheckedIcon={<ReactionOutline />}
        color="YELLOW"
      />
      <IconToggle
        checked={hasTurn}
        onClick={() => setHasTurn(!hasTurn)}
        text={turnText}
        checkedIcon={<ReadyFilled />}
        unCheckedIcon={<ReadyOutline />}
        color="PINK"
      />
    </div>
  );
}
