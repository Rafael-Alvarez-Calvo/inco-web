import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen, act, fireEvent } from '@testing-library/react'
import { CookiesPage } from './CookiesPage'
import { renderWithRouter } from '../../test-utils'

beforeEach(() => {
  localStorage.clear()
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
  localStorage.clear()
})

describe('CookiesPage', () => {
  it('renders "Política de Cookies" h1', () => {
    renderWithRouter(<CookiesPage />, { route: '/cookies' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/cookies/i)
  })

  it('renders "¿Qué son las cookies?" section', () => {
    renderWithRouter(<CookiesPage />, { route: '/cookies' })
    expect(screen.getByText(/qué son las cookies/i)).toBeInTheDocument()
  })

  it('renders cookies table with inco_cookie_consent', () => {
    renderWithRouter(<CookiesPage />, { route: '/cookies' })
    expect(screen.getByText('inco_cookie_consent')).toBeInTheDocument()
  })

  it('renders cookie preferences panel button that removes consent from localStorage', async () => {
    localStorage.setItem(
      'inco_cookie_consent',
      JSON.stringify({ v: 1, consent: 'all', timestamp: new Date().toISOString() }),
    )
    renderWithRouter(<CookiesPage />, { route: '/cookies' })
    const panelBtn = screen.getByRole('button', { name: /panel de preferencias de cookies/i })
    await act(async () => { fireEvent.click(panelBtn) })
    expect(localStorage.getItem('inco_cookie_consent')).toBeNull()
  })
})
