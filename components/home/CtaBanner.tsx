import Link from 'next/link'
import { CircleCheck, Clock, ShieldCheck } from 'lucide-react'

const TRUST = [
  { Icon: CircleCheck, label: '100% gratis' },
  { Icon: Clock, label: '2 minutos' },
  { Icon: ShieldCheck, label: '+20 aseguradoras' },
]

export function CtaBanner() {
  return (
    <section
      className="py-20 text-center"
      style={{
        background: 'linear-gradient(180deg, #0e433f 0%, #061f1e 100%)',
      }}
    >
      <div className="max-w-[720px] mx-auto px-6 lg:px-8">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-accent-300 block mb-3">
          Empezá hoy
        </span>

        <h2 className="font-serif text-[36px] md:text-[44px] leading-[1.04] tracking-[-0.02em] text-white max-w-[16ch] mx-auto mb-3">
          Tu seguro ideal está a 2 minutos
        </h2>

        <p className="font-sans text-[18px] text-white/75 max-w-[32ch] mx-auto mb-8">
          Gratis. Sin compromiso. Sin papeles.
        </p>

        <Link
          href="/seguros-de-auto/cotizar"
          className={[
            'inline-flex items-center gap-2',
            'bg-white text-primary-700',
            'font-sans font-semibold text-[15px]',
            'px-6 h-14 rounded-[8px]',
            'no-underline',
            'transition-colors duration-[120ms]',
            'hover:bg-neutral-50 active:bg-neutral-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900',
          ].join(' ')}
          style={{ boxShadow: '0 6px 24px rgba(0,0,0,0.4)' }}
        >
          Cotizá gratis ahora →
        </Link>

        {/* Trust micro-row */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
          {TRUST.map(({ Icon, label }, i) => (
            <span key={label} className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.08em] uppercase text-white/70">
              {i > 0 && (
                <span className="hidden sm:inline w-px h-3 bg-white/20 mx-1" aria-hidden="true" />
              )}
              <Icon size={14} strokeWidth={1.75} className="text-accent-500" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
