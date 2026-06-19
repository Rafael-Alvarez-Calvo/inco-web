import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('useCounter', () => {
  it('returns 0 when active is false', () => {
    const { result } = renderHook(() => useCounter(100, false))
    expect(result.current).toBe(0)
  })

  it('returns 0 before animation starts', () => {
    const { result } = renderHook(() => useCounter(1000, true, 1600))
    expect(result.current).toBe(0)
  })

  it('reaches the target after animation completes', async () => {
    const { result } = renderHook(() => useCounter(50, true, 500))
    await act(async () => {
      vi.runAllTimers()
    })
    expect(result.current).toBe(50)
  })

  it('does not restart once started (startedRef guard)', async () => {
    const { result, rerender } = renderHook(
      ({ active }: { active: boolean }) => useCounter(10, active, 200),
      { initialProps: { active: true } },
    )
    await act(async () => { vi.runAllTimers() })
    const firstValue = result.current

    // Toggling active off and on should not restart
    rerender({ active: false })
    rerender({ active: true })
    await act(async () => { vi.runAllTimers() })

    expect(result.current).toBe(firstValue)
  })

  it('cancels animation on unmount', () => {
    const cancelRaf = vi.spyOn(globalThis, 'cancelAnimationFrame')
    const { unmount } = renderHook(() => useCounter(999, true, 1000))
    unmount()
    expect(cancelRaf).toHaveBeenCalled()
  })
})
