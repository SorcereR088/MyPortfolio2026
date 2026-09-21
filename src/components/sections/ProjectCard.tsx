import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { type Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={[
        "group relative flex flex-col overflow-hidden rounded-2xl border border-outline bg-surface transition-all duration-200",
        "hover:border-outline-strong hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        featured ? "lg:flex-row lg:items-stretch" : "",
      ].join(" ")}
    >
      {/* Cover image */}
      <div
        className={[
          "relative overflow-hidden bg-surface-alt",
          featured
            ? "aspect-video lg:aspect-auto lg:w-[55%] lg:shrink-0"
            : "aspect-video",
        ].join(" ")}
      >
        <Image
          src={project.coverImage}
          alt={project.coverImageAlt}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 55vw"
              : "(max-width: 768px) 100vw, 50vw"
          }
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          placeholder="empty"
        />
        {/* Gradient overlay for featured cards */}
        {featured && (
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(to top, var(--surface) 0%, transparent 50%)",
            }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className={[
          "flex flex-col gap-3 p-6",
          featured ? "lg:justify-center lg:p-10" : "",
        ].join(" ")}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-body-4 font-medium bg-secondary text-on-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className={[
            "font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors",
            featured ? "text-heading-h3" : "text-heading-h5",
          ].join(" ")}
        >
          {project.title}
        </h3>

        {/* Summary */}
        <p className="text-body-3 text-text-secondary leading-relaxed line-clamp-3">
          {project.summary}
        </p>

        {/* CTA */}
        <div className="mt-auto pt-2 flex items-center gap-1.5 text-body-3 font-semibold text-primary">
          View case study
          <ArrowRight
            size={16}
            weight="bold"
            className="transition-transform duration-150 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
