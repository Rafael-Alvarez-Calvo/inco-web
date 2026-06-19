import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import { PrivacidadPage } from './PrivacidadPage'
import { renderWithRouter } from '../../test-utils'

beforeEach(() => {
  const metas = [
    { name: 'description' }, { property: 'og:title' }, { property: 'og:description' },
    { property: 'og:url' }, { name: 'twitter:title' }, { name: 'twitter:description' },
  ]
  metas.forEach(attrs => {
    const el = document.createElement('meta')
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
  })
  const link = document.createElement('link'); link.rel = 'canonical'
  document.head.appendChild(link)
})

afterEach(() => {
  document.head.querySelectorAll('meta, link').forEach(el => el.remove())
  document.getElementById('ld-json-breadcrumb')?.remove()
})

describe('PrivacidadPage', () => {
  it('renders Política de Privacidad h1', () => {
    renderWithRouter(<PrivacidadPage />, { route: '/privacidad' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/privacidad/i)
  })

  it('renders "Responsable de tratamiento" section heading', () => {
    renderWithRouter(<PrivacidadPage />, { route: '/privacidad' })
    expect(screen.getByRole('heading', { name: /responsable de tratamiento/i })).toBeInTheDocument()
  })

  it('renders GDPR rights section', () => {
    renderWithRouter(<PrivacidadPage />, { route: '/privacidad' })
    expect(screen.getByText(/derechos de los interesados/i)).toBeInTheDocument()
  })

  it('renders Cloudflare Turnstile section', () => {
    renderWithRouter(<PrivacidadPage />, { route: '/privacidad' })
    // "Cloudflare Turnstile" appears in the section title and in the body text
    expect(screen.getAllByText(/cloudflare turnstile/i).length).toBeGreaterThan(0)
  })
})
