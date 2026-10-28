"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Wraps the app in `<MotionConfig>` to respect the user's reduced-motion
 * OS preference globally. Place this near the root layout.
 *
 * @example
 * ```tsx
 * <MotionProvider>{children}</MotionProvider>
 * ```
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}

