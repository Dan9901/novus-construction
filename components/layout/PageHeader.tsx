import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
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
        <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
          <Reveal>
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              [&nbsp;{eyebrow}&nbsp;]
            </span>
          </Reveal>

          <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
            <SplitText text={title} onScroll delay={0.08} />
          </h1>

          {description ? (
            <Reveal delay={220}>
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{description}</p>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
