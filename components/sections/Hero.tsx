"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { Phone } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { SplitText } from "@/components/ui/SplitText";
import { siteConfig } from "@/data/site-config";

const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), {
  ssr: false,
});

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/** Registration marks, like the corners of a printed drawing sheet. */
function CornerTicks() {
  const corners = [
    "left-0 top-0 border-l border-t",
    "right-0 top-0 border-r border-t",
    "left-0 bottom-0 border-l border-b",
    "right-0 bottom-0 border-r border-b",
  ];

  return (
    <>
      {corners.map((position) => (
        <span
          key={position}
          aria-hidden
          className={`pointer-events-none absolute z-10 h-5 w-5 border-accent/70 ${position}`}
        />
      ))}
    </>
  );
}

export function Hero() {
  const projectsStat =
    siteConfig.stats.find((stat) => stat.label === "Projects Completed") ?? siteConfig.stats[0];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          y: gridY,
          zIndex: -1,
          backgroundImage:
            "linear-gradient(rgba(27,23,18,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(27,23,18,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <Container className="grid grid-cols-1 items-center gap-12 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-20 lg:pb-24">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.span
            variants={item}
            className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-accent"
          >
            [&nbsp;Building in Ireland Since {siteConfig.founded}&nbsp;]
          </motion.span>

          <h1 className="font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            <SplitText text="Building the Future," delay={0.15} />
            <SplitText text="Restoring the Past." delay={0.34} highlight={["Restoring"]} />
          </h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            Novus Construction can help you achieve your vision for your home. Whether your
            requirement is for a renovation, extension, new build or any other home improvement
            project, our mission is your goal — delivered by a small, dedicated team of qualified,
            experienced construction professionals.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button href="/contact" size="lg" magnetic>
              Request a Quote
            </Button>
            <Button href="/projects" variant="outline" size="lg">
              View Our Work
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6"
          >
            <a
              href={siteConfig.phoneHref}
              className="flex items-center gap-2.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center border border-border">
                <Phone className="h-4 w-4 text-accent" aria-hidden />
              </span>
              {siteConfig.phoneDisplay}
            </a>
            <span className="text-sm text-muted">{siteConfig.hours}</span>
          </motion.div>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative aspect-[4/5] w-full border border-border bg-surface/50"
          >
            <CornerTicks />
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-4 z-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted sm:right-6 sm:top-6"
            >
              Dwg. 01 — Residential
            </span>
            <HeroScene />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 1.1 }}
            className="absolute -bottom-6 -left-6 hidden w-52 border border-border bg-background p-5 shadow-[0_20px_50px_-25px_rgba(27,23,18,0.35)] sm:block"
          >
            <AnimatedNumber
              value={projectsStat.value}
              triggerOnMount
              delay={1.1}
              className="font-display text-3xl font-medium tracking-tight"
            />
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-muted">
              {projectsStat.label}
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
