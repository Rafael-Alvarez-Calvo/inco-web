import { useEffect } from 'react'

const BASE_URL = 'https://inco.com.es'

const HOME_TITLE = 'Ingeniería Civil y Arquitectura en Madrid | INCO Estudio Técnico'
const HOME_DESC  = 'Consultoría especializada en ingeniería civil, dirección de obras y arquitectura. Más de 30 años y 1.000+ proyectos para administraciones y empresas en toda España.'

interface SEOOptions {
  title: string
  description: string
  path: string
  breadcrumb?: string
}

function setMeta(selector: string, value: string) {
  const el = document.querySelector(selector)
  if (!el) return
  if (el.tagName === 'LINK') (el as HTMLLinkElement).href = value
  else (el as HTMLMetaElement).content = value
}

function upsertLdScript(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export function useSEO({ title, description, path, breadcrumb }: SEOOptions) {
  useEffect(() => {
    const canonical = `${BASE_URL}${path}`

    document.title = title
    setMeta('meta[name="description"]',        description)
    setMeta('link[rel="canonical"]',            canonical)
    setMeta('meta[property="og:title"]',        title)
    setMeta('meta[property="og:description"]',  description)
    setMeta('meta[property="og:url"]',          canonical)
    setMeta('meta[name="twitter:title"]',       title)
    setMeta('meta[name="twitter:description"]', description)

    if (breadcrumb) {
      upsertLdScript('ld-json-breadcrumb', {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio',   item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: breadcrumb, item: canonical },
        ],
      })
    }

    return () => {
      document.title = HOME_TITLE
      setMeta('meta[name="description"]',        HOME_DESC)
      setMeta('link[rel="canonical"]',            `${BASE_URL}/`)
      setMeta('meta[property="og:title"]',        HOME_TITLE)
      setMeta('meta[property="og:description"]',  HOME_DESC)
      setMeta('meta[property="og:url"]',          `${BASE_URL}/`)
      setMeta('meta[name="twitter:title"]',       HOME_TITLE)
      setMeta('meta[name="twitter:description"]', HOME_DESC)
      document.getElementById('ld-json-breadcrumb')?.remove()
    }
  }, [title, description, path, breadcrumb])
}
