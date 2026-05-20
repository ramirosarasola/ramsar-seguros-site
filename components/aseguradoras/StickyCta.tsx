'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { X, ArrowRight, Lock } from 'lucide-react'

const DISMISS_KEY = 'sticky-cta-dismissed'

export function StickyCta({
  insurerSlug,
  insurerShortName,
}: {
  insurerSlug: string
  insurerShortName: string
}) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const footerObserverRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(DISMISS_KEY) === '1') {
      setDismissed(true)
      return
    }

    const heroCta = document.getElementById('hero-cta')
    const footer = document.querySelector('footer')

    if (!heroCta) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!dismissed) setVisible(!entry.isIntersecting)
      },
      { threshold: 0 },
    )
    heroObserver.observe(heroCta)

    if (footer) {
      footerObserverRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(false)
          else {
            const heroEntry = heroCta.getBoundingClientRect()
            if (heroEntry.bottom < 0) setVisible(true)
          }
        },
        { threshold: 0 },
      )
      footerObserverRef.current.observe(footer)
    }

    return () => {
      heroObserver.disconnect()
      footerObserverRef.current?.disconnect()
    }
  }, [dismissed])

  function handleDismiss() {
    setDismissed(true)
    setVisible(false)
    localStorage.setItem(DISMISS_KEY, '1')
  }

  if (dismissed) return null

  const cotizarHref = `/seguros-de-auto/cotizar?aseguradora=${insurerSlug}`

  return (
    <>
      {/* Desktop — fixed right panel */}
      <div
        className={[
          'hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 w-72 z-40',
          'bg-white rounded-xl shadow-elevation-2 p-5',
          'transition-[transform,opacity] ease-[cubic-bezier(0.16,1,0.3,1)] duration-[240ms]',
          visible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-5 pointer-events-none',
        ].join(' ')}
        aria-hidden={!visible}
      >
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-700 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
          aria-label="Cerrar"
        >
          <X size={14} strokeWidth={2} />
        </button>

        <div
          className="h-8 bg-neutral-200 rounded-md inline-flex items-center justify-center px-4 font-mono text-xs text-neutral-500 tracking-widest uppercase mb-4"
          aria-hidden="true"
        >
          [{insurerShortName} LOGO]
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold text-neutral-900">¿Listo para cotizar?</p>
            <p className="text-xs text-neutral-500 mt-0.5">Cotización gratis en 2 minutos. Sin compromiso.</p>
          </div>

          <Link
            href={cotizarHref}
            className="flex items-center justify-center gap-2 w-full bg-primary-700 text-white text-sm font-semibold rounded-lg py-3 shadow-elevation-3 hover:bg-primary-600 active:bg-primary-800 transition-colors duration-150 no-underline"
          >
            Cotizar con {insurerShortName}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>

          <Link
            href="/aseguradoras"
            className="flex items-center justify-center w-full text-sm font-semibold text-primary-700 border-0 bg-transparent hover:underline underline-offset-2 transition-colors duration-150 no-underline"
          >
            Comparar con otras
          </Link>

          <div className="flex items-center gap-2 mt-1">
            <Lock size={12} strokeWidth={2} className="text-neutral-400 flex-shrink-0" aria-hidden="true" />
            <span className="text-xs text-neutral-500">Datos protegidos</span>
          </div>
        </div>
      </div>

      {/* Mobile — bottom bar (always visible) */}
      <div
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 shadow-[0_-2px_8px_rgba(15,67,63,0.08)]"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 h-18">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-neutral-900">¿Listo para cotizar?</span>
            <span className="text-xs text-neutral-500">
              {insurerShortName} · 2 minutos
            </span>
          </div>
          <Link
            href={cotizarHref}
            className="inline-flex items-center gap-1.5 bg-primary-700 text-white text-sm font-semibold rounded-lg px-4 py-2.5 shadow-elevation-3 hover:bg-primary-600 active:bg-primary-800 transition-colors duration-150 no-underline flex-shrink-0"
          >
            Cotizar
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  )
}
