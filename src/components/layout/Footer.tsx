import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";

const services = [
  "Dirección de obras",
  "Redacción de proyectos",
  "Coordinación S&S",
  "Asistencia técnica",
  "Tecnología BIM",
];
const company = [
  "Quiénes somos",
  "Proyectos",
  "Garantías",
  "Certificaciones",
  "Oficinas",
];
const anchors = [
  "#nosotros",
  "#galeria",
  "#garantias",
  "#calidad",
  "#presencia",
];

const legalLinks = [
  { label: "Aviso legal", to: "/aviso-legal" },
  { label: "Privacidad", to: "/privacidad" },
  { label: "Cookies", to: "/cookies" },
  { label: "Accesibilidad", to: "/accesibilidad" },
];

export const Footer = () => {
  const nav = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-blue text-white/70">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-14 pb-8 lg:pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Logo variant="light" size="md" />
            <p className="mt-5 text-[13.5px] leading-relaxed max-w-xs">
              Consultoría e ingeniería civil y arquitectura al servicio de las
              administraciones públicas y empresas privadas desde 1993.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase text-white/40 font-semibold mb-5">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => nav("#servicios")}
                    className="text-[13.5px] text-white/65 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase text-white/40 font-semibold mb-5">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {company.map((c, i) => (
                <li key={c}>
                  <button
                    onClick={() => nav(anchors[i])}
                    className="text-[13.5px] text-white/65 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase text-white/40 font-semibold mb-5">
              Contacto
            </h4>
            <address className="text-[13px] leading-relaxed not-italic space-y-1">
              <p>Calle del Haya 4, 3º3</p>
              <p>28044 Madrid</p>
              <br />
              <a
                href="tel:+34914994717"
                className="hover:text-white transition-colors block"
              >
                +34 91 499 47 17
              </a>
              <a
                href="mailto:info@inco.com.es"
                className="hover:text-white transition-colors block"
              >
                info@inco.com.es
              </a>
            </address>
          </div>
        </div>

        {/* ── Kit Digital ─────────────────────────────────────────────────── */}
        <div className="border-t border-white/10 pt-8 pb-2 text-center">
          <p className="text-[10.5px] tracking-widest uppercase text-white/50 font-semibold mb-5 leading-relaxed max-w-lg mx-auto">
            Programa Kit Digital financiado por los fondos Next Generation
            <br className="hidden sm:block" /> del Mecanismo de Recuperación y
            Resiliencia
          </p>
          <div className="bg-white rounded-[4px] px-6 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-5">
            <img
              src="/images/kit-digital-ue-nextgeneration.png"
              alt="Financiado por la Unión Europea – NextGenerationEU"
              className="h-11 object-contain"
            />
            <img
              src="/images/kit-digital-gobierno-espana.png"
              alt="Gobierno de España – Ministerio para la Transformación Digital y de la Función Pública"
              className="h-11 object-contain"
            />
            <img
              src="/images/kit-digital-redes.png"
              alt="red.es"
              className="h-9 object-contain"
            />
            <img
              src="/images/kit-digital-plan-recuperacion.png"
              alt="Plan de Recuperación, Transformación y Resiliencia"
              className="h-11 object-contain"
            />
            <img
              src="/images/kit-digital-logo.png"
              alt="Kit Digital"
              className="h-9 object-contain"
            />
          </div>
          <p className="text-[11px] mx-auto text-white/50 leading-relaxed italic w-full max-w-[calc(100%-15rem)]">
            «Financiado por la Unión Europea – NextGenerationEU. Sin embargo,
            los puntos de vista y las opiniones expresadas son únicamente los
            del autor o autores y no reflejan necesariamente los de la Unión
            Europea o la Comisión Europea. Ni la Unión Europea ni la Comisión
            Europea pueden ser consideradas responsables de las mismas»
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-7 text-[12.5px] text-white/40">
          <p>
            © {new Date().getFullYear()} INCO Estudio Técnico, S.L. Todos los
            derechos reservados.
          </p>
          <nav
            aria-label="Legal"
            className="flex gap-5 flex-wrap justify-center"
          >
            {legalLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="hover:text-white/70 transition-colors focus:outline-none focus-visible:underline"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};
