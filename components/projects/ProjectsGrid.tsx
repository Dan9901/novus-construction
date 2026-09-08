"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projectCategories, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2.5 border-b border-border pb-8"
      >
        {projectCategories.map((category) => {
          const isActive = category.value === activeCategory;
          return (
            <button
              key={category.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category.value)}
              className={cn(
                "border px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-200",
                isActive
                  ? "border-accent bg-accent text-background"
                  : "border-border text-foreground-soft hover:border-accent hover:text-accent"
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-muted">
          No projects found in this category yet.
        </p>
      )}
    </div>
  );
}
