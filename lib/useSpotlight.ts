"use client";

import type { MouseEvent } from "react";
import { useMotionTemplate, useMotionValue } from "motion/react";

/**
 * Tracks pointer position within a container as percentages, exposing a CSS
 * radial-gradient string that follows it — for a cursor-spotlight hover
 * effect. Consumer is responsible for opacity (show on hover, hide otherwise)
 * and pointer-events: none on the element the gradient is applied to.
 */
export function useSpotlight(radius = 280) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}% ${mouseY}%, rgba(184,40,30,0.12), transparent 70%)`;

  return { onMouseMove, background };
}
