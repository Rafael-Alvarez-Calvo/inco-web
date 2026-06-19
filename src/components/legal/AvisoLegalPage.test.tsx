import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import { AvisoLegalPage } from './AvisoLegalPage'
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

describe('AvisoLegalPage', () => {
  it('renders the Aviso Legal h1', () => {
    renderWithRouter(<AvisoLegalPage />, { route: '/aviso-legal' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/aviso legal/i)
  })

  it('renders "Datos identificativos" section', () => {
    renderWithRouter(<AvisoLegalPage />, { route: '/aviso-legal' })
    expect(screen.getByText(/datos identificativos/i)).toBeInTheDocument()
  })

  it('renders "Ley aplicable" section', () => {
    renderWithRouter(<AvisoLegalPage />, { route: '/aviso-legal' })
    expect(screen.getByText(/ley aplicable/i)).toBeInTheDocument()
  })

  it('renders "Volver al inicio" link', () => {
    renderWithRouter(<AvisoLegalPage />, { route: '/aviso-legal' })
    expect(screen.getByRole('link', { name: /volver al inicio/i })).toBeInTheDocument()
  })
})
