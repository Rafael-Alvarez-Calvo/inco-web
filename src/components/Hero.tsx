import { useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { useCounter } from '../hooks/useCounter'

const HERO_IMG = 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-autovia-INCO.jpg'

function StatItem({ target, suffix = '', label }: { target: number | null; suffix?: string; label: string }) {
  const { ref, inView } = useInView(0.5)
  const value = useCounter(target ?? 0, inView)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}
      className="flex-1 text-center px-2 py-4 border-r border-stone-200 last:border-r-0 min-w-0">
      <span className="block font-serif text-[22px] sm:text-3xl md:text-4xl font-bold text-blue leading-none">
        {target !== null ? `${value}${suffix}` : '100%'}
      </span>
      <span className="block text-[9px] sm:text-[10px] text-stone-400 uppercase tracking-wider mt-1 leading-tight">{label}</span>
    </div>
  )
}

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const t = setTimeout(() => imgRef.current?.classList.remove('scale-[1.04]'), 100)
    return () => clearTimeout(t)
  }, [])
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative flex flex-col overflow-hidden" style={{ minHeight: '100svh' }}>
      <div ref={imgRef}
        className="absolute inset-0 bg-cover bg-center scale-[1.04] transition-transform duration-[8000ms] ease-out"
        style={{ backgroundImage: `url('${HERO_IMG}')` }} />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(26,58,92,0.92) 0%, rgba(26,58,92,0.62) 45%, rgba(26,58,92,0.22) 75%, transparent 100%)' }} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-end px-5 md:px-16 pb-6 md:pb-20 pt-24">
        <div className="max-w-3xl w-full">
          <div className="eyebrow text-white/70 mb-4 before:bg-amber text-[10px]">
            Ingeniería Civil &amp; Arquitectura — Madrid
          </div>
          <h1 className="font-serif text-white font-semibold leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(34px, 7vw, 80px)' }}>
            Más de 30 años<br />construyendo<br />infraestructuras
          </h1>
          <p className="text-white/80 font-light leading-relaxed max-w-lg mb-7 text-[14.5px] md:text-[17px]">
            Consultoría y asistencia técnica especializada para proyectos de obra pública y privada.
            Rigor, experiencia y plazos cumplidos desde 1993.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => scrollTo('#servicios')}
              className="bg-amber hover:bg-amber-dark text-white px-6 py-3 rounded-[6px] text-[12px] font-semibold uppercase tracking-wide transition-colors">
              Nuestros servicios
            </button>
            <button onClick={() => scrollTo('#nosotros')}
              className="border border-white/50 hover:border-white hover:bg-white/10 text-white px-6 py-3 rounded-[6px] text-[12px] font-medium uppercase tracking-wide transition-all">
              Quiénes somos
            </button>
          </div>
        </div>
      </div>

      {/* Stats — flush, no margin */}
      <div className="relative z-10 bg-white shadow-2xl flex w-full md:w-auto md:absolute md:bottom-0 md:right-16">
        <StatItem target={1000} suffix="+" label="Clientes" />
        <StatItem target={30}   suffix="+" label="Años" />
        <StatItem target={5}           label="Oficinas" />
        <StatItem target={null}        label="Plazos" />
      </div>
    </section>
  )
}
