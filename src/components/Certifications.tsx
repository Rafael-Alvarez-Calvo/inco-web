import { useInView } from '../hooks/useInView'

const certs = [
  {
    icon: '🏆',
    name: 'ISO 9001',
    desc: 'Sistema de gestión de calidad certificado que garantiza procesos estandarizados y mejora continua en todos nuestros servicios.',
    tag: 'Certificado',
  },
  {
    icon: '🛡️',
    name: 'Prevención de Riesgos Laborales',
    desc: 'Certificación en coordinación de seguridad y salud en construcción conforme al RD 1627/97 y la Ley de PRL.',
    tag: 'Certificado',
  },
  {
    icon: '💡',
    name: 'Kit Digital',
    desc: 'Empresa beneficiaria del programa de digitalización Kit Digital, impulsando herramientas BIM avanzadas y la transformación digital.',
    tag: 'Acreditado',
  },
]

export default function Certifications() {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="calidad" className="py-28 px-16 bg-blue-light">
      <div className="max-w-6xl mx-auto">
        <div className="eyebrow mb-4">Calidad acreditada</div>
        <h2 className="section-title mb-12">Certificaciones <em>y calidad</em></h2>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {certs.map((c, i) => (
            <div
              key={c.name}
              className={`bg-white border border-stone-200 rounded-sm p-9 hover:shadow-md transition-all duration-300 flex flex-col ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-[40px] mb-5 block">{c.icon}</span>
              <h3 className="font-serif text-[20px] text-blue mb-3">{c.name}</h3>
              <p className="text-[14px] text-stone-500 leading-relaxed mb-5 flex-1">{c.desc}</p>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-light rounded-full text-[11px] tracking-wide uppercase text-blue font-semibold self-start">
                <span>✓</span>{c.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
