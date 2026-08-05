import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-300 outline-none disabled:pointer-events-none disabled:opacity-45 focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080a0d] active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "border border-cyan-200/40 bg-cyan-300 text-[#051014] shadow-[0_0_32px_rgba(0,229,255,0.24)] hover:bg-white hover:shadow-[0_0_42px_rgba(0,229,255,0.38)]",
        secondary:
          "border border-white/12 bg-white/[0.055] text-white backdrop-blur-xl hover:border-cyan-200/35 hover:bg-white/[0.09] hover:text-cyan-100",
        ghost:
          "border border-transparent bg-transparent text-white/72 hover:bg-white/[0.06] hover:text-white",
        outline:
          "border border-white/16 bg-transparent text-white hover:border-emerald-300/40 hover:bg-emerald-300/[0.07]",
      },
      size: {
        sm: "h-10 px-4",
        default: "h-12 px-6",
        lg: "h-14 px-7 text-[0.95rem]",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
