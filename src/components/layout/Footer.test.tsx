import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Footer } from './Footer'
import { renderWithRouter } from '../../test-utils'

describe('Footer', () => {
  it('renders the logo', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByAltText('INCO Estudio Técnico, S.L.')).toBeInTheDocument()
  })

  it('renders Servicios column heading', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText('Servicios')).toBeInTheDocument()
  })

  it('renders Empresa column heading', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText('Empresa')).toBeInTheDocument()
  })

  it('renders Contacto column heading', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })

  it('renders phone and email links', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: '+34 91 499 47 17' })).toHaveAttribute('href', 'tel:+34914994717')
    expect(screen.getByRole('link', { name: 'info@inco.com.es' })).toHaveAttribute('href', 'mailto:info@inco.com.es')
  })

  it('renders legal links to correct routes', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByRole('link', { name: 'Aviso legal' })).toHaveAttribute('href', '/aviso-legal')
    expect(screen.getByRole('link', { name: 'Privacidad' })).toHaveAttribute('href', '/privacidad')
    expect(screen.getByRole('link', { name: 'Cookies' })).toHaveAttribute('href', '/cookies')
    expect(screen.getByRole('link', { name: 'Accesibilidad' })).toHaveAttribute('href', '/accesibilidad')
  })

  it('renders the current year in the copyright text', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument()
  })

  it('footer service buttons call scrollIntoView', async () => {
    const scrollIntoView = vi.fn()
    vi.spyOn(document, 'querySelector').mockReturnValue({ scrollIntoView } as unknown as Element)
    const user = userEvent.setup()
    renderWithRouter(<Footer />)
    await user.click(screen.getByRole('button', { name: 'Dirección de obras' }))
    expect(scrollIntoView).toHaveBeenCalled()
  })

  it('renders all 5 services in Servicios column', () => {
    renderWithRouter(<Footer />)
    expect(screen.getByText('Dirección de obras')).toBeInTheDocument()
    expect(screen.getByText('Tecnología BIM')).toBeInTheDocument()
  })
})
