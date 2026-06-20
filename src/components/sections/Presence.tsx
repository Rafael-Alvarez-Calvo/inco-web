import { useState } from 'react'
import { useInView }   from '../../hooks/useInView'
import { PresenceMap } from './Presence.Map'

const MapSkeleton = () => (
  <div className="w-full h-full bg-stone-100 animate-pulse flex items-center justify-center rounded-[4px]">
    <div className="text-stone-300 text-sm">Cargando mapa…</div>
  </div>
)

interface Office {
  city:    string
  role:    string
  main:    boolean
  address: string
  lat:     number
  lng:     number
}

// Coordinates obtained via Google Maps Geocoding API
const OFFICES: Office[] = [
  {
    city:    'Madrid',
    role:    'Sede central',
    main:    true,
    address: 'Calle del Haya 4, 3º3\n28044 Madrid',
    lat:     40.3685235,
    lng:     -3.7455602,
  },
  {
    city:    'Barcelona',
    role:    'Delegación',
    main:    false,
    address: 'Plaza del Centre 12\nLocal Planta Baja\n08014 Barcelona',
    lat:     41.3817395,
    lng:     2.1353104,
  },
  {
    city:    'Badajoz',
    role:    'Delegación',
    main:    false,
    address: 'C/ Adelardo Covarsí, 10\nLocal D\n06005 Badajoz',
    lat:     38.8740237,
    lng:     -6.9777432,
  },
  {
    city:    'Murcia',
    role:    'Delegación',
    main:    false,
    address: 'Av. Tte. Gral. Gutiérrez Mellado, 9\n4ª Planta, Pta. 18\n30008 Murcia',
    lat:     37.9901171,
    lng:     -1.1279566,
  },
]

// Checkmark shown inside the active card
const CheckIcon = () => (
  <svg
    width="10" height="10" viewBox="0 0 10 10"
    fill="none" aria-hidden="true"
  >
    <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const Presence = () => {
  const { ref, inView } = useInView(0.1)
  const [activeIdx, setActiveIdx] = useState(0) // Madrid selected by default

  return (
    <section
      id="presencia"
      aria-labelledby="presencia-titulo"
      className="py-16 md:py-28 px-4 sm:px-8 lg:px-16 bg-stone-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="eyebrow mb-4">Dónde estamos</div>
        <h2 id="presencia-titulo" className="section-title mb-12">
          Presencia <em>nacional</em>
        </h2>

        {/* Office cards — each is a button that updates the map */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          role="group"
          aria-label="Seleccionar oficina"
        >
          {OFFICES.map((o, i) => {
            const isActive = activeIdx === i
            return (
              <button
                key={o.city}
                type="button"
                onClick={() => setActiveIdx(i)}
                aria-pressed={isActive}
                aria-label={`Ver ${o.city} en el mapa`}
                className={[
                  'relative text-left rounded-[4px] p-7 transition-all duration-300 outline-none',
                  'focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
                  isActive
                    ? 'bg-blue-light border border-blue shadow-md'
                    : 'bg-white border border-stone-200 hover:shadow-md hover:border-blue',
                ].join(' ')}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Active indicator badge */}
                {isActive && (
                  <span className="absolute top-4 right-4 w-5 h-5 bg-blue text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckIcon />
                  </span>
                )}

                <h3 className="font-serif text-[22px] text-blue font-semibold mb-3">
                  {o.city}
                </h3>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-semibold mb-4 ${
                    o.main ? 'bg-amber-light text-amber' : 'bg-blue-light text-blue'
                  }`}
                >
                  {o.role}
                </span>
                <address className="text-[13px] text-stone-400 leading-relaxed not-italic whitespace-pre-line">
                  {o.address}
                </address>
              </button>
            )
          })}
        </div>

        {/* Interactive map — mounts once the section enters the viewport */}
        <div className="mt-6 h-[300px] md:h-[400px] rounded-[4px] overflow-hidden shadow-sm border border-stone-200">
          {inView
            ? <PresenceMap office={OFFICES[activeIdx]} />
            : <MapSkeleton />
          }
        </div>
      </div>
    </section>
  )
}
