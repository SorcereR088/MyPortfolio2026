import React from "react";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="w-full"
      style={{ paddingBlock: "var(--space-3xl)" }}
    >
      <div
        className="mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-[55fr_45fr]"
        style={{
          maxWidth: "var(--content-max-width)",
          paddingInline: "var(--content-padding)",
        }}
      >
        {/* Left — text content */}
        <div className="flex flex-col gap-6">
          {/* Eyebrow */}
          <p className="text-body-3 font-semibold text-primary tracking-wide uppercase">
            Designer &amp; Developer
          </p>

          {/* Headline with fluid size */}
          <h1
            className="font-extrabold tracking-tight text-text-primary"
            style={{
              fontSize: "clamp(2.5rem, 5vw + 1rem, var(--heading-h1-font-size))",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Crafting experiences that{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg in oklch, var(--primary) 0%, var(--skyblue) 100%)",
              }}
            >
              feel right
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="text-body-1 text-text-secondary max-w-prose">
            I design and build thoughtful digital products — from pixel-perfect UI systems to
            production-ready Next.js applications. Currently open to new opportunities.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild variant="primary" size="lg" rightIcon={<ArrowRight weight="bold" />}>
              <Link href="/work">See my work</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>

        {/* Right — abstract brand visual */}
        <div
          aria-hidden="true"
          className="relative w-full aspect-square max-w-md mx-auto lg:max-w-none"
        >
          {/* Outer blob */}
          <div
            className="absolute inset-0 rounded-[40%_60%_55%_45%/50%_40%_60%_50%]"
            style={{
              background:
                "radial-gradient(ellipse at 30% 40% in oklch, var(--primary) 0%, transparent 70%)",
              opacity: 0.15,
              filter: "blur(32px)",
            }}
          />
          {/* Inner shapes */}
          <div
            className="absolute top-[10%] left-[10%] w-[55%] h-[55%] rounded-[38%_62%_48%_52%/52%_40%_60%_48%]"
            style={{
              background:
                "linear-gradient(135deg in oklch, var(--primary) 0%, var(--skyblue) 100%)",
              opacity: 0.8,
            }}
          />
          <div
            className="absolute bottom-[12%] right-[8%] w-[45%] h-[45%] rounded-[50%_40%_60%_35%/40%_55%_45%_60%]"
            style={{
              background:
                "linear-gradient(225deg in oklch, var(--cyan) 0%, var(--primary) 100%)",
              opacity: 0.7,
            }}
          />
          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--outline-strong) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              opacity: 0.4,
            }}
          />
        </div>
      </div>
    </section>
  );
}
