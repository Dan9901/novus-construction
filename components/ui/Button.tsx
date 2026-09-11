"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type ButtonVariant = "primary" | "dark" | "outline" | "outline-light" | "ghost";
type ButtonSize = "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  showArrow?: boolean;
};

type LinkProps = BaseProps & {
  href: string;
  onClick?: () => void;
  type?: never;
  disabled?: never;
};

type ButtonAsButtonProps = BaseProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

type ButtonProps = LinkProps | ButtonAsButtonProps;

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-6 py-3.5 text-[13px]",
  lg: "px-8 py-4 text-sm",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-background hover:bg-accent-dark",
  dark: "bg-foreground text-background hover:bg-accent",
  outline: "border border-foreground/25 text-foreground hover:border-accent hover:text-accent",
  "outline-light": "border border-background/40 text-background hover:border-background hover:bg-background/10",
  ghost: "px-0 py-0 text-foreground hover:text-accent normal-case tracking-normal font-semibold text-sm",
};

const baseClasses =
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-semibold uppercase tracking-[0.08em] transition-colors duration-300 focus-visible:outline-offset-4 disabled:opacity-50 disabled:pointer-events-none";

const springTransition = { type: "spring" as const, stiffness: 420, damping: 24 };

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className, showArrow = true } = props;
  const isGhost = variant === "ghost";

  const classes = cn(
    baseClasses,
    variant !== "ghost" && sizeClasses[size],
    variantClasses[variant],
    className
  );

  // Ghost links are inline text — a lift/scale reads oddly there, so only the
  // boxed variants get the physical hover/tap feedback.
  const motionProps = isGhost
    ? {}
    : {
        whileHover: { scale: 1.025, y: -1 },
        whileTap: { scale: 0.97, y: 0 },
        transition: springTransition,
      };

  const content = (
    <>
      {children}
      {showArrow ? (
        <ArrowRight
          aria-hidden
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    const isInternal = props.href.startsWith("/") || props.href.startsWith("#");
    if (isInternal) {
      return (
        <MotionLink href={props.href} onClick={props.onClick} className={classes} {...motionProps}>
          {content}
        </MotionLink>
      );
    }
    return (
      <motion.a
        href={props.href}
        onClick={props.onClick}
        className={classes}
        {...motionProps}
        {...(props.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </motion.a>
    );
  }

  const buttonProps = props as ButtonAsButtonProps;
  return (
    <motion.button
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      className={classes}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
