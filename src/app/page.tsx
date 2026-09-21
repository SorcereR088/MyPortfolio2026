import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkle, Palette, Cube, Compass } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-alt text-primary text-body-4 font-medium border border-outline">
          <Sparkle weight="bold" />
          <span>Figma Design System &amp; Phosphor Icons Ready</span>
        </div>

        <h1 className="text-heading-h1 font-extrabold tracking-tight">
          Portfolio &amp; Design System
        </h1>

        <p className="text-body-1 text-text-secondary">
          Welcome to your Next.js portfolio workspace. Your design tokens, Phosphor icons, and core UI component
          primitives are configured and ready.
        </p>

        {/* CTA Buttons using asChild with Next.js Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            variant="primary"
            size="lg"
            rightIcon={<ArrowRight weight="bold" />}
          >
            <Link href="/showcase">
              Open Component Showcase
            </Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="lg"
            leftIcon={<Compass weight="bold" />}
          >
            <Link href="/showcase#button-component">
              Explore Buttons
            </Link>
          </Button>
        </div>

        {/* Quick feature checklist */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-5 bg-surface rounded-2xl border border-outline shadow-xs space-y-2">
            <div className="text-primary">
              <Palette size={24} weight="duotone" />
            </div>
            <h3 className="font-semibold text-body-3 text-text-primary">Figma Tokens</h3>
            <p className="text-xs text-text-secondary">Light &amp; Dark CSS variables directly in globals.css</p>
          </div>

          <div className="p-5 bg-surface rounded-2xl border border-outline shadow-xs space-y-2">
            <div className="text-primary">
              <Cube size={24} weight="duotone" />
            </div>
            <h3 className="font-semibold text-body-3 text-text-primary">Phosphor Icons</h3>
            <p className="text-xs text-text-secondary">Auto-scaled SVG icons with weight &amp; color inheritance</p>
          </div>

          <div className="p-5 bg-surface rounded-2xl border border-outline shadow-xs space-y-2">
            <div className="text-primary">
              <Sparkle size={24} weight="duotone" />
            </div>
            <h3 className="font-semibold text-body-3 text-text-primary">Single Showcase</h3>
            <p className="text-xs text-text-secondary">One consolidated file for all present &amp; future components</p>
          </div>
        </div>
      </div>
    </main>
  );
}