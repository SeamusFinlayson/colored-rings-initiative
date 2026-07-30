import type { TokenGroup } from "../../types/TokenGroup";
import { GroupCard } from "../groupCard/GroupCard";
import { ArrowLeftIcon, FocusIcon, XIcon } from "lucide-react";
import OBR from "@owlbear-rodeo/sdk";
import { focusItems } from "../../helpers/focusItems";
import HeightMatch from "../../helpers/HeightMatch";
import { ScrollArea } from "../../ui/scrollArea";
import { switchToCatagory } from "../../helpers/switchToCatagory";
import { SwitchCatagoryPopover } from "./SwitchCatagoryPopover";
import { Button } from "../../ui/button";
import {
  getColorfulSurface,
  getDimTintedBackground,
} from "../../helpers/colorCssHelpers";
import { MoreOptionsPopover } from "./MoreOptionsPopover";
import { useContext } from "react";
import { ThemeModeContext } from "../../helpers/themeModeContext";
import {
  InitiativeStateContext,
  InitiativeStateDispatchContext,
} from "../../helpers/initiativeState/inititativeStateContext";

export function SingleGroupView({ tokenGroup }: { tokenGroup: TokenGroup }) {
  const initiativeState = useContext(InitiativeStateContext);
  const initiativeStateDispatch = useContext(InitiativeStateDispatchContext);

  const selectedItems = initiativeState.selectedItems;
  const tokenGroups = initiativeState.tokenGroups;
  const catagories = initiativeState.catagories;

  const themeMode = useContext(ThemeModeContext);

  const dimTintedBackground = getDimTintedBackground(
    tokenGroup.color,
    themeMode,
  );
  const colorfulSurface = getColorfulSurface(tokenGroup.color, themeMode);

  return (
    <div className="flex h-screen flex-col">
      <div
        style={{
          backgroundColor:
            selectedItems.length > 0 ? colorfulSurface : dimTintedBackground,
        }}
        className="transition-colors"
      >
        <div className="flex h-12 items-stretch font-semibold">
          <Button
            size={"icon"}
            onClick={() => {
              initiativeStateDispatch({
                type: "setGroupSelector",
                groupSelector: undefined,
              });
              initiativeStateDispatch({
                type: "setSelectedItems",
                selectedItems: [],
              });
            }}
          >
            <ArrowLeftIcon />
          </Button>
          <div className="my-3 border-l border-white" />
          {selectedItems.length === 0 ? (
            <Button
              title="Select All"
              className="shrink grow justify-start text-left"
              onClick={() =>
                initiativeStateDispatch({
                  type: "setSelectedItems",
                  selectedItems: tokenGroup.tokens.map(
                    (token) => token.item.id,
                  ),
                })
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
                onClick={() =>
                  initiativeStateDispatch({
                    type: "setSelectedItems",
                    selectedItems: [],
                  })
                }
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
                  initiativeStateDispatch({
                    type: "setSelectedItems",
                    selectedItems: [],
                  });
                }}
              >
                <FocusIcon />
              </Button>
              <SwitchCatagoryPopover
                color={tokenGroup.color}
                currentCatagory={tokenGroup.catagory}
                catagories={catagories}
                onSelection={(catagory) => {
                  OBR.player.select(selectedItems);
                  switchToCatagory(catagory, selectedItems);
                  initiativeStateDispatch({
                    type: "setGroupSelector",
                    groupSelector: undefined,
                  });
                  initiativeStateDispatch({
                    type: "setSelectedItems",
                    selectedItems: [],
                  });
                }}
              />
              <MoreOptionsPopover
                color={tokenGroup.color}
                selectedItems={selectedItems}
                setSelection={(selectedItems) =>
                  initiativeStateDispatch({
                    type: "setSelectedItems",
                    selectedItems,
                  })
                }
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
                  tokenGroups={tokenGroups}
                  onClick={() =>
                    initiativeStateDispatch({
                      type: "setSelectedItems",
                      selectedItems: selectedItems.includes(id)
                        ? selectedItems.filter((val) => val !== id)
                        : [...selectedItems, id],
                    })
                  }
                  mode={selectedItems.length > 0 ? "SELECTION" : "INITIATIVE"}
                  selected={selectedItems.includes(id)}
                />
              );
            })}
          </div>
          <div
            className="h-4"
            style={{ backgroundColor: dimTintedBackground }}
          />
        </HeightMatch>
      </ScrollArea>
      <div style={{ backgroundColor: dimTintedBackground }} className="grow" />
    </div>
  );
}
