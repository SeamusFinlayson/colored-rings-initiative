import { cn } from "../../cn";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("", {
  variants: {
    core: {
      default:
        "flex font-semibold items-center-safe shrink-0 transition-[colors_opacity] justify-center disabled:opacity-50 disabled:pointer-events-none text-sm overflow-clip",
      none: "transition-[colors_opacity] disabled:opacity-50 disabled:pointer-events-none",
    },
    variant: {
      ghost: "hover:bg-white/20 ",
      transparent: "bg-white/10 hover:bg-white/20",
      pink: "text-pink-800 hover:bg-pink-400/20 dark:text-pink-200 dark:hover:bg-pink-300/20",
      yellow:
        "text-yellow-800 hover:bg-yellow-400/20 dark:text-yellow-100 dark:hover:bg-yellow-300/20",
      purple:
        "text-purple-600 hover:bg-purple-400/20 dark:text-purple-300 dark:hover:bg-purple-300/20",
    },
    size: {
      default: "h-12 gap-2 px-2",
      sm: "h-8 gap-2 px-2",
      icon: "size-12",
      "icon-sm": "size-8",
    },
  },
  defaultVariants: {
    core: "default",
    variant: "ghost",
    size: "default",
  },
});

export function Button({
  className,
  core = "default",
  variant = "ghost",
  size = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>) {
  return (
    <button
      {...props}
      className={cn(buttonVariants({ variant, size, core, className }))}
    />
  );
}
