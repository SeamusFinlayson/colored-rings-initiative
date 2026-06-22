import { useState } from "react";
import type { TokenGroup } from "../types/TokenGroup";
import { GroupCard } from "./GroupCard";
import {
  ArrowLeftIcon,
  ArrowUpDownIcon,
  FocusIcon,
  ListXIcon,
  XIcon,
} from "lucide-react";
import OBR from "@owlbear-rodeo/sdk";
import { focusItems } from "../helpers/focusItems";
import { removeFromInitiative } from "../helpers/removeFromInitiative";
import { switchToCatagory } from "../helpers/switchToCatagory";
import HeightMatch from "../helpers/HeightMatch";

export function SingleGroupView({
  tokenGroup,
  onBackClick,
}: {
  tokenGroup: TokenGroup;
  onBackClick: () => void;
}) {
  const [selection, setSelection] = useState<string[]>([]);

  const nextCatagory =
    tokenGroup.catagory === "Party" ? "Adversaries" : "Party";

  return (
    <div className="flex h-screen flex-col">
      <div
        style={{
          backgroundColor:
            tokenGroup.color + (selection.length > 0 ? "80" : "40"),
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
              title="Select All"
              className="h-12 w-12 grow basis-0 truncate px-2 text-start text-sm hover:bg-white/10"
              onClick={() =>
                setSelection(tokenGroup.tokens.map((token) => token.item.id))
              }
            >
              {tokenGroup.name}
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
            <div className="my-3 border-l border-white"></div>
            <button
              title="Focus"
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
              title={`Move to ${nextCatagory}`}
              className="grid h-12 grow place-items-center hover:bg-white/20"
              onClick={() => {
                switchToCatagory(nextCatagory, selection);
                OBR.player.select(selection);
                onBackClick();
              }}
            >
              <ArrowUpDownIcon />
            </button>
            <button
              title="Remove"
              className="grid h-12 grow place-items-center hover:bg-white/20"
              onClick={() => {
                removeFromInitiative(
                  tokenGroup.tokens.filter((token) =>
                    selection.includes(token.item.id),
                  ),
                );
                setSelection([]);
              }}
            >
              <ListXIcon />
            </button>
          </div>
        )}
      </div>
      <div className="grow overflow-y-auto">
        <HeightMatch setHeight={(height) => OBR.action.setHeight(height + 48)}>
          {tokenGroup.tokens.map((token) => {
            const ring0 = token.rings.at(0);
            const ring1 = token.rings.at(1);
            const color = ring1
              ? ring1.style.strokeColor
              : ring0
                ? ring0.style.strokeColor
                : null;
            const id = token.item.id;

            return (
              <GroupCard
                key={token.item.id}
                color={color}
                name={token.item.name}
                tokens={[token]}
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
        </HeightMatch>
      </div>
    </div>
  );
}
