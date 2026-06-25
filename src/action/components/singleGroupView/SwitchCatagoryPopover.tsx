import { ArrowUpDownIcon, CheckIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../ui/popover";
import { useContext, useState } from "react";
import { Button } from "../../ui/button";
import { getMutedSurface } from "../../helpers/colorCssHelpers";
import { ThemeModeContext } from "../../helpers/ThemeModeContext";

export function SwitchCatagoryPopover({
  color,
  currentCatagory,
  catagories,
  onSelection,
}: {
  color: string | null;
  currentCatagory: string;
  catagories: string[];
  onSelection: (catagory: string) => void;
}) {
  const themeMode = useContext(ThemeModeContext);
  const [newCatagory, setNewCatagory] = useState("");

  const backgroundColor = getMutedSurface(color, themeMode);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button title="Move to Catagory" size={"icon"}>
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
              className="h-8 w-20 grow basis-0 border-2 border-black/60 px-2 transition-colors outline-none focus:border-black dark:border-white/60 dark:focus:border-white"
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
