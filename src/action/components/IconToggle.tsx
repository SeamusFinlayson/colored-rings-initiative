import { cn } from "../../cn";

export function IconToggle({
  checkedIcon,
  unCheckedIcon,
  checked,
  onClick,
  text,
  color = "DEFAULT",
}: {
  checkedIcon: React.ReactNode;
  unCheckedIcon: React.ReactNode;
  checked: boolean;
  onClick: () => void;
  text?: string;
  color: "YELLOW" | "PINK" | "DEFAULT";
}) {
  return (
    <button
      className={cn(
        "grid w-12 shrink-0 place-items-center transition-colors",
        { "hover:bg-pink-300/10": color === "PINK" },
        { "hover:bg-yellow-300/10": color === "YELLOW" },
        { "hover:bg-purple-300/10": color === "DEFAULT" },
      )}
      onClick={onClick}
    >
      <div className="grid place-items-center py-1">
        <div
          data-hide={!checked}
          className={cn(
            "col-start-1 row-start-1 size-6 transition-opacity data-[hide=true]:opacity-0",
            { "text-pink-200 dark:text-pink-400": color === "PINK" },
            { "text-yellow-200 dark:text-yellow-300": color === "YELLOW" },
            { "text-purple-200 dark:text-purple-400": color === "DEFAULT" },
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
