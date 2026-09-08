import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Badge } from "@/components/ui/Badge";
import { projectCategoryPlaceholder, type Project } from "@/data/projects";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden border border-border bg-background transition-colors duration-300 hover:border-accent/60"
    >
      <div className="relative">
        <PlaceholderImage
          label={project.name}
          category={projectCategoryPlaceholder[project.category]}
          ratio="aspect-[4/3]"
          index={index}
          showLabel={false}
          src={project.image}
        />
        <div className="absolute left-3 top-3">
          <Badge className="bg-background/90">{project.categoryLabel}</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="font-display text-xl font-medium tracking-tight">{project.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
          View Project
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
