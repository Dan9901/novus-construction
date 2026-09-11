import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

type SectionTone = "default" | "surface" | "dark";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  dark: "bg-foreground text-background",
};

export function Section({
  id,
  tone = "default",
  className,
  children,
}: {
  id?: string;
  tone?: SectionTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("relative py-20 sm:py-24 md:py-28", toneClasses[tone], className)}
    >
      {tone === "dark" ? <GrainOverlay /> : null}
      {children}
    </section>
  );
}
