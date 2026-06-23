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
        <div className="flex flex-wrap gap-2 p-2 pt-0">
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
          <div className="flex w-full gap-2">
            <input
              placeholder="Custom"
              className="h-8 w-20 grow basis-0 border-2 border-white/10 px-2 outline-none focus:border-white"
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
