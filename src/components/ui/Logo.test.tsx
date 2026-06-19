import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'

describe('Logo', () => {
  it('renders an img with the brand alt text', () => {
    render(<Logo />)
    expect(screen.getByAltText('INCO Estudio Técnico, S.L.')).toBeInTheDocument()
  })

  it('dark variant uses dark logo', () => {
    render(<Logo variant="dark" />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/logo-inco-dark.png')
  })

  it('light variant uses transparent logo', () => {
    render(<Logo variant="light" />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/logo-inco-transparent.png')
  })

  it('defaults to dark variant', () => {
    render(<Logo />)
    expect(screen.getByRole('img')).toHaveAttribute('src', '/logo-inco-dark.png')
  })

  it('sm size applies height 28', () => {
    render(<Logo size="sm" />)
    expect(screen.getByRole('img')).toHaveStyle({ height: '28px' })
  })

  it('md size applies height 34 (default)', () => {
    render(<Logo />)
    expect(screen.getByRole('img')).toHaveStyle({ height: '34px' })
  })

  it('lg size applies height 46', () => {
    render(<Logo size="lg" />)
    expect(screen.getByRole('img')).toHaveStyle({ height: '46px' })
  })
})
