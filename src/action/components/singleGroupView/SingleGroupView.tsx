import { useState } from "react";
import type { TokenGroup } from "../../types/TokenGroup";
import { GroupCard } from "../GroupCard";
import { ArrowLeftIcon, FocusIcon, ListXIcon, XIcon } from "lucide-react";
import OBR from "@owlbear-rodeo/sdk";
import { focusItems } from "../../helpers/focusItems";
import { removeFromInitiative } from "../../helpers/removeFromInitiative";
import HeightMatch from "../../helpers/HeightMatch";
import { ScrollArea } from "../../ui/scrollArea";

import { switchToCatagory } from "../../helpers/switchToCatagory";
import { hexToHsl } from "../../helpers/hexToHsl";
import { SwitchCatagoryPopover } from "./SwitchCatagoryPopover";
import { Button } from "../../ui/button";

export function SingleGroupView({
  tokenGroup,
  catagories,
  onBackClick,
}: {
  tokenGroup: TokenGroup;
  catagories: string[];
  onBackClick: () => void;
}) {
  const [selection, setSelection] = useState<string[]>([]);

  const hsl = hexToHsl(tokenGroup.color ?? "#000000");
  console.log(hsl);
  const backgroundColor = `hsl(${hsl.h} ${hsl.s} ${20})`;

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
            <Button size={"icon"} onClick={onBackClick}>
              <ArrowLeftIcon />
            </Button>
            <Button
              title="Select All"
              className="shrink grow justify-start text-left"
              onClick={() =>
                setSelection(tokenGroup.tokens.map((token) => token.item.id))
              }
            >
              {tokenGroup.name}
            </Button>
          </div>
        ) : (
          <div className="flex h-12">
            <Button
              title="Deselect All"
              className="flex h-12 items-center justify-center gap-2 px-4 hover:bg-white/20"
              onClick={() => setSelection([])}
            >
              <XIcon />
              <div className="grid min-w-3 place-items-center font-bold">
                {selection.length}
              </div>
            </Button>
            <div className="my-3 border-l border-white"></div>
            <Button
              size={"icon"}
              title="Focus"
              className="grow"
              onClick={() => {
                OBR.player.select(selection);
                focusItems(selection);
                setSelection([]);
              }}
            >
              <FocusIcon />
            </Button>
            <SwitchCatagoryPopover
              currentCatagory={tokenGroup.catagory}
              backgroundColor={backgroundColor}
              catagories={catagories}
              onSelection={(catagory) => {
                OBR.player.select(selection);
                switchToCatagory(catagory, selection);
              }}
            />
            <Button
              size={"icon"}
              title="Remove"
              className="grow"
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
            </Button>
          </div>
        )}
      </div>
      <ScrollArea className="h-0 grow">
        <HeightMatch
          setHeight={(height) =>
            OBR.action.setHeight(Math.max(360, height + 48))
          }
        >
          <div className="pb-4">
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
          </div>
        </HeightMatch>
      </ScrollArea>
    </div>
  );
}
