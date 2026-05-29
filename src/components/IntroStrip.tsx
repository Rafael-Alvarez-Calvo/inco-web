import { useInView } from '../hooks/useInView'

const items = [
  { value: '1993',   label: 'Año de fundación' },
  { value: '1.000+', label: 'Empresas atendidas' },
  { value: '5',      label: 'Oficinas en España' },
  { value: '100%',   label: 'Plazos cumplidos' },
]

export default function IntroStrip() {
  const { ref, inView } = useInView(0.2)

  return (
    <div className="bg-blue border-t-[3px] border-amber">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4"
      >
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`text-center px-10 py-16 border-r border-white/10 last:border-r-0 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="block font-serif text-5xl font-bold text-white leading-none">{item.value}</span>
            <span className="block text-[12px] text-white/50 uppercase tracking-widest mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
