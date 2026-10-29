"use client";

import { ScrollRevealText } from "@/components/motion";

const PARAGRAPH =
  "Designing products, turning complex problems into interfaces that feel simple. I work across the full process: research, flows, systems, visual design, with a focus on products that hold up under real use, not just in a prototype. Right now, I\u2019m drawn to work that needs both strategic thinking and sharp execution.";

export default function WhatIDo() {
  return (
    <section
      aria-label="What I do"
      className="py-20"
    >
      {/* Eyebrow label — matches body-4 uppercase caption style */}
      <p className="mb-8 text-body-4 font-semibold uppercase tracking-widest text-text-secondary sm:mb-4">
        WHAT I DO
      </p>

      {/* Scroll-reveal paragraph — heading-h3 lead text */}
      <ScrollRevealText
        text={PARAGRAPH}
        className="max-w-205 text-heading-h4 font-medium text-text-primary max-sm:text-heading-h5"
      />
    </section>
  );
}

