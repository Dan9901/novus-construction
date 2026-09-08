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
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. A selection of new builds, extensions, renovations and interiors completed across Ireland."
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
