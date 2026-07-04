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
import { RoomDataContext } from "../../helpers/roomDataContext";

function Counter({
  value,
  setValue,
  range = { min: 1, max: 99 },
}: {
  value: number;
  setValue: (value: number) => void;
  range?: { min: number; max: number };
}) {
  return (
    <div className="flex gap-0.5">
      <Button
        size={"icon-sm"}
        variant={"transparent"}
        disabled={value <= range.min}
        onClick={() => setValue(value - 1)}
      >
        <MinusIcon />
      </Button>
      <div className="grid size-8 place-items-center">{value}</div>
      <Button
        size={"icon-sm"}
        variant={"transparent"}
        disabled={value >= range.max}
        onClick={() => setValue(value + 1)}
      >
        <PlusIcon />
      </Button>
    </div>
  );
}

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
  const roomData = useContext(RoomDataContext);
  const themeMode = useContext(ThemeModeContext);

  const [newReactionsMaximum, setNewReactionsMaximum] = useState(1);
  const [newTurnsMaximum, setNewTurnsMaximum] = useState(1);

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
          <PopoverTitle>Token Options</PopoverTitle>
        </PopoverHeader>
        <div className="space-y-2.5 p-2.5 pt-0">
          {!roomData.hideReaction && (
            <>
              <div className="mb-0.5">Triggered Actions</div>
              <div className="flex justify-between">
                <Counter
                  value={newReactionsMaximum}
                  setValue={setNewReactionsMaximum}
                />
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
                              const ReactionsTaken =
                                token.data.reactionsMaximum -
                                token.data.reactions;
                              let newReactions =
                                newReactionsMaximum - ReactionsTaken;
                              if (newReactions < 0) newReactions = 0;
                              if (newReactions > 99) newReactions = 99;

                              return {
                                itemId: token.item.id,
                                data: {
                                  reactions: newReactions,
                                  reactionsMaximum: newReactionsMaximum,
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
            </>
          )}
          <div className="mb-0.5">Turns</div>
          <div className="flex justify-between">
            <Counter value={newTurnsMaximum} setValue={setNewTurnsMaximum} />
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
                            token.data.turnsMaximum - token.data.turns;
                          let newTurns = newTurnsMaximum - turnsTaken;
                          if (newTurns < 0) newTurns = 0;
                          if (newTurns > 99) newTurns = 99;

                          return {
                            itemId: token.item.id,
                            data: {
                              turns: newTurns,
                              turnsMaximum: newTurnsMaximum,
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
