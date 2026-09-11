"use client";

import { useRef } from "react";
import { Phone } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { siteConfig } from "@/data/site-config";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const projectsStat = siteConfig.stats.find((stat) => stat.label === "Projects Completed") ?? siteConfig.stats[0];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-b border-border bg-background">
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
      <Container className="grid grid-cols-1 items-center gap-12 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:grid-cols-2 lg:gap-16 lg:pt-20 lg:pb-24">
        <motion.div initial="hidden" animate="visible" variants={container}>
          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent"
          >
            <span className="h-px w-8 bg-accent" aria-hidden />
            Building in Ireland Since {siteConfig.founded}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl md:text-6xl"
          >
            Building the Future, Restoring the Past.
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
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
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden"
          >
            <PlaceholderImage
              label="Completed Home Exterior"
              category="house"
              ratio="aspect-[4/5]"
              className="w-full"
              src="/projects/house-a-exterior.jpg"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.9 }}
            className="absolute -bottom-6 -left-6 hidden w-52 border border-border bg-background p-5 shadow-[0_20px_50px_-25px_rgba(27,23,18,0.35)] sm:block"
          >
            <AnimatedNumber
              value={projectsStat.value}
              triggerOnMount
              delay={0.9}
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
