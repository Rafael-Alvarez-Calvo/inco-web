import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSEO } from './useSEO'

function addMeta(selector: string, attr: string, attrValue: string, contentAttr = 'content') {
  const el = document.createElement(selector === 'link' ? 'link' : 'meta')
  if (selector === 'link') {
    ;(el as HTMLLinkElement).rel = attrValue
  } else {
    el.setAttribute(attr, attrValue)
  }
  document.head.appendChild(el)
  return el
}

beforeEach(() => {
  // Add the meta/link elements that useSEO queries
  addMeta('meta', 'name', 'description')
  addMeta('link', 'rel', 'canonical')
  addMeta('meta', 'property', 'og:title')
  addMeta('meta', 'property', 'og:description')
  addMeta('meta', 'property', 'og:url')
  addMeta('meta', 'name', 'twitter:title')
  addMeta('meta', 'name', 'twitter:description')
})

afterEach(() => {
  // Clean up added elements
  document.head.querySelectorAll('meta, link').forEach(el => el.remove())
  document.getElementById('ld-json-breadcrumb')?.remove()
})

describe('useSEO', () => {
  it('sets document.title on mount', () => {
    renderHook(() =>
      useSEO({ title: 'Test Title', description: 'Test Desc', path: '/test' }),
    )
    expect(document.title).toBe('Test Title')
  })

  it('sets meta description content', () => {
    renderHook(() =>
      useSEO({ title: 'T', description: 'My description', path: '/x' }),
    )
    const el = document.querySelector('meta[name="description"]')
    expect(el?.getAttribute('content')).toBe('My description')
  })

  it('sets canonical href', () => {
    renderHook(() =>
      useSEO({ title: 'T', description: 'D', path: '/pagina' }),
    )
    const el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    expect(el?.href).toContain('/pagina')
  })

  it('creates breadcrumb LD+JSON when breadcrumb is provided', () => {
    renderHook(() =>
      useSEO({ title: 'T', description: 'D', path: '/p', breadcrumb: 'Privacidad' }),
    )
    const script = document.getElementById('ld-json-breadcrumb')
    expect(script).not.toBeNull()
    const data = JSON.parse(script!.textContent!)
    expect(data['@type']).toBe('BreadcrumbList')
    expect(data.itemListElement[1].name).toBe('Privacidad')
  })

  it('does not create breadcrumb LD+JSON when breadcrumb is omitted', () => {
    renderHook(() =>
      useSEO({ title: 'T', description: 'D', path: '/p' }),
    )
    expect(document.getElementById('ld-json-breadcrumb')).toBeNull()
  })

  it('restores home title on unmount', () => {
    const { unmount } = renderHook(() =>
      useSEO({ title: 'Custom Page', description: 'D', path: '/p' }),
    )
    unmount()
    expect(document.title).toContain('INCO')
  })

  it('removes breadcrumb script on unmount', () => {
    const { unmount } = renderHook(() =>
      useSEO({ title: 'T', description: 'D', path: '/p', breadcrumb: 'Aviso' }),
    )
    expect(document.getElementById('ld-json-breadcrumb')).not.toBeNull()
    unmount()
    expect(document.getElementById('ld-json-breadcrumb')).toBeNull()
  })
})
