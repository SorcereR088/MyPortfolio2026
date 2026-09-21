import React from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  const [featured, ...rest] = projects;

  return (
    <div className="flex flex-col gap-6">
      {/* Featured card — full width */}
      {featured && <ProjectCard project={featured} featured />}

      {/* Remaining cards — 2-col desktop, 1-col mobile */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
