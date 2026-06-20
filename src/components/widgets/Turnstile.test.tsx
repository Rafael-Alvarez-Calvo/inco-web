import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { Turnstile } from './Turnstile'

const buildTurnstile = () => ({
  render: vi.fn(() => 'widget-id-1'),
  remove: vi.fn(),
  reset: vi.fn(),
})

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  delete (window as Window & { turnstile?: unknown }).turnstile
})

describe('Turnstile', () => {
  it('renders a container div', () => {
    const { container } = render(<Turnstile onVerify={vi.fn()} />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('calls window.turnstile.render() when already available', async () => {
    const turnstile = buildTurnstile()
    ;(window as unknown as { turnstile: typeof turnstile }).turnstile = turnstile

    await act(async () => {
      render(<Turnstile onVerify={vi.fn()} />)
    })

    expect(turnstile.render).toHaveBeenCalled()
  })

  it('polls with setInterval until turnstile is available', async () => {
    const turnstile = buildTurnstile()

    render(<Turnstile onVerify={vi.fn()} />)

    // Turnstile not available yet — render should not have been called
    expect(turnstile.render).not.toHaveBeenCalled()

    // Now make it available and advance interval
    ;(window as unknown as { turnstile: typeof turnstile }).turnstile = turnstile
    await act(async () => { vi.advanceTimersByTime(100) })

    expect(turnstile.render).toHaveBeenCalled()
  })

  it('calls window.turnstile.remove() on unmount', async () => {
    const turnstile = buildTurnstile()
    ;(window as unknown as { turnstile: typeof turnstile }).turnstile = turnstile

    let unmount!: () => void
    await act(async () => {
      ;({ unmount } = render(<Turnstile onVerify={vi.fn()} />))
    })

    unmount()
    expect(turnstile.remove).toHaveBeenCalledWith('widget-id-1')
  })

  it('fires onVerify callback with token', async () => {
    const onVerify = vi.fn()
    let capturedCallback: ((token: string) => void) | undefined

    const turnstile = {
      render: vi.fn((_el: HTMLElement, opts: { callback?: (t: string) => void }) => {
        capturedCallback = opts.callback
        return 'wid'
      }),
      remove: vi.fn(),
      reset: vi.fn(),
    }
    ;(window as unknown as { turnstile: typeof turnstile }).turnstile = turnstile

    await act(async () => { render(<Turnstile onVerify={onVerify} />) })

    act(() => { capturedCallback?.('my-token') })
    expect(onVerify).toHaveBeenCalledWith('my-token')
  })

  it('fires optional onError callback', async () => {
    const onError = vi.fn()
    let capturedError: (() => void) | undefined

    const turnstile = {
      render: vi.fn((_el: HTMLElement, opts: { 'error-callback'?: () => void }) => {
        capturedError = opts['error-callback']
        return 'wid'
      }),
      remove: vi.fn(),
      reset: vi.fn(),
    }
    ;(window as unknown as { turnstile: typeof turnstile }).turnstile = turnstile

    await act(async () => { render(<Turnstile onVerify={vi.fn()} onError={onError} />) })

    act(() => { capturedError?.() })
    expect(onError).toHaveBeenCalled()
  })

  it('fires optional onExpire callback', async () => {
    const onExpire = vi.fn()
    let capturedExpire: (() => void) | undefined

    const turnstile = {
      render: vi.fn((_el: HTMLElement, opts: { 'expired-callback'?: () => void }) => {
        capturedExpire = opts['expired-callback']
        return 'wid'
      }),
      remove: vi.fn(),
      reset: vi.fn(),
    }
    ;(window as unknown as { turnstile: typeof turnstile }).turnstile = turnstile

    await act(async () => { render(<Turnstile onVerify={vi.fn()} onExpire={onExpire} />) })

    act(() => { capturedExpire?.() })
    expect(onExpire).toHaveBeenCalled()
  })
})
