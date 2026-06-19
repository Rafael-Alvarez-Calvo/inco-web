import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { References } from './References'

describe('References', () => {
  it('renders section with id="referencias"', () => {
    const { container } = render(<References />)
    expect(container.querySelector('#referencias')).toBeInTheDocument()
  })

  it('renders "Referencias destacadas" heading', () => {
    render(<References />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/referencias/i)
  })

  it('renders all filter tabs', () => {
    render(<References />)
    expect(screen.getByRole('button', { name: 'Todos' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Infraestructura Viaria' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ferroviaria' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hidráulica' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Urbanismo' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Edificación' })).toBeInTheDocument()
  })

  it('shows all 22 references with "Todos" active by default', () => {
    render(<References />)
    expect(screen.getByText(/mostrando 22 de 22/i)).toBeInTheDocument()
  })

  it('filtering by "Ferroviaria" shows only 3 references', async () => {
    const user = userEvent.setup()
    render(<References />)
    await user.click(screen.getByRole('button', { name: 'Ferroviaria' }))
    expect(screen.getByText(/mostrando 3 de 22/i)).toBeInTheDocument()
  })

  it('filtering by "Hidráulica" shows only 5 references', async () => {
    const user = userEvent.setup()
    render(<References />)
    await user.click(screen.getByRole('button', { name: 'Hidráulica' }))
    expect(screen.getByText(/mostrando 5 de 22/i)).toBeInTheDocument()
  })

  it('filtering by "Urbanismo" shows only 4 references', async () => {
    const user = userEvent.setup()
    render(<References />)
    await user.click(screen.getByRole('button', { name: 'Urbanismo' }))
    expect(screen.getByText(/mostrando 4 de 22/i)).toBeInTheDocument()
  })

  it('filtering by "Edificación" shows only 3 references', async () => {
    const user = userEvent.setup()
    render(<References />)
    await user.click(screen.getByRole('button', { name: 'Edificación' }))
    expect(screen.getByText(/mostrando 3 de 22/i)).toBeInTheDocument()
  })

  it('filtering by "Infraestructura Viaria" shows 7 references', async () => {
    const user = userEvent.setup()
    render(<References />)
    await user.click(screen.getByRole('button', { name: 'Infraestructura Viaria' }))
    expect(screen.getByText(/mostrando 7 de 22/i)).toBeInTheDocument()
  })

  it('switching back to "Todos" restores all 22', async () => {
    const user = userEvent.setup()
    render(<References />)
    await user.click(screen.getByRole('button', { name: 'Ferroviaria' }))
    await user.click(screen.getByRole('button', { name: 'Todos' }))
    expect(screen.getByText(/mostrando 22 de 22/i)).toBeInTheDocument()
  })

  it('renders ADIF as client in ferroviaria filter', async () => {
    const user = userEvent.setup()
    render(<References />)
    await user.click(screen.getByRole('button', { name: 'Ferroviaria' }))
    const adifCells = screen.getAllByText('ADIF')
    expect(adifCells.length).toBeGreaterThan(0)
  })
})
