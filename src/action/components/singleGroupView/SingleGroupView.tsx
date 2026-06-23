import type { TokenGroup } from "../../types/TokenGroup";
import { GroupCard } from "../GroupCard";
import { ArrowLeftIcon, FocusIcon, ListXIcon, XIcon } from "lucide-react";
import OBR from "@owlbear-rodeo/sdk";
import { focusItems } from "../../helpers/focusItems";
import { removeFromInitiative } from "../../helpers/removeFromInitiative";
import HeightMatch from "../../helpers/HeightMatch";
import { ScrollArea } from "../../ui/scrollArea";

import { switchToCatagory } from "../../helpers/switchToCatagory";
import { SwitchCatagoryPopover } from "./SwitchCatagoryPopover";
import { Button } from "../../ui/button";
import type { AppState } from "../../types/AppState";
import {
  getColorfulSurface,
  getMutedSurface,
  getTintedBackground,
} from "../../helpers/colorCssHelpers";

export function SingleGroupView({
  selectedItems,
  tokenGroup,
  catagories,
  setAppState,
}: {
  selectedItems: string[];
  tokenGroup: TokenGroup;
  catagories: string[];
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}) {
  const tintedBackground = getTintedBackground(tokenGroup.color);
  const colorfulSurface = getColorfulSurface(tokenGroup.color);
  const mutedSurface = getMutedSurface(tokenGroup.color);

  const setSelection = (selectedItems: string[]) =>
    setAppState((prev) => ({ ...prev, selectedItems }));

  return (
    <div className="flex h-screen flex-col">
      <div
        style={{
          backgroundColor:
            selectedItems.length > 0 ? colorfulSurface : tintedBackground,
        }}
      >
        {selectedItems.length === 0 ? (
          <div className="flex size-full h-12 items-center font-semibold">
            <Button
              size={"icon"}
              onClick={() =>
                setAppState((prev) => ({
                  ...prev,
                  groupSelector: undefined,
                  selectedItems: [],
                }))
              }
            >
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
                {selectedItems.length}
              </div>
            </Button>
            <div className="my-3 border-l border-white"></div>
            <Button
              size={"icon"}
              title="Focus"
              className="grow"
              onClick={() => {
                OBR.player.select(selectedItems);
                focusItems(selectedItems);
                setSelection([]);
              }}
            >
              <FocusIcon />
            </Button>
            <SwitchCatagoryPopover
              currentCatagory={tokenGroup.catagory}
              backgroundColor={mutedSurface}
              catagories={catagories}
              onSelection={(catagory) => {
                OBR.player.select(selectedItems);
                switchToCatagory(catagory, selectedItems);
                setAppState((prev) => ({
                  ...prev,
                  selectedItems: [],
                  groupSelector: undefined,
                }));
              }}
            />
            <Button
              size={"icon"}
              title="Remove"
              className="grow"
              onClick={() => {
                removeFromInitiative(
                  tokenGroup.tokens.filter((token) =>
                    selectedItems.includes(token.item.id),
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
      <ScrollArea className="max-h-[calc(100%-48px)]">
        <HeightMatch
          setHeight={(height) => {
            OBR.action.setHeight(Math.max(360, height + 48));
          }}
        >
          <div>
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
                  onClick={() =>
                    setSelection(
                      selectedItems.includes(id)
                        ? selectedItems.filter((val) => val !== id)
                        : [...selectedItems, id],
                    )
                  }
                  showReaction={selectedItems.length === 0}
                  mode={selectedItems.length > 0 ? "SELECTION" : "INITIATIVE"}
                  selected={selectedItems.includes(id)}
                />
              );
            })}
          </div>
          <div className="h-4" style={{ backgroundColor: tintedBackground }} />
        </HeightMatch>
      </ScrollArea>
      <div
        style={{ backgroundColor: tintedBackground }}
        className="h-full grow"
      />
    </div>
  );
}
