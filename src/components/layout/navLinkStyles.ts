/**
 * Shared visual styles for NavLink and ContactTrigger so they look identical.
 */

export const linkBaseClassName =
  "group relative text-base font-regular transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight";

export function linkTextClassName(isActive: boolean): string {
  return isActive ? "text-highlight" : "text-white/70 group-hover:text-white";
}

export function linkUnderlineClassName(isActive: boolean): string {
  return `absolute -bottom-1.5 left-0 h-px w-full origin-left bg-highlight transition-transform duration-[250ms] ease-out ${
    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
  }`;
}

