"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "@phosphor-icons/react";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  currentPath: string;
}

export function MobileMenu({ id, isOpen, onClose, navLinks, currentPath }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Focus trap & body scroll lock using `inert` on sibling content
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      // Lock body scroll
      body.style.overflow = "hidden";
      // Move focus to close button
      closeBtnRef.current?.focus();
      // Mark the main document content as inert so keyboard can't reach it
      document
        .querySelectorAll<HTMLElement>("header, main, footer")
        .forEach((el) => el.setAttribute("inert", ""));
    } else {
      body.style.overflow = "";
      document
        .querySelectorAll<HTMLElement>("[inert]")
        .forEach((el) => el.removeAttribute("inert"));
    }
    return () => {
      body.style.overflow = "";
      document
        .querySelectorAll<HTMLElement>("[inert]")
        .forEach((el) => el.removeAttribute("inert"));
    };
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      hidden={!isOpen}
      className="fixed inset-0 z-50 flex flex-col bg-background"
      style={{
        // Animate in/out using @starting-style + allow-discrete (modern, no JS)
        // Fallback: display:flex when isOpen, hidden when not
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-[--content-padding]"
        style={{ height: "var(--header-height)" }}
      >
        <Link
          href="/"
          onClick={onClose}
          className="text-body-2 font-bold tracking-tight text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
        >
          Sachin<span className="text-primary">.</span>
        </Link>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-text-primary hover:bg-ghost-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <X size={22} weight="bold" />
        </button>
      </div>

      {/* Nav links */}
      <nav
        aria-label="Mobile navigation"
        className="flex flex-col gap-2 px-[--content-padding] pt-8"
      >
        {navLinks.map(({ href, label }) => {
          const isActive = currentPath === href || currentPath.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={[
                // Touch target ≥ 44px — min-h-[44px] gives us that
                "min-h-[44px] flex items-center px-3 rounded-xl text-heading-h4 font-bold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "text-primary bg-secondary"
                  : "text-text-primary hover:text-primary hover:bg-ghost-hover",
              ].join(" ")}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
