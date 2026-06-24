import { cn } from "../../../cn";

export default function TokenImage({
  src,
  outline = false,
}: {
  src: string;
  outline?: boolean;
}) {
  return (
    <img
      className={cn("tokenIcon max-h-11 max-w-10 object-scale-down", {
        "animate-jump": outline,
      })}
      src={src}
    />
  );
}
