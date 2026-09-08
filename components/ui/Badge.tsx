import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-border bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
