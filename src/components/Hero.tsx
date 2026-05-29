import { useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { useCounter } from '../hooks/useCounter'

const HERO_IMG = 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-autovia-INCO.jpg'

function StatItem({ target, suffix = '', label }: { target: number | null; suffix?: string; label: string }) {
  const { ref, inView } = useInView(0.5)
  const value = useCounter(target ?? 0, inView)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex-1 text-center px-4 py-5 border-r border-stone-200 last:border-r-0 min-w-0">
      <span className="block font-serif text-3xl md:text-4xl font-bold text-blue leading-none">
        {target !== null ? `${value}${suffix}` : '100%'}
      </span>
      <span className="block text-[10px] text-stone-400 uppercase tracking-widest mt-1.5 leading-tight">{label}</span>
    </div>
  )
}

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => imgRef.current?.classList.remove('scale-[1.04]'), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="relative flex flex-col overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Background */}
      <div
        ref={imgRef}
        className="absolute inset-0 bg-cover bg-center scale-[1.04] transition-transform duration-[8000ms] ease-out"
        style={{ backgroundImage: `url('${HERO_IMG}')` }}
      />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(26,58,92,0.90) 0%, rgba(26,58,92,0.60) 45%, rgba(26,58,92,0.20) 75%, transparent 100%)' }}
      />

      {/* Content — grows to fill */}
      <div className="relative z-10 flex-1 flex items-end px-6 md:px-16 pb-8 md:pb-20 pt-28">
        <div className="max-w-3xl w-full">
          <div className="eyebrow text-white/70 mb-5 before:bg-amber text-[10px] md:text-[11px]">
            Ingeniería Civil &amp; Arquitectura — Madrid
          </div>
          <h1 className="font-serif text-white font-semibold leading-[1.1] mb-5"
            style={{ fontSize: 'clamp(38px, 7vw, 80px)' }}>
            Más de 30 años<br />construyendo<br />infraestructuras
          </h1>
          <p className="text-white/80 font-light leading-relaxed max-w-lg mb-8 text-[15px] md:text-[17px]">
            Consultoría y asistencia técnica especializada para proyectos de obra pública y privada.
            Rigor, experiencia y plazos cumplidos desde 1993.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => scrollTo('#servicios')}
              className="bg-amber hover:bg-amber-dark text-white px-7 py-3 rounded-[6px] text-[12px] md:text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200">
              Nuestros servicios
            </button>
            <button onClick={() => scrollTo('#nosotros')}
              className="border border-white/50 hover:border-white hover:bg-white/10 text-white px-7 py-3 rounded-[6px] text-[12px] md:text-[13px] font-medium uppercase tracking-wide transition-all duration-200">
              Quiénes somos
            </button>
          </div>
        </div>
      </div>

      {/* Stats strip — always inline below content on mobile */}
      <div className="relative z-10 mx-6 md:mx-0 md:absolute md:bottom-0 md:right-16 bg-white shadow-2xl flex">
        <StatItem target={1000} suffix="+" label="Clientes" />
        <StatItem target={30}   suffix="+" label="Años" />
        <StatItem target={5}           label="Oficinas" />
        <StatItem target={null}        label="Plazos" />
      </div>
    </section>
  )
}
