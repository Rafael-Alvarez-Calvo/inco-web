import { useInView } from '../hooks/useInView'

const certs = [
  {
    badge: '/cert-iso9001.png',
    name: 'ISO 9001',
    ref: 'EC-7877/14',
    subtitle: 'Calidad',
    desc: 'Certificado por Applus+ conforme a UNE-EN ISO 9001 en las actividades de diseño y desarrollo de estudios y proyectos de planeamiento, ingeniería de obra civil y arquitectura, asistencia técnica y control de vigilancia de obra, dirección facultativa y coordinación de seguridad y salud.',
  },
  {
    badge: '/cert-iso14001.png',
    name: 'ISO 14001',
    ref: 'MA-2960/14',
    subtitle: 'Medio Ambiente',
    desc: 'Certificado por Applus+ conforme a UNE-EN ISO 14001 en gestión medioambiental. La empresa se compromete a llevar a cabo sus actividades en consonancia con la protección del medio ambiente, con mejora continua basada en la tecnificación y prevención de la contaminación.',
  },
  {
    badge: '/cert-ohsas18001.png',
    name: 'OHSAS 18001',
    ref: 'PRL-1061/19',
    subtitle: 'Seguridad y Salud',
    desc: 'Certificado por Applus+ conforme a OHSAS 18001 en seguridad y salud laboral. Sistema de gestión orientado a la identificación, evaluación y control de los riesgos laborales, garantizando la seguridad de todos los trabajadores y subcontratistas en obra.',
  },
]

export default function Certifications() {
  const { ref: headRef, inView: headIn } = useInView(0.1)
  const { ref: cardsRef, inView: cardsIn } = useInView(0.05)

  return (
    <section id="calidad" className="section-pad bg-stone-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="eyebrow mb-3">Calidad acreditada</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <h2 className="section-title">Certificaciones <em>Applus+</em></h2>
            <p className="max-w-sm text-[15px] text-stone-500 leading-relaxed">
              INCO está certificado en calidad, medio ambiente y seguridad laboral por Applus+, una de las entidades de certificación más reconocidas a nivel internacional.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {certs.map((c, i) => (
            <div
              key={c.name}
              className={`bg-white border border-stone-200 rounded-[4px] overflow-hidden hover:shadow-lg hover:border-stone-300 transition-all duration-300 flex flex-col ${cardsIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Top banner */}
              <div className="bg-blue px-7 py-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] tracking-[2px] uppercase text-white/50 mb-0.5">Systems Certification</p>
                  <h3 className="text-white font-serif text-[20px] font-semibold">{c.name}</h3>
                  <p className="text-white/60 text-[11px] tracking-wide">{c.subtitle}</p>
                </div>
                {/* Real Applus badge */}
                <img
                  src={c.badge}
                  alt={`Certificado ${c.name} Applus+`}
                  className="h-20 w-auto flex-shrink-0 drop-shadow-md"
                />
              </div>

              {/* Body */}
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] tracking-widest uppercase text-stone-400">Nº certificado</span>
                  <span className="bg-stone-100 text-stone-600 text-[11px] font-mono px-2 py-0.5 rounded">{c.ref}</span>
                </div>
                <p className="text-[13.5px] text-stone-500 leading-relaxed flex-1">{c.desc}</p>
                <div className="mt-5 pt-5 border-t border-stone-100 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  <span className="text-[11px] text-stone-400 uppercase tracking-wide">Certificado vigente</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className={`mt-10 bg-blue-light border border-blue/10 rounded-[4px] px-8 py-5 flex gap-4 items-start transition-all duration-700 delay-300 ${cardsIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-blue text-xl flex-shrink-0 mt-0.5">ℹ</span>
          <p className="text-[13.5px] text-blue/80 leading-relaxed">
            <strong className="font-semibold">Sistema de Gestión Integrado:</strong> La Dirección de INCO está comprometida con la mejora continua de la eficacia del sistema, orientando todos los recursos hacia la satisfacción de las necesidades y expectativas de nuestros clientes, el respeto al medio ambiente y la seguridad de todas las personas involucradas en los proyectos.
          </p>
        </div>
      </div>
    </section>
  )
}
