import { useState, useCallback } from 'react'
import { MapPin, Phone, Mail, Globe, type LucideIcon } from 'lucide-react'
import { useInView }    from '../../hooks/useInView'
import { FormField }    from '../ui/FormField'
import { INCO_ADDRESS, INCO_PHONE, INCO_PHONE_HREF, INCO_EMAIL, INCO_EMAIL_HREF, INCO_WEB, INCO_WEB_HREF } from '../../constants'
import { Turnstile }    from '../widgets/Turnstile'

interface Detail {
  Icon:  LucideIcon
  label: string
  value: string
  href:  string | null
}

const DETAILS: Detail[] = [
  { Icon: MapPin, label: 'Sede principal', value: INCO_ADDRESS,  href: null           },
  { Icon: Phone,  label: 'Teléfono',       value: INCO_PHONE,    href: INCO_PHONE_HREF },
  { Icon: Mail,   label: 'Email',          value: INCO_EMAIL,    href: INCO_EMAIL_HREF },
  { Icon: Globe,  label: 'Web',            value: INCO_WEB,      href: INCO_WEB_HREF  },
]

export const Contact = () => {
  const { ref: leftRef,  inView: leftIn  } = useInView(0.1)
  const { ref: rightRef, inView: rightIn } = useInView(0.1)

  const [sent, setSent]   = useState(false)
  const [token, setToken] = useState('')

  const handleVerify = useCallback((t: string) => setToken(t), [])
  const handleExpire = useCallback(() => setToken(''), [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) return
    setSent(true)
  }

  return (
    <section id="contacto" className="py-16 md:py-28 px-4 sm:px-8 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 md:gap-12 lg:gap-20">

        {/* Left info */}
        <div
          ref={leftRef}
          className={`md:col-span-2 transition-all duration-700 ${leftIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9'}`}
        >
          <div className="eyebrow mb-4">Contacto</div>
          <h2 className="section-title mb-6">Hablemos de<br />tu <em>proyecto</em></h2>
          <p className="text-[16px] text-stone-500 leading-relaxed mb-10">
            ¿Tienes un proyecto en marcha o necesitas asesoramiento técnico? Nuestro equipo te responderá en menos de 24 horas.
          </p>
          <div className="divide-y divide-stone-100">
            {DETAILS.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex gap-4 items-start py-5 first:pt-0">
                <div className="w-10 h-10 flex-shrink-0 bg-blue-light rounded-sm flex items-center justify-center">
                  <Icon size={18} className="text-blue" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[10.5px] tracking-widest uppercase text-stone-400 mb-1">{label}</div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[14.5px] text-blue hover:underline whitespace-pre-line"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-[14.5px] text-stone-600 whitespace-pre-line">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div
          ref={rightRef}
          className={`md:col-span-3 transition-all duration-700 delay-150 ${rightIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-9'}`}
        >
          <div className="bg-stone-50 border border-stone-200 rounded-[4px] p-5 sm:p-8 md:p-11">
            <h3 className="font-serif text-[22px] text-blue mb-7">Solicitar información</h3>
            {sent ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-light flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" stroke="#c17f3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-serif text-xl text-blue mb-2">Mensaje enviado</p>
                <p className="text-stone-400">Nos pondremos en contacto contigo en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FormField label="Nombre *"  id="nombre"  type="text"  placeholder="Tu nombre completo" required />
                  <FormField label="Empresa"   id="empresa" type="text"  placeholder="Razón social" />
                </div>
                <FormField label="Email *"          id="email" type="email" placeholder="correo@empresa.com" required />
                <FormField label="Teléfono"          id="tel"   type="tel"   placeholder="+34 600 000 000" />
                <FormField label="Tipo de proyecto" id="tipo"  type="text"  placeholder="Dirección de obra, redacción de proyecto…" />
                <div>
                  <label className="block text-[11px] tracking-widest uppercase text-stone-400 font-semibold mb-1.5" htmlFor="msg">Mensaje</label>
                  <textarea
                    id="msg"
                    rows={4}
                    placeholder="Cuéntanos los detalles de tu proyecto o consulta…"
                    className="w-full bg-white border border-stone-200 rounded-[4px] px-3.5 py-2.5 text-[14.5px] text-stone-700 outline-none focus:border-blue resize-y transition-colors"
                  />
                </div>
                <div>
                  <Turnstile onVerify={handleVerify} onExpire={handleExpire} />
                </div>
                <button
                  type="submit"
                  disabled={!token}
                  className="w-full bg-blue hover:bg-blue-dark disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 rounded-sm text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200"
                >
                  Enviar consulta
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
