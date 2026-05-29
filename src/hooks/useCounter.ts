import { useEffect, useRef, useState } from 'react'

export function useCounter(target: number, inView: boolean, duration = 1600) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setValue(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(step)
      else setValue(target)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return value
}
