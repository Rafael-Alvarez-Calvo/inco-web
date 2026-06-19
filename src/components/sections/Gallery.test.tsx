import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { Gallery } from './Gallery'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('Gallery', () => {
  it('renders section with id="galeria"', () => {
    const { container } = render(<Gallery />)
    expect(container.querySelector('#galeria')).toBeInTheDocument()
  })

  it('renders "Nuestra trayectoria" heading', () => {
    render(<Gallery />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/trayectoria/i)
  })

  it('renders prev/next navigation buttons', () => {
    render(<Gallery />)
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeInTheDocument()
  })

  it('renders dot indicators (15 photos)', () => {
    render(<Gallery />)
    const dots = screen.getAllByRole('button', { name: /ir a imagen/i })
    expect(dots).toHaveLength(15)
  })

  it('shows "1 / 15" counter initially', () => {
    render(<Gallery />)
    expect(screen.getByText('1 / 15')).toBeInTheDocument()
  })

  it('clicking "Siguiente" advances to next photo', async () => {
    render(<Gallery />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Siguiente' }))
    })
    await act(async () => { vi.advanceTimersByTime(300) })
    expect(screen.getByText('2 / 15')).toBeInTheDocument()
  })

  it('clicking "Anterior" from index 0 wraps to last photo', async () => {
    render(<Gallery />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Anterior' }))
    })
    await act(async () => { vi.advanceTimersByTime(300) })
    expect(screen.getByText('15 / 15')).toBeInTheDocument()
  })

  it('clicking a dot navigates to that photo', async () => {
    render(<Gallery />)
    const dots = screen.getAllByRole('button', { name: /ir a imagen/i })
    await act(async () => { fireEvent.click(dots[4]) })
    await act(async () => { vi.advanceTimersByTime(300) })
    expect(screen.getByText('5 / 15')).toBeInTheDocument()
  })

  it('auto-play advances after 4500ms', async () => {
    render(<Gallery />)
    await act(async () => { vi.advanceTimersByTime(4500) })
    await act(async () => { vi.advanceTimersByTime(300) })
    expect(screen.getByText('2 / 15')).toBeInTheDocument()
  })

  it('opens lightbox on mobile photo click', async () => {
    render(<Gallery />)
    const mobileDiv = document.querySelector('.sm\\:hidden') as HTMLElement
    await act(async () => { fireEvent.click(mobileDiv) })
    expect(screen.getByRole('button', { name: 'Cerrar lightbox' })).toBeInTheDocument()
  })

  it('closes lightbox with X button', async () => {
    render(<Gallery />)
    const mobileDiv = document.querySelector('.sm\\:hidden') as HTMLElement
    await act(async () => { fireEvent.click(mobileDiv) })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Cerrar lightbox' }))
    })
    expect(screen.queryByRole('button', { name: 'Cerrar lightbox' })).not.toBeInTheDocument()
  })

  it('closes lightbox on Escape key', async () => {
    render(<Gallery />)
    const mobileDiv = document.querySelector('.sm\\:hidden') as HTMLElement
    await act(async () => { fireEvent.click(mobileDiv) })
    await act(async () => {
      fireEvent.keyDown(window, { key: 'Escape' })
    })
    expect(screen.queryByRole('button', { name: 'Cerrar lightbox' })).not.toBeInTheDocument()
  })

  it('ArrowRight navigates in lightbox', async () => {
    render(<Gallery />)
    const mobileDiv = document.querySelector('.sm\\:hidden') as HTMLElement
    await act(async () => { fireEvent.click(mobileDiv) })
    // After lightbox opens, both carousel ("1 / 15") and lightbox ("1 / 15") render
    // ArrowRight advances only the lightbox index → lightbox shows "2 / 15"
    await act(async () => { fireEvent.keyDown(window, { key: 'ArrowRight' }) })
    expect(screen.getByText('2 / 15')).toBeInTheDocument()
  })

  it('ArrowLeft navigates in lightbox', async () => {
    render(<Gallery />)
    const mobileDiv = document.querySelector('.sm\\:hidden') as HTMLElement
    await act(async () => { fireEvent.click(mobileDiv) })
    await act(async () => { fireEvent.keyDown(window, { key: 'ArrowLeft' }) })
    expect(screen.getByText('15 / 15')).toBeInTheDocument()
  })

  it('lightbox prev/next buttons navigate', async () => {
    render(<Gallery />)
    const mobileDiv = document.querySelector('.sm\\:hidden') as HTMLElement
    await act(async () => { fireEvent.click(mobileDiv) })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Imagen siguiente' }))
    })
    expect(screen.getByText('2 / 15')).toBeInTheDocument()
  })

  it('lightbox backdrop click closes lightbox', async () => {
    render(<Gallery />)
    const mobileDiv = document.querySelector('.sm\\:hidden') as HTMLElement
    await act(async () => { fireEvent.click(mobileDiv) })
    // Click the fixed overlay backdrop
    const backdrop = document.querySelector('.fixed.inset-0.z-\\[200\\]') as HTMLElement
    await act(async () => { fireEvent.click(backdrop) })
    expect(screen.queryByRole('button', { name: 'Cerrar lightbox' })).not.toBeInTheDocument()
  })
})
