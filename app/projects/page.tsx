import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse recent new build, extension, renovation and interior projects completed by Novus Construction.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Recent Projects"
        description="Our work is art, but we can't let you into all of our customers' homes. Thankfully we've been given permission to showcase our attention to detail and perfection in everything we do — have a browse and be inspired."
      />

      <Section>
        <Container>
          <ProjectsGrid projects={projects} />
        </Container>
      </Section>

      <FinalCta />
    </>
  );
}
