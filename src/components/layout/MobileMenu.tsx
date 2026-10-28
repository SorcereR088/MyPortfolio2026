"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { List, X } from "@phosphor-icons/react";
import { navLinks } from "@/constants/navLinks";
import { useContactDrawer } from "./ContactDrawerProvider";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--highlight)]";

export default function MobileMenu() {
  // Store the pathname the menu was opened on (null = closed).
  // If the route changes, the menu is treated as closed automatically.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const lenis = useLenis();
  const { open: openContact } = useContactDrawer();

  const isOpen = openedOn === pathname;
  const close = useCallback(() => setOpenedOn(null), []);

  // Lock scroll while open
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    return () => lenis?.start();
  }, [isOpen, lenis]);

  // Close on Escape and return focus to the toggle
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Close when resizing up to desktop (setState runs inside a callback, which is fine)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) close();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [close]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const itemBase = `block w-full py-4 text-left text-lg font-medium transition-colors duration-200 ${focusRing}`;

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpenedOn(isOpen ? null : pathname)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className={`-mr-2 flex size-10 items-center justify-center rounded text-white/80 transition-colors duration-200 hover:text-white ${focusRing}`}
      >
        {isOpen ? <X size={24} /> : <List size={24} />}
      </button>

      {/* Backdrop */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-x-0 bottom-0 top-14 bg-black/50 transition-opacity duration-300 sm:top-16 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        className={`absolute left-0 top-full max-h-[calc(100dvh-3.5rem)] w-full overflow-y-auto border-b border-white/8 bg-background/80 backdrop-blur-md transition-all duration-300 ease-out sm:max-h-[calc(100dvh-4rem)] ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="mx-auto flex max-w-[1280px] flex-col px-4 py-2 sm:px-6">
          {navLinks.map((item) => (
            <li
              key={item.label}
              className="border-b border-white/8 last:border-b-0"
            >
              {item.action === "contact" ? (
                <button
                  type="button"
                  onClick={() => {
                    close();
                    openContact();
                  }}
                  aria-haspopup="dialog"
                  className={`${itemBase} text-white/70 hover:text-white`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  href={item.href!}
                  onClick={close}
                  aria-current={isActive(item.href!) ? "page" : undefined}
                  className={`${itemBase} ${
                    isActive(item.href!)
                      ? "text-[var(--highlight)]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}