import { cn } from "@/lib/utils";

export function StatBlock({
  value,
  label,
  tone = "default",
  className,
}: {
  value: string;
  label: string;
  tone?: "default" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{value}</span>
      <span
        className={cn(
          "text-xs font-medium uppercase tracking-[0.16em] sm:text-sm",
          tone === "dark" ? "text-background/60" : "text-muted"
        )}
      >
        {label}
      </span>
    </div>
  );
}
