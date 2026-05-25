import Link from "next/link";

function CotizadorNav() {
  return (
    <header className="sticky top-0 z-40 h-18 bg-white border-b border-neutral-200 flex items-center justify-center px-6">
      <Link
        href="/"
        aria-label="Ramsar Seguros — Volver al inicio"
        className="inline-flex items-baseline gap-2 no-underline"
      >
        {/* Eclipse mark */}
        <span className="relative self-center shrink-0 w-4 h-4 rounded-full bg-accent-500" aria-hidden="true">
          <span className="absolute inset-1 rounded-full bg-primary-700" />
        </span>
        <span className="font-serif text-[22px] leading-none tracking-[-0.02em] text-primary-700">
          Ramsar
        </span>
      </Link>
    </header>
  );
}

export default function CotizadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CotizadorNav />
      <main id="main-content" className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
