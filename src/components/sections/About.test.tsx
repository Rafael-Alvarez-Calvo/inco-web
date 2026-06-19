import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { About } from './About'

describe('About', () => {
  it('renders section with id="nosotros"', () => {
    const { container } = render(<About />)
    expect(container.querySelector('#nosotros')).toBeInTheDocument()
  })

  it('renders the main heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/empresa familiar/i)
  })

  it('renders "Sobre nosotros" eyebrow label', () => {
    render(<About />)
    expect(screen.getByText('Sobre nosotros')).toBeInTheDocument()
  })

  it('renders the blockquote', () => {
    render(<About />)
    expect(screen.getByText(/generando el presente/i)).toBeInTheDocument()
  })

  it('renders all 4 feature cards', () => {
    render(<About />)
    expect(screen.getByText('Rigor técnico')).toBeInTheDocument()
    expect(screen.getByText('Plazos garantizados')).toBeInTheDocument()
    expect(screen.getByText('Visión global')).toBeInTheDocument()
    expect(screen.getByText('Clientes públicos y privados')).toBeInTheDocument()
  })

  it('renders IUE area cards', () => {
    render(<About />)
    expect(screen.getByText('Ingeniería')).toBeInTheDocument()
    expect(screen.getByText('Urbanismo')).toBeInTheDocument()
    expect(screen.getByText('Edificación')).toBeInTheDocument()
  })

  it('renders the +30 años badge', () => {
    render(<About />)
    expect(screen.getByText('+30')).toBeInTheDocument()
  })
})
