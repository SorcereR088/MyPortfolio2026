import React, { forwardRef, isValidElement, cloneElement } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { ButtonProps, ButtonVariant, ButtonSize } from "./types";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active focus-visible:ring-primary shadow-xs disabled:bg-surface-disabled disabled:text-text-disabled disabled:shadow-none",
  secondary:
    "bg-secondary text-on-secondary hover:bg-secondary-hover active:bg-secondary-active focus-visible:ring-primary disabled:bg-surface-disabled disabled:text-text-disabled",
  outline:
    "bg-transparent text-text-primary border border-outline hover:bg-surface-alt hover:border-outline-strong hover:text-primary active:bg-surface-alt focus-visible:ring-primary disabled:border-outline disabled:text-text-disabled disabled:bg-transparent",
  ghost:
    "bg-transparent text-text-primary hover:bg-ghost-hover hover:text-primary active:bg-surface-alt focus-visible:ring-primary disabled:text-text-disabled disabled:bg-transparent",
};

// Standard button sizes with automatic SVG sizing for Phosphor, Lucide, Heroicons, etc.
const standardSizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-body-4 gap-1.5 rounded-lg [&_svg]:size-3.5 [&_svg]:shrink-0",
  md: "h-10 px-4 text-body-3 gap-2 rounded-xl [&_svg]:size-4 [&_svg]:shrink-0",
  lg: "h-12 px-6 text-body-2 gap-2.5 rounded-xl [&_svg]:size-5 [&_svg]:shrink-0",
};

// Icon-only button sizes with proportional icon centering
const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 w-8 p-0 rounded-lg [&_svg]:size-4 [&_svg]:shrink-0",
  md: "h-10 w-10 p-0 rounded-xl [&_svg]:size-5 [&_svg]:shrink-0",
  lg: "h-12 w-12 p-0 rounded-xl [&_svg]:size-6 [&_svg]:shrink-0",
};

const spinnerSizes: Record<ButtonSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      iconOnly = false,
      fullWidth = false,
      asChild = false,
      disabled = false,
      type = "button",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const sizeStyle = iconOnly
      ? iconOnlySizeClasses[size]
      : standardSizeClasses[size];

    const baseClassNames = cn(
      // Base layout & interaction
      "relative inline-flex items-center justify-center font-medium select-none transition-all duration-150 cursor-pointer",
      // Focus outline & ring
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      // Active micro-interaction
      "active:scale-[0.98]",
      // Disabled state
      isDisabled && "cursor-not-allowed pointer-events-none active:scale-100",
      isLoading && "cursor-wait",
      // Width
      fullWidth ? "w-full" : "w-auto",
      // Size & Variant styles
      sizeStyle,
      variantClasses[variant],
      className
    );

    // Support asChild for polymorphic links (Next.js Link, anchor tags, etc.)
    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return cloneElement(child, {
        className: cn(baseClassNames, child.props?.className),
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        className={baseClassNames}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner size={spinnerSizes[size]} className="shrink-0" />
            {loadingText ? (
              <span className="truncate">{loadingText}</span>
            ) : iconOnly ? null : (
              <span className="truncate">{children}</span>
            )}
          </>
        ) : iconOnly ? (
          <span className="inline-flex shrink-0 items-center justify-center">
            {children || leftIcon || rightIcon}
          </span>
        ) : (
          <>
            {leftIcon && (
              <span
                className="inline-flex shrink-0 items-center justify-center"
                aria-hidden="true"
              >
                {leftIcon}
              </span>
            )}
            {children && <span className="truncate">{children}</span>}
            {rightIcon && (
              <span
                className="inline-flex shrink-0 items-center justify-center"
                aria-hidden="true"
              >
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";


