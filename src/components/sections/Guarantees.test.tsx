import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Guarantees } from './Guarantees'

describe('Guarantees', () => {
  it('renders section with id="garantias"', () => {
    const { container } = render(<Guarantees />)
    expect(container.querySelector('#garantias')).toBeInTheDocument()
  })

  it('renders "Un servicio con respaldo" heading', () => {
    render(<Guarantees />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/servicio/i)
  })

  it('renders "Nuestras garantías" eyebrow', () => {
    render(<Guarantees />)
    expect(screen.getByText('Nuestras garantías')).toBeInTheDocument()
  })

  it('renders all 4 guarantee items', () => {
    render(<Guarantees />)
    expect(screen.getByText('Cumplimiento normativo total')).toBeInTheDocument()
    expect(screen.getByText('Buena ejecución garantizada')).toBeInTheDocument()
    expect(screen.getByText('100% de plazos cumplidos')).toBeInTheDocument()
    expect(screen.getByText('Equipo certificado y actualizado')).toBeInTheDocument()
  })

  it('renders checkmark icons for each guarantee', () => {
    render(<Guarantees />)
    const checks = screen.getAllByText('✓')
    expect(checks).toHaveLength(4)
  })

  it('renders the main guarantee image', () => {
    render(<Guarantees />)
    expect(screen.getByAltText(/control de calidad/i)).toBeInTheDocument()
  })
})
