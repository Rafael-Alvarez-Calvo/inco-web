import { useState, useEffect, useCallback } from 'react'
import {
  Accessibility, X, EyeOff, Heading1, Palette,
  ZoomOut, ZoomIn, Type, Sun, Moon,
  Underline, Highlighter, RotateCcw,
} from 'lucide-react'

const STORAGE_KEY = 'inco-a11y'
const BG_COLORS   = ['', '#f5f4f1', '#dceeff', '#fffde7', '#1a1a1a']
const FONT_BASE   = 16
const FONT_STEP   = 2
const MIN_FONT    = 12
const MAX_FONT    = 24
const ZOOM_STEP   = 0.1
const MIN_ZOOM    = 0.8
const MAX_ZOOM    = 1.4

interface A11yState {
  dark:              boolean
  highlightHeadings: boolean
  bgColorIndex:      number
  zoom:              number
  fontSize:          number
  readableFont:      boolean
  contrastBright:    boolean
  contrastDark:      boolean
  underlineLinks:    boolean
  markLinks:         boolean
}

const DEFAULT: A11yState = {
  dark:              false,
  highlightHeadings: false,
  bgColorIndex:      0,
  zoom:              1,
  fontSize:          FONT_BASE,
  readableFont:      false,
  contrastBright:    false,
  contrastDark:      false,
  underlineLinks:    false,
  markLinks:         false,
}

function loadState(): A11yState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...DEFAULT, ...(JSON.parse(raw) as Partial<A11yState>) }
  } catch { /* ignore */ }
  return { ...DEFAULT }
}

function applyState(s: A11yState) {
  const html = document.documentElement

  // Filter modes are mutually exclusive to avoid CSS cascade conflicts
  if (s.dark) {
    html.style.filter = 'invert(1) hue-rotate(180deg)'
  } else if (s.contrastDark) {
    html.style.filter = 'invert(1) hue-rotate(180deg) contrast(1.5) brightness(0.85)'
  } else if (s.contrastBright) {
    html.style.filter = 'contrast(1.5)'
  } else {
    html.style.filter = ''
  }

  // Re-invert images and video when page is inverted so they look natural
  html.classList.toggle('a11y-reinvert',        s.dark || s.contrastDark)
  html.classList.toggle('a11y-highlight-h',     s.highlightHeadings)
  html.classList.toggle('a11y-readable',        s.readableFont)
  html.classList.toggle('a11y-underline-links', s.underlineLinks)
  html.classList.toggle('a11y-mark-links',      s.markLinks)

  document.body.style.backgroundColor = BG_COLORS[s.bgColorIndex] ?? ''
  html.style.zoom     = s.zoom     !== 1         ? String(s.zoom)     : ''
  html.style.fontSize = s.fontSize !== FONT_BASE ? `${s.fontSize}px`  : ''
}

// ── Sub-components ──────────────────────────────────────────────────────────

interface OptionBtnProps {
  icon:      React.ReactNode
  label:     string
  active?:   boolean
  disabled?: boolean
  onClick:   () => void
}

const OptionBtn = ({ icon, label, active, disabled, onClick }: OptionBtnProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-pressed={active !== undefined ? active : undefined}
    className={[
      'w-full flex items-center gap-3 px-4 py-2 text-left text-[12.5px] transition-colors duration-150',
      active   ? 'bg-blue-light text-blue font-semibold' : 'text-stone-700 hover:bg-stone-50',
      disabled ? 'opacity-30 cursor-not-allowed'         : '',
    ].filter(Boolean).join(' ')}
  >
    <span className="w-4 h-4 flex items-center justify-center flex-shrink-0" aria-hidden="true">
      {icon}
    </span>
    {label}
  </button>
)

const Sep = () => <div className="my-1 border-t border-stone-100 mx-3" role="separator" />

// ── Main widget ─────────────────────────────────────────────────────────────

