"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const NAV_LINKS = [
  { href: "/seguros-de-auto", label: "Seguros" },
  { href: "/vehiculos", label: "Vehículos" },
  { href: "/blog", label: "Blog" },
] as const;

/* Eclipse wordmark logo — amber ring, marine/cream inner circle */
function RamsarLogo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Ramsar Seguros — Inicio"
      className="inline-flex items-baseline gap-2 no-underline focus-visible:rounded-sm"
    >
      {/* Eclipse mark */}
      <span
        className={[
          "relative self-center shrink-0 rounded-full bg-accent-500",
          "transition-all duration-220 ease-out",
          scrolled ? "w-3.5 h-3.5" : "w-4 h-4",
        ].join(" ")}
        aria-hidden="true"
      >
        <span
          className={[
            "absolute rounded-full bg-neutral-50",
            scrolled ? "inset-0.75" : "inset-1",
          ].join(" ")}
        />
      </span>

      {/* Wordmark — Instrument Serif */}
      <span
        className={[
          "font-serif leading-none tracking-[-0.02em] text-primary-700",
          "transition-all duration-220 ease-out",
          scrolled ? "text-[19px]" : "text-[22px]",
        ].join(" ")}
      >
        Ramsar
      </span>

      {/* SEGUROS descriptor — Geist Mono */}
      <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-neutral-400 pl-0.5 hidden sm:inline">
        Seguros
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY >= 24;
      if (isScrolled !== scrolled) {
        if (isScrolled || window.scrollY <= 8) {
          setScrolled(isScrolled);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape and return focus to hamburger button
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  // Move focus into drawer when it opens
  useEffect(() => {
    if (mobileOpen) closeRef.current?.focus();
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const openMenu = () => setMobileOpen(true);
  const closeMenu = () => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  };

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 w-full",
          "transition-all duration-220 ease-out",
          scrolled
            ? "h-16 bg-neutral-50/95 backdrop-blur-md shadow-elevation-2"
            : "h-18 bg-neutral-50 border-b border-neutral-200",
        ].join(" ")}
      >
        <nav
          aria-label="Principal"
          className="h-full max-w-300 mx-auto px-6 lg:px-16 flex items-center justify-between"
        >
          {/* Left: Logo */}
          <RamsarLogo scrolled={scrolled} />

          {/* Right: Nav links + CTA — desktop only */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {NAV_LINKS.map(({ href, label }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative font-sans text-[15px] font-medium leading-5",
                      "transition-colors duration-120 ease-out",
                      "no-underline",
                      active
                        ? "text-primary-700"
                        : "text-neutral-700 hover:text-primary-700",
                    ].join(" ")}
                  >
                    {label}
                    {active && (
                      <span
                        className="absolute left-0 right-0 h-0.5 bg-primary-700 rounded-full"
                        style={{ bottom: "-13px" }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/seguros-de-auto/cotizar"
              className={[
                "ml-4 inline-flex items-center gap-1.5",
                "bg-primary-700 text-white",
                "font-sans font-semibold text-[14px]",
                "px-4 py-2.5 rounded-sm",
                "transition-colors duration-120 ease-out",
                "hover:bg-primary-600 active:bg-primary-800",
                "shadow-elevation-1",
                "no-underline",
              ].join(" ")}
            >
              Cotizá ahora
            </Link>
          </div>

          {/* Mobile: hamburger button */}
          <button
            ref={hamburgerRef}
            type="button"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={openMenu}
            className="md:hidden flex flex-col justify-center gap-1.25 w-11 h-11 -mr-2 focus-visible:outline-2 focus-visible:outline-primary-700 focus-visible:rounded-sm"
          >
            <span className="block h-[1.5px] w-6 bg-neutral-800 rounded-full mx-auto" />
            <span className="block h-[1.5px] w-6 bg-neutral-800 rounded-full mx-auto" />
            <span className="block h-[1.5px] w-6 bg-neutral-800 rounded-full mx-auto" />
          </button>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={[
          "fixed inset-0 z-[60] bg-neutral-900/40 backdrop-blur-sm md:hidden",
          "transition-opacity duration-300",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Drawer */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={[
          "fixed inset-y-0 right-0 z-[70] w-full max-w-xs bg-white md:hidden",
          "flex flex-col",
          "shadow-[0_8px_16px_rgba(15,67,63,0.08),_0_32px_64px_rgba(15,67,63,0.18)]",
          "transition-transform duration-300 ease-out",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-18 border-b border-neutral-200 shrink-0">
          <RamsarLogo scrolled={false} />
          <button
            ref={closeRef}
            type="button"
            aria-label="Cerrar menú"
            onClick={closeMenu}
            className={[
              "flex items-center justify-center w-10 h-10 rounded-sm -mr-1",
              "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100",
              "transition-colors duration-120",
              "focus-visible:outline-2 focus-visible:outline-primary-700",
            ].join(" ")}
          >
            <X size={20} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto px-4 py-6">
          <ul role="list" className="flex flex-col">
            {NAV_LINKS.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "flex items-center px-3 py-4 rounded-sm",
                      "font-sans text-[18px] font-medium no-underline",
                      "transition-colors duration-120",
                      "border-b border-neutral-100",
                      active
                        ? "text-primary-700"
                        : "text-neutral-800 hover:text-primary-700 hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    {label}
                    {active && (
                      <span
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-700"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA */}
        <div className="px-6 py-6 border-t border-neutral-200 shrink-0">
          <Link
            href="/seguros-de-auto/cotizar"
            className={[
              "flex items-center justify-center w-full",
              "bg-primary-700 text-white",
              "font-sans font-semibold text-[15px]",
              "h-12 rounded-sm",
              "transition-colors duration-120",
              "hover:bg-primary-600 active:bg-primary-800",
              "no-underline",
            ].join(" ")}
          >
            Cotizá ahora
          </Link>
        </div>
      </div>
    </>
  );
}
