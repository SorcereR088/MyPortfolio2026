export type NavLinkItem = {
  label: string;
  href?: string;
  action?: "contact";
};

export const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", action: "contact" },
];

