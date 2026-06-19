import { useState, useEffect, useRef } from 'react'
import {
  Cookie,
  Settings2,
  ShieldCheck,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useCookieConsent, type ConsentValue } from '../../hooks/useCookieConsent'

// ─── Data ────────────────────────────────────────────────────────────────────

const NECESSARY_COOKIES = [
  { name: 'inco_cookie_consent', duration: '1 año', desc: 'Almacena las preferencias de cookies del usuario en este sitio web.' },
]

const ANALYTICS_COOKIES = [
  { name: '_ga',    duration: '2 años',  desc: 'Identifica visitantes únicos (Google Analytics).' },
  { name: '_ga_#',  duration: '2 años',  desc: 'Similar a _ga, identifica visitantes únicos.' },
  { name: '__utmt', duration: '10 min',  desc: 'Regula la tasa de solicitudes al servidor.' },
  { name: '__utmz', duration: '6 meses', desc: 'Atribuye la fuente desde la que llegó el usuario.' },
  { name: '__utmc', duration: 'Sesión',  desc: 'Determina si se establece una nueva sesión.' },
  { name: '__utmb', duration: 'Sesión',  desc: 'Determina el momento de la visita a la web.' },
  { name: '__utma', duration: '2 años',  desc: 'Distingue sesiones y usuarios únicos.' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function Switch({
  checked,
  onChange,
  disabled = false,
  label,
}: {
  checked: boolean
  onChange: () => void
  disabled?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={[
        'relative inline-flex h-[22px] w-[40px] flex-shrink-0 rounded-full',
        'border-2 border-transparent',
        'transition-colors duration-200 motion-reduce:duration-0',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2',
        checked ? 'bg-amber' : 'bg-stone-200',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none inline-block h-[18px] w-[18px] rounded-full bg-white shadow-sm',
          'transition-transform duration-200 motion-reduce:duration-0',
          checked ? 'translate-x-[18px]' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  )
}

function CookieTable({ items }: { items: typeof NECESSARY_COOKIES }) {
  return (
    <div className="mt-2.5 overflow-x-auto rounded-[4px] border border-stone-100">
      <table className="w-full text-[11.5px]">
        <thead>
          <tr className="bg-stone-50 text-stone-400">
            <th className="px-3 py-1.5 text-left font-semibold">Cookie</th>
            <th className="px-3 py-1.5 text-left font-semibold whitespace-nowrap">Duración</th>
            <th className="px-3 py-1.5 text-left font-semibold">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c, i) => (
            <tr key={c.name} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50/60'}>
              <td className="px-3 py-2 font-mono text-blue whitespace-nowrap">{c.name}</td>
              <td className="px-3 py-2 text-stone-400 whitespace-nowrap">{c.duration}</td>
              <td className="px-3 py-2 text-stone-500 leading-snug">{c.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export const CookieConsent = () => {
  const { visible, save } = useCookieConsent()

  // Animation
  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)

  // UI
  const [view, setView] = useState<'banner' | 'config'>('banner')
  const [analyticsOn, setAnalyticsOn] = useState(false)
  const [expandNecessary, setExpandNecessary] = useState(false)
  const [expandAnalytics, setExpandAnalytics] = useState(false)

  const dialogRef = useRef<HTMLDivElement>(null)

  // Double rAF: ensures the browser paints the initial state before the
  // transition starts, preventing a flash of the final state on mount.
  useEffect(() => {
    if (!visible) return
    let id1: number, id2: number
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setEntered(true))
    })
    return () => {
      cancelAnimationFrame(id1)
      cancelAnimationFrame(id2)
    }
  }, [visible])

  // Move focus into dialog when it opens
  useEffect(() => {
    if (visible && entered) dialogRef.current?.focus()
  }, [visible, entered])

  function dismiss(value: ConsentValue) {
    setEntered(false)
    setLeaving(true)
    setTimeout(() => {
      save(value)
      setLeaving(false)
    }, 220)
  }

  if (!visible && !leaving) return null

  const active = entered && !leaving

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={[
          'fixed inset-0 z-40 bg-blue/25 backdrop-blur-[3px]',
          'transition-opacity duration-300 motion-reduce:duration-0',
          active ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {/* Positioning wrapper — bottom on mobile, center on sm+ */}
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6"
        onKeyDown={e => e.key === 'Escape' && dismiss('necessary')}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ck-title"
          tabIndex={-1}
          className={[
            'w-full max-w-[460px] bg-white rounded-[6px] shadow-2xl outline-none overflow-hidden',
            'transition-all duration-300 ease-out motion-reduce:duration-0',
            active
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 sm:translate-y-0 sm:scale-95',
          ].join(' ')}
        >

          {view === 'banner' ? (
            // ── Simple view ──────────────────────────────────────────────────
            <div className="p-6">

              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-[4px] bg-amber-light flex items-center justify-center">
                  <Cookie size={20} className="text-amber" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <h2 id="ck-title" className="font-serif text-blue text-[17px] font-semibold leading-tight">
                    Política de cookies
                  </h2>
                  <p className="text-[10.5px] text-stone-400 mt-0.5 uppercase tracking-wider">
                    Esther Calvo · inco.com.es
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13.5px] text-stone-500 leading-relaxed mb-4">
                Utilizamos cookies <strong className="text-stone-600 font-medium">técnicas necesarias</strong> para el funcionamiento de la web y cookies <strong className="text-stone-600 font-medium">analíticas</strong> de Google Analytics para mejorar nuestros servicios. Puedes aceptar todas, elegir solo las necesarias o personalizar tus preferencias.
              </p>

              {/* Config link */}
              <button
                onClick={() => setView('config')}
                className="inline-flex items-center gap-1.5 text-[12px] text-stone-400 hover:text-blue transition-colors duration-150 cursor-pointer mb-5 focus:outline-none focus-visible:underline"
              >
                <Settings2 size={13} aria-hidden="true" />
                Configurar preferencias
              </button>

              <div className="border-t border-stone-100 mb-4" />

              {/* Actions — primary → secondary → ghost */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => dismiss('all')}
                  className="w-full py-2.5 px-4 bg-amber hover:bg-amber-dark text-white text-[13.5px] font-semibold rounded-[4px] transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                >
                  Aceptar todas
                </button>
                <button
                  onClick={() => dismiss('necessary')}
                  className="w-full py-2.5 px-4 border border-stone-200 hover:border-blue/30 hover:bg-blue-light text-blue text-[13.5px] font-medium rounded-[4px] transition-all duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/30 focus-visible:ring-offset-2"
                >
                  Solo necesarias
                </button>
                <button
                  onClick={() => dismiss('rejected')}
                  className="w-full py-2 text-[12px] text-stone-400 hover:text-stone-500 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:underline"
                >
                  Rechazar cookies analíticas
                </button>
              </div>
            </div>

          ) : (
            // ── Config view ──────────────────────────────────────────────────
            <>
              {/* Config header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-stone-100">
                <button
                  onClick={() => setView('banner')}
                  className="text-[12px] text-stone-400 hover:text-blue transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:underline"
                  aria-label="Volver al aviso de cookies"
                >
                  ← Volver
                </button>
                <h2 id="ck-title" className="font-serif text-blue text-[15px] font-semibold">
                  Configurar preferencias
                </h2>
              </div>

              {/* Scrollable category list */}
              <div className="px-5 py-4 space-y-3 max-h-[56dvh] overflow-y-auto">

                {/* Necessary */}
                <div className="border border-stone-200 rounded-[4px] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-stone-50/60">
                    <div className="flex items-center gap-2.5">
                      <ShieldCheck size={15} className="text-blue flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13px] font-semibold text-blue">Necesarias</span>
                        <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium">Siempre activas</span>
                      </div>
                    </div>
                    <Switch
                      checked={true}
                      onChange={() => {}}
                      disabled={true}
                      label="Cookies necesarias — siempre activas"
                    />
                  </div>
                  <div className="px-4 pt-2 pb-3">
                    <p className="text-[12.5px] text-stone-400 leading-relaxed">
                      Permiten la navegación y el uso de las funciones básicas de la web. Sin ellas la página no puede funcionar correctamente.
                    </p>
                    <button
                      onClick={() => setExpandNecessary(v => !v)}
                      aria-expanded={expandNecessary}
                      className="inline-flex items-center gap-1 mt-2 text-[11.5px] text-amber hover:text-amber-dark transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:underline"
                    >
                      {expandNecessary
                        ? <ChevronUp size={12} aria-hidden="true" />
                        : <ChevronDown size={12} aria-hidden="true" />}
                      {expandNecessary ? 'Ocultar cookies' : 'Ver cookies'}
                    </button>
                    {expandNecessary && <CookieTable items={NECESSARY_COOKIES} />}
                  </div>
                </div>

                {/* Analytics */}
                <div className="border border-stone-200 rounded-[4px] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-stone-50/60">
                    <div className="flex items-center gap-2.5">
                      <BarChart3 size={15} className="text-amber flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
                      <span className="text-[13px] font-semibold text-blue">Analíticas</span>
                    </div>
                    <Switch
                      checked={analyticsOn}
                      onChange={() => setAnalyticsOn(v => !v)}
                      label={`Cookies analíticas — ${analyticsOn ? 'activadas' : 'desactivadas'}`}
                    />
                  </div>
                  <div className="px-4 pt-2 pb-3">
                    <p className="text-[12.5px] text-stone-400 leading-relaxed">
                      Google Analytics para cuantificar visitas y mejorar los servicios. No recopilan información que identifique personalmente al visitante.
                    </p>
                    <button
                      onClick={() => setExpandAnalytics(v => !v)}
                      aria-expanded={expandAnalytics}
                      className="inline-flex items-center gap-1 mt-2 text-[11.5px] text-amber hover:text-amber-dark transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:underline"
                    >
                      {expandAnalytics
                        ? <ChevronUp size={12} aria-hidden="true" />
                        : <ChevronDown size={12} aria-hidden="true" />}
                      {expandAnalytics ? 'Ocultar cookies' : 'Ver cookies'}
                    </button>
                    {expandAnalytics && <CookieTable items={ANALYTICS_COOKIES} />}
                  </div>
                </div>

                {/* Legal note */}
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Titular: Esther Calvo · C/ San Agustín 9, 28014 Madrid ·{' '}
                  <a href="mailto:info@inco.com.es" className="text-amber hover:underline">
                    info@inco.com.es
                  </a>
                  {' '}· Actualización: 02/01/2024
                </p>
              </div>

              {/* Config actions */}
              <div className="px-5 py-4 border-t border-stone-100 flex flex-col gap-2">
                <button
                  onClick={() => dismiss(analyticsOn ? 'all' : 'necessary')}
                  className="w-full py-2.5 px-4 bg-amber hover:bg-amber-dark text-white text-[13.5px] font-semibold rounded-[4px] transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                >
                  Guardar preferencias
                </button>
                <button
                  onClick={() => dismiss('rejected')}
                  className="w-full py-2 text-[12px] text-stone-400 hover:text-stone-500 transition-colors duration-150 cursor-pointer focus:outline-none focus-visible:underline"
                >
                  Rechazar todas
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  )
}
