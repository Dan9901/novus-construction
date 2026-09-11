"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { animate, useInView } from "motion/react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

const getServerSnapshot = () => false;

/**
 * SSR-safe reduced-motion check. Unlike motion's own `useReducedMotion`,
 * this is guaranteed to return `false` on the server *and* on the client's
 * first (hydration) render, only switching to the real value in a normal
 * post-mount update — otherwise a component that renders different text
 * based on this flag causes a hydration mismatch.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    getServerSnapshot
  );
}

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
  const prefersReducedMotion = usePrefersReducedMotion();
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
