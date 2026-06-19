import '@testing-library/jest-dom'
import { vi } from 'vitest'

// ── IntersectionObserver ────────────────────────────────────────────────────
// Class-based mock so it works with `new IntersectionObserver(...)`.
// Fires immediately with isIntersecting: true — all useInView hooks return true.
class MockIntersectionObserver {
  private cb: IntersectionObserverCallback
  unobserve = vi.fn()
  disconnect = vi.fn()

  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb
  }

  observe(el: Element) {
    this.cb(
      [{ isIntersecting: true, target: el, intersectionRatio: 1 } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    )
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

// ── requestAnimationFrame ──────────────────────────────────────────────────
// Maps to setTimeout(0) so vi.runAllTimers() flushes rAF callbacks.
vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) =>
  setTimeout(() => cb(performance.now()), 0),
)
vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id))

// ── window.scrollTo ─────────────────────────────────────────────────────────
vi.stubGlobal('scrollTo', vi.fn())

// ── window.matchMedia ───────────────────────────────────────────────────────
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn(() => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
