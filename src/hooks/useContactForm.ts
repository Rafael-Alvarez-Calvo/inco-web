import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { contactSchema, type ContactFormData } from '../lib/contactSchema'

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

interface Options {
  source: 'contact-section' | 'legal-modal'
}

export function useContactForm({ source }: Options) {
  const [status,   setStatus]   = useState<SubmitStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [token,    setToken]    = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetFields,
  } = useForm<ContactFormData>({
    // yup v1 optional-field types diverge slightly from rhf expectations
    resolver: yupResolver(contactSchema) as any,
  })

  const handleVerify = useCallback((t: string) => setToken(t), [])
  const handleExpire = useCallback(() => setToken(''), [])

  const onSubmit = handleSubmit(async (data) => {
    if (!token) return
    setStatus('sending')
    setErrorMsg('')
    try {
      const res  = await fetch('/.netlify/functions/send-contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...data, turnstileToken: token, source }),
      })
      const json = (await res.json()) as { success: boolean; error?: string }
      if (json.success) {
        setStatus('success')
      } else {
        setErrorMsg(json.error ?? 'Error inesperado')
        setStatus('error')
      }
    } catch {
      setErrorMsg('No se pudo conectar con el servidor. Comprueba tu conexión.')
      setStatus('error')
    }
  })

  const reset = useCallback(() => {
    setStatus('idle')
    setErrorMsg('')
    setToken('')
    resetFields()
  }, [resetFields])

  return { register, errors, status, errorMsg, token, handleVerify, handleExpire, onSubmit, reset }
}
