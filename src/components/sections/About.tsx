import {
  Wrench,
  Clock,
  ClipboardList,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "../../hooks/useInView";

interface Feat {
  Icon: LucideIcon;
  title: string;
  desc: string;
}

const FEATS: Feat[] = [
  {
    Icon: Wrench,
    title: "Rigor técnico",
    desc: "Ingenieros de Caminos, ITOP, Topógrafos, Coordinadores de S&S, Delineantes y Consultores Externos.",
  },
  {
    Icon: Clock,
    title: "Plazos garantizados",
    desc: "100% de cumplimiento en proyectos de hasta 90M€ y 36 meses de ejecución.",
  },
  {
    Icon: ClipboardList,
    title: "Visión global",
    desc: "Desde el estudio previo y análisis de viabilidad hasta la Dirección Facultativa y Control de Calidad.",
  },
  {
    Icon: Users,
    title: "Clientes públicos y privados",
    desc: "Ministerio de Fomento, ADIF, Junta de Extremadura, ayuntamientos y promotores privados.",
  },
];

const AREAS = [
  {
    letter: "I",
    color: "bg-[#5bbccc]",
    label: "Ingeniería",
    desc: "Infraestructura viaria, ferroviaria e hidráulica",
  },
  {
    letter: "U",
    color: "bg-amber",
    label: "Urbanismo",
    desc: "Ordenación del territorio, proyectos y obras",
  },
  {
    letter: "E",
    color: "bg-[#6aaa48]",
    label: "Edificación",
    desc: "Obra nueva, rehabilitación y eficiencia energética",
  },
];

export const About = () => {
  const { ref: headRef, inView: headIn } = useInView(0.1);
  const { ref: bodyRef, inView: bodyIn } = useInView(0.1);
  const { ref: areasRef, inView: areasIn } = useInView(0.1);

  return (
    <section
      id="nosotros"
      className="py-16 md:py-28 px-4 sm:px-8 lg:px-16 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Layout principal: columna izquierda / columna derecha ── */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* ── COLUMNA IZQUIERDA: título + texto + cajitas ── */}
          <div
            ref={headRef}
            className={`transition-all duration-700 ${headIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-9"}`}
          >
            <div className="eyebrow mb-4">Sobre nosotros</div>
            <h2 className="section-title mb-7">
              Una empresa familiar
              <br />
              <em>de confianza</em>
            </h2>
            <div className="space-y-4 text-[16px] leading-relaxed text-stone-500 mb-8">
              <p>
                INCO, Estudio Técnico, S.L. aparece en el mercado profesional en
                el año 1993 ofreciendo un importante elenco de servicios
                técnicos garantizados por la experiencia adquirida, seriedad y
                compromiso empresarial.
              </p>
              <p>
                Nuestro personal multidisciplinar asume cada trabajo con la
                perspectiva de la globalidad, pensando que forma una parte
                sustancial del proceso que se inicia con una{" "}
                <em className="text-stone-600 not-italic font-medium">
                  "idea"
                </em>{" "}
                y que finaliza con la puesta en servicio de la obra.
              </p>
            </div>
            <blockquote className="pl-6 border-l-4 border-amber bg-amber-light py-5 pr-6 rounded-r-[4px] mb-8">
              <p className="font-serif italic text-[17px] text-blue leading-relaxed">
                "Generando el presente, diseñando el futuro"
              </p>
            </blockquote>

            {/* Cajitas */}
            <div
              ref={bodyRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {FEATS.map(({ Icon, title, desc }, i) => (
                <div
                  key={title}
                  className={`bg-stone-50 border border-stone-200 rounded-[4px] p-5 flex gap-3 items-start hover:border-amber hover:shadow-sm transition-all duration-200 ${bodyIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-[4px] bg-blue-light flex items-center justify-center mt-0.5">
                    <Icon
                      size={16}
                      className="text-blue"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-blue mb-1">
                      {title}
                    </h4>
                    <p className="text-[12px] text-stone-400 leading-snug">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── COLUMNA DERECHA: cita + imagen ── */}
          <div className="flex justify-center flex-col gap-6 md:gap-8">
            <div
              className={`relative transition-all duration-700 delay-200 ${headIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-9"}`}
            >
              <div className="rounded-[4px] overflow-hidden shadow-2xl">
                <img
                  src="https://inco.com.es/wp-content/uploads/2023/10/Proyecto-INCO-.webp"
                  alt="Proyecto de ingeniería civil ejecutado por INCO Estudio Técnico"
                  className="w-full h-64 sm:h-80 md:h-[420px] object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://inco.com.es/wp-content/uploads/2023/10/Inco.jpg";
                  }}
                />
              </div>
              <div className="hidden md:block absolute top-8 -right-5 w-44 h-32 rounded-[4px] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://inco.com.es/wp-content/uploads/2024/05/Ingerniero-inco-1.png"
                  alt="Ingeniero de INCO realizando supervisión técnica en obra"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:-left-6 bg-amber text-white px-7 py-5 rounded-[4px] shadow-lg">
                <strong className="block font-serif text-5xl font-bold leading-none">
                  +30
                </strong>
                <span className="text-[12px] uppercase tracking-widest opacity-85">
                  Años
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Áreas IUE ── */}
        <div
          ref={areasRef}
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {AREAS.map((a, i) => (
            <div
              key={a.letter}
              className={`${a.color} rounded-[4px] p-8 flex items-center gap-6 transition-all duration-700 ${areasIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span
                className="font-serif text-white/30 font-bold leading-none flex-shrink-0"
                style={{ fontSize: 80 }}
              >
                {a.letter}
              </span>
              <div>
                <h3 className="text-white font-semibold text-[20px] mb-1">
                  {a.label}
                </h3>
                <p className="text-white/75 text-[13px] leading-snug">
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
