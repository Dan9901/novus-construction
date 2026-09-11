"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Renders a numeric-prefixed value (e.g. "10+", "55+") that counts up from 0.
 * Falls back to a static render for non-numeric values and when the user
 * prefers reduced motion.
 */
export function AnimatedNumber({
  value,
  className,
  triggerOnMount = false,
  delay = 0,
}: {
  value: string;
  className?: string;
  /** Skip scroll-visibility gating and start counting on mount — for content that's already visible on load (e.g. the hero), where scroll-margin heuristics don't apply. */
  triggerOnMount?: boolean;
  delay?: number;
}) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const shouldStart = triggerOnMount || isInView;
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!shouldStart || target === null || prefersReducedMotion) return;

    const controls = animate(0, target, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [shouldStart, target, prefersReducedMotion, delay]);

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefersReducedMotion ? target : display}
      {suffix}
    </span>
  );
}
