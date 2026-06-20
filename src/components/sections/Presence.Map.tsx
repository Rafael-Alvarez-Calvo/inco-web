import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

export interface OfficeCoords {
  city: string
  lat:  number
  lng:  number
}

interface Props {
  office: OfficeCoords
}

// ── Durations ──────────────────────────────────────────────────────────────
const ZOOM_DETAIL  = 15
const ZOOM_COUNTRY = 6
const T_ZOOM_OUT   = 350  // ms before panning
const T_ZOOM_IN    = 420  // ms after pan before zooming back in

// ── Custom map style — INCO palette (warm grays + soft blues) ──────────────
const MAP_STYLES: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry',           stylers: [{ color: '#f0eeeb' }] },
  { elementType: 'labels.icon',        stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill',   stylers: [{ color: '#6b7a8a' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f0eeeb' }] },

  { featureType: 'administrative',               elementType: 'geometry',           stylers: [{ color: '#c8d4e0' }] },
  { featureType: 'administrative.country',       elementType: 'labels.text.fill',   stylers: [{ color: '#1a3a5c' }] },
  { featureType: 'administrative.province',      elementType: 'labels.text.fill',   stylers: [{ color: '#1a3a5c' }] },
  { featureType: 'administrative.locality',      elementType: 'labels.text.fill',   stylers: [{ color: '#1a3a5c' }] },

  { featureType: 'poi',                          stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park',                     elementType: 'geometry',           stylers: [{ color: '#d8e8d4' }] },
  { featureType: 'poi.park',                     stylers: [{ visibility: 'simplified' }] },
  { featureType: 'poi.park',                     elementType: 'labels.text.fill',   stylers: [{ color: '#6b8050' }] },

  { featureType: 'road',                         elementType: 'geometry',           stylers: [{ color: '#ffffff' }] },
  { featureType: 'road',                         elementType: 'geometry.stroke',    stylers: [{ color: '#e8e4df' }] },
  { featureType: 'road',                         elementType: 'labels.text.fill',   stylers: [{ color: '#8fa0b0' }] },
  { featureType: 'road.arterial',                elementType: 'geometry',           stylers: [{ color: '#e8e4df' }] },
  { featureType: 'road.highway',                 elementType: 'geometry',           stylers: [{ color: '#d8cfc4' }] },
  { featureType: 'road.highway',                 elementType: 'geometry.stroke',    stylers: [{ color: '#c8bfb4' }] },
  { featureType: 'road.highway',                 elementType: 'labels.text.fill',   stylers: [{ color: '#5a6a7a' }] },
  { featureType: 'road.local',                   elementType: 'labels.text.fill',   stylers: [{ color: '#8fa0b0' }] },

  { featureType: 'transit',                      stylers: [{ visibility: 'off' }] },

  { featureType: 'water',                        elementType: 'geometry',           stylers: [{ color: '#c8ddf0' }] },
  { featureType: 'water',                        elementType: 'labels.text fill',   stylers: [{ color: '#4a6080' }] },
  { featureType: 'water',                        elementType: 'labels.text.stroke', stylers: [{ color: '#c8ddf0' }] },
]

// ── Custom amber SVG pin ───────────────────────────────────────────────────
const PIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" width="28" height="37"><path d="M12 0C7.58 0 4 3.58 4 8c0 6 8 22 8 22S20 14 20 8c0-4.42-3.58-8-8-8z" fill="%23c17f3e" stroke="%23ffffff" stroke-width="1.5"/><circle cx="12" cy="8" r="3.5" fill="%23ffffff"/></svg>`
const PIN_URL = `data:image/svg+xml;charset=utf-8,${PIN_SVG}`

// ── Skeleton shown while the Maps API loads ────────────────────────────────
const MapSkeleton = () => (
  <div className="w-full h-full bg-stone-100 animate-pulse flex items-center justify-center rounded-[4px]">
    <div className="text-stone-300 text-sm">Cargando mapa…</div>
  </div>
)

// ── Component ──────────────────────────────────────────────────────────────
export const PresenceMap = memo(({ office }: Props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '',
  })

  const mapRef      = useRef<google.maps.Map | null>(null)
  const initialized = useRef(false)

  // Controlled center/zoom (not default*) so @react-google-maps/api calls
  // map.setCenter() / map.setZoom() in its own useEffect after the browser
  // has computed the container layout — this is what triggers initial tile load.
  // Using defaultCenter/defaultZoom passes values to the Map constructor which
  // runs before layout is computed, leaving tiles gray.
  const [center,    setCenter]    = useState<google.maps.LatLngLiteral>({ lat: office.lat, lng: office.lng })
  const [zoom,      setZoom]      = useState(ZOOM_DETAIL)
  const [markerPos, setMarkerPos] = useState<google.maps.LatLngLiteral>({ lat: office.lat, lng: office.lng })

  const mapOptions = useMemo<google.maps.MapOptions>(() => ({
    styles:           MAP_STYLES,
    disableDefaultUI: true,
    zoomControl:      true,
    gestureHandling:  'cooperative',
    mapTypeId:        'roadmap',
    clickableIcons:   false,
  }), [])

  const markerIcon = useMemo<google.maps.Icon | undefined>(() => {
    if (!isLoaded) return undefined
    return {
      url:        PIN_URL,
      scaledSize: new window.google.maps.Size(28, 37),
      anchor:     new window.google.maps.Point(14, 37),
    }
  }, [isLoaded])

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current    = map
    initialized.current = true
  }, [])

  const onUnmount = useCallback(() => {
    mapRef.current    = null
    initialized.current = false
  }, [])

  // Smooth zoom-out → pan → zoom-in on every office change after initial mount
  useEffect(() => {
    if (!initialized.current) return

    const timers: ReturnType<typeof setTimeout>[] = []

    setZoom(ZOOM_COUNTRY)

    timers.push(
      setTimeout(() => {
        const pos = { lat: office.lat, lng: office.lng }
        setCenter(pos)
        setMarkerPos(pos)

        timers.push(
          setTimeout(() => setZoom(ZOOM_DETAIL), T_ZOOM_IN),
        )
      }, T_ZOOM_OUT),
    )

    return () => timers.forEach(clearTimeout)
  }, [office])

  if (loadError) {
    return (
      <div className="w-full h-full bg-stone-100 flex items-center justify-center rounded-[4px]">
        <p className="text-stone-400 text-sm">No se pudo cargar el mapa.</p>
      </div>
    )
  }

  if (!isLoaded) return <MapSkeleton />

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={center}
      zoom={zoom}
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={markerPos} icon={markerIcon} />
    </GoogleMap>
  )
})
PresenceMap.displayName = 'PresenceMap'
