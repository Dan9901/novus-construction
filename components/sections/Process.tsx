"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

export function Process() {
  return (
    <Section tone="dark">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="Our Process"
            description="From pre-construction services, where the practical aspects of your project are analysed, through to the post-construction phase — we're with you the whole way."
            tone="dark"
          />
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-background/15 sm:block" aria-hidden />
          <motion.div
            className="absolute left-0 top-6 hidden h-px origin-left bg-accent sm:block sm:w-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            aria-hidden
          />
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-5 sm:gap-x-6">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 80}>
                <div className="relative flex flex-col items-start sm:items-center sm:text-center">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center border border-accent bg-foreground font-display text-base font-medium text-accent">
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
        </div>
      </Container>
    </Section>
  );
}
