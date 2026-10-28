"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  linkBaseClassName,
  linkTextClassName,
  linkUnderlineClassName,
} from "./navLinkStyles";

export default function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={linkBaseClassName}
      {...(isActive ? { "aria-current": "page" as const } : {})}
    >
      <span className={linkTextClassName(isActive)}>{label}</span>
      <span className={linkUnderlineClassName(isActive)} aria-hidden="true" />
    </Link>
  );
}

