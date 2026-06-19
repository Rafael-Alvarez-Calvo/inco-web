import { useState, useEffect } from 'react'

export type ConsentValue = 'all' | 'necessary' | 'rejected'

interface ConsentData {
  v: number
  consent: ConsentValue
  timestamp: string
}

const CONSENT_KEY = 'inco_cookie_consent'
const CONSENT_VERSION = 1
const EXPIRY_MS = 365 * 86_400_000

function isValid(data: ConsentData): boolean {
  return (
    data.v === CONSENT_VERSION &&
    Date.now() - new Date(data.timestamp).getTime() < EXPIRY_MS
  )
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentValue | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (raw) {
      try {
        const data: ConsentData = JSON.parse(raw)
        if (isValid(data)) {
          setConsent(data.consent)
          return
        }
      } catch {
        localStorage.removeItem(CONSENT_KEY)
      }
    }
    const t = setTimeout(() => setVisible(true), 700)
    return () => clearTimeout(t)
  }, [])

  function save(value: ConsentValue) {
    const data: ConsentData = {
      v: CONSENT_VERSION,
      consent: value,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data))
    setConsent(value)
    setVisible(false)
  }

  return { consent, visible, save }
}
