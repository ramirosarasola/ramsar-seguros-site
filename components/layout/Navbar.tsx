"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        {/* Inner circle — surface color (neutral-50) creates the eclipse cut-out */}
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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY >= 24;
      // Reverse at ≤ 8px deadband to prevent thrash at threshold
      if (isScrolled !== scrolled) {
        if (isScrolled || window.scrollY <= 8) {
          setScrolled(isScrolled);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

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
            {/* Links */}
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
                    {/* Active underline indicator — 2px marine, scaleX animation */}
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

            {/* CTA — 48px gap from last link */}
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

          {/* Mobile: hamburger placeholder — replaced by MobileNavbar component */}
          <button
            type="button"
            aria-label="Abrir menú"
            className="md:hidden flex flex-col justify-center gap-1.25 w-11 h-11 -mr-2"
          >
            <span className="block h-[1.5px] w-6 bg-neutral-800 rounded-full mx-auto" />
            <span className="block h-[1.5px] w-6 bg-neutral-800 rounded-full mx-auto" />
            <span className="block h-[1.5px] w-6 bg-neutral-800 rounded-full mx-auto" />
          </button>
        </nav>
      </header>
    </>
  );
}
