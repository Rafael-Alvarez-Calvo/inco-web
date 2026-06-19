import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { Contact } from './Contact'

// Mock Turnstile to keep form tests simple
vi.mock('../widgets/Turnstile', () => ({
  Turnstile: ({ onVerify }: { onVerify: (t: string) => void }) => (
    <button data-testid="mock-turnstile" onClick={() => onVerify('mock-token')}>
      Verify
    </button>
  ),
}))

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('Contact', () => {
  it('renders section with id="contacto"', () => {
    const { container } = render(<Contact />)
    expect(container.querySelector('#contacto')).toBeInTheDocument()
  })

  it('renders the heading', () => {
    render(<Contact />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/hablemos/i)
  })

  it('renders "Solicitar información" form title', () => {
    render(<Contact />)
    expect(screen.getByText('Solicitar información')).toBeInTheDocument()
  })

  it('renders contact info details', () => {
    render(<Contact />)
    expect(screen.getByText('+34 91 499 47 17')).toBeInTheDocument()
    expect(screen.getByText('info@inco.com.es')).toBeInTheDocument()
  })

  it('submit button is disabled without Turnstile token', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /enviar consulta/i })).toBeDisabled()
  })

  it('submit button is enabled after verification', async () => {
    render(<Contact />)
    await act(async () => {
      fireEvent.click(screen.getByTestId('mock-turnstile'))
    })
    expect(screen.getByRole('button', { name: /enviar consulta/i })).not.toBeDisabled()
  })

  it('submitting the form shows success message', async () => {
    render(<Contact />)
    await act(async () => {
      fireEvent.click(screen.getByTestId('mock-turnstile'))
    })
    await act(async () => {
      fireEvent.submit(document.querySelector('form')!)
    })
    expect(screen.getByText('Mensaje enviado')).toBeInTheDocument()
  })

  it('submit without token does nothing', async () => {
    render(<Contact />)
    const form = document.querySelector('form')!
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true }))
    })
    expect(screen.queryByText('Mensaje enviado')).not.toBeInTheDocument()
  })

  it('renders phone link with correct href', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: '+34 91 499 47 17' })).toHaveAttribute('href', 'tel:+34914994717')
  })

  it('renders email link with correct href', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: 'info@inco.com.es' })).toHaveAttribute('href', 'mailto:info@inco.com.es')
  })

  it('renders web link opening in new tab', () => {
    render(<Contact />)
    const webLink = screen.getByRole('link', { name: 'inco.com.es' })
    expect(webLink).toHaveAttribute('target', '_blank')
    expect(webLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders sede address as static text', () => {
    render(<Contact />)
    expect(screen.getByText(/casas de miravete/i)).toBeInTheDocument()
  })
})
