import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover";

export function RoundCounter({
  roundNumber,
  updateRoundNumber,
}: {
  roundNumber: number;
  updateRoundNumber: (number: number) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button className="w-22">{`Round ${roundNumber}`}</Button>}
      />
      <PopoverContent className="overflow-y-auto">
        <PopoverHeader hidden>
          <PopoverTitle>Round</PopoverTitle>
        </PopoverHeader>
        <div className="space-y-2.5 p-2.5">
          <div className="flex gap-1">
            <Button
              size={"icon"}
              variant={"transparent"}
              disabled={roundNumber <= 1}
              onClick={() => updateRoundNumber(roundNumber - 1)}
            >
              <MinusIcon />
            </Button>
            <Button
              className="grow"
              variant={"transparent"}
              disabled={roundNumber <= 1}
              onClick={() => updateRoundNumber(1)}
            >
              Reset
            </Button>
            <Button
              size={"icon"}
              variant={"transparent"}
              disabled={roundNumber >= 99}
              onClick={() => updateRoundNumber(roundNumber + 1)}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
