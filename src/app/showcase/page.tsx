"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Sparkle,
  Heart,
  Trash,
  Check,
  Sun,
  Moon,
  PaperPlaneTilt,
  LockKey,
  DownloadSimple,
  GithubLogo,
  DotsThree,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ButtonVariant, ButtonSize } from "@/components/ui/button/types";

export default function ComponentShowcasePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalDisabled, setGlobalDisabled] = useState(false);

  // Playground State for Button Section
  const [playVariant, setPlayVariant] = useState<ButtonVariant>("primary");
  const [playSize, setPlaySize] = useState<ButtonSize>("md");
  const [playLoading, setPlayLoading] = useState(false);
  const [playDisabled, setPlayDisabled] = useState(false);
  const [playFullWidth, setPlayFullWidth] = useState(false);
  const [playIconMode, setPlayIconMode] = useState<"none" | "left" | "right" | "both" | "only">("left");
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-text-primary transition-colors duration-200">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-body-4 text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft weight="bold" />
                <span>Home</span>
              </Link>
              <div className="h-4 w-px bg-outline" />
              <div>
                <span className="font-bold text-body-2 tracking-tight">Component Showcase</span>
                <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-on-primary">
                  Phosphor Icons Enabled
                </span>
              </div>
            </div>

            {/* Quick Global Action Toggles */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant={globalLoading ? "primary" : "outline"}
                size="sm"
                onClick={() => setGlobalLoading(!globalLoading)}
              >
                {globalLoading ? "Loading: ON" : "Loading: OFF"}
              </Button>

              <Button
                variant={globalDisabled ? "primary" : "outline"}
                size="sm"
                onClick={() => setGlobalDisabled(!globalDisabled)}
              >
                {globalDisabled ? "Disabled: ON" : "Disabled: OFF"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                leftIcon={isDarkMode ? <Sun weight="bold" /> : <Moon weight="bold" />}
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? "Light" : "Dark"}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">

          {/* Intro Section */}
          <div className="border-b border-outline pb-8">
            <h1 className="text-heading-h2 font-extrabold tracking-tight">
              Component Showcase
            </h1>
            <p className="text-body-2 text-text-secondary mt-2 max-w-3xl">
              All portfolio design system components are consolidated in this single page. Below is the Button
              Component section configured with <strong>@phosphor-icons/react</strong> and automatic SVG normalization.
              When new components are created, they can be added directly below in their own sections.
            </p>
          </div>

          {/* ================================================================== */}
          {/* SECTION 1: BUTTON COMPONENT                                        */}
          {/* ================================================================== */}
          <section id="button-component" className="space-y-12">
            {/* Section Banner Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-primary/30 gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-heading-h3 font-bold text-text-primary">
                    Button Component
                  </h2>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-surface-alt text-primary border border-outline">
                    @/components/ui/button
                  </span>
                </div>
                <p className="text-body-3 text-text-secondary mt-1">
                  Supports Primary, Secondary, Outline, and Ghost variants with full state transitions, Phosphor icon slots, and sizes.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-body-4 text-text-secondary">
                  Interactive clicks: <strong className="text-primary font-bold">{clickCount}</strong>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setClickCount(0)}
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* 1.1 Interactive Playground */}
            <div className="space-y-4">
              <h3 className="text-heading-h5 font-semibold text-text-primary">
                1. Interactive Playground
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-surface rounded-2xl border border-outline shadow-xs">
                {/* Live Preview Area */}
                <div className="lg:col-span-2 flex flex-col items-center justify-center p-8 bg-background rounded-xl border border-outline min-h-[220px]">
                  <Button
                    variant={playVariant}
                    size={playSize}
                    isLoading={playLoading || globalLoading}
                    loadingText={playLoading || globalLoading ? "Processing..." : undefined}
                    disabled={playDisabled || globalDisabled}
                    fullWidth={playFullWidth}
                    iconOnly={playIconMode === "only"}
                    aria-label={playIconMode === "only" ? "Playground action button" : undefined}
                    leftIcon={
                      playIconMode === "left" || playIconMode === "both" ? (
                        <Sparkle weight="bold" />
                      ) : undefined
                    }
                    rightIcon={
                      playIconMode === "right" || playIconMode === "both" ? (
                        <ArrowRight weight="bold" />
                      ) : undefined
                    }
                    onClick={() => setClickCount((c) => c + 1)}
                  >
                    {playIconMode === "only" ? <Sparkle weight="bold" /> : "Interactive Button"}
                  </Button>

                  <p className="text-xs text-text-secondary mt-4 font-mono">
                    {`<Button variant="${playVariant}" size="${playSize}"${
                      playLoading ? " isLoading" : ""
                    }${playDisabled ? " disabled" : ""}${
                      playFullWidth ? " fullWidth" : ""
                    }${playIconMode === "only" ? ' iconOnly aria-label="..."' : ""}>`}
                  </p>
                </div>

                {/* Controls */}
                <div className="space-y-4 text-body-4">
                  {/* Variant */}
                  <div>
                    <label className="block font-semibold mb-1 text-text-secondary">variant</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(["primary", "secondary", "outline", "ghost"] as ButtonVariant[]).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setPlayVariant(v)}
                          className={`py-1.5 px-2 rounded-lg border text-center font-medium capitalize text-xs transition-all ${
                            playVariant === v
                              ? "bg-primary text-on-primary border-primary"
                              : "bg-surface text-text-primary border-outline hover:border-outline-strong"
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block font-semibold mb-1 text-text-secondary">size</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["sm", "md", "lg"] as ButtonSize[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setPlaySize(s)}
                          className={`py-1.5 px-2 rounded-lg border text-center font-medium uppercase text-xs transition-all ${
                            playSize === s
                              ? "bg-primary text-on-primary border-primary"
                              : "bg-surface text-text-primary border-outline hover:border-outline-strong"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Icon Mode */}
                  <div>
                    <label className="block font-semibold mb-1 text-text-secondary">icon placement</label>
                    <select
                      value={playIconMode}
                      onChange={(e) =>
                        setPlayIconMode(
                          e.target.value as "none" | "left" | "right" | "both" | "only"
                        )
                      }
                      className="w-full bg-surface border border-outline rounded-lg p-1.5 text-xs text-text-primary focus:outline-primary"
                    >
                      <option value="none">Text Only (No Icon)</option>
                      <option value="left">Left Icon (Phosphor Sparkle)</option>
                      <option value="right">Right Icon (Phosphor ArrowRight)</option>
                      <option value="both">Both Icons</option>
                      <option value="only">Icon Only (Square)</option>
                    </select>
                  </div>

                  {/* Prop Toggles */}
                  <div className="pt-2 border-t border-outline flex flex-wrap gap-3 text-xs">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playLoading}
                        onChange={(e) => setPlayLoading(e.target.checked)}
                        className="rounded accent-primary"
                      />
                      <span>isLoading</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playDisabled}
                        onChange={(e) => setPlayDisabled(e.target.checked)}
                        className="rounded accent-primary"
                      />
                      <span>disabled</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={playFullWidth}
                        onChange={(e) => setPlayFullWidth(e.target.checked)}
                        className="rounded accent-primary"
                      />
                      <span>fullWidth</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.2 Variants Grid */}
            <div className="space-y-4">
              <h3 className="text-heading-h5 font-semibold text-text-primary">
                2. Style Variants
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-surface rounded-2xl border border-outline">
                {/* Primary */}
                <div className="space-y-3 p-4 rounded-xl bg-background border border-outline">
                  <span className="text-body-4 font-bold text-primary">{'variant="primary"'}</span>
                  <p className="text-xs text-text-secondary">Solid purple brand background, white text.</p>
                  <div>
                    <Button
                      variant="primary"
                      leftIcon={<Sparkle weight="bold" />}
                      isLoading={globalLoading}
                      disabled={globalDisabled}
                      onClick={() => setClickCount((c) => c + 1)}
                    >
                      Primary Action
                    </Button>
                  </div>
                </div>

                {/* Secondary */}
                <div className="space-y-3 p-4 rounded-xl bg-background border border-outline">
                  <span className="text-body-4 font-bold text-primary">{'variant="secondary"'}</span>
                  <p className="text-xs text-text-secondary">Lavender tinted surface, primary text.</p>
                  <div>
                    <Button
                      variant="secondary"
                      leftIcon={<DownloadSimple weight="bold" />}
                      isLoading={globalLoading}
                      disabled={globalDisabled}
                      onClick={() => setClickCount((c) => c + 1)}
                    >
                      Download Assets
                    </Button>
                  </div>
                </div>

                {/* Outline */}
                <div className="space-y-3 p-4 rounded-xl bg-background border border-outline">
                  <span className="text-body-4 font-bold text-primary">{'variant="outline"'}</span>
                  <p className="text-xs text-text-secondary">Transparent fill, 1px border outline.</p>
                  <div>
                    <Button
                      variant="outline"
                      rightIcon={<ArrowRight weight="bold" />}
                      isLoading={globalLoading}
                      disabled={globalDisabled}
                      onClick={() => setClickCount((c) => c + 1)}
                    >
                      View Projects
                    </Button>
                  </div>
                </div>

                {/* Ghost */}
                <div className="space-y-3 p-4 rounded-xl bg-background border border-outline">
                  <span className="text-body-4 font-bold text-primary">{'variant="ghost"'}</span>
                  <p className="text-xs text-text-secondary">Border-free, subtle hover surface background.</p>
                  <div>
                    <Button
                      variant="ghost"
                      rightIcon={<ArrowRight weight="bold" />}
                      isLoading={globalLoading}
                      disabled={globalDisabled}
                      onClick={() => setClickCount((c) => c + 1)}
                    >
                      Ghost Button
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.3 Icon Configurations */}
            <div className="space-y-4">
              <h3 className="text-heading-h5 font-semibold text-text-primary">
                3. Phosphor Icons Integration
              </h3>
              <div className="p-6 bg-surface rounded-2xl border border-outline">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
                  {/* Text Only */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-text-secondary">Text Only</span>
                    <div>
                      <Button variant="primary" isLoading={globalLoading} disabled={globalDisabled}>
                        Standard Label
                      </Button>
                    </div>
                  </div>

                  {/* Left Icon */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-text-secondary">Left Icon</span>
                    <div>
                      <Button
                        variant="primary"
                        leftIcon={<Plus weight="bold" />}
                        isLoading={globalLoading}
                        disabled={globalDisabled}
                      >
                        Create Post
                      </Button>
                    </div>
                  </div>

                  {/* Right Icon */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-text-secondary">Right Icon</span>
                    <div>
                      <Button
                        variant="secondary"
                        rightIcon={<PaperPlaneTilt weight="fill" />}
                        isLoading={globalLoading}
                        disabled={globalDisabled}
                      >
                        Send Message
                      </Button>
                    </div>
                  </div>

                  {/* Both Icons */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-text-secondary">Both Icons</span>
                    <div>
                      <Button
                        variant="outline"
                        leftIcon={<Sparkle weight="bold" />}
                        rightIcon={<ArrowRight weight="bold" />}
                        isLoading={globalLoading}
                        disabled={globalDisabled}
                      >
                        AI Generate
                      </Button>
                    </div>
                  </div>

                  {/* Icon Only (Phosphor weights) */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-text-secondary">Icon Only (Phosphor)</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        iconOnly
                        aria-label="Add project"
                        isLoading={globalLoading}
                        disabled={globalDisabled}
                      >
                        <Plus weight="bold" />
                      </Button>
                      <Button
                        variant="secondary"
                        iconOnly
                        aria-label="Like"
                        isLoading={globalLoading}
                        disabled={globalDisabled}
                      >
                        <Heart weight="fill" />
                      </Button>
                      <Button
                        variant="outline"
                        iconOnly
                        aria-label="Delete"
                        isLoading={globalLoading}
                        disabled={globalDisabled}
                      >
                        <Trash weight="bold" />
                      </Button>
                      <Button
                        variant="ghost"
                        iconOnly
                        aria-label="Confirm"
                        isLoading={globalLoading}
                        disabled={globalDisabled}
                      >
                        <Check weight="bold" />
                      </Button>
                      <Button
                        variant="ghost"
                        iconOnly
                        aria-label="More options"
                        isLoading={globalLoading}
                        disabled={globalDisabled}
                      >
                        <DotsThree weight="bold" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.4 Size Scales */}
            <div className="space-y-4">
              <h3 className="text-heading-h5 font-semibold text-text-primary">
                4. Size Scales
              </h3>
              <div className="p-6 bg-surface rounded-2xl border border-outline space-y-6">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="space-y-1">
                    <span className="text-xs text-text-secondary font-semibold">{'size="sm" (32px)'}</span>
                    <div>
                      <Button size="sm" variant="primary" leftIcon={<Plus weight="bold" />}>
                        Small (sm)
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-text-secondary font-semibold">{'size="md" (40px Default)'}</span>
                    <div>
                      <Button size="md" variant="primary" leftIcon={<Plus weight="bold" />}>
                        Medium (md)
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-text-secondary font-semibold">{'size="lg" (48px)'}</span>
                    <div>
                      <Button size="lg" variant="primary" leftIcon={<Plus weight="bold" />}>
                        Large (lg)
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-outline">
                  <div className="space-y-1">
                    <span className="text-xs text-text-secondary font-semibold">Icon Only: sm (32px)</span>
                    <div>
                      <Button size="sm" variant="secondary" iconOnly aria-label="Heart small">
                        <Heart weight="fill" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-text-secondary font-semibold">Icon Only: md (40px)</span>
                    <div>
                      <Button size="md" variant="secondary" iconOnly aria-label="Heart medium">
                        <Heart weight="fill" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs text-text-secondary font-semibold">Icon Only: lg (48px)</span>
                    <div>
                      <Button size="lg" variant="secondary" iconOnly aria-label="Heart large">
                        <Heart weight="fill" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1.5 States Comparison Table */}
            <div className="space-y-4">
              <h3 className="text-heading-h5 font-semibold text-text-primary">
                5. Comprehensive States Matrix
              </h3>
              <div className="overflow-x-auto p-6 bg-surface rounded-2xl border border-outline">
                <table className="w-full text-left border-collapse min-w-[650px] text-body-3">
                  <thead>
                    <tr className="border-b border-outline text-text-secondary text-xs uppercase tracking-wider">
                      <th className="pb-3 font-semibold">Variant</th>
                      <th className="pb-3 font-semibold">Default</th>
                      <th className="pb-3 font-semibold">With Phosphor Icon</th>
                      <th className="pb-3 font-semibold">Loading Spinner</th>
                      <th className="pb-3 font-semibold">Loading w/ Text</th>
                      <th className="pb-3 font-semibold">Disabled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline">
                    <tr>
                      <td className="py-4 font-semibold text-primary">Primary</td>
                      <td className="py-4"><Button variant="primary">Confirm</Button></td>
                      <td className="py-4"><Button variant="primary" leftIcon={<Sparkle weight="bold" />}>Upgrade</Button></td>
                      <td className="py-4"><Button variant="primary" isLoading>Save</Button></td>
                      <td className="py-4"><Button variant="primary" isLoading loadingText="Saving...">Save</Button></td>
                      <td className="py-4"><Button variant="primary" disabled leftIcon={<LockKey weight="bold" />}>Locked</Button></td>
                    </tr>
                    <tr>
                      <td className="py-4 font-semibold text-primary">Secondary</td>
                      <td className="py-4"><Button variant="secondary">Cancel</Button></td>
                      <td className="py-4"><Button variant="secondary" rightIcon={<PaperPlaneTilt weight="fill" />}>Send</Button></td>
                      <td className="py-4"><Button variant="secondary" isLoading>Send</Button></td>
                      <td className="py-4"><Button variant="secondary" isLoading loadingText="Sending...">Send</Button></td>
                      <td className="py-4"><Button variant="secondary" disabled>Unavailable</Button></td>
                    </tr>
                    <tr>
                      <td className="py-4 font-semibold text-primary">Outline</td>
                      <td className="py-4"><Button variant="outline">Details</Button></td>
                      <td className="py-4"><Button variant="outline" leftIcon={<Plus weight="bold" />}>Add</Button></td>
                      <td className="py-4"><Button variant="outline" isLoading>Fetch</Button></td>
                      <td className="py-4"><Button variant="outline" isLoading loadingText="Fetching...">Fetch</Button></td>
                      <td className="py-4"><Button variant="outline" disabled>Disabled</Button></td>
                    </tr>
                    <tr>
                      <td className="py-4 font-semibold text-primary">Ghost</td>
                      <td className="py-4"><Button variant="ghost">Dismiss</Button></td>
                      <td className="py-4"><Button variant="ghost" rightIcon={<ArrowRight weight="bold" />}>Skip</Button></td>
                      <td className="py-4"><Button variant="ghost" isLoading>Wait</Button></td>
                      <td className="py-4"><Button variant="ghost" isLoading loadingText="Skipping...">Skip</Button></td>
                      <td className="py-4"><Button variant="ghost" disabled>Disabled</Button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 1.6 Polymorphic & Full Width */}
            <div className="space-y-4">
              <h3 className="text-heading-h5 font-semibold text-text-primary">
                6. Polymorphic (asChild) &amp; Full Width Layout
              </h3>
              <div className="p-6 bg-surface rounded-2xl border border-outline space-y-4">
                <p className="text-body-4 text-text-secondary">
                  Use <code>asChild</code> to render any custom link (e.g. Next.js <code>&lt;Link&gt;</code>) or anchor tag while preserving all button variants and styles:
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="primary" leftIcon={<GithubLogo weight="bold" />}>
                    <Link href="https://github.com" target="_blank" rel="noreferrer">
                      Open GitHub (Link as Button)
                    </Link>
                  </Button>

                  <Button asChild variant="secondary" rightIcon={<ArrowRight weight="bold" />}>
                    <Link href="/">
                      Return Home (asChild)
                    </Link>
                  </Button>
                </div>

                <div className="pt-4 border-t border-outline space-y-3">
                  <span className="text-xs font-semibold text-text-secondary block">Full Width:</span>
                  <Button fullWidth variant="primary" size="lg" rightIcon={<ArrowRight weight="bold" />}>
                    Full Width Primary Button
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================== */}
          {/* PLACEHOLDER: NEXT COMPONENT SECTIONS GO HERE                       */}
          {/* ================================================================== */}
          <div className="p-8 rounded-2xl border border-dashed border-outline text-center space-y-2 bg-surface/50">
            <h3 className="text-body-2 font-semibold text-text-secondary">
              Next Component Section Placeholder
            </h3>
            <p className="text-xs text-text-secondary max-w-md mx-auto">
              When you create the Input Fields component or others, add their section right here in this file!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
