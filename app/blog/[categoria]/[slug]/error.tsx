'use client'

import Link from 'next/link'

export default function BlogPostError() {
  return (
    <div className="bg-neutral-50 min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center flex flex-col items-center gap-5 max-w-[40ch]">
        <div
          className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-7 h-7 border-2 border-primary-700 rounded" />
        </div>
        <h1 className="font-serif text-[26px] leading-[1.15] text-neutral-900">
          No pudimos cargar este artículo
        </h1>
        <p className="font-sans text-[14px] text-neutral-600 leading-relaxed">
          Puede haber sido un error temporal. Intentá recargar la página o volvé
          al blog.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-primary-700 text-white font-sans font-semibold text-[14px] px-5 py-2.5 rounded-lg hover:bg-primary-800 transition-colors duration-120 no-underline"
          >
            Ir al blog
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 font-sans font-semibold text-[14px] px-5 py-2.5 rounded-lg hover:bg-neutral-100 transition-colors duration-120 no-underline"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
