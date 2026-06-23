import type { TokenGroup } from "../../types/TokenGroup";
import { GroupCard } from "../GroupCard";
import { ArrowLeftIcon, FocusIcon, XIcon } from "lucide-react";
import OBR from "@owlbear-rodeo/sdk";
import { focusItems } from "../../helpers/focusItems";
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
import { MoreOptionsPopover } from "./MoreOptionsPopover";
import { useCallback } from "react";

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

  const setSelection = useCallback(
    (selectedItems: string[]) =>
      setAppState((prev) => ({ ...prev, selectedItems })),
    [setAppState],
  );

  return (
    <div className="flex h-screen flex-col">
      <div
        style={{
          backgroundColor:
            selectedItems.length > 0 ? colorfulSurface : tintedBackground,
        }}
        className="transition-colors"
      >
        <div className="flex h-12 items-stretch font-semibold">
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
          <div className="my-3 border-l border-white" />
          {selectedItems.length === 0 ? (
            <Button
              title="Select All"
              className="shrink grow justify-start text-left"
              onClick={() =>
                setSelection(tokenGroup.tokens.map((token) => token.item.id))
              }
            >
              {tokenGroup.name}
            </Button>
          ) : (
            <>
              <Button
                title="Deselect All"
                size={"icon"}
                className="flex h-12 grow items-center justify-center gap-1 hover:bg-white/20"
                onClick={() => setSelection([])}
              >
                <XIcon />
                <div className="grid min-w-3 place-items-center font-bold">
                  {selectedItems.length}
                </div>
              </Button>
              <Button
                size={"icon"}
                title="Focus"
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
              <MoreOptionsPopover
                backgroundColor={mutedSurface}
                selectedItems={selectedItems}
                setSelection={setSelection}
                tokenGroup={tokenGroup}
              />
            </>
          )}
        </div>
      </div>
      <ScrollArea className="max-h-[calc(100%-48px)]">
        <HeightMatch
          setHeight={(height) => {
            OBR.action.setHeight(Math.max(360, height + 48 + 1));
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
