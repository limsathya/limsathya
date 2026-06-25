import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[140px] w-full rounded-xl border border-line bg-night-2/60 px-4 py-3 text-sm text-foreground placeholder:text-mist-dim transition-colors focus-visible:outline-none focus-visible:border-ember focus-visible:ring-2 focus-visible:ring-ember/40 disabled:opacity-50 resize-y",
        className
      )}
      {...props}
    />
  );
});

export { Textarea };
