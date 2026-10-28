"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { type ReactNode } from "react";
import { EASE, DURATION, VIEWPORT } from "@/lib/motion";

/** Supported HTML elements for the `as` prop. */
type RevealElement = "div" | "p" | "section" | "article" | "aside" | "span" | "li" | "ul";

export interface RevealProps {
  /** HTML element to render (default `"div"`). */
  as?: RevealElement;
  /** Extra delay before the animation starts, in seconds. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Vertical offset in px (default `24`). */
  y?: number;
  /** Whether the animation plays only once (default `true`). */
  once?: boolean;
  /** Fraction of the element that must be visible to trigger (default `0.3`). */
  amount?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Generic fade-up reveal wrapper. Wraps any block (paragraphs, cards, buttons)
 * and animates it into view when scrolled to.
 *
 * Uses `whileInView` — never `animate` — so off-screen content stays hidden
 * until the user scrolls to it.
 *
 * @example
 * ```tsx
 * <Reveal delay={0.2} className="mt-8">
 *   <p>This paragraph fades up on scroll.</p>
 * </Reveal>
 * ```
 */
export default function Reveal({
  as = "div",
  delay = 0,
  duration = DURATION.base,
  y = 24,
  once = VIEWPORT.once,
  amount = VIEWPORT.amount,
  className,
  children,
}: RevealProps) {
  const Tag = motion[as] as React.ComponentType<HTMLMotionProps<typeof as>>;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: VIEWPORT.margin }}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: EASE, delay },
        },
      }}
    >
      {children}
    </Tag>
  );
}
