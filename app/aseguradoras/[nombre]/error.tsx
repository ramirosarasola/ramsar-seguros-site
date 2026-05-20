'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function InsurerError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-4">
          Error al cargar
        </p>
        <h1 className="font-serif text-3xl text-neutral-900 mb-3">
          No pudimos cargar la aseguradora
        </h1>
        <p className="text-base text-neutral-600 mb-8">
          Ocurrió un problema al obtener los datos. Podés intentarlo de nuevo o volver al listado de
          aseguradoras.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="flex items-center justify-center px-6 py-3 bg-primary-700 text-white text-sm font-semibold rounded-lg hover:bg-primary-600 active:bg-primary-800 transition-colors duration-150"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/aseguradoras"
            className="flex items-center justify-center px-6 py-3 text-sm font-semibold text-primary-700 border border-primary-700 rounded-lg hover:bg-primary-50 transition-colors duration-150 no-underline"
          >
            Ver todas las aseguradoras
          </Link>
        </div>
      </div>
    </div>
  )
}
