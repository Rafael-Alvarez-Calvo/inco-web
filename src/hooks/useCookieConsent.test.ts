import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCookieConsent } from './useCookieConsent'

const KEY = 'inco_cookie_consent'

beforeEach(() => {
  localStorage.clear()
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  localStorage.clear()
})

describe('useCookieConsent', () => {
  it('starts with consent null and banner hidden', () => {
    const { result } = renderHook(() => useCookieConsent())
    expect(result.current.consent).toBeNull()
    expect(result.current.visible).toBe(false)
  })

  it('shows banner after 700ms when no stored consent', async () => {
    const { result } = renderHook(() => useCookieConsent())
    expect(result.current.visible).toBe(false)
    await act(async () => { vi.advanceTimersByTime(700) })
    expect(result.current.visible).toBe(true)
  })

  it('loads valid consent from localStorage and does not show banner', () => {
    const data = {
      v: 1,
      consent: 'all',
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(KEY, JSON.stringify(data))
    const { result } = renderHook(() => useCookieConsent())
    expect(result.current.consent).toBe('all')
    expect(result.current.visible).toBe(false)
  })

  it('ignores expired consent and shows banner', async () => {
    const oldDate = new Date(Date.now() - 366 * 86_400_000).toISOString()
    const data = { v: 1, consent: 'all', timestamp: oldDate }
    localStorage.setItem(KEY, JSON.stringify(data))

    const { result } = renderHook(() => useCookieConsent())
    await act(async () => { vi.advanceTimersByTime(700) })
    expect(result.current.consent).toBeNull()
    expect(result.current.visible).toBe(true)
  })

  it('removes corrupt JSON from localStorage and shows banner', async () => {
    localStorage.setItem(KEY, 'not-json')
    const { result } = renderHook(() => useCookieConsent())
    await act(async () => { vi.advanceTimersByTime(700) })
    expect(localStorage.getItem(KEY)).toBeNull()
    expect(result.current.visible).toBe(true)
  })

  it('save() stores data, sets consent, and hides banner', async () => {
    const { result } = renderHook(() => useCookieConsent())
    await act(async () => { vi.advanceTimersByTime(700) })
    expect(result.current.visible).toBe(true)

    act(() => { result.current.save('necessary') })

    expect(result.current.consent).toBe('necessary')
    expect(result.current.visible).toBe(false)
    const stored = JSON.parse(localStorage.getItem(KEY)!)
    expect(stored.consent).toBe('necessary')
    expect(stored.v).toBe(1)
  })

  it('save("all") stores all consent value', () => {
    const { result } = renderHook(() => useCookieConsent())
    act(() => { result.current.save('all') })
    expect(result.current.consent).toBe('all')
    const stored = JSON.parse(localStorage.getItem(KEY)!)
    expect(stored.consent).toBe('all')
  })

  it('save("rejected") stores rejected consent value', () => {
    const { result } = renderHook(() => useCookieConsent())
    act(() => { result.current.save('rejected') })
    expect(result.current.consent).toBe('rejected')
  })

  it('cancels the show-timer on unmount', async () => {
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')
    const { unmount } = renderHook(() => useCookieConsent())
    unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})
