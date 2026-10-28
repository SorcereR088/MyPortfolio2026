import type { Variants, Transition } from "motion/react";

// ─── Easing curves ─────────────────────────────────────────────────────────────
/** Smooth exponential deceleration — great for entrances. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Symmetrical ease-in-out — use for looping or reversible animations. */
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

// ─── Duration presets (seconds) ────────────────────────────────────────────────
/** Adjust per context: `fast` for micro-interactions, `base` for reveals, `slow` for hero text. */
export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
} as const;

// ─── Stagger presets (seconds between children) ────────────────────────────────
/** `tight` for letters/words, `base` for lines, `loose` for cards or sections. */
export const STAGGER = {
  tight: 0.06,
  base: 0.1,
  loose: 0.16,
} as const;

// ─── Per-letter animation presets (RotatingWord) ───────────────────────────────
/**
 * Stagger between each letter in the RotatingWord component.
 * Increase `enter` for a more dramatic typewriter feel; decrease `exit` for snappier wipes.
 */
export const LETTER_STAGGER = {
  enter: 0.035,
  exit: 0.02,
} as const;

/**
 * Duration of each individual letter's transition.
 * Keep `exit` shorter than `enter` so the outgoing word clears quickly.
 */
export const LETTER_DURATION = {
  enter: 0.55,
  exit: 0.35,
} as const;

/** Hold time (seconds) a word stays fully visible before the next swap begins. */
export const LETTER_HOLD = 1.6 as const;

// ─── Viewport trigger defaults ─────────────────────────────────────────────────
/**
 * Shared IntersectionObserver options for `whileInView`.
 * - `once: true`  — animate only the first time the element enters.
 * - `amount: 0.3` — triggers when 30 % of the element is visible.
 * - `margin`      — negative bottom margin so the reveal fires a bit early.
 */
export const VIEWPORT = {
  once: true,
  amount: 0.3,
  margin: "0px 0px -10% 0px",
} as const;

// ─── Reusable variant sets ─────────────────────────────────────────────────────

/**
 * Fade-up entrance.
 * Hidden state offsets 24 px below; visible slides to origin.
 * Override `y` in your component's `custom` prop if you need a different offset.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

/**
 * Mask-up reveal (for line-by-line heading animations).
 * Slides from 110 % below the mask to 0 %. Pair with `overflow-hidden` wrapper.
 */
export const maskUp: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

/**
 * Container variant factory — orchestrates children with `staggerChildren`.
 *
 * @param stagger – seconds between each child's start (default `STAGGER.base`)
 * @param delay   – seconds before the first child begins (default `0`)
 *
 * @example
 * ```tsx
 * <motion.div variants={container(STAGGER.tight, 0.2)}>
 *   {items.map(i => <motion.div key={i} variants={fadeUp} />)}
 * </motion.div>
 * ```
 */
export function container(
  stagger: number = STAGGER.base,
  delay: number = 0
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      } satisfies Transition,
    },
  };
}

