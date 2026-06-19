import { cn } from "../cn";

export default function TokenImage({
  src,
  outline = false,
}: {
  src: string;
  outline?: boolean;
}) {
  return (
    <img
      className={cn("tokenIcon max-h-11 max-w-[30px] object-scale-down", {
        "outline-image dark:outline-image": outline,
      })}
      src={src}
    />
  );
}
