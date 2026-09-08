import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { FinalCta } from "@/components/sections/FinalCta";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Construction Services",
  description:
    "New builds, extensions, renovations, refurbishments, kitchens, bathrooms and general building services from Novus Construction.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Construction Services"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, from ground-up builds to the smallest finishing details."
      />

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 3) * 70}>
                <ServiceCard service={service} index={index} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
