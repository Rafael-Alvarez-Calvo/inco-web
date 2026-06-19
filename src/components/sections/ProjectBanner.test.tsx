import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProjectBanner } from './ProjectBanner'

describe('ProjectBanner', () => {
  it('renders "Obra pública de gran envergadura" heading', () => {
    render(<ProjectBanner />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/obra pública/i)
  })

  it('renders all 4 tags', () => {
    render(<ProjectBanner />)
    expect(screen.getByText('Dirección de obra')).toBeInTheDocument()
    expect(screen.getByText('Asistencia técnica')).toBeInTheDocument()
    expect(screen.getByText('Gestión de plazos')).toBeInTheDocument()
    expect(screen.getByText('Control de calidad')).toBeInTheDocument()
  })

  it('renders "Consultar proyecto" CTA link', () => {
    render(<ProjectBanner />)
    expect(screen.getByRole('link', { name: /consultar proyecto/i })).toBeInTheDocument()
  })

  it('"Consultar proyecto" scrolls to #contacto on click', async () => {
    const scrollIntoView = vi.fn()
    vi.spyOn(document, 'querySelector').mockReturnValue({ scrollIntoView } as unknown as Element)
    const user = userEvent.setup()
    render(<ProjectBanner />)
    await user.click(screen.getByRole('link', { name: /consultar proyecto/i }))
    expect(scrollIntoView).toHaveBeenCalled()
  })

  it('renders the banner image', () => {
    render(<ProjectBanner />)
    expect(screen.getByAltText('Autovía INCO')).toBeInTheDocument()
  })

  it('renders "Infraestructura vial" eyebrow', () => {
    render(<ProjectBanner />)
    expect(screen.getByText(/infraestructura vial/i)).toBeInTheDocument()
  })
})
