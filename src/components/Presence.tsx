import { useInView } from '../hooks/useInView'

const offices = [
  { city: 'Madrid',    role: 'Sede central', main: true,  address: 'C/ Casas de Miravete 22A\n3ª Planta, Oficina 3\n28031 Madrid' },
  { city: 'Barcelona', role: 'Delegación',   main: false, address: 'Plaza del Centre 12\nLocal Planta Baja\n08014 Barcelona' },
  { city: 'Badajoz',   role: 'Delegación',   main: false, address: 'C/ Adelardo Covarsí, 10\nLocal D\n06005 Badajoz' },
  { city: 'Murcia',    role: 'Delegación',   main: false, address: 'Av. Tte. Gral. Gutiérrez Mellado, 9\n4ª Planta, Pta. 18\n30008 Murcia' },
]

export default function Presence() {
  const { ref, inView } = useInView(0.1)

  return (
    <section id="presencia" className="py-28 px-16 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="eyebrow mb-4">Dónde estamos</div>
        <h2 className="section-title mb-12">Presencia <em>nacional</em></h2>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {offices.map((o, i) => (
            <div
              key={o.city}
              className={`bg-white border border-stone-200 rounded-sm p-7 hover:shadow-md hover:border-blue transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="font-serif text-[22px] text-blue font-semibold mb-3">{o.city}</h3>
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold mb-4 ${o.main ? 'bg-amber-light text-amber' : 'bg-blue-light text-blue'}`}>
                {o.role}
              </span>
              <address className="text-[13px] text-stone-400 leading-relaxed not-italic whitespace-pre-line">
                {o.address}
              </address>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
