"use client";

import type { MouseEvent } from "react";
import { useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Pulls an element a few pixels toward the cursor while hovering, springing
 * back to rest on leave — a subtle "magnetic" CTA feel. Disabled on touch
 * devices (no hover to track) and under prefers-reduced-motion.
 */
export function useMagnetic(strength = 0.35, max = 14) {
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = hasFinePointer && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!active) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-max, Math.min(max, relX * strength)));
    y.set(Math.max(-max, Math.min(max, relY * strength)));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { x: springX, y: springY, onMouseMove, onMouseLeave };
}
