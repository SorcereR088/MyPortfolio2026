"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { S_GLOW, S_REVEAL } from "@/lib/motion";

type SGraphicProps = { className?: string };

const VIEW = { x: 660, y: 0, width: 700, height: 708 };

// Soft, gaussian-like glow falloff.
const GLOW_STOPS = Array.from({ length: 8 }, (_, i) => {
  const t = i / 7;
  return { offset: t, opacity: Math.pow(1 - t, 2.2) };
});

// Brush centerlines (start above the viewBox so the round brush tip begins off-screen).
const MAIN_BRUSH_PATH =
  "M 820 -170 L 790 -30 C 762 70, 735 170, 738 260 C 742 360, 780 462, 900 462 C 1000 462, 1100 440, 1180 432 C 1250 424, 1304 450, 1304 510 C 1304 580, 1240 650, 1198 708 L 1170 760";
const TIP_BRUSH_PATH = "M 1088 -170 L 1088 -30 C 1088 50, 1078 110, 1070 150";

function SPaths({ paint }: { paint: string }) {
  return (
    <>
      <path
        d="M 790 -30
           C 762 70, 735 170, 738 260
           C 742 360, 780 462, 900 462
           C 1000 462, 1100 440, 1180 432
           C 1250 424, 1304 450, 1304 510
           C 1304 580, 1240 650, 1198 708
           L 1170 760"
        stroke={paint}
        strokeWidth="54"
        strokeLinejoin="round"
      />
      <path
        d="M 1050 -20 L 1122 -20
           C 1118 60 1100 120 1090 148
           C 1080 168 1052 160 1052 140
           C 1052 110 1050 50 1050 -20 Z"
        fill={paint}
      />
    </>
  );
}

type BrushStrokeProps = {
  d: string;
  delay: number;
  duration: number;
  roughFilter: string;
  dryFilter: string;
  onDone?: () => void;
};

/**
 * One brush pass: a speckled dry-brush tip (leads) and a solid, rough-edged body (follows).
 * Both are wider than the S so the S is always fully covered once the body passes.
 */
function BrushStroke({ d, delay, duration, roughFilter, dryFilter, onDone }: BrushStrokeProps) {
  const common = {
    d,
    stroke: "white",
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
  };

  return (
    <>
      <motion.path
        {...common}
        strokeWidth={150}
        filter={`url(#${dryFilter})`}
        transition={{ duration, delay, ease: S_REVEAL.ease }}
      />
      <motion.path
        {...common}
        strokeWidth={120}
        filter={`url(#${roughFilter})`}
        transition={{ duration, delay: delay + S_REVEAL.lag, ease: S_REVEAL.ease }}
        onAnimationComplete={onDone}
      />
    </>
  );
}

