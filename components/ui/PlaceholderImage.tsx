import Image from "next/image";
import {
  Building2,
  ChefHat,
  Hammer,
  Home,
  Image as ImageIcon,
  LayoutTemplate,
  ShowerHead,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PlaceholderCategory } from "@/lib/types";

export type { PlaceholderCategory };

const categoryIcons: Record<PlaceholderCategory, typeof Home> = {
  house: Home,
  extension: LayoutTemplate,
  renovation: Hammer,
  interior: ImageIcon,
  kitchen: ChefHat,
  bathroom: ShowerHead,
  team: Users,
  site: Wrench,
  generic: Building2,
};

const PATTERN_ANGLES = [128, 112, 145, 120, 138];

type PlaceholderImageProps = {
  label: string;
  category?: PlaceholderCategory;
  ratio?: string;
  index?: number;
  className?: string;
  showLabel?: boolean;
  iconClassName?: string;
  /** Optional real photo (path under /public). When set, renders the photo instead of the abstract placeholder. */
  src?: string;
  priority?: boolean;
  sizes?: string;
};

export function PlaceholderImage({
  label,
  category = "generic",
  ratio = "aspect-[4/3]",
  index = 0,
  className,
  showLabel = true,
  iconClassName,
  src,
  priority,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: PlaceholderImageProps) {
  if (src) {
    return (
      <div className={cn("relative isolate overflow-hidden bg-surface", ratio, className)}>
        <Image
          src={src}
          alt={label}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      </div>
    );
  }

  const Icon = categoryIcons[category];
  const angle = PATTERN_ANGLES[index % PATTERN_ANGLES.length];

  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={cn("relative isolate overflow-hidden bg-surface", ratio, className)}
    >
      <div
        aria-hidden
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(${angle}deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 24px)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-foreground/12 via-transparent to-transparent"
      />
      <div aria-hidden className="absolute inset-0 flex items-center justify-center">
        <Icon
          className={cn("h-10 w-10 text-foreground/15 sm:h-14 sm:w-14", iconClassName)}
          strokeWidth={1.1}
        />
      </div>
      {showLabel ? (
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 border border-border/70 bg-background/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {label}
        </div>
      ) : null}
    </div>
  );
}
