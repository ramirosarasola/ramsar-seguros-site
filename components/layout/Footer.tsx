import Link from 'next/link'
import { Globe, Briefcase, MessageCircle, Music2, Lock, ShieldCheck, Phone, FileText } from 'lucide-react'

/* ── Column data ── */
const COL_SEGUROS = [
  { href: '/aseguradoras/sancor-seguros', label: 'Sancor Seguros' },
  { href: '/aseguradoras/zurich', label: 'Zurich' },
  { href: '/aseguradoras/san-cristobal', label: 'San Cristóbal' },
  { href: '/aseguradoras/la-meridional', label: 'La Meridional' },
  { href: '/aseguradoras/mapfre', label: 'Mapfre' },
  { href: '/aseguradoras/federacion-patronal', label: 'Federación Patronal' },
]

const COL_VEHICULOS = [
  { href: '/vehiculos/toyota', label: 'Toyota' },
  { href: '/vehiculos/volkswagen', label: 'Volkswagen' },
  { href: '/vehiculos/ford', label: 'Ford' },
  { href: '/vehiculos/chevrolet', label: 'Chevrolet' },
  { href: '/vehiculos/renault', label: 'Renault' },
  { href: '/vehiculos/peugeot', label: 'Peugeot' },
]

const COL_BLOG = [
  { href: '/blog/consejos', label: 'Consejos' },
  { href: '/blog/comparativas', label: 'Comparativas' },
  { href: '/blog/novedades', label: 'Novedades' },
  { href: '/blog/guias', label: 'Guías' },
  { href: '/blog/por-marca', label: 'Por marca' },
  { href: '/blog/por-aseguradora', label: 'Por aseguradora' },
]

const COL_EMPRESA = [
  { href: '/sobre-ramsar', label: 'Sobre Ramsar' },
  { href: '/contacto', label: 'Contacto' },
  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { href: '/trabaja-con-nosotros', label: 'Trabaja con nosotros' },
  { href: '/como-funciona', label: 'Cómo funciona' },
]

const TRUST_BADGES = [
  { icon: Lock, label: 'SSL Secure · datos encriptados' },
  { icon: ShieldCheck, label: 'Matrícula SSN · Corredor matriculado' },
  { icon: Phone, label: 'Atención personalizada 9–21 h' },
  { icon: FileText, label: '+ 50.000 cotizaciones realizadas' },
]

const LEGAL_LINKS = [
  { href: '/privacidad', label: 'Política de Privacidad' },
  { href: '/terminos', label: 'Términos de Uso' },
  { href: '/cookies', label: 'Política de Cookies' },
]

/* ── Sub-components ── */

function FooterLinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="flex flex-col gap-2 list-none p-0 m-0">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            className={[
              'font-sans text-[14px] text-white/78 no-underline',
              'transition-colors duration-[120ms] ease-out',
              'hover:text-white hover:underline hover:underline-offset-2',
            ].join(' ')}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function FooterColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans font-semibold text-[11px] tracking-[0.10em] uppercase text-white/50 mb-3">
      {children}
    </h2>
  )
}

/* Eclipse logo — inverse variant (amber ring, midnight inner) */
function FooterLogo() {
  return (
    <Link href="/" aria-label="Ramsar Seguros — Inicio" className="inline-flex items-baseline gap-2 no-underline">
      <span className="relative self-center flex-shrink-0 w-4 h-4 rounded-full bg-accent-500" aria-hidden="true">
        <span className="absolute inset-1 rounded-full bg-secondary-700" />
      </span>
      <span className="font-serif text-[22px] leading-none tracking-[-0.02em] text-white">
        Ramsar
      </span>
    </Link>
  )
}

/* ── Main Footer ── */
export function Footer() {
  return (
    <footer role="contentinfo" className="bg-secondary-700">

      {/* ── Top section: 5-column grid ── */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16 pt-20 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 lg:gap-8">

          {/* Col 1: Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 flex flex-col gap-4">
            <FooterLogo />
            <p className="font-sans text-[14px] text-white/78 leading-relaxed max-w-[28ch]">
              El amigo informado que te ayuda a elegir tu seguro de auto en Argentina.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {[
                { Icon: Globe, label: 'Instagram de Ramsar Seguros', href: '#' },
                { Icon: Music2, label: 'TikTok de Ramsar Seguros', href: '#' },
                { Icon: Briefcase, label: 'LinkedIn de Ramsar Seguros', href: '#' },
                { Icon: MessageCircle, label: 'WhatsApp de Ramsar Seguros', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="me noopener"
                  target="_blank"
                  className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-accent-500 transition-colors duration-[120ms] rounded"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Seguros */}
          <div>
            <FooterColHeading>Seguros</FooterColHeading>
            <FooterLinkList links={COL_SEGUROS} />
            <Link
              href="/aseguradoras"
              className="mt-3 inline-block font-sans text-[14px] text-accent-500 no-underline hover:underline hover:underline-offset-2"
            >
              Ver todas las aseguradoras →
            </Link>
          </div>

          {/* Col 3: Vehículos */}
          <div>
            <FooterColHeading>Vehículos</FooterColHeading>
            <FooterLinkList links={COL_VEHICULOS} />
            <Link
              href="/vehiculos"
              className="mt-3 inline-block font-sans text-[14px] text-accent-500 no-underline hover:underline hover:underline-offset-2"
            >
              Ver todas las marcas →
            </Link>
          </div>

          {/* Col 4: Blog */}
          <div>
            <FooterColHeading>Blog</FooterColHeading>
            <FooterLinkList links={COL_BLOG} />
          </div>

          {/* Col 5: Empresa */}
          <div>
            <FooterColHeading>Empresa</FooterColHeading>
            <FooterLinkList links={COL_EMPRESA} />
          </div>
        </div>
      </div>

      {/* ── Trust strip ── */}
      <div className="border-t border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon
                  size={20}
                  strokeWidth={1.75}
                  className="text-accent-500 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="font-sans font-medium text-[13px] text-white/90">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar — Midnight 900 ── */}
      <div className="bg-secondary-900">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">

            {/* Copyright */}
            <p className="font-sans text-[13px] tracking-[0.005em] text-white/50 order-last md:order-first">
              © 2026 Ramsar Seguros · Todos los derechos reservados.
            </p>

            {/* Legal links */}
            <nav aria-label="Legal" className="flex items-center gap-1">
              {LEGAL_LINKS.map(({ href, label }, i) => (
                <span key={href} className="flex items-center">
                  {i > 0 && (
                    <span className="font-sans text-[13px] text-white/30 px-2" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <Link
                    href={href}
                    className="font-sans text-[13px] text-white/70 no-underline hover:text-accent-500 transition-colors duration-[120ms]"
                  >
                    {label}
                  </Link>
                </span>
              ))}
            </nav>

            {/* SSN seal placeholder */}
            <div
              className="flex items-center gap-3"
              aria-label="Acreditaciones"
            >
              <span className="font-mono text-[11px] text-accent-300/80 border border-accent-500/50 px-2.5 py-1.5 rounded-sm">
                SSN · Mat. N° XXXX
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
