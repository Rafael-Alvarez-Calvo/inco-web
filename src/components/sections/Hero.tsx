import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { HERO_IMG } from '../../constants'
import { scrollToSection } from '../../utils'

export const Hero = () => {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => imgRef.current?.classList.remove('scale-[1.04]'), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative h-screen min-h-[620px] flex flex-col justify-end overflow-hidden">

      {/* Background image — Ken Burns zoom */}
      <div
        ref={imgRef}
        className="absolute inset-0 bg-cover bg-center scale-[1.04] transition-transform duration-[8000ms] ease-out"
        style={{ backgroundImage: `url('${HERO_IMG}')` }}
        role="img"
        aria-label="Autovía en construcción — proyecto INCO"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(26,58,92,0.92) 0%, rgba(26,58,92,0.60) 40%, rgba(26,58,92,0.18) 75%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-12 lg:px-16 pb-24 max-w-4xl">
        <div className="eyebrow text-white/70 mb-5 before:bg-amber">
          Ingeniería Civil &amp; Arquitectura — Madrid
        </div>
        <h1
          className="font-serif text-white font-semibold leading-[1.1] mb-5"
          style={{ fontSize: 'clamp(40px, 6.5vw, 80px)' }}
        >
          Más de 30 años<br />construyendo<br />infraestructuras
        </h1>
        <p
          className="text-white/80 font-light leading-relaxed max-w-lg mb-10"
          style={{ fontSize: 'clamp(15px, 1.6vw, 18px)' }}
        >
          Consultoría y asistencia técnica especializada para proyectos de obra pública y privada.
          Rigor, experiencia y plazos cumplidos desde 1993.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => scrollToSection('#servicios')}
            className="bg-amber hover:bg-amber-dark text-white px-9 py-3.5 rounded-[6px] text-[13px] font-semibold uppercase tracking-wide transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-blue"
          >
            Nuestros servicios
          </button>
          <button
            onClick={() => scrollToSection('#nosotros')}
            className="border border-white/50 hover:border-white hover:bg-white/10 text-white px-9 py-3.5 rounded-[6px] text-[13px] font-medium uppercase tracking-wide transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Quiénes somos
          </button>
        </div>
      </div>

      {/* Scroll indicator — respects prefers-reduced-motion */}
      <button
        onClick={() => scrollToSection('#intro')}
        aria-label="Desplazarse hacia abajo"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40 rounded"
      >
        <ChevronDown
          size={26}
          strokeWidth={1.5}
          aria-hidden="true"
          className="motion-safe:animate-bounce"
        />
      </button>

    </section>
  )
}
