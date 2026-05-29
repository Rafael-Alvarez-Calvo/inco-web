import { useState, useEffect, useCallback, useRef } from 'react'
import { useInView } from '../hooks/useInView'

const photos = [
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Alcala-de-Guadaira-Proyecto-INCO.webp',
    alt: 'Proyecto Alcalá de Guadaíra',
    category: 'Urbanismo',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Vias-INCO.jpg',
    alt: 'Gestión y planificación de obras — Vías',
    category: 'Infraestructura ferroviaria',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Inco-1024x539.jpg',
    alt: 'Obra civil pública y privada',
    category: 'Obra civil',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-INCO-1-1024x678.webp',
    alt: 'Redacción de proyectos — Infraestructura ferroviaria',
    category: 'Proyectos',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-INCO-1-1-1024x681.webp',
    alt: 'Coordinación de seguridad y salud',
    category: 'Seguridad y salud',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-estructura-INCO.jpg',
    alt: 'Proyecto de estructura',
    category: 'Estructuras',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-estructura-INCO-2.jpg',
    alt: 'Proyecto de estructura II',
    category: 'Estructuras',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-carreteras-INCO.jpg',
    alt: 'Proyecto de carreteras',
    category: 'Carreteras',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-autovia-INCO.jpg',
    alt: 'Dirección de obras — Autovía',
    category: 'Autovías',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-urbanismo-y-obras.jpg',
    alt: 'Urbanismo y obras I',
    category: 'Urbanismo',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-urbanismo-y-obras-INCO.jpg',
    alt: 'Urbanismo y obras II',
    category: 'Urbanismo',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-puente-INCO.jpg',
    alt: 'Proyecto de puente',
    category: 'Obras de fábrica',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-infraestructura-viaria-INCO.jpg',
    alt: 'Infraestructura viaria',
    category: 'Carreteras',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-infraestructura-hidraulica-INCO.jpg',
    alt: 'Infraestructura hidráulica I',
    category: 'Hidráulica',
  },
  {
    src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-infraestructura-hidraulica-INCO-2.jpg',
    alt: 'Infraestructura hidráulica II',
    category: 'Hidráulica',
  },
]

export default function Gallery() {
  const { ref: headRef, inView: headIn } = useInView(0.1)
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const VISIBLE = 3 // cards visible at once in carousel

  const go = useCallback((dir: 'prev' | 'next') => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(dir === 'next' ? 'right' : 'left')
    setTimeout(() => {
      setCurrent(c =>
        dir === 'next'
          ? (c + 1) % photos.length
          : (c - 1 + photos.length) % photos.length
      )
      setIsAnimating(false)
    }, 300)
  }, [isAnimating])

  // Autoplay
  useEffect(() => {
    autoRef.current = setInterval(() => go('next'), 4500)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [go])

  const resetAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => go('next'), 4500)
  }

  const handlePrev = () => { go('prev'); resetAuto() }
  const handleNext = () => { go('next'); resetAuto() }
  const handleDot  = (i: number) => {
    if (isAnimating || i === current) return
    setDirection(i > current ? 'right' : 'left')
    setIsAnimating(true)
    setTimeout(() => { setCurrent(i); setIsAnimating(false) }, 300)
    resetAuto()
  }

  // Build visible indices (current - 1, current, current + 1, etc.)
  const visibleIndices = Array.from({ length: VISIBLE }, (_, i) =>
    (current + i) % photos.length
  )

  // Lightbox keyboard
  useEffect(() => {
    if (lightbox === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setLightbox(l => l !== null ? (l + 1) % photos.length : null)
      if (e.key === 'ArrowLeft')  setLightbox(l => l !== null ? (l - 1 + photos.length) % photos.length : null)
      if (e.key === 'Escape')     setLightbox(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox])

  return (
    <section id="galeria" className="py-28 px-0 bg-stone-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-16">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6`}
        >
          <div>
            <div className="eyebrow mb-3">Proyectos realizados</div>
            <h2 className="section-title">Nuestra <em>trayectoria</em></h2>
          </div>
          <p className="max-w-sm text-[15px] text-stone-500 leading-relaxed">
            Más de 30 años de proyectos en toda España: carreteras, ferrocarril, urbanismo, estructuras e hidráulica.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Cards track */}
        <div className="flex gap-4 px-16 max-w-6xl mx-auto">
          {visibleIndices.map((idx, pos) => {
            const photo = photos[idx]
            return (
              <div
                key={`${idx}-${pos}`}
                onClick={() => setLightbox(idx)}
                className={`
                  relative flex-1 rounded-sm overflow-hidden cursor-pointer group
                  transition-all duration-500
                  ${isAnimating
                    ? direction === 'right'
                      ? pos === 0 ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'
                      : pos === VISIBLE - 1 ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
                    : 'opacity-100 translate-x-0'
                  }
                `}
                style={{ aspectRatio: pos === 1 ? '4/3' : '3/4' }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[10px] tracking-widest uppercase text-amber font-semibold block mb-1">{photo.category}</span>
                  <p className="text-white text-[13px] font-medium leading-snug">{photo.alt}</p>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm">
                  ⊕
                </div>
              </div>
            )
          })}
        </div>

        {/* Arrow buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg border border-stone-200 rounded-full flex items-center justify-center text-blue hover:bg-blue hover:text-white hover:border-blue transition-all duration-200 z-10"
          aria-label="Anterior"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-lg border border-stone-200 rounded-full flex items-center justify-center text-blue hover:bg-blue hover:text-white hover:border-blue transition-all duration-200 z-10"
          aria-label="Siguiente"
        >
          →
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8 px-16">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-blue' : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'}`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <p className="text-center text-[12px] text-stone-400 mt-3 tracking-widest">
        {current + 1} / {photos.length}
      </p>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-6 text-white/60 hover:text-white text-3xl z-10 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar"
          >
            ✕
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl z-10 transition-colors px-4"
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l - 1 + photos.length) % photos.length : null) }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].alt}
              className="w-full max-h-[80vh] object-contain rounded-sm"
            />
            <div className="mt-4 text-center">
              <span className="text-[10px] tracking-widest uppercase text-amber font-semibold">{photos[lightbox].category}</span>
              <p className="text-white/80 text-[14px] mt-1">{photos[lightbox].alt}</p>
              <p className="text-white/30 text-[12px] mt-2">{lightbox + 1} / {photos.length}</p>
            </div>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-4xl z-10 transition-colors px-4"
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l + 1) % photos.length : null) }}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}
