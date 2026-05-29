import { useInView } from '../hooks/useInView'

const items = [
  { title: 'Cumplimiento normativo total',   desc: 'Garantizamos el cumplimiento de todas las normativas técnicas, urbanísticas y de seguridad aplicables a cada proyecto.' },
  { title: 'Buena ejecución garantizada',    desc: 'Cada proyecto revisado, coordinado y listo para ejecutarse sin imprevistos técnicos ni económicos.' },
  { title: '100% de plazos cumplidos',       desc: 'Desde 1993, ningún cliente ha esperado más de lo acordado. La puntualidad es parte de nuestra identidad.' },
  { title: 'Equipo certificado y actualizado', desc: 'Formación continua para aplicar siempre las últimas tecnologías, normativas y metodologías del sector.' },
]

export default function Guarantees() {
  const { ref: leftRef,  inView: leftIn  } = useInView(0.1)
  const { ref: rightRef, inView: rightIn } = useInView(0.1)

  return (
    <section id="garantias" className="section-pad bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left — images */}
        <div
          ref={leftRef as React.RefObject<HTMLDivElement>}
          className={`relative transition-all duration-700 ${leftIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-9'}`}
        >
          <div className="rounded-sm overflow-hidden shadow-2xl">
            <img
              src="https://inco.com.es/wp-content/uploads/2017/10/process-1.jpg"
              alt="Proceso INCO"
              className="w-full h-[440px] object-cover"
              loading="lazy"
              onError={e => { (e.target as HTMLImageElement).src = 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-INCO-.webp' }}
            />
          </div>
          <div className="hidden md:block absolute -bottom-6 -right-6 w-56 overflow-hidden rounded-sm shadow-2xl border-[5px] border-white">
            <img
              src="https://inco.com.es/wp-content/uploads/2023/10/Inco.jpg"
              alt="Obra INCO"
              className="w-full h-40 object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right */}
        <div
          ref={rightRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 delay-150 ${rightIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-9'}`}
        >
          <div className="eyebrow mb-4">Nuestras garantías</div>
          <h2 className="section-title mb-8">Un servicio<br /><em>con respaldo</em></h2>
          <ul className="divide-y divide-stone-100">
            {items.map((item, i) => (
              <li
                key={item.title}
                className={`flex gap-5 items-start py-6 first:pt-0 last:pb-0 transition-all duration-500 ${rightIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                <div className="w-9 h-9 flex-shrink-0 rounded-full bg-blue-light flex items-center justify-center text-blue font-bold text-base mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-blue mb-1.5">{item.title}</h4>
                  <p className="text-[13.5px] text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
