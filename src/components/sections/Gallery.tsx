import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

interface Photo {
  src:      string
  alt:      string
  category: string
}

const PHOTOS: Photo[] = [
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Alcala-de-Guadaira-Proyecto-INCO.webp',        alt: 'Proyecto Alcalá de Guadaíra',      category: 'Urbanismo'       },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Vias-INCO.jpg',                                 alt: 'Gestión y planificación — Vías',   category: 'Ferroviario'     },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Inco-1024x539.jpg',                             alt: 'Obra civil pública y privada',     category: 'Obra civil'      },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-INCO-1-1024x678.webp',                 alt: 'Infraestructura ferroviaria',       category: 'Proyectos'       },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-INCO-1-1-1024x681.webp',               alt: 'Coordinación de seguridad y salud', category: 'Seguridad'       },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-estructura-INCO.jpg',                  alt: 'Proyecto de estructura I',          category: 'Estructuras'     },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-estructura-INCO-2.jpg',                alt: 'Proyecto de estructura II',         category: 'Estructuras'     },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-carreteras-INCO.jpg',                  alt: 'Proyecto de carreteras',            category: 'Carreteras'      },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-autovia-INCO.jpg',                     alt: 'Dirección de obras — Autovía',      category: 'Autovías'        },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-urbanismo-y-obras.jpg',                alt: 'Urbanismo y obras I',               category: 'Urbanismo'       },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-urbanismo-y-obras-INCO.jpg',           alt: 'Urbanismo y obras II',              category: 'Urbanismo'       },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-puente-INCO.jpg',                      alt: 'Proyecto de puente',                category: 'Obras de fábrica'},
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-infraestructura-viaria-INCO.jpg',      alt: 'Infraestructura viaria',            category: 'Carreteras'      },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-infraestructura-hidraulica-INCO.jpg',  alt: 'Infraestructura hidráulica I',      category: 'Hidráulica'      },
  { src: 'https://inco.com.es/wp-content/uploads/2023/10/Proyecto-infraestructura-hidraulica-INCO-2.jpg',alt: 'Infraestructura hidráulica II',     category: 'Hidráulica'      },
]

const VISIBLE       = 3
const SLIDE_MS      = 280
const AUTO_INTERVAL = 4_500

