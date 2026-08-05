import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.055] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/68 backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
