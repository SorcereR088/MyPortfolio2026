"use client";

import React, { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Highlight active heading via IntersectionObserver
  useEffect(() => {
    if (items.length === 0) return;

    observerRef.current?.disconnect();

    const headingEls = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop: sticky sidebar — shown via parent layout, hidden on mobile */}
      <nav
        aria-label="On this page"
        className="hidden lg:block sticky top-[calc(var(--header-height)+2rem)] self-start"
      >
        <p className="text-body-4 font-semibold uppercase tracking-widest text-text-secondary mb-4">
          On this page
        </p>
        <ul className="flex flex-col gap-1">
          {items.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={[
                  "block py-1 text-body-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
                  level === 3 ? "pl-4" : "",
                  activeId === id
                    ? "text-primary font-semibold"
                    : "text-text-secondary hover:text-text-primary",
                ].join(" ")}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: compact <details> dropdown */}
      <details className="lg:hidden mb-8 border border-outline rounded-xl overflow-hidden">
        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-body-3 font-semibold text-text-primary select-none list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset">
          On this page
          <CaretDown size={16} className="transition-transform duration-200 details-open:rotate-180" />
        </summary>
        <nav aria-label="On this page mobile" className="px-4 pb-3 flex flex-col gap-1">
          {items.map(({ id, text, level }) => (
            <a
              key={id}
              href={`#${id}`}
              className={[
                "block py-1 text-body-3 text-text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm",
                level === 3 ? "pl-4" : "",
                activeId === id ? "text-primary font-semibold" : "",
              ].join(" ")}
            >
              {text}
            </a>
          ))}
        </nav>
      </details>
    </>
  );
}
