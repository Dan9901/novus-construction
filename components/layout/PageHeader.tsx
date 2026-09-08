import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <section className={cn("border-b border-border bg-surface py-16 sm:py-20", className)}>
      <Container>
        <Reveal>
          <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
            <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden />
              {eyebrow}
            </span>
            <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
