import {
  ClipboardCheck,
  Gem,
  Handshake,
  PhoneCall,
  Search,
  Users,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/ui/Reveal";
import { whyUsPoints, type WhyUsPoint } from "@/data/why-us";

const iconMap: Record<WhyUsPoint["icon"], typeof Users> = {
  users: Users,
  handshake: Handshake,
  gem: Gem,
  search: Search,
  "phone-call": PhoneCall,
  "clipboard-check": ClipboardCheck,
};

export function WhyUs() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <PlaceholderImage
              label="Recent Interior Finish"
              category="team"
              ratio="aspect-[3/4]"
              className="w-full lg:sticky lg:top-28"
              src="/samples/kitchen-exposed-beam.jpg"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Why Novus"
                title="Why Choose Novus Construction"
                description="We pride ourselves on the level of service we provide to our customers and the quality of the work we produce."
              />
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
              {whyUsPoints.map((point, index) => {
                const Icon = iconMap[point.icon];
                return (
                  <Reveal key={point.title} delay={index * 60}>
                    <div className="flex gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-border text-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-display text-lg font-medium tracking-tight">
                          {point.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
