import { useState, useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import { Turnstile }     from './Turnstile'
import { FormField }     from '../ui/FormField'
import { MODAL_EXIT_MS } from '../../constants'

interface Props {
  onClose: () => void
}

export const ContactModal = ({ onClose }: Props) => {
  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [sent, setSent]       = useState(false)
  const [token, setToken]     = useState('')
  const dialogRef             = useRef<HTMLDivElement>(null)

  const handleVerify = useCallback((t: string) => setToken(t), [])
  const handleExpire = useCallback(() => setToken(''), [])

  useEffect(() => {
    let id1: number, id2: number
    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setEntered(true))
    })
    return () => { cancelAnimationFrame(id1); cancelAnimationFrame(id2) }
  }, [])

  useEffect(() => {
    if (entered) dialogRef.current?.focus()
  }, [entered])

  function close() {
    setEntered(false)
    setLeaving(true)
    setTimeout(() => { setLeaving(false); onClose() }, MODAL_EXIT_MS)
  }

  const active = entered && !leaving

  return (
    <>
      <div
        aria-hidden="true"
        onClick={close}
        className={[
          'fixed inset-0 z-40 bg-blue/25 backdrop-blur-[3px]',
          'transition-opacity duration-300 motion-reduce:duration-0',
          active ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        onKeyDown={e => e.key === 'Escape' && close()}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cmodal-title"
          tabIndex={-1}
          className={[
            'w-full max-w-[520px] bg-white rounded-[6px] shadow-2xl outline-none overflow-hidden',
            'transition-all duration-300 ease-out motion-reduce:duration-0',
            active ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95',
          ].join(' ')}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
            <h2 id="cmodal-title" className="font-serif text-blue text-[18px] font-semibold">
              Solicitar información
            </h2>
            <button
              onClick={close}
              aria-label="Cerrar"
              className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-[4px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/30"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-light flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" stroke="#c17f3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-serif text-xl text-blue mb-2">Mensaje enviado</p>
                <p className="text-stone-400 text-[14px]">Nos pondremos en contacto contigo en menos de 24 horas.</p>
                <button
                  onClick={close}
                  className="mt-6 px-6 py-2.5 bg-blue text-white text-[13px] font-semibold rounded-[4px] hover:bg-blue-dark transition-colors duration-200"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (!token) return; setSent(true) }} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Nombre *"  id="m-nombre"  type="text"  placeholder="Tu nombre completo" required />
                  <FormField label="Empresa"   id="m-empresa" type="text"  placeholder="Razón social" />
                </div>
                <FormField label="Email *"  id="m-email" type="email" placeholder="correo@empresa.com" required />
                <FormField label="Teléfono" id="m-tel"   type="tel"   placeholder="+34 600 000 000" />
                <FormField label="Tipo de proyecto" id="m-tipo" type="text" placeholder="Dirección de obra, redacción de proyecto…" />
                <div>
                  <label
                    htmlFor="m-msg"
                    className="block text-[11px] tracking-widest uppercase text-stone-400 font-semibold mb-1.5"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="m-msg"
                    rows={3}
                    placeholder="Cuéntanos los detalles de tu proyecto o consulta…"
                    className="w-full bg-white border border-stone-200 rounded-[4px] px-3.5 py-2.5 text-[14px] text-stone-700 outline-none focus:border-blue resize-none transition-colors"
                  />
                </div>
                <div>
                  <Turnstile onVerify={handleVerify} onExpire={handleExpire} />
                </div>
                <button
                  type="submit"
                  disabled={!token}
                  className="w-full bg-blue hover:bg-blue-dark disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-[4px] text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200"
                >
                  Enviar consulta
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

