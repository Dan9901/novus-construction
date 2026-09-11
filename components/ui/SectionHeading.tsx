import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "dark";
  /** "line" is the standard dash-prefixed label; "bracket" is the editorial `[ Label ]` treatment used on the homepage. */
  eyebrowStyle?: "line" | "bracket";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  eyebrowStyle = "line",
  className,
}: SectionHeadingProps) {
  const mutedClass = tone === "dark" ? "text-background/65" : "text-muted";

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && eyebrowStyle === "bracket" ? (
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          [&nbsp;{eyebrow}&nbsp;]
        </span>
      ) : null}
      {eyebrow && eyebrowStyle === "line" ? (
        <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <span className="h-px w-8 bg-accent" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", mutedClass)}>{description}</p>
      ) : null}
    </div>
  );
}
