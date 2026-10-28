import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/constants/navLinks";
import NavLink from "./NavLink";
import ContactTrigger from "./ContactTrigger";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/8 before:absolute before:inset-0 before:-z-10 before:bg-background/70 before:backdrop-blur-md before:content-['']">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8 xl:px-0"
      >
        <Link
          href="/"
          aria-label="Home"
          className="shrink-0 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--highlight)]"
        >
          <Image
            src="/images/SachinPortfolioLogo.svg"
            alt="Sachin"
            width={100}
            height={28}
            className="h-6 sm:h-7"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop links (md and up) */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => (
            <li key={item.label}>
              {item.action === "contact" ? (
                <ContactTrigger label={item.label} />
              ) : (
                <NavLink href={item.href!} label={item.label} />
              )}
            </li>
          ))}
        </ul>

        {/* Hamburger menu (below md) */}
        <MobileMenu />
      </nav>
    </header>
  );
}