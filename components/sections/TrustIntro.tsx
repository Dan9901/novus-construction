"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StatBlock } from "@/components/ui/StatBlock";
import { siteConfig } from "@/data/site-config";

const statement =
  "We pride ourselves on the quality we build and the service we provide — working closely with every client so renovation and construction feels enjoyable, start to finish and beyond.";

const emphasisWords = new Set(["quality", "enjoyable"]);

function Word({
  text,
  range,
  progress,
  emphasis,
}: {
  text: string;
  range: [number, number];
  progress: MotionValue<number>;
  emphasis: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={emphasis ? "font-display italic text-accent" : undefined}
    >
      {text}{" "}
    </motion.span>
  );
}

export function TrustIntro() {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.35"],
  });

  const words = statement.split(" ");

  return (
    <Section tone="surface">
      <Container>
        <Reveal>
          <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            [&nbsp;Who We Are&nbsp;]
          </span>
        </Reveal>

        <p
          ref={containerRef}
          className="max-w-4xl font-display text-3xl font-medium leading-[1.25] tracking-tight text-balance sm:text-4xl md:text-5xl"
        >
          {words.map((word, index) => (
            <Word
              key={`${word}-${index}`}
              text={word}
              emphasis={emphasisWords.has(word.toLowerCase().replace(/[,.]/g, ""))}
              progress={scrollYProgress}
              range={[index / words.length, (index + 1) / words.length]}
            />
          ))}
        </p>

        <Reveal delay={120}>
          <div className="mx-auto mt-16 grid max-w-xl grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1.5 py-8 text-center">
                <StatBlock value={stat.value} label={stat.label} className="items-center" />
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
