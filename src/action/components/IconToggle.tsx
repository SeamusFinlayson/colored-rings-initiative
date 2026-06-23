import { cn } from "../../cn";

export function IconToggle({
  checkedIcon,
  unCheckedIcon,
  checked,
  text,
  color = "DEFAULT",
  onClick,
  onContextMenu,
  ...props
}: {
  checkedIcon: React.ReactNode;
  unCheckedIcon: React.ReactNode;
  checked: boolean;
  text?: string;
  color: "YELLOW" | "PINK" | "DEFAULT";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "grid w-12 shrink-0 place-items-center transition-colors",
        { "hover:bg-pink-400/20 dark:hover:bg-pink-300/20": color === "PINK" },
        {
          "hover:bg-yellow-400/20 dark:hover:bg-yellow-300/20":
            color === "YELLOW",
        },
        {
          "hover:bg-purple-400/20 dark:hover:bg-purple-300/20":
            color === "DEFAULT",
        },
      )}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        if (onContextMenu) onContextMenu(e);
      }}
    >
      <div className="grid place-items-center py-1">
        <div
          data-hide={!checked}
          className={cn(
            "col-start-1 row-start-1 size-6 transition-opacity data-[hide=true]:opacity-0",
            { "text-pink-800 dark:text-pink-200": color === "PINK" },
            { "text-yellow-800 dark:text-yellow-100": color === "YELLOW" },
            { "text-purple-600 dark:text-purple-400": color === "DEFAULT" },
          )}
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
    </button>
  );
}
