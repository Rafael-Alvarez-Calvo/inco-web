import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormField } from './FormField'

describe('FormField', () => {
  it('renders a label with the correct text', () => {
    render(<FormField label="Nombre *" id="nombre" type="text" placeholder="Tu nombre" />)
    expect(screen.getByText('Nombre *')).toBeInTheDocument()
  })

  it('associates label with input via htmlFor / id', () => {
    render(<FormField label="Email *" id="email" type="email" placeholder="a@b.com" />)
    expect(screen.getByLabelText('Email *')).toBeInTheDocument()
  })

  it('renders the correct input type', () => {
    render(<FormField label="Tel" id="tel" type="tel" placeholder="+34" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel')
  })

  it('renders the placeholder', () => {
    render(<FormField label="Empresa" id="empresa" type="text" placeholder="Razón social" />)
    expect(screen.getByPlaceholderText('Razón social')).toBeInTheDocument()
  })

  it('marks the input as required when required prop is true', () => {
    render(<FormField label="Campo *" id="campo" type="text" placeholder="" required />)
    expect(screen.getByRole('textbox')).toBeRequired()
  })

  it('does not mark input required when prop is absent', () => {
    render(<FormField label="Opt" id="opt" type="text" placeholder="" />)
    expect(screen.getByRole('textbox')).not.toBeRequired()
  })
})
