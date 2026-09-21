"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, Sun, Moon } from "@phosphor-icons/react";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Detect initial dark mode from <html> class or system preference
  useEffect(() => {
    const html = document.documentElement;
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      html.classList.add("dark");
      setIsDark(true);
    } else if (stored === "light") {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      // Follow system
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    }
  }, []);

  // Sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    if (next) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => {
    setMenuOpen(false);
    menuBtnRef.current?.focus();
  };

  return (
    <>
      <header
        className={[
          "sticky top-0 z-40 w-full transition-all duration-200",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-outline/60 shadow-xs"
            : "bg-transparent",
        ].join(" ")}
        style={{ height: "var(--header-height)" }}
      >
        <div
          className="mx-auto flex h-full items-center justify-between"
          style={{
            maxWidth: "var(--content-max-width)",
            paddingInline: "var(--content-padding)",
          }}
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="text-body-2 font-bold tracking-tight text-text-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            Sachin
            <span className="text-primary">.</span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "px-3 py-2 rounded-lg text-body-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "text-primary bg-secondary"
                      : "text-text-secondary hover:text-text-primary hover:bg-ghost-hover",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              );
            })}

            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="ml-2 h-9 w-9 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-ghost-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isDark ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-1">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-ghost-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {isDark ? <Sun size={20} weight="bold" /> : <Moon size={20} weight="bold" />}
            </button>
            <button
              ref={menuBtnRef}
              type="button"
              onClick={openMenu}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="h-10 w-10 inline-flex items-center justify-center rounded-lg text-text-primary hover:bg-ghost-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <List size={22} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        isOpen={menuOpen}
        onClose={closeMenu}
        navLinks={NAV_LINKS}
        currentPath={pathname}
      />
    </>
  );
}
