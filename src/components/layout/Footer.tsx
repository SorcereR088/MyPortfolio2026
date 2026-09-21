import React from "react";
import Link from "next/link";
import { GithubLogo, LinkedinLogo, DribbbleLogo } from "@phosphor-icons/react/dist/ssr";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  {
    href: "https://github.com/",
    label: "GitHub",
    icon: <GithubLogo size={18} weight="fill" />,
  },
  {
    href: "https://linkedin.com/in/",
    label: "LinkedIn",
    icon: <LinkedinLogo size={18} weight="fill" />,
  },
  {
    href: "https://dribbble.com/",
    label: "Dribbble",
    icon: <DribbbleLogo size={18} weight="fill" />,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-outline">
      <div
        className="mx-auto py-8 flex flex-col items-center gap-6 md:flex-row md:justify-between"
        style={{
          maxWidth: "var(--content-max-width)",
          paddingInline: "var(--content-padding)",
        }}
      >
        {/* Name / wordmark */}
        <p className="text-body-3 font-semibold text-text-primary text-center md:text-left">
          Sachin<span className="text-primary">.</span>
        </p>

        {/* Nav links */}
        <nav aria-label="Footer navigation" className="flex items-center gap-4">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-body-3 text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social + year */}
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-ghost-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {icon}
            </a>
          ))}
          <span className="text-body-4 text-text-secondary pl-2 border-l border-outline">
            &copy; {year}
          </span>
        </div>
      </div>
    </footer>
  );
}
