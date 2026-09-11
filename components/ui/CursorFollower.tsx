"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useIsClient } from "@/lib/useIsClient";

const INTERACTIVE_SELECTOR = "a, button, input, select, textarea, [role='button'], [data-cursor-hover]";

/**
 * A soft ring + dot that trails the real cursor on desktop, growing when
 * hovering interactive elements. Purely decorative: pointer-events-none, the
 * native cursor is never hidden or replaced, so it can never block a click or
 * strand the user without a visible pointer.
 */
export function CursorFollower() {
  const isClient = useIsClient();
  const hasFinePointer = useMediaQuery("(pointer: fine)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const active = isClient && hasFinePointer && !prefersReducedMotion;

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 320, damping: 30, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 30, mass: 0.5 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
    };
    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };
    const handleLeaveWindow = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeaveWindow);
    };
  }, [active, mouseX, mouseY]);

  if (!active) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-accent/50"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "rgba(184,40,30,0.08)" : "rgba(184,40,30,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      />
    </>
  );
}
