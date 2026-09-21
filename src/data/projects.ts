export interface Project {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  coverImage: string;
  coverImageAlt: string;
  role: string;
  timeline: string;
  tools: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "brand-identity-system",
    title: "Brand Identity System",
    summary:
      "End-to-end design system built for a fintech startup — from logo and colour palette through to interactive component library in Figma and code.",
    tags: ["Branding", "Design System", "Figma"],
    // Replace with your real screenshot: /images/projects/brand-identity.jpg
    coverImage: "https://placehold.co/1200x675/3900e8/ffffff?text=Brand+Identity",
    coverImageAlt: "Brand identity moodboard on a dark background",
    role: "Lead Designer",
    timeline: "Jan – Apr 2025",
    tools: ["Figma", "Next.js", "Tailwind CSS"],
    featured: true,
  },
  {
    slug: "portfolio-2026",
    title: "Portfolio 2026",
    summary:
      "This very portfolio — designed in Figma first, then built with Next.js 16, Tailwind CSS v4, and a custom component library.",
    tags: ["Web Design", "Development", "Next.js"],
    // Replace with your real screenshot: /images/projects/portfolio-2026.jpg
    coverImage: "https://placehold.co/1200x675/d5ff6b/171717?text=Portfolio+2026",
    coverImageAlt: "Portfolio homepage displayed on a laptop screen",
    role: "Designer & Developer",
    timeline: "Aug – Sep 2026",
    tools: ["Figma", "Next.js", "Tailwind CSS", "TypeScript"],
    featured: false,
  },
];
