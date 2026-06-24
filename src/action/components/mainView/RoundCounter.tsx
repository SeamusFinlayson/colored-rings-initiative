import { MinusIcon, PlusIcon } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../ui/popover";

export function RoundCounter({
  round,
  updateround,
}: {
  round: number;
  updateround: (round: number) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={<Button className="w-22">{`Round ${round}`}</Button>}
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
              disabled={round <= 1}
              onClick={() => updateround(round - 1)}
            >
              <MinusIcon />
            </Button>
            <Button
              className="grow"
              variant={"transparent"}
              disabled={round <= 1}
              onClick={() => updateround(1)}
            >
              Reset
            </Button>
            <Button
              size={"icon"}
              variant={"transparent"}
              disabled={round >= 99}
              onClick={() => updateround(round + 1)}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
