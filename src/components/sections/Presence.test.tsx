import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Presence } from './Presence'

describe('Presence', () => {
  it('renders section with id="presencia"', () => {
    const { container } = render(<Presence />)
    expect(container.querySelector('#presencia')).toBeInTheDocument()
  })

  it('renders "Presencia nacional" heading', () => {
    render(<Presence />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/presencia nacional/i)
  })

  it('renders "Dónde estamos" eyebrow', () => {
    render(<Presence />)
    expect(screen.getByText('Dónde estamos')).toBeInTheDocument()
  })

  it('renders all 4 office city headings', () => {
    render(<Presence />)
    expect(screen.getByRole('heading', { name: 'Madrid', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Barcelona', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Badajoz', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Murcia', level: 3 })).toBeInTheDocument()
  })

  it('marks Madrid as "Sede central"', () => {
    render(<Presence />)
    expect(screen.getByText('Sede central')).toBeInTheDocument()
  })

  it('renders 3 "Delegación" badges', () => {
    render(<Presence />)
    expect(screen.getAllByText('Delegación')).toHaveLength(3)
  })

  it('renders Madrid address', () => {
    render(<Presence />)
    expect(screen.getByText(/casas de miravete/i)).toBeInTheDocument()
  })
})
