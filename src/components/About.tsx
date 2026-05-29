import { useInView } from '../hooks/useInView'

const feats = [
  { icon: '🏗️', title: 'Rigor técnico',         desc: 'Ingenieros y arquitectos certificados en cada proyecto.' },
  { icon: '⏱️', title: 'Plazos garantizados',   desc: '100% de cumplimiento de plazos desde 1993.' },
  { icon: '📋', title: 'Normativa completa',     desc: 'Cumplimiento de toda la regulación técnica y urbanística.' },
  { icon: '🤝', title: 'Servicio integral',      desc: 'Del proyecto hasta la dirección de obra, todo en un equipo.' },
]

export default function About() {
  const { ref: leftRef,  inView: leftIn  } = useInView(0.1)
  const { ref: rightRef, inView: rightIn } = useInView(0.1)

  return (
    <section id="nosotros" className="py-28 px-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* Left */}
        <div
          ref={leftRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${leftIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9'}`}
        >
          <div className="eyebrow mb-4">Sobre nosotros</div>
          <h2 className="section-title mb-7">
            Una empresa familiar<br /><em>de confianza</em>
          </h2>
          <div className="space-y-4 text-[16.5px] leading-relaxed text-stone-500">
            <p>INCO, Estudio Técnico, S.L. aparece en el mercado profesional en el año 1993 ofreciendo un importante elenco de servicios técnicos garantizados por la experiencia adquirida, seriedad y compromiso empresarial.</p>
            <p>Prestamos un servicio integral de consultoría y asistencia técnica dentro del extenso campo de la actividad que suponen la ingeniería civil y la arquitectura, con visión global y enfoque organizativo en la infraestructura.</p>
          </div>
          <blockquote className="mt-9 pl-6 border-l-4 border-amber bg-amber-light py-6 pr-6 rounded-r-sm">
            <p className="font-serif italic text-lg text-blue leading-relaxed">
              "En INCO ofrecemos una visión global dentro de un entorno que exige cambios y organización,
              con enfoque en la infraestructura arquitectónica y civil."
            </p>
          </blockquote>
          <div className="mt-9 grid grid-cols-2 gap-3">
            {feats.map((f, i) => (
              <div
                key={f.title}
                className={`bg-stone-50 border border-stone-200 rounded-sm p-5 flex gap-3 items-start hover:border-amber hover:shadow-sm transition-all duration-200 ${leftIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${300 + i * 80}ms` }}
              >
                <span className="text-2xl mt-0.5">{f.icon}</span>
                <div>
                  <h4 className="text-[13.5px] font-semibold text-blue mb-1">{f.title}</h4>
                  <p className="text-[12.5px] text-stone-400 leading-snug">{f.desc}</p>
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
          <div className="rounded-sm overflow-hidden shadow-2xl">
            <img
              src="https://inco.com.es/wp-content/uploads/2023/10/Proyecto-INCO-.webp"
              alt="Proyecto INCO"
              className="w-full h-[520px] object-cover"
              loading="lazy"
              onError={e => { (e.target as HTMLImageElement).src = 'https://inco.com.es/wp-content/uploads/2023/10/Inco.jpg' }}
            />
          </div>
          {/* Floating image */}
          <div className="hidden md:block absolute top-10 -right-6 w-48 h-36 rounded-sm overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://inco.com.es/wp-content/uploads/2024/05/Ingerniero-inco-1.png"
              alt="Ingeniero INCO"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Badge */}
          <div className="absolute bottom-6 -left-6 bg-amber text-white px-7 py-5 rounded-sm shadow-lg">
            <strong className="block font-serif text-5xl font-bold leading-none">+30</strong>
            <span className="text-[12px] uppercase tracking-widest opacity-85">Años</span>
          </div>
        </div>

      </div>
    </section>
  )
}
