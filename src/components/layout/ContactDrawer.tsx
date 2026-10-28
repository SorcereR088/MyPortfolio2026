"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { ArrowDown, ArrowRight, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useContactDrawer } from "./ContactDrawerProvider";

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

const EMAIL = "sachinmhzn88@gmail.com";

const SERVICES = [
  "UI/UX Design",
  "Web Design",
  "Product Design",
  "Design System",
  "Branding & Graphic Design",
  "Other",
];

const BUDGETS = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000+",
  "Not sure yet",
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const field = `w-full rounded-lg border border-outline bg-transparent px-4 text-body-3 text-text-primary placeholder:text-text-secondary transition-colors duration-200 hover:border-outline-strong focus-visible:border-outline-strong ${focusRing}`;

const select = `${field} h-11 appearance-none pr-10 [color-scheme:light] [&:has(option[value='']:checked)]:text-text-secondary`;

export default function ContactDrawer() {
  const { isOpen, close } = useContactDrawer();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnRef = useRef<HTMLElement | null>(null);
  const lenis = useLenis();

  /* Scroll lock via Lenis */
  useEffect(() => {
    if (!lenis) return;
    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
    return () => {
      lenis.start();
    };
  }, [isOpen, lenis]);

  /* Focus: move into panel on open, return on close */
  useEffect(() => {
    if (isOpen) {
      returnRef.current = document.activeElement as HTMLElement;
      requestAnimationFrame(() => closeRef.current?.focus());
    } else {
      returnRef.current?.focus();
      returnRef.current = null;
    }
  }, [isOpen]);

  /* Escape key + focus trap */
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const nodes = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (!nodes.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [close],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{ zIndex: 9999 }}
      className={`fixed inset-0${isOpen ? "" : " pointer-events-none"}`}
    >
      {/* Backdrop (covers the navbar) */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300${
          isOpen ? " opacity-100" : " opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Card (the "light" class switches all tokens to the light theme) */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-drawer-title"
        data-lenis-prevent
        inert={!isOpen}
        className={`light fixed bottom-3 right-3 top-3 flex w-[calc(100%-1.5rem)] flex-col overflow-y-auto rounded-2xl border border-outline bg-surface p-6 text-text-primary shadow-2xl transition-[transform,visibility] duration-300 ease-out sm:w-[460px] sm:p-8${
          isOpen
            ? " visible translate-x-0"
            : " invisible translate-x-[calc(100%+1.5rem)]"
        }`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close contact drawer"
          className={`absolute right-4 top-4 flex size-7 items-center justify-center rounded-full border border-outline text-text-secondary transition-colors duration-200 hover:border-outline-strong hover:text-text-primary ${focusRing}`}
        >
          <X size={12} weight="bold" />
        </button>

        {/* Heading */}
        <header className="pr-10">
          <h2
            id="contact-drawer-title"
            className="text-heading-h5 font-medium sm:text-heading-h4"
          >
            Let&apos;s build something great.
          </h2>
          <p className="mt-3 max-w-[30ch] text-body-3 text-text-secondary">
            Tell me about your project, I usually reply within one business
            day.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex flex-col gap-3"
        >
          <div>
            <label htmlFor="contact-name" className="sr-only">
              Full name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              className={`${field} h-11`}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="sr-only">
              Email address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className={`${field} h-11`}
            />
          </div>

          <div>
            <label htmlFor="contact-company" className="sr-only">
              Company or website name
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Company / Website name"
              className={`${field} h-11`}
            />
          </div>

          <div className="relative">
            <label htmlFor="contact-service" className="sr-only">
              Service
            </label>
            <select
              id="contact-service"
              name="service"
              defaultValue=""
              className={select}
            >
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((s) => (
                <option
                  key={s}
                  value={s}
                  className="bg-surface text-text-primary"
                >
                  {s}
                </option>
              ))}
            </select>
            <ArrowDown
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="sr-only">
              Project details
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Share a little about your goals, timeline, and requirements..."
              className={`${field} resize-none py-3`}
            />
          </div>

          <div className="relative">
            <label htmlFor="contact-budget" className="sr-only">
              Estimated budget
            </label>
            <select
              id="contact-budget"
              name="budget"
              defaultValue=""
              className={select}
            >
              <option value="" disabled>
                Select your estimated budget
              </option>
              {BUDGETS.map((b) => (
                <option
                  key={b}
                  value={b}
                  className="bg-surface text-text-primary"
                >
                  {b}
                </option>
              ))}
            </select>
            <ArrowDown
              size={14}
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary"
            />
          </div>

          <Button
            type="submit"
            variant="outline"
            size="lg"
            fullWidth
            rightIcon={<ArrowRight />}
            className="mt-3 focus-visible:ring-offset-surface"
          >
            Send inquiry
          </Button>
        </form>

        {/* Email line */}
        <p className="mt-auto pt-10 text-center text-body-3 text-text-secondary">
          Prefer email?{" "}
          <a
            href={`mailto:${EMAIL}`}
            className={`text-text-primary underline-offset-4 hover:underline ${focusRing}`}
          >
            {EMAIL}
          </a>
        </p>
      </div>
    </div>,
    document.body,
  );
}