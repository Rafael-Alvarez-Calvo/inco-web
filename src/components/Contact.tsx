import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const details = [
  { icon: '📍', label: 'Sede principal',  value: 'C/ Casas de Miravete 22A – 3ª Planta, Oficina 3\n28031 Madrid', href: null },
  { icon: '📞', label: 'Teléfono',        value: '+34 91 499 47 17', href: 'tel:+34914994717' },
  { icon: '✉️', label: 'Email',           value: 'info@inco.com.es', href: 'mailto:info@inco.com.es' },
  { icon: '🌐', label: 'Web',             value: 'inco.com.es', href: 'https://inco.com.es' },
]

export default function Contact() {
  const { ref: leftRef,  inView: leftIn  } = useInView(0.1)
  const { ref: rightRef, inView: rightIn } = useInView(0.1)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contacto" className="py-28 px-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-20">

        {/* Left info */}
        <div
          ref={leftRef as React.RefObject<HTMLDivElement>}
          className={`md:col-span-2 transition-all duration-700 ${leftIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9'}`}
        >
          <div className="eyebrow mb-4">Contacto</div>
          <h2 className="section-title mb-6">Hablemos de<br />tu <em>proyecto</em></h2>
          <p className="text-[16px] text-stone-500 leading-relaxed mb-10">
            ¿Tienes un proyecto en marcha o necesitas asesoramiento técnico? Nuestro equipo te responderá en menos de 24 horas.
          </p>
          <div className="divide-y divide-stone-100">
            {details.map(d => (
              <div key={d.label} className="flex gap-4 items-start py-5 first:pt-0">
                <div className="w-10 h-10 flex-shrink-0 bg-blue-light rounded-sm flex items-center justify-center text-[17px]">
                  {d.icon}
                </div>
                <div>
                  <div className="text-[10.5px] tracking-widest uppercase text-stone-400 mb-1">{d.label}</div>
                  {d.href ? (
                    <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined}
                      className="text-[14.5px] text-blue hover:underline whitespace-pre-line">{d.value}</a>
                  ) : (
                    <p className="text-[14.5px] text-stone-600 whitespace-pre-line">{d.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div
          ref={rightRef as React.RefObject<HTMLDivElement>}
          className={`md:col-span-3 transition-all duration-700 delay-150 ${rightIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-9'}`}
        >
          <div className="bg-stone-50 border border-stone-200 rounded p-11">
            <h3 className="font-serif text-[22px] text-blue mb-7">Solicitar información</h3>
            {sent ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <p className="font-serif text-xl text-blue mb-2">Mensaje enviado</p>
                <p className="text-stone-400">Nos pondremos en contacto contigo en menos de 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Nombre *"  id="nombre"  type="text"  placeholder="Tu nombre completo" required />
                  <Field label="Empresa"   id="empresa" type="text"  placeholder="Razón social" />
                </div>
                <Field label="Email *"   id="email"    type="email" placeholder="correo@empresa.com" required />
                <Field label="Teléfono"  id="tel"      type="tel"   placeholder="+34 600 000 000" />
                <Field label="Tipo de proyecto" id="tipo" type="text" placeholder="Dirección de obra, redacción de proyecto…" />
                <div>
                  <label className="block text-[11px] tracking-widest uppercase text-stone-400 font-semibold mb-1.5" htmlFor="msg">Mensaje</label>
                  <textarea id="msg" rows={4}
                    placeholder="Cuéntanos los detalles de tu proyecto o consulta…"
                    className="w-full bg-white border border-stone-200 rounded-sm px-3.5 py-2.5 text-[14.5px] text-stone-700 outline-none focus:border-blue resize-y transition-colors"
                  />
                </div>
                <button type="submit"
                  className="w-full bg-blue hover:bg-blue-dark text-white py-3.5 rounded-sm text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200">
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

function Field({ label, id, type, placeholder, required }: {
  label: string; id: string; type: string; placeholder: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-[11px] tracking-widest uppercase text-stone-400 font-semibold mb-1.5" htmlFor={id}>
        {label}
      </label>
      <input id={id} type={type} placeholder={placeholder} required={required}
        className="w-full bg-white border border-stone-200 rounded-sm px-3.5 py-2.5 text-[14.5px] text-stone-700 outline-none focus:border-blue transition-colors"
      />
    </div>
  )
}
