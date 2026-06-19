import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: TurnstileRenderOptions) => string
      remove: (widgetId: string) => void
      reset:  (widgetId: string) => void
    }
  }
}

interface TurnstileRenderOptions {
  sitekey: string
  callback?:          (token: string) => void
  'error-callback'?:   () => void
  'expired-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?:  'normal' | 'compact'
  language?: string
}

interface Props {
  onVerify:  (token: string) => void
  onError?:  () => void
  onExpire?: () => void
}

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string

export const Turnstile = ({ onVerify, onError, onExpire }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef  = useRef<string | null>(null)

  // Keep latest callbacks in refs so the widget isn't re-created on re-renders
  const onVerifyRef  = useRef(onVerify)
  const onErrorRef   = useRef(onError)
  const onExpireRef  = useRef(onExpire)
  useEffect(() => {
    onVerifyRef.current  = onVerify
    onErrorRef.current   = onError
    onExpireRef.current  = onExpire
  })

  useEffect(() => {
    function render() {
      if (!containerRef.current || !window.turnstile || widgetIdRef.current) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey:            SITE_KEY,
        theme:              'light',
        language:           'es',
        callback:           (token) => onVerifyRef.current(token),
        'error-callback':   ()      => onErrorRef.current?.(),
        'expired-callback': ()      => onExpireRef.current?.(),
      })
    }

    if (window.turnstile) {
      render()
    } else {
      // Script loads async — poll until ready
      const id = setInterval(() => {
        if (window.turnstile) { clearInterval(id); render() }
      }, 100)
      return () => clearInterval(id)
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, []) // run once on mount

  return <div ref={containerRef} />
}
