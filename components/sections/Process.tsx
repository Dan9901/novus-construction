"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { processSteps } from "@/data/process";

const lastStep = processSteps[processSteps.length - 1];

/** Touch and reduced-motion: the original static row of steps. */
function StaticProcess() {
  return (
    <Section tone="dark">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            eyebrowStyle="bracket"
            title="Our Process"
            description="From pre-construction services, where the practical aspects of your project are analysed, through to the post-construction phase — we're with you the whole way."
            tone="dark"
          />
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-y-9 sm:grid-cols-5 sm:gap-x-6">
          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 80}>
              <div className="flex flex-col items-start sm:items-center sm:text-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-accent bg-foreground font-display text-base font-medium text-accent">
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-lg font-medium text-background sm:mt-5">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-background/60 sm:max-w-[190px]">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/**
 * Desktop: the section pins and each stage takes the foreground in turn as you
 * scroll — deliberately echoing the hero's assembling blueprint. The house goes
 * up in stages, and so does the job.
 */
function PinnedProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const railScale = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      processSteps.length - 1,
      Math.max(0, Math.floor(value * processSteps.length))
    );
    setActiveIndex((current) => (current === next ? current : next));
  });

  const active = processSteps[activeIndex];

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-foreground">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Container className="relative grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              [&nbsp;How It Works&nbsp;]
            </span>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-background sm:text-5xl md:text-6xl">
              Our Process
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-background/60">
              From pre-construction services, where the practical aspects of your project are
              analysed, through to the post-construction phase — we&apos;re with you the whole way.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="h-px w-40 bg-background/15">
                <motion.div className="h-full origin-left bg-accent" style={{ scaleX: railScale }} />
              </div>
              <span className="font-display text-sm tabular-nums text-background/50">
                {active.number} / {lastStep.number}
              </span>
            </div>
          </div>

          <div>
            <div className="relative h-[15rem] sm:h-[17rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.number}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -26 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <span className="font-display text-[5rem] font-medium leading-none tracking-tight text-accent sm:text-[7rem]">
                    {active.number}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-background sm:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-background/65">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ol className="mt-8 flex flex-col divide-y divide-background/10 border-t border-background/10">
              {processSteps.map((step, index) => (
                <li key={step.number}>
                  <div className="flex items-center gap-4 py-3">
                    <span
                      className={`font-display text-xs tabular-nums transition-colors duration-300 ${
                        index === activeIndex ? "text-accent" : "text-background/35"
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`text-sm transition-colors duration-300 ${
                        index === activeIndex ? "font-semibold text-background" : "text-background/40"
                      }`}
                    >
                      {step.title}
                    </span>
                    {index === activeIndex ? (
                      <motion.span
                        layoutId="process-active-rule"
                        className="ml-auto h-px w-10 bg-accent"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}

export function Process() {
  const canPin = useMediaQuery("(min-width: 768px) and (pointer: fine)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return canPin && !prefersReducedMotion ? <PinnedProcess /> : <StaticProcess />;
}
