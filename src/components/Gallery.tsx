import { useState, useEffect, useCallback, useRef } from 'react'
import { useInView } from '../hooks/useInView'

const photos = [
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Alcala-de-Guadaira-Proyecto-INCO.webp',         alt: 'Proyecto Alcalá de Guadaíra',               category: 'Urbanismo' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Vias-INCO.jpg',                                  alt: 'Gestión y planificación — Vías',             category: 'Ferroviario' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Inco-1024x539.jpg',                              alt: 'Obra civil pública y privada',               category: 'Obra civil' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-INCO-1-1024x678.webp',                  alt: 'Infraestructura ferroviaria',                category: 'Proyectos' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-INCO-1-1-1024x681.webp',                alt: 'Coordinación de seguridad y salud',          category: 'Seguridad' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-estructura-INCO.jpg',                   alt: 'Proyecto de estructura I',                   category: 'Estructuras' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-estructura-INCO-2.jpg',                 alt: 'Proyecto de estructura II',                  category: 'Estructuras' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-carreteras-INCO.jpg',                   alt: 'Proyecto de carreteras',                     category: 'Carreteras' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-autovia-INCO.jpg',                      alt: 'Dirección de obras — Autovía',               category: 'Autovías' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-urbanismo-y-obras.jpg',                 alt: 'Urbanismo y obras I',                        category: 'Urbanismo' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-urbanismo-y-obras-INCO.jpg',            alt: 'Urbanismo y obras II',                       category: 'Urbanismo' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-puente-INCO.jpg',                       alt: 'Proyecto de puente',                         category: 'Obras de fábrica' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-infraestructura-viaria-INCO.jpg',       alt: 'Infraestructura viaria',                     category: 'Carreteras' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-infraestructura-hidraulica-INCO.jpg',   alt: 'Infraestructura hidráulica I',               category: 'Hidráulica' },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-infraestructura-hidraulica-INCO-2.jpg', alt: 'Infraestructura hidráulica II',              category: 'Hidráulica' },
]

export default function Gallery() {
  const { ref: headRef, inView: headIn } = useInView(0.1)
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [sliding, setSliding] = useState(false)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)


  const go = useCallback((dir: 'prev' | 'next') => {
    if (sliding) return
    setSliding(true)
    setTimeout(() => {
      setCurrent(c => dir === 'next' ? (c + 1) % photos.length : (c - 1 + photos.length) % photos.length)
      setSliding(false)
    }, 280)
  }, [sliding])

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => go('next'), 4500)
  }, [go])

  useEffect(() => { resetAuto(); return () => { if (autoRef.current) clearInterval(autoRef.current) } }, [resetAuto])

  const handlePrev = () => { go('prev'); resetAuto() }
  const handleNext = () => { go('next'); resetAuto() }
  const handleDot  = (i: number) => {
    if (sliding || i === current) return
    setSliding(true)
    setTimeout(() => { setCurrent(i); setSliding(false) }, 280)
    resetAuto()
  }

  const [cols, setCols] = useState(window.innerWidth < 768 ? 1 : 3)
  useEffect(() => {
    const fn = () => setCols(window.innerWidth < 768 ? 1 : 3)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  const visibleIndices = Array.from({ length: cols }, (_, i) => (current + i) % photos.length)

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
    <section id="galeria" className="py-14 md:py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-16">
        {/* Header */}
        <div ref={headRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4`}>
          <div>
            <div className="eyebrow mb-3">Proyectos realizados</div>
            <h2 className="section-title">Nuestra <em>trayectoria</em></h2>
          </div>
          <p className="max-w-sm text-[14.5px] text-stone-500 leading-relaxed">
            Más de 30 años de proyectos en toda España: carreteras, ferrocarril, urbanismo, estructuras e hidráulica.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="max-w-6xl mx-auto px-5 md:px-16">
        <div className="relative">
          {/* Cards grid */}
          <div
            className={`grid gap-3 transition-opacity duration-300 ${sliding ? 'opacity-40' : 'opacity-100'}`}
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {visibleIndices.map((idx, pos) => {
              const photo = photos[idx]
              const isTall = cols === 3 && pos !== 1
              return (
                <div key={`${idx}-${pos}`} onClick={() => setLightbox(idx)}
                  className="relative overflow-hidden rounded-[4px] cursor-pointer group"
                  style={{ aspectRatio: isTall ? '3/4' : '4/3' }}>
                  <img src={photo.src} alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue/80 via-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[10px] tracking-widest uppercase text-amber font-semibold block mb-0.5">{photo.category}</span>
                    <p className="text-white text-[12.5px] font-medium leading-snug">{photo.alt}</p>
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-sm">⊕</div>
                </div>
              )
            })}
          </div>

          {/* Arrows */}
          <button onClick={handlePrev}
            className="absolute -left-4 md:-left-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 bg-white shadow-lg border border-stone-200 rounded-full flex items-center justify-center text-blue hover:bg-blue hover:text-white hover:border-blue transition-all duration-200 z-10 text-base">
            ←
          </button>
          <button onClick={handleNext}
            className="absolute -right-4 md:-right-5 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 bg-white shadow-lg border border-stone-200 rounded-full flex items-center justify-center text-blue hover:bg-blue hover:text-white hover:border-blue transition-all duration-200 z-10 text-base">
            →
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {photos.map((_, i) => (
            <button key={i} onClick={() => handleDot(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-5 h-2 bg-blue' : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'}`}
              aria-label={`Ir a imagen ${i + 1}`} />
          ))}
        </div>
        <p className="text-center text-[11px] text-stone-400 mt-2 tracking-widest">{current + 1} / {photos.length}</p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-5 text-white/60 hover:text-white text-3xl z-10 transition-colors leading-none" onClick={() => setLightbox(null)}>✕</button>
          <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-2xl"
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l - 1 + photos.length) % photos.length : null) }}>‹</button>
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img src={photos[lightbox].src} alt={photos[lightbox].alt} className="w-full max-h-[78vh] object-contain rounded-[4px]" />
            <div className="mt-4 text-center">
              <span className="text-[10px] tracking-widest uppercase text-amber font-semibold">{photos[lightbox].category}</span>
              <p className="text-white/80 text-[13px] mt-1">{photos[lightbox].alt}</p>
              <p className="text-white/30 text-[11px] mt-1.5 tracking-widest">{lightbox + 1} / {photos.length}</p>
            </div>
          </div>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-2xl"
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l + 1) % photos.length : null) }}>›</button>
        </div>
      )}
    </section>
  )
}
