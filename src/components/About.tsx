import { useInView } from '../hooks/useInView'

const feats = [
  { icon: '🏗️', title: 'Rigor técnico',          desc: 'Ingenieros de Caminos, ITOP, Topógrafos, Coordinadores de S&S, Delineantes y Consultores Externos.' },
  { icon: '⏱️', title: 'Plazos garantizados',    desc: '100% de cumplimiento en proyectos de hasta 90M€ y 36 meses de ejecución.' },
  { icon: '📋', title: 'Visión global',            desc: 'Desde el estudio previo y análisis de viabilidad hasta la Dirección Facultativa y Control de Calidad.' },
  { icon: '🤝', title: 'Clientes públicos y privados', desc: 'Ministerio de Fomento, ADIF, Junta de Extremadura, ayuntamientos y promotores privados.' },
]

const areas = [
  { letter: 'I', color: 'bg-[#5bbccc]', label: 'Ingeniería',  desc: 'Infraestructura viaria, ferroviaria e hidráulica' },
  { letter: 'U', color: 'bg-amber',     label: 'Urbanismo',   desc: 'Ordenación del territorio, proyectos y obras' },
  { letter: 'E', color: 'bg-[#6aaa48]', label: 'Edificación', desc: 'Obra nueva, rehabilitación y eficiencia energética' },
]

export default function About() {
  const { ref: leftRef,  inView: leftIn  } = useInView(0.1)
  const { ref: rightRef, inView: rightIn } = useInView(0.1)
  const { ref: areasRef, inView: areasIn } = useInView(0.1)

  return (
    <section id="nosotros" className="py-28 px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-700 ${leftIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9'}`}
          >
            <div className="eyebrow mb-4">Sobre nosotros</div>
            <h2 className="section-title mb-7">
              Una empresa familiar<br /><em>de confianza</em>
            </h2>
            <div className="space-y-4 text-[16px] leading-relaxed text-stone-500">
              <p>INCO, Estudio Técnico, S.L. aparece en el mercado profesional en el año 1993 ofreciendo un importante elenco de servicios técnicos garantizados por la experiencia adquirida, seriedad y compromiso empresarial.</p>
              <p>Nuestro personal multidisciplinar asume cada trabajo con la perspectiva de la globalidad, pensando que forma una parte sustancial del proceso que se inicia con una <em className="text-stone-600 not-italic font-medium">"idea"</em> y que finaliza con la puesta en servicio de la obra.</p>
            </div>
            <blockquote className="mt-8 pl-6 border-l-4 border-amber bg-amber-light py-5 pr-6 rounded-r-[4px]">
              <p className="font-serif italic text-[17px] text-blue leading-relaxed">
                "Generando el presente, diseñando el futuro"
              </p>
            </blockquote>
            <div className="mt-9 grid grid-cols-2 gap-3">
              {feats.map((f, i) => (
                <div
                  key={f.title}
                  className={`bg-stone-50 border border-stone-200 rounded-[4px] p-5 flex gap-3 items-start hover:border-amber hover:shadow-sm transition-all duration-200 ${leftIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <span className="text-[22px] mt-0.5 flex-shrink-0">{f.icon}</span>
                  <div>
                    <h4 className="text-[13px] font-semibold text-blue mb-1">{f.title}</h4>
                    <p className="text-[12px] text-stone-400 leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — images */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className={`relative transition-all duration-700 delay-200 ${rightIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-9'}`}
          >
            <div className="rounded-[4px] overflow-hidden shadow-2xl">
              <img
                src="https://inco.com.es/wp-content/uploads/2023/10/Proyecto-INCO-.webp"
                alt="Proyecto INCO"
                className="w-full h-[520px] object-cover"
                loading="lazy"
                onError={e => { (e.target as HTMLImageElement).src = 'https://inco.com.es/wp-content/uploads/2023/10/Inco.jpg' }}
              />
            </div>
            <div className="hidden md:block absolute top-10 -right-6 w-48 h-36 rounded-[4px] overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://inco.com.es/wp-content/uploads/2024/05/Ingerniero-inco-1.png"
                alt="Ingeniero INCO"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-6 -left-6 bg-amber text-white px-7 py-5 rounded-[4px] shadow-lg">
              <strong className="block font-serif text-5xl font-bold leading-none">+30</strong>
              <span className="text-[12px] uppercase tracking-widest opacity-85">Años</span>
            </div>
          </div>
        </div>

        {/* Areas IUE */}
        <div
          ref={areasRef as React.RefObject<HTMLDivElement>}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {areas.map((a, i) => (
            <div
              key={a.letter}
              className={`${a.color} rounded-[4px] p-8 flex items-center gap-6 transition-all duration-700 ${areasIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="font-serif text-white/30 font-bold leading-none flex-shrink-0" style={{ fontSize: 80 }}>{a.letter}</span>
              <div>
                <h3 className="text-white font-semibold text-[20px] mb-1">{a.label}</h3>
                <p className="text-white/75 text-[13px] leading-snug">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
