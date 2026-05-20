const STATS = [
  { value: '50.000+', label: 'cotizaciones realizadas' },
  { value: '20+', label: 'aseguradoras comparadas' },
  { value: '4.8/5', label: 'calificación promedio' },
  { value: '2 min', label: 'tiempo promedio' },
]

export function SocialProofBar() {
  return (
    <div className="border-t border-b border-neutral-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 py-5 md:py-0 md:h-20 flex items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-y-5 md:gap-y-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={[
                'flex flex-col items-center text-center',
                i < STATS.length - 1 ? 'md:border-r md:border-neutral-200' : '',
              ].join(' ')}
            >
              <span className="font-serif text-[40px] leading-none tracking-[-0.02em] text-primary-600 tabular-nums">
                {stat.value}
              </span>
              <span className="font-sans text-[14px] text-neutral-500 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
