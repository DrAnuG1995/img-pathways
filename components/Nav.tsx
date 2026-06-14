"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE_NAME } from "@/lib/site";

type NavLink = { href: string; label: string };

const PRIMARY: NavLink[] = [
  { href: "/pathways", label: "Pathways" },
  { href: "/colleges", label: "Colleges" },
];

const REQUIREMENTS: NavLink[] = [
  { href: "/english", label: "English requirements" },
  { href: "/registration", label: "Registration types" },
  { href: "/visas", label: "Visas & immigration" },
  { href: "/medicare", label: "Medicare & the moratorium" },
  { href: "/where-you-can-work", label: "Where you can work" },
  { href: "/costs-and-timelines", label: "Costs & timelines" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile menu
  const [reqOpen, setReqOpen] = useState(false); // desktop requirements dropdown

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-md bg-primary text-[13px] font-bold text-white">
            AU
          </span>
          <span className="hidden sm:inline">{SITE_NAME}</span>
          <span className="sm:hidden">IMG Pathways</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <NavItem href="/finder" label="Find your pathway" active={isActive("/finder")} highlight />
          {PRIMARY.map((l) => (
            <NavItem key={l.href} href={l.href} label={l.label} active={isActive(l.href)} />
          ))}

          {/* Requirements dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setReqOpen(true)}
            onMouseLeave={() => setReqOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={reqOpen}
              onClick={() => setReqOpen((v) => !v)}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink/80 hover:bg-primary-soft hover:text-ink"
            >
              Requirements
              <span aria-hidden className="ml-1 text-xs">▾</span>
            </button>
            {reqOpen && (
              <div className="absolute right-0 top-full w-64 rounded-xl border border-line bg-white p-2 shadow-lg">
                {REQUIREMENTS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block rounded-lg px-3 py-2 text-sm text-ink/80 hover:bg-primary-soft hover:text-ink"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavItem href="/sources" label="Sources" active={isActive("/sources")} />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-md border border-line px-3 py-1.5 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-white md:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-3" aria-label="Mobile">
            <MobileLink href="/finder" label="Find your pathway" onClick={() => setOpen(false)} highlight />
            {PRIMARY.map((l) => (
              <MobileLink key={l.href} href={l.href} label={l.label} onClick={() => setOpen(false)} />
            ))}
            <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-muted">
              Requirements
            </p>
            {REQUIREMENTS.map((l) => (
              <MobileLink key={l.href} href={l.href} label={l.label} onClick={() => setOpen(false)} />
            ))}
            <MobileLink href="/sources" label="Sources" onClick={() => setOpen(false)} />
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({
  href,
  label,
  active,
  highlight,
}: NavLink & { active: boolean; highlight?: boolean }) {
  if (highlight) {
    return (
      <Link
        href={href}
        className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-deep"
      >
        {label}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-primary-soft hover:text-ink ${
        active ? "text-ink" : "text-ink/80"
      }`}
    >
      {label}
    </Link>
  );
}

function MobileLink({
  href,
  label,
  onClick,
  highlight,
}: NavLink & { onClick: () => void; highlight?: boolean }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block rounded-lg px-3 py-2 text-sm ${
        highlight ? "font-semibold text-primary" : "text-ink/80"
      } hover:bg-primary-soft`}
    >
      {label}
    </Link>
  );
}
