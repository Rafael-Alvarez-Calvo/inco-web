import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const details = [
  { icon: '📍', label: 'Sede principal',  value: 'C/ Casas de Miravete 22A\n3ª Planta, Oficina 3 — 28031 Madrid', href: null },
  { icon: '📞', label: 'Teléfono',        value: '+34 91 499 47 17', href: 'tel:+34914994717' },
  { icon: '✉️', label: 'Email',           value: 'info@inco.com.es', href: 'mailto:info@inco.com.es' },
  { icon: '🌐', label: 'Web',             value: 'inco.com.es', href: 'https://inco.com.es' },
]

export default function Contact() {
  const { ref: leftRef,  inView: leftIn  } = useInView(0.1)
  const { ref: rightRef, inView: rightIn } = useInView(0.1)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <section id="contacto" className="section-pad bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 md:gap-20">

          {/* Left info */}
          <div ref={leftRef as React.RefObject<HTMLDivElement>}
            className={`md:col-span-2 transition-all duration-700 ${leftIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9'}`}>
            <div className="eyebrow mb-4">Contacto</div>
            <h2 className="section-title mb-5">Hablemos de<br />tu <em>proyecto</em></h2>
            <p className="text-[15px] text-stone-500 leading-relaxed mb-8">
              ¿Tienes un proyecto en marcha o necesitas asesoramiento técnico? Nuestro equipo te responderá en menos de 24 horas.
            </p>
            <div className="divide-y divide-stone-100">
              {details.map(d => (
                <div key={d.label} className="flex gap-3.5 items-start py-4 first:pt-0">
                  <div className="w-9 h-9 flex-shrink-0 bg-blue-light rounded-[4px] flex items-center justify-center text-[16px]">{d.icon}</div>
                  <div>
                    <div className="text-[10px] tracking-widest uppercase text-stone-400 mb-0.5">{d.label}</div>
                    {d.href
                      ? <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined}
                          className="text-[14px] text-blue hover:underline whitespace-pre-line">{d.value}</a>
                      : <p className="text-[14px] text-stone-600 whitespace-pre-line">{d.value}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div ref={rightRef as React.RefObject<HTMLDivElement>}
            className={`md:col-span-3 transition-all duration-700 delay-150 ${rightIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-9'}`}>
            <div className="bg-stone-50 border border-stone-200 rounded-[4px] p-7 md:p-10">
              <h3 className="font-serif text-[20px] md:text-[22px] text-blue mb-7">Solicitar información</h3>
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <p className="font-serif text-xl text-blue mb-2">Mensaje enviado</p>
                  <p className="text-stone-400 text-[14px]">Nos pondremos en contacto en menos de 24 horas.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nombre + Empresa */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Nombre *"  id="nombre"  type="text"  placeholder="Tu nombre completo" required />
                    <Field label="Empresa"   id="empresa" type="text"  placeholder="Razón social" />
                  </div>
                  <Field label="Email *"          id="email" type="email" placeholder="correo@empresa.com" required />
                  <Field label="Teléfono"          id="tel"   type="tel"   placeholder="+34 600 000 000" />
                  <Field label="Tipo de proyecto"  id="tipo"  type="text"  placeholder="Dirección de obra, redacción de proyecto…" />
                  <div>
                    <label className="block text-[10.5px] tracking-widest uppercase text-stone-400 font-semibold mb-1.5" htmlFor="msg">Mensaje</label>
                    <textarea id="msg" rows={4} placeholder="Cuéntanos los detalles de tu proyecto o consulta…"
                      className="w-full bg-white border border-stone-200 rounded-[4px] px-3.5 py-2.5 text-[14px] text-stone-700 outline-none focus:border-blue resize-y transition-colors" />
                  </div>
                  <button type="submit"
                    className="w-full bg-blue hover:bg-blue-dark text-white py-3.5 rounded-[6px] text-[12.5px] font-semibold uppercase tracking-wide transition-colors duration-200 mt-1">
                    Enviar consulta
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function Field({ label, id, type, placeholder, required }: {
  label: string; id: string; type: string; placeholder: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-[10.5px] tracking-widest uppercase text-stone-400 font-semibold mb-1.5" htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} required={required}
        className="w-full bg-white border border-stone-200 rounded-[4px] px-3.5 py-2.5 text-[14px] text-stone-700 outline-none focus:border-blue transition-colors" />
    </div>
  )
}
