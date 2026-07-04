import { Button } from "../../../ui/button";

export function IconToggle({
  checkedIcon,
  unCheckedIcon,
  text,
  color = "pink",
  checked,
  active,
  onContextMenu,
  onClick,
  ...props
}: {
  checkedIcon: React.ReactNode;
  unCheckedIcon: React.ReactNode;
  text?: string;
  color?: "yellow" | "pink";
  checked: boolean;
  active?: boolean;
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
      <div
        data-rotate={active}
        className="grid origin-[20%_80%] place-items-center py-1 transition-transform data-[rotate=true]:-translate-y-0.5 data-[rotate=true]:rotate-15"
      >
        <div
          data-hide={!checked}
          className="col-start-1 row-start-1 size-6 transition-opacity data-[hide=true]:opacity-0"
        >
          {checkedIcon}
        </div>
        <div
          data-dim={!active && !checked}
          data-hide={checked}
          className="col-start-1 row-start-1 size-6 transition-opacity data-[dim=true]:opacity-15 data-[hide=true]:opacity-0"
        >
          {unCheckedIcon}
        </div>
      </div>
      {text && (
        <div
          data-dim={!active && !checked}
          className="text-xs font-semibold transition-opacity data-[dim=true]:opacity-15"
        >
          {text}
        </div>
      )}
    </Button>
  );
}
