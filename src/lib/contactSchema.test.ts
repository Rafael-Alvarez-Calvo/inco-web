import { describe, it, expect } from 'vitest'
import { contactSchema } from './contactSchema'

const valid = { nombre: 'Ana García', email: 'ana@empresa.com' }

describe('contactSchema', () => {
  it('accepts valid nombre and email', async () => {
    await expect(contactSchema.validate(valid)).resolves.toBeTruthy()
  })

  it('rejects missing nombre', async () => {
    await expect(contactSchema.validate({ email: 'a@b.com' })).rejects.toThrow('El nombre es obligatorio')
  })

  it('rejects nombre shorter than 2 chars', async () => {
    await expect(contactSchema.validate({ nombre: 'A', email: 'a@b.com' })).rejects.toThrow('Mínimo 2 caracteres')
  })

  it('rejects missing email', async () => {
    await expect(contactSchema.validate({ nombre: 'Ana' })).rejects.toThrow('El email es obligatorio')
  })

  it('rejects malformed email', async () => {
    await expect(contactSchema.validate({ nombre: 'Ana', email: 'no-es-email' })).rejects.toThrow('Introduce un email válido')
  })

  it('accepts empty tel (optional)', async () => {
    await expect(contactSchema.validate({ ...valid, tel: '' })).resolves.toBeTruthy()
  })

  it('rejects tel with letters', async () => {
    await expect(contactSchema.validate({ ...valid, tel: 'abcdefg' })).rejects.toThrow('Teléfono no válido')
  })

  it('accepts valid Spanish phone', async () => {
    await expect(contactSchema.validate({ ...valid, tel: '+34 600 000 000' })).resolves.toBeTruthy()
  })

  it('accepts all optional fields empty', async () => {
    await expect(contactSchema.validate({ ...valid, empresa: '', tipo: '', msg: '' })).resolves.toBeTruthy()
  })
})
