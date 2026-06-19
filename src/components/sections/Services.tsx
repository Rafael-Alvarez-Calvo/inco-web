import {
  HardHat,
  FileText,
  ShieldCheck,
  Wrench,
  BarChart3,
  Route,
  Map,
  Building2,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import { useInView } from '../../hooks/useInView'

interface Service {
  icon: LucideIcon
  num: string
  title: string
  desc: string
}

const services: Service[] = [
  { icon: HardHat,     num: '01', title: 'Dirección de Obras',               desc: 'Supervisión y control técnico durante toda la ejecución, garantizando calidad, seguridad y cumplimiento del proyecto.' },
  { icon: FileText,    num: '02', title: 'Redacción de Proyectos',            desc: 'Elaboración de proyectos técnicos de ingeniería civil y arquitectura, adaptados a cada cliente y tipología de obra.' },
  { icon: ShieldCheck, num: '03', title: 'Coordinación de Seguridad y Salud', desc: 'Planificación y seguimiento de medidas preventivas conforme al RD 1627/97, minimizando riesgos en obra.' },
  { icon: Wrench,      num: '04', title: 'Asistencia Técnica',               desc: 'Consultoría especializada y apoyo continuo a promotores, administraciones y empresas en todas las fases.' },
  { icon: BarChart3,   num: '05', title: 'Gestión y Planificación de Obras',  desc: 'Control de costes, cronogramas y recursos para asegurar la rentabilidad y el cumplimiento de plazos.' },
  { icon: Route,       num: '06', title: 'Asistencia Técnica Carreteras',    desc: 'Especialización en proyectos viales: autovías, carreteras, intersecciones y obras lineales.' },
  { icon: Map,         num: '07', title: 'Planeamiento Urbanístico',          desc: 'Planes de ordenación, instrumentos urbanísticos y proyectos de urbanización con visión integral del territorio.' },
  { icon: Building2,   num: '08', title: 'Arquitectura y Rehabilitación',    desc: 'Proyectos de nueva planta y rehabilitación de edificios con criterios de eficiencia energética.' },
  { icon: Layers,      num: '09', title: 'Tecnología BIM',                    desc: 'Modelado BIM integral para optimizar coordinación, detección de interferencias y gestión del ciclo de vida.' },
]

export const Services = () => {
  const { ref, inView } = useInView(0.05)

  return (
    <section id="servicios" className="py-20 md:py-28 px-4 sm:px-8 lg:px-16 bg-stone-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-5">
          <div>
            <div className="eyebrow mb-3">Qué hacemos</div>
            <h2 className="section-title">Nuestros <em>servicios</em></h2>
          </div>
          <p className="md:text-right max-w-xs text-[15px] text-stone-400 leading-relaxed">
            Soluciones técnicas completas para administraciones públicas, promotores y empresas constructoras en toda España.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
        >
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={s.num}
                className={`
                  group relative bg-white border border-stone-200 rounded-[4px] p-7 md:p-8
                  overflow-hidden cursor-pointer
                  hover:shadow-xl hover:border-amber hover:-translate-y-1
                  transition-all duration-300
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                `}
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                {/* Amber top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                {/* Decorative number — background */}
                <span
                  className="absolute top-4 right-5 font-serif font-bold text-stone-100 select-none leading-none group-hover:text-amber-light transition-colors duration-300"
                  style={{ fontSize: 56 }}
                  aria-hidden="true"
                >
                  {s.num}
                </span>

                {/* Icon */}
                <div className="relative mb-5 inline-flex items-center justify-center w-11 h-11 rounded-[4px] bg-amber-light group-hover:bg-amber transition-colors duration-300">
                  <Icon
                    size={20}
                    className="text-amber group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3 className="relative font-serif text-[17px] md:text-[18px] text-blue mb-2.5 leading-snug pr-8">
                  {s.title}
                </h3>
                <p className="relative text-[13.5px] text-stone-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
