import { ArrowUpDownIcon, CheckIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../ui/popover";
import { useState } from "react";
import { Button } from "../../ui/button";

export function SwitchCatagoryPopover({
  backgroundColor,
  currentCatagory,
  catagories,
  onSelection,
}: {
  backgroundColor: string;
  currentCatagory: string;
  catagories: string[];
  onSelection: (catagory: string) => void;
}) {
  const [newCatagory, setNewCatagory] = useState("");

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button title="Move to Catagory" className="grow">
            <ArrowUpDownIcon />
          </Button>
        }
      />
      <PopoverContent style={{ backgroundColor }} className="overflow-y-auto">
        <PopoverHeader>
          <PopoverTitle>Move to Catagory</PopoverTitle>
        </PopoverHeader>
        <div className="space-y-2.5 p-2.5 pt-0">
          <div className="flex flex-wrap gap-0.5">
            {[...catagories].map((catagory) => (
              <Button
                variant={"transparent"}
                key={catagory}
                disabled={catagory === currentCatagory}
                size={"sm"}
                className="block"
                onClick={() => onSelection(catagory)}
              >
                {catagory}
              </Button>
            ))}
          </div>
          <div className="flex w-full gap-2">
            <input
              placeholder="Custom"
              className="h-8 w-20 grow basis-0 border-2 border-white/60 px-2 transition-colors outline-none focus:border-white"
              value={newCatagory}
              onChange={(e) => setNewCatagory(e.target.value)}
            />
            <Button
              variant={"transparent"}
              size={"icon-sm"}
              disabled={newCatagory === ""}
              onClick={() => onSelection(newCatagory)}
            >
              <CheckIcon />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
