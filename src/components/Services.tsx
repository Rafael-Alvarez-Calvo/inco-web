import { useInView } from '../hooks/useInView'

const services = [
  { icon: '📐', num: '01', title: 'Dirección de Obras',              desc: 'Supervisión y control técnico durante toda la ejecución, garantizando calidad, seguridad y cumplimiento del proyecto.' },
  { icon: '📋', num: '02', title: 'Redacción de Proyectos',          desc: 'Elaboración de proyectos técnicos de ingeniería civil y arquitectura, adaptados a cada cliente y tipología de obra.' },
  { icon: '🦺', num: '03', title: 'Coordinación de Seguridad y Salud', desc: 'Planificación y seguimiento de medidas preventivas conforme al RD 1627/97, minimizando riesgos en obra.' },
  { icon: '🔧', num: '04', title: 'Asistencia Técnica',              desc: 'Consultoría especializada y apoyo continuo a promotores, administraciones y empresas en todas las fases.' },
  { icon: '📊', num: '05', title: 'Gestión y Planificación de Obras', desc: 'Control de costes, cronogramas y recursos para asegurar la rentabilidad y el cumplimiento de plazos.' },
  { icon: '🛣️', num: '06', title: 'Asistencia Técnica Carreteras',   desc: 'Especialización en proyectos viales: autovías, carreteras, intersecciones y obras lineales.' },
  { icon: '🏙️', num: '07', title: 'Planeamiento Urbanístico',        desc: 'Planes de ordenación, instrumentos urbanísticos y proyectos de urbanización con visión integral del territorio.' },
  { icon: '🏛️', num: '08', title: 'Arquitectura y Rehabilitación',   desc: 'Proyectos de nueva planta y rehabilitación de edificios con criterios de eficiencia energética.' },
  { icon: '💻', num: '09', title: 'Tecnología BIM',                   desc: 'Modelado BIM integral para optimizar coordinación, detección de interferencias y gestión del ciclo de vida.' },
]

export default function Services() {
  const { ref, inView } = useInView(0.05)

  return (
    <section id="servicios" className="py-28 px-16 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
          <div>
            <div className="eyebrow mb-3">Qué hacemos</div>
            <h2 className="section-title">Nuestros <em>servicios</em></h2>
          </div>
          <p className="md:text-right max-w-sm text-[15.5px] text-stone-500 leading-relaxed">
            Soluciones técnicas completas para administraciones públicas, promotores y empresas constructoras en toda España.
          </p>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((s, i) => (
            <div
              key={s.num}
              className={`group bg-white border border-stone-200 rounded-[4px] p-9 relative overflow-hidden hover:shadow-xl hover:border-amber hover:-translate-y-1 transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <span className="text-[32px] mb-4 block">{s.icon}</span>
              <div className="text-[9px] tracking-[2px] uppercase text-stone-300 mb-2">{s.num}</div>
              <h3 className="font-serif text-[19px] text-blue mb-3 leading-snug">{s.title}</h3>
              <p className="text-[14px] text-stone-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
