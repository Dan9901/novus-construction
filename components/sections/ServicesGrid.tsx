import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { services } from "@/data/services";

export function ServicesGrid() {
  const featured = services.slice(0, 6);

  return (
    <Section>
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="What We Do"
              title="Construction Services"
              description="In restoring the past and building the future, we have a wealth of services — here is an introduction to all of them."
            />
            <Button href="/services" variant="outline" className="hidden shrink-0 sm:inline-flex">
              All Services
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60}>
              <ServiceCard service={service} index={index} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Button href="/services" variant="outline" className="w-full justify-center">
            All Services
          </Button>
        </div>
      </Container>
    </Section>
  );
}
