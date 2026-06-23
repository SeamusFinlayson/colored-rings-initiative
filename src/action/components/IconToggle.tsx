import { cn } from "../../cn";
import { Button } from "../ui/button";

export function IconToggle({
  checkedIcon,
  unCheckedIcon,
  checked,
  text,
  color = "pink",
  onClick,
  onContextMenu,
  ...props
}: {
  checkedIcon: React.ReactNode;
  unCheckedIcon: React.ReactNode;
  checked: boolean;
  text?: string;
  color?: "yellow" | "pink";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      {...props}
      variant={color}
      size={"icon"}
      className="flex-col"
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        if (onContextMenu) onContextMenu(e);
      }}
    >
      <div className="grid place-items-center py-1">
        <div
          data-hide={!checked}
          className="col-start-1 row-start-1 size-6 transition-opacity data-[hide=true]:opacity-0"
        >
          {checkedIcon}
        </div>
        <div
          data-hide={checked}
          className="col-start-1 row-start-1 size-6 opacity-15 transition-opacity data-[hide=true]:opacity-0"
        >
          {unCheckedIcon}
        </div>
      </div>
      {text && (
        <div
          className={cn("text-xs font-semibold transition-opacity", {
            "opacity-15": !checked,
          })}
        >
          {text}
        </div>
      )}
    </Button>
  );
}
