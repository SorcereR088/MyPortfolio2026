import React from "react";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { TableOfContents } from "@/components/sections/TableOfContents";

// Build static params from project data
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Metadata
export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Sachin`,
    description: project.summary,
  };
}

// Placeholder TOC items — will be derived from real MDX headings later
const PLACEHOLDER_TOC = [
  { id: "overview", text: "Overview", level: 2 as const },
  { id: "problem", text: "Problem", level: 2 as const },
  { id: "process", text: "Process", level: 2 as const },
  { id: "solution", text: "Solution", level: 2 as const },
  { id: "outcome", text: "Outcome", level: 2 as const },
];

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <>
      {/* Hero block */}
      <div
        className="border-b border-outline"
        style={{ paddingBlock: "var(--space-3xl)" }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: "var(--content-max-width)",
            paddingInline: "var(--content-padding)",
          }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
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
          <h1
            className="font-extrabold tracking-tight text-text-primary mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw + 1rem, var(--heading-h1-font-size))",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h1>

          {/* Summary */}
          <p className="text-body-1 text-text-secondary max-w-2xl mb-10">
            {project.summary}
          </p>

          {/* Meta grid */}
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:flex lg:gap-12">
            {[
              { term: "Role", value: project.role },
              { term: "Timeline", value: project.timeline },
              { term: "Tools", value: project.tools.join(", ") },
            ].map(({ term, value }) => (
              <div key={term} className="flex flex-col gap-1">
                <dt className="text-body-4 font-semibold uppercase tracking-widest text-text-secondary">
                  {term}
                </dt>
                <dd className="text-body-3 font-medium text-text-primary">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Content area: sidebar TOC + body */}
      <div
        className="mx-auto py-16"
        style={{
          maxWidth: "var(--content-max-width)",
          paddingInline: "var(--content-padding)",
        }}
      >
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sidebar TOC (desktop) / Dropdown (mobile) */}
          <TableOfContents items={PLACEHOLDER_TOC} />

          {/* Case study body */}
          <article
            className="min-w-0 max-w-[720px] prose-content"
            style={{ wordBreak: "break-word" }}
          >
            {/* Placeholder content — replace with real MDX body */}
            {PLACEHOLDER_TOC.map(({ id, text }) => (
              <section key={id} className="mb-12">
                <h2
                  id={id}
                  className="text-heading-h4 font-bold tracking-tight text-text-primary mb-4"
                >
                  {text}
                </h2>
                <p className="text-body-2 text-text-secondary leading-relaxed">
                  This section covers the <strong>{text.toLowerCase()}</strong> phase of the
                  project. Replace this placeholder with your actual case study content.
                </p>
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
