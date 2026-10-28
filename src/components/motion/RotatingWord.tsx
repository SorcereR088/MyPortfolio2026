"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  EASE,
  EASE_IN_OUT,
  LETTER_STAGGER,
  LETTER_DURATION,
  LETTER_HOLD,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface RotatingWordProps {
  /** Words to loop through (e.g. `["products", "Interface", "systems", "flow"]`). */
  words: string[];
  /**
   * Time between swaps in ms. Omit to auto-derive from letter count so the
   * full exit + enter cycle + hold time fits comfortably.
   */
  interval?: number;
  /** Class name for the visible word (e.g. `"text-highlight"`). */
  className?: string;
}

// ─── Letter-level variants ─────────────────────────────────────────────────────

const letterVariants: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: LETTER_DURATION.enter,
      ease: EASE,
    },
  },
  exit: {
    y: "-110%",
    opacity: 0,
    transition: {
      duration: LETTER_DURATION.exit,
      ease: EASE_IN_OUT,
    },
  },
};

/** Reduced-motion fallback — whole-word opacity crossfade, no movement. */
const reducedLetterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: LETTER_DURATION.enter },
  },
  exit: {
    opacity: 0,
    transition: { duration: LETTER_DURATION.exit },
  },
};

/**
 * Parent variants that stagger children on enter and exit.
 * A small `delayChildren` on enter avoids a dead gap after exit completes.
 */
const wordContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: LETTER_STAGGER.enter,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: LETTER_STAGGER.exit,
    },
  },
};

/**
 * Compute the minimum interval (ms) so the full animation cycle fits:
 * exit total + enter total + hold time.
 *
 * Total for a phase = (letters - 1) × stagger + duration
 */
function computeInterval(maxLetters: number): number {
  const exitTotal =
    (maxLetters - 1) * LETTER_STAGGER.exit + LETTER_DURATION.exit;
  const enterTotal =
    (maxLetters - 1) * LETTER_STAGGER.enter + LETTER_DURATION.enter;
  const cycle = exitTotal + enterTotal + LETTER_HOLD;
  // Round up to nearest 100 ms for a clean interval.
  return Math.ceil((cycle * 1000) / 100) * 100;
}

/**
 * Looping word-swap animation with per-letter stagger.
 *
 * Each word exits letter-by-letter (slide up + fade out, left to right),
 * then the next word enters the same way from below.
 *
 * **Layout shift prevention**: Uses an `inline-grid` where every word is
 * stacked invisibly so the container always matches the widest word.
 *
 * Starts the loop only when in view, pauses when the tab is hidden,
 * and respects `prefers-reduced-motion` (opacity-only crossfade).
 *
 * @example
 * ```tsx
 * <RotatingWord
 *   words={["products", "Interface", "systems", "flow"]}
 *   className="text-highlight"
 * />
 * ```
 */
export default function RotatingWord({
  words,
  interval: intervalProp,
  className,
}: RotatingWordProps) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  const prefersReduced = useReducedMotion();

  // Derive interval from the longest word if the caller didn't specify one.
  const maxLetters = useMemo(
    () => Math.max(...words.map((w) => Array.from(w).length)),
    [words]
  );
  const interval = intervalProp ?? computeInterval(maxLetters);

  // Advance to the next word, looping back to 0.
  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % words.length);
  }, [words.length]);

  // Start / pause the interval based on visibility and in-view state.
  useEffect(() => {
    if (!isInView) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    function start() {
      if (timer) return;
      timer = setInterval(advance, interval);
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function handleVisibility() {
      if (document.visibilityState === "visible") {
        start();
      } else {
        stop();
      }
    }

    // Kick off immediately if tab is already visible.
    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isInView, interval, advance]);

  const currentWord = words[index];
  const letters = useMemo(() => Array.from(currentWord), [currentWord]);
  const variants = prefersReduced ? reducedLetterVariants : letterVariants;

  return (
    <span
      ref={containerRef}
      className={cn(
        // Inline-grid stacks all words in the same cell so width = widest word.
        "relative inline-grid overflow-hidden align-baseline pb-[0.12em] -mb-[0.12em]",
        className
      )}
      aria-hidden="true"
    >
      {/* Sizing layer — invisible copies of every word to reserve width. */}
      {words.map((word) => (
        <span
          key={word}
          className="pointer-events-none col-start-1 row-start-1 invisible"
          aria-hidden="true"
        >
          {word}
        </span>
      ))}

      {/* Animated layer — per-letter stagger */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={currentWord}
          className="col-start-1 row-start-1 inline-flex"
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {letters.map((char, i) => (
            <motion.span
              key={`${currentWord}-${i}`}
              className="inline-block will-change-transform"
              variants={variants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>

      {/* Accessible static text for screen readers */}
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
