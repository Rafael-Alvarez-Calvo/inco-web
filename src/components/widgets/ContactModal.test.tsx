import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { ContactModal } from './ContactModal'

vi.mock('./Turnstile', () => ({
  Turnstile: ({ onVerify }: { onVerify: (t: string) => void }) => (
    <button data-testid="mock-turnstile" onClick={() => onVerify('mock-token')}>
      Verify
    </button>
  ),
}))

let fetchSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  vi.useFakeTimers()
  fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    json: async () => ({ success: true }),
  } as Response)
})
afterEach(() => {
  vi.useRealTimers()
  fetchSpy.mockRestore()
})

async function openModal(onClose = vi.fn()) {
  render(<ContactModal onClose={onClose} />)
  await act(async () => { vi.runAllTimers() })
}

function fillRequired() {
  fireEvent.change(screen.getByLabelText(/nombre \*/i), { target: { value: 'Test Usuario' } })
  fireEvent.change(screen.getByLabelText(/email \*/i),  { target: { value: 'test@test.com' } })
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
    fillRequired()
    await act(async () => {
      fireEvent.submit(document.querySelector('form')!)
    })
    expect(screen.getByText('Mensaje enviado')).toBeInTheDocument()
  })

  it('shows validation errors when required fields are empty', async () => {
    await openModal()
    await act(async () => {
      fireEvent.click(screen.getByTestId('mock-turnstile'))
    })
    await act(async () => {
      fireEvent.submit(document.querySelector('form')!)
    })
    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument()
    expect(screen.getByText('El email es obligatorio')).toBeInTheDocument()
  })

  it('"Cerrar" on success state calls onClose', async () => {
    const onClose = vi.fn()
    await openModal(onClose)
    await act(async () => {
      fireEvent.click(screen.getByTestId('mock-turnstile'))
    })
    fillRequired()
    await act(async () => {
      fireEvent.submit(document.querySelector('form')!)
    })
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
