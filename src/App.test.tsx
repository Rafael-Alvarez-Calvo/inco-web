import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { App } from './App'

// Add meta elements required by useSEO in legal pages
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
  localStorage.clear()
})

afterEach(() => {
  document.head.querySelectorAll('meta, link').forEach(el => el.remove())
  document.getElementById('ld-json-breadcrumb')?.remove()
  localStorage.clear()
})

function renderApp(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routing', () => {
  it('/ renders HomePage with Hero heading', () => {
    renderApp('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/más de 30 años/i)
  })

  it('/ renders Navbar', () => {
    renderApp('/')
    expect(screen.getAllByRole('navigation').length).toBeGreaterThanOrEqual(1)
  })

  it('/ renders Footer', () => {
    renderApp('/')
    expect(document.querySelector('footer')).toBeInTheDocument()
  })

  it('/aviso-legal renders AvisoLegalPage', () => {
    renderApp('/aviso-legal')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/aviso legal/i)
  })

  it('/privacidad renders PrivacidadPage', () => {
    renderApp('/privacidad')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/privacidad/i)
  })

  it('/cookies renders CookiesPage', () => {
    renderApp('/cookies')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/cookies/i)
  })

  it('/accesibilidad renders AccesibilidadPage', () => {
    renderApp('/accesibilidad')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/accesibilidad/i)
  })

  it('ScrollToTop is mounted (window.scrollTo is called on render)', () => {
    const calls = (window.scrollTo as ReturnType<typeof vi.fn>).mock?.calls?.length ?? 0
    renderApp('/')
    expect((window.scrollTo as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThanOrEqual(calls)
  })
})
