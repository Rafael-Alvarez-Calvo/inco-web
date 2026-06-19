import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import { AccesibilidadPage } from './AccesibilidadPage'
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

describe('AccesibilidadPage', () => {
  it('renders "Declaración de accesibilidad" h1', () => {
    renderWithRouter(<AccesibilidadPage />, { route: '/accesibilidad' })
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/accesibilidad/i)
  })

  it('renders "Datos de contacto" section', () => {
    renderWithRouter(<AccesibilidadPage />, { route: '/accesibilidad' })
    expect(screen.getByText('Datos de contacto')).toBeInTheDocument()
  })

  it('renders "Procedimiento de reclamación" section', () => {
    renderWithRouter(<AccesibilidadPage />, { route: '/accesibilidad' })
    expect(screen.getByText('Procedimiento de reclamación')).toBeInTheDocument()
  })

  it('renders "Fecha de declaración" section', () => {
    renderWithRouter(<AccesibilidadPage />, { route: '/accesibilidad' })
    expect(screen.getByText('Fecha de declaración')).toBeInTheDocument()
  })

  it('renders contact email link', () => {
    renderWithRouter(<AccesibilidadPage />, { route: '/accesibilidad' })
    // Footer and page content both have this link; check the first occurrence
    const emailLinks = screen.getAllByRole('link', { name: 'info@inco.com.es' })
    expect(emailLinks[0]).toHaveAttribute('href', 'mailto:info@inco.com.es')
  })

  it('renders phone link', () => {
    renderWithRouter(<AccesibilidadPage />, { route: '/accesibilidad' })
    expect(screen.getByRole('link', { name: '91 499 47 17' })).toHaveAttribute('href', 'tel:+34914994717')
  })
})
