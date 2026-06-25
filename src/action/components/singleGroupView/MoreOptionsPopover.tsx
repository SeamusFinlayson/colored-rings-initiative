import { ListXIcon, MinusIcon, MoreVerticalIcon, PlusIcon } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../ui/popover";
import { Button } from "../../ui/button";
import { removeFromInitiative } from "../../helpers/removeFromInitiative";
import type { TokenGroup } from "../../types/TokenGroup";
import { useContext, useState } from "react";
import { updateInitiaitiveData } from "../../helpers/initiativeData";
import { getMutedSurface } from "../../helpers/colorCssHelpers";
import { ThemeModeContext } from "../../helpers/ThemeModeContext";

export function MoreOptionsPopover({
  tokenGroup,
  selectedItems,
  color,
  setSelection,
}: {
  tokenGroup: TokenGroup;
  selectedItems: string[];
  color: string | null;
  setSelection: (selection: string[]) => void;
}) {
  const themeMode = useContext(ThemeModeContext);
  const [turns, setTurns] = useState(1);

  const backgroundColor = getMutedSurface(color, themeMode);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button title="Options" size={"icon"}>
            <MoreVerticalIcon />
          </Button>
        }
      />
      <PopoverContent style={{ backgroundColor }} className="overflow-y-auto">
        <PopoverHeader>
          <PopoverTitle>Options</PopoverTitle>
        </PopoverHeader>
        <div className="space-y-4 p-2.5 pt-0 pb-4">
          <div>
            <div>Set Turns</div>
            <div className="flex justify-between">
              <div className="flex gap-0.5">
                <Button
                  size={"icon-sm"}
                  variant={"transparent"}
                  disabled={turns <= 1}
                  onClick={() => setTurns(turns - 1)}
                >
                  <MinusIcon />
                </Button>
                <div className="grid size-8 place-items-center">{turns}</div>
                <Button
                  size={"icon-sm"}
                  variant={"transparent"}
                  disabled={turns >= 99}
                  onClick={() => setTurns(turns + 1)}
                >
                  <PlusIcon />
                </Button>
              </div>
              <PopoverClose
                render={
                  <Button
                    size={"sm"}
                    variant={"transparent"}
                    onClick={() => {
                      updateInitiaitiveData(
                        tokenGroup.tokens
                          .filter((token) =>
                            selectedItems.includes(token.item.id),
                          )
                          .map((token) => {
                            const turnsTaken =
                              token.data.totalTurns - token.data.turnsRemaining;
                            let turnsRemaining = turns - turnsTaken;
                            if (turnsRemaining < 0) turnsRemaining = 0;
                            if (turnsRemaining > 99) turnsRemaining = 99;

                            return {
                              itemId: token.item.id,
                              data: {
                                totalTurns: turns,
                                turnsRemaining,
                              },
                            };
                          }),
                      );
                      setSelection([]);
                    }}
                  >
                    Apply
                  </Button>
                }
              />
            </div>
          </div>
          <Button
            variant={"transparent"}
            size={"sm"}
            title="Remove"
            className="w-full justify-start"
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
            <div>Remove Initiaitve</div>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
