import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <Section tone="surface">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our Work"
              title="Recent Projects"
              description="Our service is outstanding, and the quality of work we do speaks for itself — but do have a look at some of the work we've done and be amazed."
            />
            <Button href="/projects" variant="outline" className="hidden shrink-0 sm:inline-flex">
              View All Projects
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 80}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Button href="/projects" variant="outline" className="w-full justify-center">
            View All Projects
          </Button>
        </div>
      </Container>
    </Section>
  );
}
