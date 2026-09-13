import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { PhotoGallery } from "@/components/ui/PhotoGallery";
import { getProjectBySlug, projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.categoryLabel}`,
    description: project.summary,
    openGraph: { images: [project.image.src] },
  };
}

const detailFields = (project: NonNullable<ReturnType<typeof getProjectBySlug>>) =>
  [
    { label: "Project Type", value: project.categoryLabel },
    { label: "Location", value: project.location },
    { label: "Duration", value: project.duration },
    { label: "Scope", value: project.scope },
  ].filter((field): field is { label: string; value: string } => Boolean(field.value));

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-14 sm:py-16">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
              <Link href="/projects" className="transition-colors hover:text-accent">
                Projects
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{project.name}</span>
            </nav>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.1em] text-accent">
              {project.categoryLabel}
            </p>
          </Reveal>
        </Container>
      </section>

      <Section>
        <Container>
          <ImageReveal className="w-full">
            <PlaceholderImage
              label={project.image.alt}
              ratio="aspect-[16/9]"
              className="w-full"
              src={project.image.src}
              sizes="(max-width: 1280px) 100vw, 1224px"
              priority
            />
          </ImageReveal>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal delay={80}>
              <h2 className="font-display text-2xl font-medium tracking-tight">
                Project Overview
              </h2>
              <div className="mt-5 flex flex-col gap-5">
                {project.description.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-foreground-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <dl className="grid grid-cols-2 gap-6 border border-border p-7 sm:grid-cols-2">
                {detailFields(project).map((field) => (
                  <div key={field.label}>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      {field.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-base font-medium tracking-tight">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight">Photo Gallery</h2>
            <p className="mt-2 text-sm text-muted">Select any photo to open the full-size viewer.</p>
          </Reveal>
          <div className="mt-8">
            <PhotoGallery title={project.name} photos={project.images} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <div className="border border-border bg-surface px-8 py-14 text-center sm:px-16">
              <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                Have a similar project in mind?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
                Have you an idea, a vision, or a dream in mind for your home? Tell us about your
                project and we&apos;ll be in touch with a clear, no-obligation quote.
              </p>
              <div className="mt-8 flex justify-center">
                <Button href="/contact" size="lg">
                  Request a Quote
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
