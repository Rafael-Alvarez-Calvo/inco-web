import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { X } from "lucide-react";
import { Logo } from "../ui/Logo";
import { ContactModal } from "../widgets/ContactModal";
import { scrollToSection } from "../../utils";

const HOME_LINKS = [
  { href: "#nosotros",   label: "Nosotros"   },
  { href: "#servicios",  label: "Servicios"  },
  { href: "#galeria",    label: "Proyectos"  },
  { href: "#referencias",label: "Referencias"},
  { href: "#calidad",    label: "Calidad"    },
];

export const Navbar = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [contactOpen, setContactOpen]   = useState(false);
  const { pathname }                    = useLocation();
  const isHome                          = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(href: string) {
    setMenuOpen(false);
    scrollToSection(href);
  }

  function handleContact() {
    setMenuOpen(false);
    if (isHome) {
      scrollToSection("#contacto");
    } else {
      setContactOpen(true);
    }
  }

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 h-[70px] bg-white border-b border-stone-200 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
      >
        {/* Logo — home: scroll to top · legal: navigate to / */}
        {isHome ? (
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex-shrink-0"
          >
            <Logo variant="dark" size="md" />
          </a>
        ) : (
          <Link to="/" className="flex-shrink-0">
            <Logo variant="dark" size="md" />
          </Link>
        )}

        {/* Desktop nav links — home only */}
        {isHome && (
          <ul className="hidden lg:flex gap-7 list-none lg:ml-8">
            {HOME_LINKS.map(l => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className="text-[12px] tracking-wide uppercase text-stone-600 font-medium hover:text-blue transition-colors duration-200"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop Contactar */}
        <button
          onClick={handleContact}
          className="hidden lg:block bg-blue text-white px-5 py-2.5 text-[12px] font-semibold tracking-wide uppercase rounded-[6px] hover:bg-blue-dark transition-colors duration-200"
        >
          Contactar
        </button>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="block w-6 h-0.5 bg-stone-600 rounded" />
          <span className="block w-6 h-0.5 bg-stone-600 rounded" />
          <span className="block w-6 h-0.5 bg-stone-600 rounded" />
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center gap-8"
        >
          <button
            className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-colors"
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={22} aria-hidden="true" />
          </button>
          <div className="mb-2">
            <Logo variant="dark" size="lg" />
          </div>
          {isHome && HOME_LINKS.map(l => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-serif text-3xl text-stone-700 hover:text-blue transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={handleContact}
            className="mt-2 bg-blue text-white px-8 py-3 uppercase tracking-widest text-sm font-semibold rounded-[6px]"
          >
            Contactar
          </button>
        </div>
      )}

      {/* Contact modal — legal pages only */}
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  );
}
