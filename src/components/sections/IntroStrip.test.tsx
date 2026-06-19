import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { IntroStrip } from './IntroStrip'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('IntroStrip', () => {
  it('renders with id="intro"', () => {
    const { container } = render(<IntroStrip />)
    expect(container.querySelector('#intro')).toBeInTheDocument()
  })

  it('renders the "Año de fundación" label', () => {
    render(<IntroStrip />)
    expect(screen.getByText(/año de fundación/i)).toBeInTheDocument()
  })

  it('renders "Clientes atendidos" label', () => {
    render(<IntroStrip />)
    expect(screen.getByText(/clientes atendidos/i)).toBeInTheDocument()
  })

  it('renders "Oficinas en España" label', () => {
    render(<IntroStrip />)
    expect(screen.getByText(/oficinas en españa/i)).toBeInTheDocument()
  })

  it('renders "Plazos cumplidos" label', () => {
    render(<IntroStrip />)
    expect(screen.getByText(/plazos cumplidos/i)).toBeInTheDocument()
  })

  it('renders 100% as static display (no counter)', () => {
    render(<IntroStrip />)
    expect(screen.getByText('100%')).toBeInTheDocument()
  })

  it('counters animate to target after timers run', async () => {
    render(<IntroStrip />)
    await act(async () => { vi.runAllTimers() })
    // After animation, "1993" should appear (counter starts at 0, ends at 1993)
    expect(screen.getByText('1993')).toBeInTheDocument()
  })
})
