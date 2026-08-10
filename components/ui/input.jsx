import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(function Input({ className, type, ...props }, ref) {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex w-full rounded-xl border border-line bg-night-2/60 px-4 py-2.5 text-sm text-foreground placeholder:text-mist-dim transition-colors focus-visible:outline-none focus-visible:border-ember focus-visible:ring-2 focus-visible:ring-ember/40 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

export { Input };
