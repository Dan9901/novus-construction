import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { GoogleIcon } from "@/components/icons/SocialIcons";
import { siteConfig } from "@/data/site-config";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <Section tone="surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Client Feedback"
            title="What Clients Say"
            description="A couple of words from clients we've had the pleasure of building for."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.attribution + index} delay={index * 80}>
              <figure className="flex h-full flex-col gap-6 border border-border bg-background p-7">
                <Quote className="h-7 w-7 text-accent" aria-hidden strokeWidth={1.4} />
                <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground-soft">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground">{testimonial.attribution}</p>
                  {testimonial.location ? (
                    <p className="text-xs text-muted">{testimonial.location}</p>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div className="mt-10 flex justify-center">
            <a
              href={siteConfig.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
            >
              <GoogleIcon className="h-4 w-4" />
              Read more reviews on Google
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
