import { useInView }   from '../../hooks/useInView'
import { useCounter }  from '../../hooks/useCounter'

interface Stat {
  target:    number | null
  suffix:    string
  display:   string
  label:     string
  duration?: number
}

const STATS: Stat[] = [
  { target: 1993, suffix: '',  display: '1993',   label: 'Año de fundación',   duration: 2200 },
  { target: 1000, suffix: '+', display: '1.000+', label: 'Clientes atendidos', duration: 1800 },
  { target: 5,    suffix: '',  display: '5',       label: 'Oficinas en España', duration: 900  },
  { target: null, suffix: '',  display: '100%',    label: 'Plazos cumplidos'                   },
]

function StatCard({ target, suffix, display, label, duration = 1600, delay }: Stat & { delay: number }) {
  const { ref, inView } = useInView(0.3)
  const count           = useCounter(target ?? 0, inView, duration)

  return (
    <div
      ref={ref}
      className={[
        'relative flex flex-col items-center justify-center px-6 py-10 md:py-14',
        'text-center border-r border-white/10 last:border-r-0',
        'transition-all duration-700 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
      ].join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        className="block font-serif text-white font-bold leading-none"
        style={{ fontSize: 'clamp(36px, 4vw, 52px)' }}
        aria-label={display}
      >
        {target !== null ? `${count}${suffix}` : display}
      </span>

      <div className="w-8 h-[2px] bg-amber mt-3 mb-3" aria-hidden="true" />

      <span className="text-[11px] text-white/50 uppercase tracking-[2.5px] leading-snug">
        {label}
      </span>
    </div>
  )
}

export const IntroStrip = () => {
  return (
    <div id="intro" className="bg-blue border-t-[3px] border-amber">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} {...stat} delay={i * 90} />
        ))}
      </div>
    </div>
  )
}
