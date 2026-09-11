"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Reveal } from "@/components/ui/Reveal";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { siteConfig } from "@/data/site-config";

export function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-foreground text-background">
      <motion.div className="absolute inset-0 opacity-35" style={{ y }}>
        <PlaceholderImage
          label="Site Under Construction"
          category="site"
          ratio="h-full w-full"
          showLabel={false}
          iconClassName="h-20 w-20 sm:h-28 sm:w-28"
          className="scale-125"
        />
      </motion.div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/92 to-foreground/75"
        aria-hidden
      />
      <GrainOverlay />

      <Container className="relative py-24 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
              Let&apos;s Build Something.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-background/70 sm:text-lg">
              Have an idea, a vision, or a dream in mind for your home? Get in touch and let&apos;s
              see how it can become a reality.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" size="lg" magnetic>
                Request a Quote
              </Button>
              <Button href={siteConfig.phoneHref} variant="outline-light" size="lg" showArrow={false}>
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
            <a
              href={siteConfig.emailHref}
              className="mt-7 inline-flex items-center gap-2 text-sm text-background/65 transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {siteConfig.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
