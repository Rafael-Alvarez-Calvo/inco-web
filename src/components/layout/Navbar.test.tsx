import { describe, it, expect, vi, afterEach } from 'vitest'
import { screen, act, fireEvent } from '@testing-library/react'
import { Navbar } from './Navbar'
import { renderWithRouter } from '../../test-utils'

// Mock ContactModal to avoid full modal rendering in Navbar tests
vi.mock('../widgets/ContactModal', () => ({
  ContactModal: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="contact-modal">
      <button onClick={onClose}>Cerrar modal</button>
    </div>
  ),
}))

afterEach(() => vi.restoreAllMocks())

describe('Navbar — home page', () => {
  it('renders the logo image', () => {
    renderWithRouter(<Navbar />, { route: '/' })
    expect(screen.getByAltText('INCO Estudio Técnico, S.L.')).toBeInTheDocument()
  })

  it('shows navigation links on home route', () => {
    renderWithRouter(<Navbar />, { route: '/' })
    expect(screen.getAllByRole('button', { name: 'Nosotros' }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: 'Servicios' }).length).toBeGreaterThan(0)
  })

  it('shows Contactar button', () => {
    renderWithRouter(<Navbar />, { route: '/' })
    expect(screen.getAllByRole('button', { name: 'Contactar' }).length).toBeGreaterThan(0)
  })

  it('opens mobile menu on hamburger click', async () => {
    renderWithRouter(<Navbar />, { route: '/' })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /abrir menú/i }))
    })
    expect(screen.getByRole('button', { name: /cerrar menú/i })).toBeInTheDocument()
  })

  it('closes mobile menu on X click', async () => {
    renderWithRouter(<Navbar />, { route: '/' })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /abrir menú/i }))
    })
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /cerrar menú/i }))
    })
    expect(screen.queryByRole('button', { name: /cerrar menú/i })).not.toBeInTheDocument()
  })

  it('Contactar on home does not open modal', async () => {
    renderWithRouter(<Navbar />, { route: '/' })
    const contactarBtns = screen.getAllByRole('button', { name: 'Contactar' })
    await act(async () => { fireEvent.click(contactarBtns[0]) })
    expect(screen.queryByTestId('contact-modal')).not.toBeInTheDocument()
  })

  it('adds shadow class after scrolling past 60px', async () => {
    renderWithRouter(<Navbar />, { route: '/' })
    const nav = document.querySelector('nav')!
    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(nav.className).toContain('shadow-md')
  })
})

describe('Navbar — legal page', () => {
  it('shows a Link (not button) for logo on non-home routes', () => {
    renderWithRouter(<Navbar />, { route: '/aviso-legal' })
    const logo = screen.getByAltText('INCO Estudio Técnico, S.L.')
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('opens ContactModal on Contactar click from legal page', async () => {
    renderWithRouter(<Navbar />, { route: '/privacidad' })
    const contactarBtns = screen.getAllByRole('button', { name: 'Contactar' })
    await act(async () => { fireEvent.click(contactarBtns[0]) })
    expect(screen.getByTestId('contact-modal')).toBeInTheDocument()
  })

  it('ContactModal can be closed', async () => {
    renderWithRouter(<Navbar />, { route: '/privacidad' })
    const contactarBtns = screen.getAllByRole('button', { name: 'Contactar' })
    await act(async () => { fireEvent.click(contactarBtns[0]) })
    await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Cerrar modal' })) })
    expect(screen.queryByTestId('contact-modal')).not.toBeInTheDocument()
  })
})
