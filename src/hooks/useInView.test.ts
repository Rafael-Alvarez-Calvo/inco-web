import { describe, it, expect, vi } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import { useInView } from './useInView'

// Helper component so the ref attaches to a real DOM element
function TestView({ threshold }: { threshold?: number }) {
  const { ref, inView } = useInView(threshold)
  return React.createElement('div', {
    ref: ref as React.RefObject<HTMLDivElement>,
    'data-testid': 'box',
    'data-inview': String(inView),
  })
}

describe('useInView', () => {
  it('exposes { ref, inView } from the hook', () => {
    const { result } = renderHook(() => useInView())
    expect(result.current.ref).toHaveProperty('current')
    expect(typeof result.current.inView).toBe('boolean')
  })

  it('inView becomes true when intersection fires (global MockIO fires immediately)', () => {
    // The global mock in test-setup fires synchronously on observe()
    render(React.createElement(TestView))
    expect(screen.getByTestId('box')).toHaveAttribute('data-inview', 'true')
  })

  it('disconnects observer on unmount', () => {
    const disconnectFn = vi.fn()
    const originalIO = globalThis.IntersectionObserver

    class TrackingIO {
      unobserve = vi.fn()
      disconnect = disconnectFn
      constructor(_cb: IntersectionObserverCallback) {}
      observe(_el: Element) {}
    }
    vi.stubGlobal('IntersectionObserver', TrackingIO)

    const { unmount } = render(React.createElement(TestView))
    unmount()
    expect(disconnectFn).toHaveBeenCalled()

    vi.stubGlobal('IntersectionObserver', originalIO)
  })

  it('passes threshold option to IntersectionObserver constructor', () => {
    let capturedOpts: IntersectionObserverInit | undefined
    const originalIO = globalThis.IntersectionObserver

    class ThresholdIO {
      constructor(_cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) {
        capturedOpts = opts
      }
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
    }
    vi.stubGlobal('IntersectionObserver', ThresholdIO)

    render(React.createElement(TestView, { threshold: 0.5 }))
    expect(capturedOpts?.threshold).toBe(0.5)

    vi.stubGlobal('IntersectionObserver', originalIO)
  })

  it('does not set inView when observer does not fire', () => {
    const originalIO = globalThis.IntersectionObserver

    class SilentIO {
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
      constructor(_cb: IntersectionObserverCallback) {}
    }
    vi.stubGlobal('IntersectionObserver', SilentIO)

    render(React.createElement(TestView))
    expect(screen.getByTestId('box')).toHaveAttribute('data-inview', 'false')

    vi.stubGlobal('IntersectionObserver', originalIO)
  })
})
