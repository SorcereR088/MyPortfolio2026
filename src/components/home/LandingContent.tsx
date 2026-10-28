"use client";

import { type ReactNode } from "react";
import { Reveal, RevealText, RotatingWord } from "@/components/motion";

interface LandingContentProps {
  children: ReactNode;
}

/**
 * Client-side animated content for the Landing section.
 * Receives the server-rendered Button components as children.
 */
export default function LandingContent({ children }: LandingContentProps) {
  return (
    <>
      <RevealText
        as="h1"
        className="max-w-[620px] text-heading-h1 font-bold tracking-[-0.03em] text-text-primary max-sm:text-heading-h3"
        lines={[
          <>
            Designing{" "}
            <RotatingWord
              words={["products", "Interface", "systems", "flow"]}
              className="text-highlight"
            />
          </>,
          <>that feel right on every</>,
          <>
            <span className="mr-2 inline-flex h-[52px] w-[80px] items-center justify-center rounded-full bg-primary align-middle">
              <span
                aria-hidden="true"
                className="h-9 w-6 rounded-[3px] border-2 border-on-primary bg-on-primary"
              />
            </span>
            screen.
          </>,
        ]}
      />

      <Reveal as="p" delay={0.25} className="mt-12 max-w-[470px] text-body-1 text-text-secondary">
        5+ years of hands-on experience in graphic design and UI/UX. I bring visual craft and
        product thinking to everything I build, no second-guessing.
      </Reveal>

      <Reveal delay={0.4} className="mt-10 flex flex-wrap gap-3">
        {children}
      </Reveal>
    </>
  );
}

