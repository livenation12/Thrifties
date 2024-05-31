import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center", className)}>
        {startIcon && <span className="absolute left-3 opacity-45">{startIcon}</span>}
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-11" : "",
            endIcon ? "pr-11" : ""
          )}
          ref={ref}
          {...props}
        />
        {endIcon && <span className="absolute right-3 opacity-45">{endIcon}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
