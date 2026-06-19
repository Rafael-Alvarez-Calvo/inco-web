import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Services } from './Services'

describe('Services', () => {
  it('renders section with id="servicios"', () => {
    const { container } = render(<Services />)
    expect(container.querySelector('#servicios')).toBeInTheDocument()
  })

  it('renders "Nuestros servicios" heading', () => {
    render(<Services />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/nuestros servicios/i)
  })

  it('renders all 9 service cards', () => {
    render(<Services />)
    const serviceNames = [
      'Dirección de Obras',
      'Redacción de Proyectos',
      'Coordinación de Seguridad y Salud',
      'Asistencia Técnica',
      'Gestión y Planificación de Obras',
      'Asistencia Técnica Carreteras',
      'Planeamiento Urbanístico',
      'Arquitectura y Rehabilitación',
      'Tecnología BIM',
    ]
    serviceNames.forEach(name => {
      expect(screen.getByRole('heading', { name, level: 3 })).toBeInTheDocument()
    })
  })

  it('renders service numbers as decorative text', () => {
    render(<Services />)
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('09')).toBeInTheDocument()
  })

  it('renders "Qué hacemos" eyebrow label', () => {
    render(<Services />)
    expect(screen.getByText('Qué hacemos')).toBeInTheDocument()
  })
})
