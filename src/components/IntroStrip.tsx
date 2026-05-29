import { useInView } from '../hooks/useInView'

const items = [
  { value: '1993',   label: 'Fundación' },
  { value: '1.000+', label: 'Empresas atendidas' },
  { value: '5',      label: 'Oficinas' },
  { value: '100%',   label: 'Plazos cumplidos' },
]

export default function IntroStrip() {
  const { ref, inView } = useInView(0.2)
  return (
    <div className="bg-blue border-t-[3px] border-amber">
      <div ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <div key={item.label}
            className={`text-center px-4 py-8 md:py-14 border-r border-white/10 border-b md:border-b-0
              [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r
              [&:nth-child(3)]:border-t-0 [&:nth-child(4)]:border-r-0 [&:nth-child(4)]:border-t-0
              transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="block font-serif text-3xl md:text-[42px] font-bold text-white leading-none">{item.value}</span>
            <span className="block text-[10px] text-white/50 uppercase tracking-widest mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
