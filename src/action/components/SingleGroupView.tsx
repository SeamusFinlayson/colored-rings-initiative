import { useState } from "react";
import type { RingGroup } from "../types/RingGroup";
import { GroupCard } from "./GroupCard";
import {
  ArrowLeftIcon,
  FocusIcon,
  SearchIcon,
  SquareDashedMousePointerIcon,
  TagIcon,
  XIcon,
} from "lucide-react";
import OBR from "@owlbear-rodeo/sdk";
import { focusItems } from "../helpers/focusItems";

export function SingleGroupView({
  group,
  onBackClick,
}: {
  group: RingGroup;
  onBackClick: () => void;
}) {
  const [selection, setSelection] = useState<string[]>([]);

  return (
    <div>
      <div
        style={{
          backgroundColor: group.color + "40",
        }}
      >
        {selection.length === 0 ? (
          <div className="flex size-full h-12 items-center font-semibold">
            <button
              className="grid h-12 w-12 place-items-center hover:bg-white/10"
              onClick={onBackClick}
            >
              <ArrowLeftIcon />
            </button>
            <button
              className="block h-12 w-12 grow basis-0 truncate px-2 text-sm hover:bg-white/10"
              onClick={() =>
                setSelection(group.tokens.map((token) => token.item.id))
              }
            >
              {group.name}
            </button>
          </div>
        ) : (
          <div className="flex h-12">
            <button
              className="flex h-12 items-center justify-center gap-2 px-4 hover:bg-white/20"
              onClick={() => setSelection([])}
            >
              <XIcon />
              <div className="grid min-w-3 place-items-center font-bold">
                {selection.length}
              </div>
            </button>
            <div className="grow"></div>
            <button
              className="grid h-12 grow place-items-center hover:bg-white/20"
              onClick={() => {
                OBR.player.select(selection);
                setSelection([]);
              }}
            >
              <SquareDashedMousePointerIcon />
            </button>
            <button
              className="grid h-12 grow place-items-center hover:bg-white/20"
              onClick={() => {
                OBR.player.select(selection);
                focusItems(selection);
                setSelection([]);
              }}
            >
              <FocusIcon />
            </button>
            <button
              className="grid h-12 grow place-items-center hover:bg-white/20"
              onClick={() => {
                OBR.player.select(selection);
                focusItems(selection);
                setSelection([]);
              }}
            >
              <TagIcon />
            </button>
          </div>
        )}
      </div>
      {group.tokens
        .map((token) => {
          const ring = token.rings.at(1);
          const color = ring
            ? ring.style.strokeColor
            : token.rings[0].style.strokeColor;
          return {
            name: token.item.name,
            catagory: group.catagory,
            color,
            tokens: [token],
          };
        })
        .sort(
          (a, b) =>
            parseInt("0x" + b.color.substring(1)) -
            parseInt("0x" + a.color.substring(1)),
        )
        .sort((a) => (a.color === group.color ? -1 : 0))

        .map((val) => {
          const id = val.tokens[0].item.id;

          return (
            <GroupCard
              key={val.tokens[0].item.id}
              color={val.color}
              name={val.name}
              tokens={val.tokens}
              onGroupClick={() =>
                setSelection(
                  selection.includes(id)
                    ? selection.filter((val) => val !== id)
                    : [...selection, id],
                )
              }
              showReaction={selection.length === 0}
              showTurn={selection.length === 0}
              highlight={selection.includes(id)}
            />
          );
        })}
    </div>
  );
}