export const Gallery = () => {
  const { ref: headRef, inView: headIn } = useInView(0.1)

  const [current, setCurrent]   = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [sliding, setSliding]   = useState(false)

  // Ref so `go` doesn't need `sliding` as a dependency — eliminates the
  // sliding → go → resetAuto → effect dep chain that was restarting the
  // auto-play interval on every transition.
  const slidingRef = useRef(false)
  const autoRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback((dir: 'prev' | 'next') => {
    if (slidingRef.current) return
    slidingRef.current = true
    setSliding(true)
    setTimeout(() => {
      setCurrent(c =>
        dir === 'next'
          ? (c + 1) % PHOTOS.length
          : (c - 1 + PHOTOS.length) % PHOTOS.length,
      )
      slidingRef.current = false
      setSliding(false)
    }, SLIDE_MS)
  }, []) // stable — reads slidingRef, uses functional setCurrent

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => go('next'), AUTO_INTERVAL)
  }, [go]) // go is stable → resetAuto is stable

  useEffect(() => {
    resetAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [resetAuto]) // runs once on mount

  const handlePrev = useCallback(() => { go('prev'); resetAuto() }, [go, resetAuto])
  const handleNext = useCallback(() => { go('next'); resetAuto() }, [go, resetAuto])
  const handleDot  = useCallback((i: number) => {
    if (slidingRef.current || i === current) return
    slidingRef.current = true
    setSliding(true)
    setTimeout(() => {
      setCurrent(i)
      slidingRef.current = false
      setSliding(false)
    }, SLIDE_MS)
    resetAuto()
  }, [current, resetAuto])

  // Lightbox keyboard navigation — listener added/removed only when lightbox opens/closes,
  // not on every ArrowKey press (functional updater avoids capturing stale index).
  const lightboxOpen = lightbox !== null
  useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setLightbox(l => l !== null ? (l + 1) % PHOTOS.length : null)
      if (e.key === 'ArrowLeft')  setLightbox(l => l !== null ? (l - 1 + PHOTOS.length) % PHOTOS.length : null)
      if (e.key === 'Escape')     setLightbox(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen])

  const visibleIndices = Array.from({ length: VISIBLE }, (_, i) => (current + i) % PHOTOS.length)

  return (
    <section id="galeria" className="py-16 md:py-28 bg-stone-50 overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <div
          ref={headRef}
          className={[
            'transition-all duration-700 mb-10 md:mb-14',
            'flex flex-col md:flex-row md:items-end justify-between gap-6',
            headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
          ].join(' ')}
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
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="relative">

          {/* Mobile (< 640px): single photo full-width */}
          <div
            className={`sm:hidden relative overflow-hidden rounded-[4px] cursor-pointer group transition-opacity duration-300 ${sliding ? 'opacity-50' : 'opacity-100'}`}
            style={{ aspectRatio: '16/9' }}
            onClick={() => setLightbox(current)}
          >
            <img
              src={PHOTOS[current].src}
              alt={PHOTOS[current].alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue/80 via-blue/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="text-[10px] tracking-widest uppercase text-amber font-semibold block mb-1">{PHOTOS[current].category}</span>
              <p className="text-white text-[13px] font-medium leading-snug">{PHOTOS[current].alt}</p>
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
              <ZoomIn size={14} aria-hidden="true" />
            </div>
          </div>

          {/* Tablet (640–1023px): 2 photos side by side */}
          <div className={`hidden sm:grid lg:hidden grid-cols-2 gap-4 transition-opacity duration-300 ${sliding ? 'opacity-50' : 'opacity-100'}`}>
            {[0, 1].map(offset => {
              const idx   = (current + offset) % PHOTOS.length
              const photo = PHOTOS[idx]
              return (
                <div
                  key={`${idx}-tab-${offset}`}
                  onClick={() => setLightbox(idx)}
                  className="relative overflow-hidden rounded-[4px] cursor-pointer group"
                  style={{ aspectRatio: '4/3' }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue/80 via-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[10px] tracking-widest uppercase text-amber font-semibold block mb-1">{photo.category}</span>
                    <p className="text-white text-[13px] font-medium leading-snug">{photo.alt}</p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <ZoomIn size={14} aria-hidden="true" />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Desktop (1024px+): 3-photo asymmetric grid */}
          <div className={`hidden lg:grid grid-cols-3 gap-4 transition-opacity duration-300 ${sliding ? 'opacity-50' : 'opacity-100'}`}>
            {visibleIndices.map((idx, pos) => {
              const photo = PHOTOS[idx]
              return (
                <div
                  key={`${idx}-${pos}`}
                  onClick={() => setLightbox(idx)}
                  className="relative overflow-hidden rounded-[4px] cursor-pointer group"
                  style={{ aspectRatio: pos === 1 ? '4/3' : '3/4' }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue/80 via-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[10px] tracking-widest uppercase text-amber font-semibold block mb-1">{photo.category}</span>
                    <p className="text-white text-[13px] font-medium leading-snug">{photo.alt}</p>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <ZoomIn size={14} aria-hidden="true" />
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={handlePrev}
            aria-label="Anterior"
            className="absolute left-2 lg:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg border border-stone-200 rounded-full flex items-center justify-center text-blue hover:bg-blue hover:text-white hover:border-blue transition-all duration-200 z-10"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Siguiente"
            className="absolute right-2 lg:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg border border-stone-200 rounded-full flex items-center justify-center text-blue hover:bg-blue hover:text-white hover:border-blue transition-all duration-200 z-10"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-7">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Ir a imagen ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-blue' : 'w-2 h-2 bg-stone-300 hover:bg-stone-400'}`}
            />
          ))}
        </div>
        <p className="text-center text-[11px] text-stone-400 mt-2.5 tracking-widest">
          {current + 1} / {PHOTOS.length}
        </p>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Cerrar lightbox"
          >
            <X size={20} aria-hidden="true" />
          </button>

          <button
            aria-label="Imagen anterior"
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full"
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l - 1 + PHOTOS.length) % PHOTOS.length : null) }}
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img
              src={PHOTOS[lightbox].src}
              alt={PHOTOS[lightbox].alt}
              className="w-full max-h-[78vh] object-contain rounded-[4px]"
            />
            <div className="mt-4 text-center">
              <span className="text-[10px] tracking-widest uppercase text-amber font-semibold">{PHOTOS[lightbox].category}</span>
              <p className="text-white/80 text-[14px] mt-1">{PHOTOS[lightbox].alt}</p>
              <p className="text-white/30 text-[11px] mt-2 tracking-widest">{lightbox + 1} / {PHOTOS.length}</p>
            </div>
          </div>

          <button
            aria-label="Imagen siguiente"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full"
            onClick={e => { e.stopPropagation(); setLightbox(l => l !== null ? (l + 1) % PHOTOS.length : null) }}
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  )
}
