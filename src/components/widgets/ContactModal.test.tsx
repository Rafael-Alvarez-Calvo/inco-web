import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { ContactModal } from './ContactModal'

// Mock Turnstile so tests don't depend on external script loading
vi.mock('./Turnstile', () => ({
  Turnstile: ({ onVerify }: { onVerify: (t: string) => void }) => (
    <button data-testid="mock-turnstile" onClick={() => onVerify('mock-token')}>
      Verify
    </button>
  ),
}))

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

async function openModal(onClose = vi.fn()) {
  render(<ContactModal onClose={onClose} />)
  // Flush double-rAF (mapped to setTimeout(0) via our mock)
  await act(async () => { vi.runAllTimers() })
}

describe('ContactModal', () => {
  it('renders the dialog with correct role', async () => {
    await openModal()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('shows the modal title', async () => {
    await openModal()
    expect(screen.getByText('Solicitar información')).toBeInTheDocument()
  })

  it('close button calls onClose after animation', async () => {
    const onClose = vi.fn()
    await openModal(onClose)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /cerrar/i }))
    })
    await act(async () => { vi.runAllTimers() })
    expect(onClose).toHaveBeenCalled()
  })

  it('Escape key calls onClose', async () => {
    const onClose = vi.fn()
    await openModal(onClose)
    await act(async () => {
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
    })
    await act(async () => { vi.runAllTimers() })
    expect(onClose).toHaveBeenCalled()
  })

  it('submit button is disabled without token', async () => {
    await openModal()
    expect(screen.getByRole('button', { name: /enviar consulta/i })).toBeDisabled()
  })

  it('submit button is enabled after Turnstile verification', async () => {
    await openModal()
    await act(async () => {
      fireEvent.click(screen.getByTestId('mock-turnstile'))
    })
    expect(screen.getByRole('button', { name: /enviar consulta/i })).not.toBeDisabled()
  })

  it('submitting form shows success state', async () => {
    await openModal()
    await act(async () => {
      fireEvent.click(screen.getByTestId('mock-turnstile'))
    })
    await act(async () => {
      fireEvent.submit(document.querySelector('form')!)
    })
    expect(screen.getByText('Mensaje enviado')).toBeInTheDocument()
  })

  it('"Cerrar" on success state calls onClose', async () => {
    const onClose = vi.fn()
    await openModal(onClose)
    await act(async () => {
      fireEvent.click(screen.getByTestId('mock-turnstile'))
    })
    await act(async () => {
      fireEvent.submit(document.querySelector('form')!)
    })
    // The success "Cerrar" has text content; the X button only has aria-label
    await act(async () => {
      fireEvent.click(screen.getByText('Cerrar', { selector: 'button' }))
    })
    await act(async () => { vi.runAllTimers() })
    expect(onClose).toHaveBeenCalled()
  })

  it('renders form fields', async () => {
    await openModal()
    expect(screen.getByLabelText(/nombre \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument()
  })
})
