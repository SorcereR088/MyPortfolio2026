"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

// ─── Tunables ────────────────────────────────────────────────────────────────
// • BASE_OPACITY  – starting opacity for each word before it's revealed (0–1)
// • SPRING        – controls the springy feel; higher stiffness = snappier,
//                   higher damping = less oscillation
// • SCROLL_OFFSET – [start, end] tells useScroll when to begin/finish.
//                   "start 0.9"  = paragraph top hits 90 % of viewport height;
//                   "end 0.65"   = paragraph bottom hits 65 % (above center).
const BASE_OPACITY = 0.2;
const SPRING = { stiffness: 200, damping: 35, restDelta: 0.001 };
const SCROLL_OFFSET: ["start 0.9", "end 0.65"] = ["start 0.9", "end 0.65"];

// ─── Word sub-component ──────────────────────────────────────────────────────
// Extracted so hooks (useTransform / useSpring) are never called inside a loop.

interface WordProps {
  children: string;
  /** Overall scroll progress MotionValue (0 → 1). */
  progress: MotionValue<number>;
  /** Start of this word's range within overall progress (0 → 1). */
  start: number;
  /** End of this word's range within overall progress (0 → 1). */
  end: number;
}

function Word({ children, progress, start, end }: WordProps) {
  // Map this word's slice of the global progress to an opacity ramp.
  // clamp: true keeps opacity pinned at BASE_OPACITY / 1 outside the range.
  const raw = useTransform(progress, [start, end], [BASE_OPACITY, 1], {
    clamp: true,
  });
  // Smooth the stepped result with a spring for a more organic feel.
  const opacity = useSpring(raw, SPRING);

  return (
    <motion.span
      aria-hidden
      style={{ opacity, display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export interface ScrollRevealTextProps {
  /** The paragraph text to reveal word-by-word on scroll. */
  text: string;
  /** Optional extra class names on the outer `<p>` element. */
  className?: string;
}

/**
 * Scroll-scrubbed word-by-word text reveal.
 *
 * Each word fades from `BASE_OPACITY` to full opacity as the user scrolls
 * the paragraph through the viewport. Scrolling back reverses the effect.
 *
 * Typography is inherited from the parent — apply font/size/weight classes
 * on the wrapping element, not here.
 *
 * @example
 * ```tsx
 * <ScrollRevealText
 *   text="Designing products, turning complex problems into simple interfaces."
 *   className="text-heading-h3 text-text-primary"
 * />
 * ```
 */
export default function ScrollRevealText({
  text,
  className,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: SCROLL_OFFSET,
  });

  const words = text.split(/\s+/);

  // ── Reduced-motion: render static text at full opacity ──
  if (prefersReducedMotion) {
    return (
      <p
        ref={containerRef}
        className={className}
        style={{ color: "var(--foreground)" }}
      >
        {text}
      </p>
    );
  }

  return (
    <p
      ref={containerRef}
      aria-label={text}
      className={className}
      style={{ color: "var(--foreground)" }}
    >
      {words.map((word, i) => {
        // Compress ranges so last word finishes at ~85% of progress,
        // with a small overlap between words for smoother transitions.
        const start = (i / words.length) * 0.85;
        const end = ((i + 1) / words.length) * 0.85 + 0.05;

        return (
          <span key={`${word}-${i}`}>
            <Word progress={scrollYProgress} start={start} end={end}>
              {word}
            </Word>
            {/* Preserve natural word spacing for line wrapping */}
            {i < words.length - 1 && " "}
          </span>
        );
      })}
    </p>
  );
}
