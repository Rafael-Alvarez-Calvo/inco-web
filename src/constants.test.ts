import { describe, it, expect } from 'vitest'
import {
  SITE_NAME, BASE_URL, HERO_IMG,
  INCO_ADDRESS, INCO_PHONE, INCO_PHONE_HREF,
  INCO_EMAIL, INCO_EMAIL_HREF, INCO_WEB, INCO_WEB_HREF,
  MODAL_ENTER_MS, MODAL_EXIT_MS,
} from './constants'

describe('constants', () => {
  it('SITE_NAME', () => expect(SITE_NAME).toBe('INCO Estudio Técnico'))
  it('BASE_URL', () => expect(BASE_URL).toBe('https://inco.com.es'))
  it('HERO_IMG is https URL', () => expect(HERO_IMG).toMatch(/^https:\/\//))
  it('INCO_ADDRESS contains Madrid', () => expect(INCO_ADDRESS).toContain('Madrid'))
  it('INCO_PHONE', () => expect(INCO_PHONE).toBe('+34 91 499 47 17'))
  it('INCO_PHONE_HREF starts with tel:', () => expect(INCO_PHONE_HREF).toMatch(/^tel:/))
  it('INCO_EMAIL', () => expect(INCO_EMAIL).toBe('info@inco.com.es'))
  it('INCO_EMAIL_HREF starts with mailto:', () => expect(INCO_EMAIL_HREF).toMatch(/^mailto:/))
  it('INCO_WEB', () => expect(INCO_WEB).toBe('inco.com.es'))
  it('INCO_WEB_HREF is https URL', () => expect(INCO_WEB_HREF).toMatch(/^https:\/\//))
  it('MODAL_ENTER_MS is positive number', () => expect(MODAL_ENTER_MS).toBeGreaterThan(0))
  it('MODAL_EXIT_MS is positive number', () => expect(MODAL_EXIT_MS).toBeGreaterThan(0))
})