export default function SGraphic({ className }: SGraphicProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const [revealed, setRevealed] = useState(false);
  const prefersReduced = useReducedMotion();
  const inView = useInView(svgRef, { amount: 0.1 });

  const uid = useId().replace(/:/g, "");
  const gradientId = `s-gradient-${uid}`;
  const revealMaskId = `s-reveal-mask-${uid}`;
  const roughFilterId = `s-rough-${uid}`;
  const dryFilterId = `s-dry-${uid}`;
  const glowMaskId = `s-glow-mask-${uid}`;
  const glowGradientId = `s-glow-gradient-${uid}`;

  const glowX = useSpring(0, S_GLOW.spring);
  const glowY = useSpring(0, S_GLOW.spring);
  const glowOpacity = useMotionValue(0);

  const showAll = revealed || !!prefersReduced;

  // Apply spring values straight to the SVG (no React re-renders on mouse move).
  useEffect(() => {
    const circle = glowRef.current;
    if (!circle) return;
    const offX = glowX.on("change", (v) => circle.setAttribute("cx", String(v)));
    const offY = glowY.on("change", (v) => circle.setAttribute("cy", String(v)));
    return () => {
      offX();
      offY();
    };
  }, [glowX, glowY]);

  // Phase 2: cursor glow, only after the reveal finishes.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || prefersReduced || !revealed || !inView) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    let hasPointer = false;
    let next: { x: number; y: number } | null = null;

    const fade = (to: number, duration: number) =>
      animate(glowOpacity, to, { duration, ease: "easeOut" });

    const flush = () => {
      frame = 0;
      const matrix = svg.getScreenCTM();
      if (!matrix || !next) return;
      const p = new DOMPoint(next.x, next.y).matrixTransform(matrix.inverse());

      if (!hasPointer) {
        glowX.jump(p.x);
        glowY.jump(p.y);
        hasPointer = true;
        fade(S_GLOW.intensity, S_GLOW.fadeIn);
      } else {
        glowX.set(p.x);
        glowY.set(p.y);
      }
    };

    const onMove = (e: PointerEvent) => {
      next = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    const onLeave = () => {
      hasPointer = false;
      fade(0, S_GLOW.fadeOut);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      glowOpacity.set(0);
    };
  }, [glowOpacity, glowX, glowY, inView, prefersReduced, revealed]);

  return (
    <svg
      ref={svgRef}
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.width} ${VIEW.height}`}
      preserveAspectRatio="xMaxYMid slice"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="760"
          y1="0"
          x2="1300"
          y2="708"
        >
          <stop offset="0" stopColor="#BDFFD0" />
          <stop offset="0.55" stopColor="#8BFFA8" />
          <stop offset="1" stopColor="#47A369" />
        </linearGradient>

        {/* Rough, bristly stroke edge */}
        <filter
          id={roughFilterId}
          filterUnits="userSpaceOnUse"
          x="620"
          y="-120"
          width="760"
          height="960"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="3"
            seed="3"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale={S_REVEAL.edgeRoughness}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Dry-brush tip: ragged edge + speckled coverage */}
        <filter
          id={dryFilterId}
          filterUnits="userSpaceOnUse"
          x="620"
          y="-120"
          width="760"
          height="960"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            seed="5"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale={S_REVEAL.bristleScale}
            xChannelSelector="R"
            yChannelSelector="G"
            result="rough"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency={S_REVEAL.grainFrequency}
            numOctaves="2"
            seed="9"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  9 0 0 0 -4.1"
            result="speckle"
          />
          <feComposite in="rough" in2="speckle" operator="in" />
        </filter>

        <mask
          id={revealMaskId}
          maskUnits="userSpaceOnUse"
          x="620"
          y="-120"
          width="760"
          height="960"
        >
          <BrushStroke
            d={MAIN_BRUSH_PATH}
            delay={S_REVEAL.delay}
            duration={S_REVEAL.duration}
            roughFilter={roughFilterId}
            dryFilter={dryFilterId}
            onDone={() => setRevealed(true)}
          />
          <BrushStroke
            d={TIP_BRUSH_PATH}
            delay={S_REVEAL.delay + 0.35}
            duration={S_REVEAL.duration * 0.45}
            roughFilter={roughFilterId}
            dryFilter={dryFilterId}
          />
        </mask>

        <mask
          id={glowMaskId}
          maskUnits="userSpaceOnUse"
          x={VIEW.x}
          y={VIEW.y}
          width={VIEW.width}
          height={VIEW.height}
        >
          <SPaths paint="white" />
        </mask>

        <radialGradient id={glowGradientId}>
          {GLOW_STOPS.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor="#EFFFF4" stopOpacity={s.opacity} />
          ))}
        </radialGradient>
      </defs>

      {/* Mask is removed once the brush finishes, so the final S is crisp. */}
      <g mask={showAll ? undefined : `url(#${revealMaskId})`}>
        <SPaths paint={`url(#${gradientId})`} />

        <g mask={`url(#${glowMaskId})`}>
          <motion.g style={{ opacity: glowOpacity, mixBlendMode: "screen" }}>
            <circle
              ref={glowRef}
              cx={0}
              cy={0}
              r={S_GLOW.radius}
              fill={`url(#${glowGradientId})`}
            />
          </motion.g>
        </g>
      </g>
    </svg>
  );
}