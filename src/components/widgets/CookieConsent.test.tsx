import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { CookieConsent } from './CookieConsent'

const KEY = 'inco_cookie_consent'

beforeEach(() => {
  localStorage.clear()
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  localStorage.clear()
})

async function showConsent() {
  render(<CookieConsent />)
  // Advance the 700ms show-timeout from useCookieConsent
  await act(async () => { vi.advanceTimersByTime(700) })
  // Flush double-rAF (two setTimeout(0) calls from our rAF mock)
  await act(async () => { vi.runAllTimers() })
}

describe('CookieConsent', () => {
  it('renders nothing when consent is already stored', () => {
    const data = { v: 1, consent: 'all', timestamp: new Date().toISOString() }
    localStorage.setItem(KEY, JSON.stringify(data))
    const { container } = render(<CookieConsent />)
    expect(container).toBeEmptyDOMElement()
  })

  it('shows the dialog after 700ms', async () => {
    await showConsent()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('shows "Política de cookies" heading', async () => {
    await showConsent()
    expect(screen.getByText('Política de cookies')).toBeInTheDocument()
  })

  it('"Aceptar todas" saves all consent and dismisses', async () => {
    await showConsent()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Aceptar todas' }))
    })
    await act(async () => { vi.runAllTimers() })
    const stored = JSON.parse(localStorage.getItem(KEY)!)
    expect(stored.consent).toBe('all')
  })

  it('"Solo necesarias" saves necessary consent', async () => {
    await showConsent()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Solo necesarias' }))
    })
    await act(async () => { vi.runAllTimers() })
    const stored = JSON.parse(localStorage.getItem(KEY)!)
    expect(stored.consent).toBe('necessary')
  })

  it('"Rechazar cookies analíticas" saves rejected consent', async () => {
    await showConsent()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Rechazar cookies analíticas' }))
    })
    await act(async () => { vi.runAllTimers() })
    const stored = JSON.parse(localStorage.getItem(KEY)!)
    expect(stored.consent).toBe('rejected')
  })

  it('"Configurar preferencias" opens config view', async () => {
    await showConsent()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /configurar preferencias/i }))
    })
    expect(screen.getByText('Configurar preferencias')).toBeInTheDocument()
    expect(screen.getByText('Necesarias')).toBeInTheDocument()
    expect(screen.getByText('Analíticas')).toBeInTheDocument()
  })

  it('"← Volver" in config view goes back to banner', async () => {
    await showConsent()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /configurar preferencias/i }))
    })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /volver/i }))
    })
    expect(screen.getByText('Política de cookies')).toBeInTheDocument()
  })

  it('Escape key dismisses and saves necessary consent', async () => {
    await showConsent()
    await act(async () => {
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    })
    await act(async () => { vi.runAllTimers() })
    const stored = JSON.parse(localStorage.getItem(KEY)!)
    expect(stored.consent).toBe('necessary')
  })

  it('expanding necessary cookies shows table', async () => {
    await showConsent()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /configurar preferencias/i }))
    })
    await act(async () => {
      const verBtn = screen.getAllByRole('button', { name: /ver cookies/i })[0]
      fireEvent.click(verBtn)
    })
    expect(screen.getByText('inco_cookie_consent')).toBeInTheDocument()
  })

  it('expanding analytics cookies shows analytics table', async () => {
    await showConsent()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /configurar preferencias/i }))
    })
    await act(async () => {
      const verBtns = screen.getAllByRole('button', { name: /ver cookies/i })
      fireEvent.click(verBtns[1])
    })
    expect(screen.getByText('_ga')).toBeInTheDocument()
  })

  it('toggling analytics switch and saving stores correct consent', async () => {
    await showConsent()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /configurar preferencias/i }))
    })
    await act(async () => {
      fireEvent.click(screen.getByRole('switch', { name: /analíticas/i }))
    })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /guardar preferencias/i }))
    })
    await act(async () => { vi.runAllTimers() })
    const stored = JSON.parse(localStorage.getItem(KEY)!)
    expect(stored.consent).toBe('all')
  })

  it('"Rechazar todas" in config saves rejected', async () => {
    await showConsent()
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /configurar preferencias/i }))
    })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /rechazar todas/i }))
    })
    await act(async () => { vi.runAllTimers() })
    const stored = JSON.parse(localStorage.getItem(KEY)!)
    expect(stored.consent).toBe('rejected')
  })
})
