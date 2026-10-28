"use client";

import { useContactDrawer } from "./ContactDrawerProvider";
import {
  linkBaseClassName,
  linkTextClassName,
  linkUnderlineClassName,
} from "./navLinkStyles";

export default function ContactTrigger({ label }: { label: string }) {
  const { isOpen, open } = useContactDrawer();

  return (
    <button
      type="button"
      onClick={open}
      className={linkBaseClassName}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
    >
      <span className={linkTextClassName(isOpen)}>{label}</span>
      <span className={linkUnderlineClassName(isOpen)} aria-hidden="true" />
    </button>
  );
}

