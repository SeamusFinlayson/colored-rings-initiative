import { cn } from "../../cn";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("", {
  variants: {
    core: {
      default:
        "flex items-center-safe shrink-0 justify-center disabled:opacity-50 disabled:pointer-events-none text-sm overflow-clip",
      none: "",
    },
    variant: {
      ghost: "hover:bg-white/20 transition-colors",
      transparent: "bg-white/10 hover:bg-white/20 transition-colors",
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
