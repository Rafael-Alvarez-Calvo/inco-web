import { useEffect, useState } from 'react'
import Logo from './Logo'

const links = [
  { href: '#nosotros',  label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#galeria',   label: 'Proyectos' },
  { href: '#garantias', label: 'Garantías' },
  { href: '#presencia', label: 'Presencia' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 md:px-16 h-[70px] bg-white/97 border-b border-stone-200 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}
      >
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex-shrink-0"
        >
          <Logo variant="dark" size="md" />
        </a>

        {/* Desktop */}
        <ul className="hidden lg:flex gap-8 list-none">
          {links.map(l => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className="text-[12.5px] tracking-wide uppercase text-stone-500 font-medium hover:text-blue transition-colors duration-200"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handleNav('#contacto')}
          className="hidden lg:block bg-blue text-white px-6 py-2.5 text-[12px] font-semibold tracking-wide uppercase rounded-sm hover:bg-blue-dark transition-colors duration-200"
        >
          Contactar
        </button>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5 bg-stone-600 rounded" />
          <span className="block w-6 h-0.5 bg-stone-600 rounded" />
          <span className="block w-6 h-0.5 bg-stone-600 rounded" />
        </button>
      </nav>

      {/* Mobile */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-9">
          <button
            className="absolute top-6 right-8 text-stone-400 text-3xl"
            onClick={() => setOpen(false)}
          >✕</button>
          <div className="mb-4">
            <Logo variant="dark" size="lg" />
          </div>
          {links.map(l => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="font-serif text-3xl text-stone-700 hover:text-blue transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contacto')}
            className="mt-2 bg-blue text-white px-8 py-3 uppercase tracking-widest text-sm font-semibold rounded-sm"
          >
            Contactar
          </button>
        </div>
      )}
    </>
  )
}
