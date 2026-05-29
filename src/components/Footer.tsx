import Logo from './Logo'

const services = ['Dirección de obras', 'Redacción de proyectos', 'Coordinación S&S', 'Asistencia técnica', 'Tecnología BIM']
const company  = ['Quiénes somos', 'Proyectos', 'Garantías', 'Certificaciones', 'Oficinas']
const anchors  = ['#nosotros', '#galeria', '#garantias', '#calidad', '#presencia']
const legal    = ['Aviso legal', 'Privacidad', 'Cookies', 'Accesibilidad']

export default function Footer() {
  const nav = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="bg-blue text-white/70">
      <div className="max-w-6xl mx-auto px-16 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Logo variant="light" size="md" />
            <p className="mt-5 text-[13.5px] leading-relaxed max-w-xs">
              Consultoría e ingeniería civil y arquitectura al servicio de las administraciones públicas y empresas privadas desde 1993.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase text-white/40 font-semibold mb-5">Servicios</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <button onClick={() => nav('#servicios')} className="text-[13.5px] text-white/65 hover:text-white transition-colors text-left">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase text-white/40 font-semibold mb-5">Empresa</h4>
            <ul className="space-y-2.5">
              {company.map((c, i) => (
                <li key={c}>
                  <button onClick={() => nav(anchors[i])} className="text-[13.5px] text-white/65 hover:text-white transition-colors text-left">
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase text-white/40 font-semibold mb-5">Contacto</h4>
            <address className="text-[13px] leading-relaxed not-italic space-y-1">
              <p>C/ Casas de Miravete 22A</p>
              <p>3ª Planta – 28031 Madrid</p>
              <br />
              <a href="tel:+34914994717" className="hover:text-white transition-colors block">+34 91 499 47 17</a>
              <a href="mailto:info@inco.com.es" className="hover:text-white transition-colors block">info@inco.com.es</a>
            </address>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-7 text-[12.5px] text-white/40">
          <p>© {new Date().getFullYear()} INCO Estudio Técnico, S.L. Todos los derechos reservados.</p>
          <div className="flex gap-5 flex-wrap justify-center">
            {legal.map(l => <a key={l} href="#" className="hover:text-white/70 transition-colors">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
