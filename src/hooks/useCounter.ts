import { useEffect, useRef, useState } from 'react'

export function useCounter(target: number, active: boolean, duration = 1600) {
  const [value, setValue]  = useState(0)
  const startedRef         = useRef(false)

  useEffect(() => {
    if (!active || startedRef.current) return
    startedRef.current = true

    let rafId:  number
    let startTs: number | null = null

    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const p    = Math.min((ts - startTs) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setValue(Math.floor(ease * target))
      if (p < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setValue(target)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [active, target, duration])

  return value
}
