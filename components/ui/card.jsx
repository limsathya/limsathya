import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("glass rounded-3xl text-card-foreground", className)}
      {...props}
    />
  );
});

const CardContent = React.forwardRef(function CardContent({ className, ...props }, ref) {
  return <div ref={ref} className={cn("p-6", className)} {...props} />;
});

export { Card, CardContent };