export const AccessibilityWidget = () => {
  const [open,  setOpen]  = useState(false)
  const [state, setState] = useState<A11yState>(loadState)

  useEffect(() => {
    applyState(state)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* ignore */ }
  }, [state])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const toggle = useCallback(<K extends keyof A11yState>(key: K) => {
    setState(s => ({ ...s, [key]: !s[key] }))
  }, [])

  const activateFilter = useCallback((mode: 'dark' | 'contrastBright' | 'contrastDark') => {
    setState(s => ({
      ...s,
      dark:           mode === 'dark'           ? !s.dark           : false,
      contrastBright: mode === 'contrastBright' ? !s.contrastBright : false,
      contrastDark:   mode === 'contrastDark'   ? !s.contrastDark   : false,
    }))
  }, [])

  const cycleBg = useCallback(() => {
    setState(s => ({ ...s, bgColorIndex: (s.bgColorIndex + 1) % BG_COLORS.length }))
  }, [])

  const adjustZoom = useCallback((dir: 1 | -1) => {
    setState(s => ({
      ...s,
      zoom: +(Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, s.zoom + dir * ZOOM_STEP)).toFixed(1)),
    }))
  }, [])

  const adjustFont = useCallback((dir: 1 | -1) => {
    setState(s => ({
      ...s,
      fontSize: Math.min(MAX_FONT, Math.max(MIN_FONT, s.fontSize + dir * FONT_STEP)),
    }))
  }, [])

  const reset = useCallback(() => setState({ ...DEFAULT }), [])

  return (
    <div className="relative">
      {/* Panel — opens upward from trigger button */}
      {open && (
        <div
          role="dialog"
          aria-label="Barra de accesibilidad"
          className="absolute bottom-full right-0 mb-3 w-[260px] bg-white border border-stone-200 shadow-2xl rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-blue">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white">
              Barra de accesibilidad
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar barra de accesibilidad"
              className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white rounded transition-colors"
            >
              <X size={13} aria-hidden="true" />
            </button>
          </div>

          {/* Options list */}
          <div className="py-1.5">
            <OptionBtn icon={<EyeOff   size={14} />} label="Desactivar luces"   active={state.dark}              onClick={() => activateFilter('dark')} />
            <OptionBtn icon={<Heading1 size={14} />} label="Marcar encabezados" active={state.highlightHeadings} onClick={() => toggle('highlightHeadings')} />
            <OptionBtn icon={<Palette  size={14} />} label="Color de fondo"     active={state.bgColorIndex > 0}  onClick={cycleBg} />

            <Sep />

            <OptionBtn icon={<ZoomOut size={14} />} label="Alejar"  disabled={state.zoom     <= MIN_ZOOM} onClick={() => adjustZoom(-1)} />
            <OptionBtn icon={<ZoomIn  size={14} />} label="Acercar" disabled={state.zoom     >= MAX_ZOOM} onClick={() => adjustZoom(1)} />

            <Sep />

            <OptionBtn
              icon={<span className="text-[10px] font-bold leading-none text-current">A−</span>}
              label="Disminuir fuente"
              disabled={state.fontSize <= MIN_FONT}
              onClick={() => adjustFont(-1)}
            />
            <OptionBtn
              icon={<span className="text-[10px] font-bold leading-none text-current">A+</span>}
              label="Aumentar fuente"
              disabled={state.fontSize >= MAX_FONT}
              onClick={() => adjustFont(1)}
            />
            <OptionBtn icon={<Type size={14} />} label="Fuente legible" active={state.readableFont} onClick={() => toggle('readableFont')} />

            <Sep />

            <OptionBtn icon={<Sun  size={14} />} label="Contraste brillante" active={state.contrastBright} onClick={() => activateFilter('contrastBright')} />
            <OptionBtn icon={<Moon size={14} />} label="Contraste oscuro"    active={state.contrastDark}   onClick={() => activateFilter('contrastDark')} />

            <Sep />

            <OptionBtn icon={<Underline   size={14} />} label="Subrayar enlaces" active={state.underlineLinks} onClick={() => toggle('underlineLinks')} />
            <OptionBtn icon={<Highlighter size={14} />} label="Marcar enlaces"   active={state.markLinks}      onClick={() => toggle('markLinks')} />
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-stone-100 flex items-center justify-between">
            <button
              type="button"
              onClick={reset}
              aria-label="Restablecer todas las opciones de accesibilidad"
              className="flex items-center gap-1.5 text-[11.5px] text-stone-400 hover:text-stone-700 transition-colors"
            >
              <RotateCcw size={11} aria-hidden="true" />
              Restablecer
            </button>
            <span className="text-[9px] tracking-[0.15em] uppercase text-stone-300 font-semibold select-none">
              INCO
            </span>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? 'Cerrar barra de accesibilidad' : 'Abrir barra de accesibilidad'}
        className="w-12 h-12 bg-blue text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
      >
        <Accessibility size={22} aria-hidden="true" />
      </button>
    </div>
  )
}
