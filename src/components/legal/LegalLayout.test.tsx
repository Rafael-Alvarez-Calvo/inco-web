import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import { LegalLayout } from './LegalLayout'
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
  const link = document.createElement('link')
  link.rel = 'canonical'
  document.head.appendChild(link)
})

afterEach(() => {
  document.head.querySelectorAll('meta, link').forEach(el => el.remove())
  document.getElementById('ld-json-breadcrumb')?.remove()
})

describe('LegalLayout', () => {
  it('renders the page title as h1', () => {
    renderWithRouter(
      <LegalLayout title="Aviso Legal" description="Desc" path="/aviso-legal">
        <p>Content</p>
      </LegalLayout>,
      { route: '/aviso-legal' },
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Aviso Legal')
  })

  it('renders children content', () => {
    renderWithRouter(
      <LegalLayout title="T" description="D" path="/p">
        <p data-testid="child">Hijo</p>
      </LegalLayout>,
      { route: '/p' },
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('renders "← Volver al inicio" link', () => {
    renderWithRouter(
      <LegalLayout title="T" description="D" path="/p"><p /></LegalLayout>,
      { route: '/p' },
    )
    expect(screen.getByRole('link', { name: /volver al inicio/i })).toHaveAttribute('href', '/')
  })

  it('renders Navbar and Footer', () => {
    renderWithRouter(
      <LegalLayout title="T" description="D" path="/p"><p /></LegalLayout>,
      { route: '/p' },
    )
    expect(screen.getAllByRole('navigation').length).toBeGreaterThanOrEqual(1)
    expect(document.querySelector('footer')).toBeInTheDocument()
  })

  it('sets document.title via useSEO', () => {
    renderWithRouter(
      <LegalLayout title="Mi Página" description="D" path="/p"><p /></LegalLayout>,
      { route: '/p' },
    )
    expect(document.title).toContain('Mi Página')
  })
})
