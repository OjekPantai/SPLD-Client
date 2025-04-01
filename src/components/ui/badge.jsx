import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-primary/30 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        secondary:
          "border-secondary/30 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90",
        destructive:
          "border-destructive/30 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "bg-background border-border text-foreground shadow-sm",
        gray: "border-gray-400 bg-gray-100 text-gray-800 shadow-sm hover:bg-gray-200",
        red: "border-red-400 bg-red-100 text-red-800 shadow-sm hover:bg-red-200",
        yellow:
          "border-yellow-400 bg-yellow-100 text-yellow-800 shadow-sm hover:bg-yellow-200",
        green:
          "border-green-400 bg-green-100 text-green-800 shadow-sm hover:bg-green-200",
        blue: "border-blue-400 bg-blue-100 text-blue-800 shadow-sm hover:bg-blue-200",
        navy: "border-blue-700 bg-blue-100 text-blue-900 shadow-sm hover:bg-blue-200",
        purple:
          "border-purple-400 bg-purple-100 text-purple-800 shadow-sm hover:bg-purple-200",
        pink: "border-pink-400 bg-pink-100 text-pink-800 shadow-sm hover:bg-pink-200",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[0.625rem]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Badge = React.forwardRef(function Badge(
  { className, variant, size, ...props },
  ref
) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      ref={ref}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge, badgeVariants };
