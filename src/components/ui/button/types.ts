import React from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button.
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size token determining padding, height, and typography.
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * If true, displays a loading spinner and disables interactive events.
   * @default false
   */
  isLoading?: boolean;

  /**
   * Optional custom text/content to show while loading.
   * If omitted, retains original children with a spinner prepended.
   */
  loadingText?: React.ReactNode;

  /**
   * Slot for an icon rendered to the left of the button text.
   */
  leftIcon?: React.ReactNode;

  /**
   * Slot for an icon rendered to the right of the button text.
   */
  rightIcon?: React.ReactNode;

  /**
   * When true, formats the button as a square/circular icon button.
   * When using this, pass the icon as `children` (or `leftIcon`) and supply an `aria-label`.
   * @default false
   */
  iconOnly?: boolean;

  /**
   * If true, expands the button to take the full width of its parent container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * If true, merges button styles onto the immediate child element (e.g. Next.js Link).
   * @default false
   */
  asChild?: boolean;
}


