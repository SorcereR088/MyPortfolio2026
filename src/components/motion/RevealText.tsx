"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { maskUp, container, STAGGER, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";

export interface RevealTextProps {
  /**
   * Lines to reveal one at a time. Each entry can be a string or JSX
   * (e.g. a line containing `<RotatingWord />`).
   */
  lines: ReactNode[];
  /** Outer wrapper element (default `"h1"`). */
  as?: HeadingElement;
  /** Stagger delay between lines in seconds (default `STAGGER.base`). */
  stagger?: number;
  /** Extra delay before the first line starts, in seconds. */
  delay?: number;
  /** Class name applied to the outer heading element. */
  className?: string;
  /** Class name applied to each line's inner motion span. */
  lineClassName?: string;
}

/**
 * Line-by-line masked text reveal for headings.
 *
 * Each line slides up from behind an `overflow-hidden` mask. Accepts
 * `ReactNode` per line so you can embed inline components like
 * `<RotatingWord />` or accent `<span>`s.
 *
 * @example
 * ```tsx
 * <RevealText
 *   as="h2"
 *   lines={["First line", "Second line", <>Third <em>styled</em> line</>]}
 *   stagger={STAGGER.tight}
 *   className="text-heading-h2 font-bold"
 * />
 * ```
 */
export default function RevealText({
  lines,
  as: Tag = "h1",
  stagger = STAGGER.base,
  delay = 0,
  className,
  lineClassName,
}: RevealTextProps) {
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={container(stagger, delay)}
    >
      {lines.map((line, i) => (
        <span
          key={i}
          className="block overflow-hidden"
          aria-hidden={false}
        >
          <motion.span
            className={cn("inline-block pb-[0.12em] -mb-[0.12em]", lineClassName)}
            variants={maskUp}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
