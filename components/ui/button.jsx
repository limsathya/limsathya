import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-[color,background-color,border-color,filter,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-onAccent hover:brightness-110",
        ember:
          "bg-gradient-to-br from-ember to-flame text-onAccent font-semibold shadow-[0_10px_30px_-12px_rgba(246,162,60,0.6)] hover:brightness-105 hover:-translate-y-px",
        outline:
          "border border-line bg-transparent text-foreground hover:border-ember/50 hover:text-accentInk hover:bg-ember/5",
        ghost: "bg-transparent text-foreground hover:bg-ember/5 hover:text-accentInk",
      },
      size: {
        default: "px-5 py-2.5",
        lg: "px-6 py-3 text-[0.95rem]",
        sm: "px-4 py-2 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

const Button = React.forwardRef(function Button(
  { className, variant, size, ...props },
  ref
) {
  return (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
});

export { Button, buttonVariants };
