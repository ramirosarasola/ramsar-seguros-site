import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seguros por Marca de Auto',
  description: 'Encontrá el mejor seguro para tu auto según la marca y modelo. Comparamos coberturas y precios de las principales aseguradoras de Argentina.',
  alternates: { canonical: '/vehiculos' },
  robots: { index: false, follow: false },
}

export default function VehiclePage() {
  return (
    <main className="max-w-300 mx-auto px-6 lg:px-16 py-20 text-center">
      <h1 className="font-serif text-[40px] leading-tight tracking-tight text-neutral-900">
        Seguros por marca de auto
      </h1>
      <p className="font-sans text-[16px] text-neutral-600 mt-4">
        Próximamente — estamos preparando esta sección.
      </p>
    </main>
  )
}
