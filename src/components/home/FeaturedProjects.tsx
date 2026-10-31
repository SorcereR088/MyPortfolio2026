"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type FeaturedProject = {
  slug: string;
  title: string;
  cover: string;
  href: string;
};

// Mock data. Replace with your MDX frontmatter later and pass it in via props.
const mockProjects: FeaturedProject[] = [
  {
    slug: "viatv-redesign",
    title: "ViaTV Redesign",
    cover: "https://picsum.photos/id/1015/1280/720",
    href: "#",
  },
  {
    slug: "project-two",
    title: "Project Two",
    cover: "https://picsum.photos/id/1043/1280/720",
    href: "#",
  },
  {
    slug: "project-three",
    title: "Project Three",
    cover: "https://picsum.photos/id/1056/1280/720",
    href: "#",
  },
  {
    slug: "project-four",
    title: "Project Four",
    cover: "https://picsum.photos/id/1069/1280/720",
    href: "#",
  },
];

// Navbar is h-14 (56px). Keep in sync with the top-14 / 3.5rem classes below.
const NAVBAR_H = 56;

const spring = { type: "spring", stiffness: 260, damping: 32 } as const;

export default function FeaturedProjects({
  projects = mockProjects,
}: {
  projects?: FeaturedProject[];
}) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const total = projects.length;

  // The image crossing the center of the visible area (below the navbar) becomes active.
  useEffect(() => {
    let observer: IntersectionObserver | undefined;

    const observe = () => {
      observer?.disconnect();

      const vh = window.innerHeight;
      // Clamp so rootMargin never gets a negative-of-negative like "--29px".
      const top = Math.max(0, Math.round(NAVBAR_H + (vh - NAVBAR_H) / 2));
      const bottom = Math.max(0, vh - top - 1);

      const next = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive(Number((entry.target as HTMLElement).dataset.index));
            }
          }
        },
        { rootMargin: `-${top}px 0px -${bottom}px 0px` }
      );

      itemRefs.current.forEach((el) => {
        if (el) next.observe(el);
      });
      observer = next;
    };

    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, [total]);

  const goTo = (i: number) =>
    itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  const past = projects.slice(0, active);
  const current = projects[active];
  const future = projects.slice(active + 1);

  // layoutId lets a title glide between the top, center and bottom groups.
  const titleItem = (p: FeaturedProject, i: number, isActive = false) => (
    <motion.li
      key={p.slug}
      layout="position"
      layoutId={`title-${p.slug}`}
      transition={spring}
    >
      <button
        type="button"
        onClick={() => goTo(i)}
        aria-current={isActive}
        className={`text-right text-heading-h5 transition-colors duration-300 ${
          isActive
            ? "font-medium text-[var(--text-primary)]"
            : "text-[var(--text-disabled)] hover:text-[var(--text-secondary)]"
        }`}
      >
        {p.title}
      </button>
    </motion.li>
  );

  return (
    <section
      aria-labelledby="featured-projects-title"
      className="bg-[var(--background)] text-[var(--text-primary)]"
    >
      {/* Section title */}
      <header className="px-[var(--space-md)] py-12 md:px-[var(--space-xl)] md:py-24">
        <h2
          id="featured-projects-title"
          className="text-heading-h3 text-[var(--text-primary)] md:text-heading-h2"
        >
          Selected Projects
        </h2>
      </header>

      <div className="relative md:grid md:grid-cols-[1fr_minmax(0,35%)_1fr]">
        {/* Left: sticky counter */}
        <div className="sticky top-14 hidden h-[calc(100svh-3.5rem)] items-center self-start px-[var(--space-xl)] md:flex">
          <p
            className="flex text-title-1 font-light tabular-nums text-[var(--text-primary)]"
            aria-live="polite"
          >
            <span className="relative inline-flex overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={spring}
                >
                  {String(active + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="text-[var(--text-disabled)]">/{total}</span>
          </p>
        </div>

        {/* Center: scrolling stack. Roomy on mobile, tight 4px gap on desktop. */}
        <ul className="flex flex-col gap-12 px-[var(--space-md)] pb-16 md:gap-1 md:p-0">
          {projects.map((p, i) => (
            <li
              key={p.slug}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
              className="scroll-mt-14"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                animate={{
                  filter: i === active ? "brightness(1)" : "brightness(0.55)",
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[var(--surface)]"
              >
                <Link
                  href={p.href}
                  className="group relative block aspect-video overflow-hidden"
                >
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    unoptimized={p.cover.startsWith("http")}
                    sizes="(min-width: 768px) 35vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Link>
              </motion.div>

              {/* Mobile caption */}
              <p className="mt-4 flex items-baseline gap-3 md:hidden">
                <span className="text-body-2 tabular-nums text-[var(--text-secondary)]">
                  {String(i + 1).padStart(2, "0")}/{total}
                </span>
                <span className="text-heading-h5 text-[var(--text-primary)]">
                  {p.title}
                </span>
              </p>
            </li>
          ))}
        </ul>

        {/* Right: sticky title index. Past pin top, active center, upcoming pin bottom. */}
        <div className="sticky top-14 hidden h-[calc(100svh-3.5rem)] grid-rows-[1fr_auto_1fr] self-start px-[var(--space-xl)] py-12 md:grid">
          <ul className="flex flex-col items-end self-start">
            {past.map((p, i) => titleItem(p, i))}
          </ul>
          <ul className="flex flex-col items-end">
            {current && titleItem(current, active, true)}
          </ul>
          <ul className="flex flex-col items-end self-end">
            {future.map((p, i) => titleItem(p, active + 1 + i))}
          </ul>
        </div>
      </div>
    </section>
  );
}