"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { Button } from "@/components/ui/Button";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { projectCategoryPlaceholder, projects, type Project } from "@/data/projects";

const featured = projects.slice(0, 5);

function ProjectPanel({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex h-full w-[78vw] shrink-0 flex-col sm:w-[58vw] lg:w-[34vw]"
    >
      <div className="relative flex-1 overflow-hidden border border-background/15">
        <PlaceholderImage
          label={project.image.alt}
          category={projectCategoryPlaceholder[project.category]}
          ratio="h-full w-full"
          index={index}
          showLabel={false}
          src={project.image.src}
          sizes="(max-width: 640px) 78vw, (max-width: 1024px) 58vw, 34vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/15 to-transparent"
        />
        <span className="absolute left-5 top-5 font-display text-sm text-background/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-5 bottom-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-tint">
            {project.categoryLabel}
          </span>
          <h3 className="mt-1.5 font-display text-2xl font-medium tracking-tight text-background">
            {project.name}
          </h3>
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-background/80 transition-colors group-hover:text-accent-tint">
            View Project
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

function IntroPanel() {
  return (
    <div className="flex h-full w-[82vw] shrink-0 flex-col justify-center pr-4 sm:w-[56vw] lg:w-[38vw]">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-tint">
        [&nbsp;Our Work&nbsp;]
      </span>
      <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-background sm:text-5xl md:text-6xl">
        Recent Projects
      </h2>
      <p className="mt-5 max-w-sm text-base leading-relaxed text-background/60">
        Our service is outstanding, and the quality of the work we do speaks for itself — have a
        look at some of what we&apos;ve built.
      </p>
      <div className="mt-8">
        <Button href="/projects" variant="outline-light" size="md">
          View All Projects
        </Button>
      </div>
      <span className="mt-10 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-background/40 lg:inline-flex">
        Scroll to explore
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </span>
    </div>
  );
}

/** Desktop: the section pins and vertical scroll drives the reel sideways. */
function PinnedReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    // Measured in the observer callback so the reel re-fits on font load,
    // image load and viewport changes alike.
    const observer = new ResizeObserver(() => {
      setDistance(Math.max(0, node.scrollWidth - window.innerWidth + 48));
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progressScale = useTransform(smooth, [0, 1], [0.04, 1]);

  return (
    <section ref={sectionRef} className="relative h-[340vh] bg-foreground">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <GrainOverlay />
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-[68vh] gap-6 pl-6 will-change-transform sm:pl-10 lg:pl-16"
        >
          <IntroPanel />
          {featured.map((project, index) => (
            <ProjectPanel key={project.slug} project={project} index={index} />
          ))}
        </motion.div>

        <div className="absolute inset-x-6 bottom-10 flex items-center gap-4 sm:inset-x-10 lg:inset-x-16">
          <div className="h-px flex-1 bg-background/15">
            <motion.div className="h-full origin-left bg-accent" style={{ scaleX: progressScale }} />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-background/40">
            {featured.length} Projects
          </span>
        </div>
      </div>
    </section>
  );
}

/** Touch and reduced-motion: a plain swipeable row, which is what people expect on a phone. */
function StaticReel() {
  return (
    <section className="relative bg-foreground py-20 sm:py-24">
      <GrainOverlay />
      <Container className="relative">
        <IntroPanel />
      </Container>
      <div className="relative mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden">
        {featured.map((project, index) => (
          <div key={project.slug} className="h-[62vh] snap-start">
            <ProjectPanel project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Projects as a horizontal reel. The pinned and static variants are separate
 * components so the scroll-tracking hooks only ever mount in the variant that
 * actually has an element to track.
 */
export function ProjectsShowcase() {
  const canPin = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return canPin && !prefersReducedMotion ? <PinnedReel /> : <StaticReel />;
}
