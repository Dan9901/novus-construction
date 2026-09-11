import { cn } from "@/lib/utils";

const NOISE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/**
 * Faint animated-free film-grain texture for dark sections — adds tactile depth
 * without competing with content. Static CSS only (no client JS), pointer-events
 * disabled so it never intercepts clicks or text selection.
 */
export function GrainOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay", className)}
      style={{ backgroundImage: `url("${NOISE_SVG}")` }}
    />
  );
}
