import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Certifications } from './Certifications'

describe('Certifications', () => {
  it('renders section with id="calidad"', () => {
    const { container } = render(<Certifications />)
    expect(container.querySelector('#calidad')).toBeInTheDocument()
  })

  it('renders "Certificaciones Applus+" heading', () => {
    render(<Certifications />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/certificaciones/i)
  })

  it('renders "Calidad acreditada" eyebrow', () => {
    render(<Certifications />)
    expect(screen.getByText('Calidad acreditada')).toBeInTheDocument()
  })

  it('renders all 3 certification names as h3', () => {
    render(<Certifications />)
    expect(screen.getByRole('heading', { name: 'ISO 9001', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'ISO 14001', level: 3 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'OHSAS 18001', level: 3 })).toBeInTheDocument()
  })

  it('renders cert reference numbers', () => {
    render(<Certifications />)
    expect(screen.getByText('EC-7877/14')).toBeInTheDocument()
    expect(screen.getByText('MA-2960/14')).toBeInTheDocument()
    expect(screen.getByText('PRL-1061/19')).toBeInTheDocument()
  })

  it('renders "Certificado vigente" badge for each cert', () => {
    render(<Certifications />)
    expect(screen.getAllByText('Certificado vigente')).toHaveLength(3)
  })

  it('renders cert subtitle labels', () => {
    render(<Certifications />)
    expect(screen.getByText('Calidad')).toBeInTheDocument()
    expect(screen.getByText('Medio Ambiente')).toBeInTheDocument()
    expect(screen.getByText('Seguridad y Salud')).toBeInTheDocument()
  })

  it('renders the integrated management system note', () => {
    render(<Certifications />)
    expect(screen.getByText(/sistema de gestión integrado/i)).toBeInTheDocument()
  })

  it('renders Applus+ badge images', () => {
    render(<Certifications />)
    expect(screen.getByAltText('Certificado ISO 9001 Applus+')).toBeInTheDocument()
    expect(screen.getByAltText('Certificado ISO 14001 Applus+')).toBeInTheDocument()
    expect(screen.getByAltText('Certificado OHSAS 18001 Applus+')).toBeInTheDocument()
  })
})
