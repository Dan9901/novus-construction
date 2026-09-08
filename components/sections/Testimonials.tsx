import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section tone="surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Client Feedback"
            title="What Clients Say"
            description="Placeholder testimonials shown for layout purposes — to be replaced with real client feedback."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.attribution + index} delay={index * 80}>
              <figure className="flex h-full flex-col gap-6 border border-border bg-background p-7">
                <Quote className="h-7 w-7 text-accent" aria-hidden strokeWidth={1.4} />
                <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground-soft">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">{testimonial.attribution}</p>
                  <p className="text-xs text-muted">{testimonial.location}</p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                    Placeholder Testimonial
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
