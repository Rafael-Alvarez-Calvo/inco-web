import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { Hero } from './Hero'

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/más de 30 años/i)
  })

  it('renders "Nuestros servicios" CTA', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /nuestros servicios/i })).toBeInTheDocument()
  })

  it('renders "Quiénes somos" CTA', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /quiénes somos/i })).toBeInTheDocument()
  })

  it('renders scroll indicator button', () => {
    render(<Hero />)
    expect(screen.getByRole('button', { name: /desplazarse hacia abajo/i })).toBeInTheDocument()
  })

  it('"Nuestros servicios" scrolls to #servicios', async () => {
    const scrollIntoView = vi.fn()
    vi.spyOn(document, 'querySelector').mockReturnValue({ scrollIntoView } as unknown as Element)
    render(<Hero />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /nuestros servicios/i }))
    })
    expect(scrollIntoView).toHaveBeenCalled()
  })

  it('"Quiénes somos" scrolls to #nosotros', async () => {
    const scrollIntoView = vi.fn()
    vi.spyOn(document, 'querySelector').mockReturnValue({ scrollIntoView } as unknown as Element)
    render(<Hero />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /quiénes somos/i }))
    })
    expect(scrollIntoView).toHaveBeenCalled()
  })

  it('applies Ken Burns effect (removes scale class after 100ms)', async () => {
    render(<Hero />)
    const bgDiv = document.querySelector('[aria-label*="Autov"]')!
    expect(bgDiv.className).toContain('scale-[1.04]')
    await act(async () => { vi.advanceTimersByTime(100) })
    expect(bgDiv.className).not.toContain('scale-[1.04]')
  })

  it('has the background image div with aria role', () => {
    render(<Hero />)
    expect(document.querySelector('[role="img"]')).toBeInTheDocument()
  })
})
