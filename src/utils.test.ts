import { describe, it, expect, vi, beforeEach } from 'vitest'
import { scrollToSection } from './utils'

describe('scrollToSection', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('calls scrollIntoView on the found element', () => {
    const scrollIntoView = vi.fn()
    vi.spyOn(document, 'querySelector').mockReturnValue({ scrollIntoView } as unknown as Element)
    scrollToSection('#servicios')
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('does nothing when selector matches no element', () => {
    vi.spyOn(document, 'querySelector').mockReturnValue(null)
    expect(() => scrollToSection('#missing')).not.toThrow()
  })
})
