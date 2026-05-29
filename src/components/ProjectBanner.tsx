const tags = ['Dirección de obra', 'Asistencia técnica', 'Gestión de plazos', 'Control de calidad']

export default function ProjectBanner() {
  return (
    <div className="bg-blue overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2">
        <div className="relative min-h-[380px] md:min-h-[500px]">
          <img
            src="https://inco.com.es/wp-content/uploads/2023/10/Proyecto-autovia-INCO.jpg"
            alt="Autovía INCO"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="px-16 py-20 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2.5 text-[11px] tracking-[3px] uppercase text-white/50 font-semibold mb-6 before:content-[''] before:block before:w-7 before:h-0.5 before:bg-amber">
            Infraestructura vial
          </div>
          <h2 className="font-serif text-white font-semibold leading-snug mb-6" style={{ fontSize: 'clamp(30px, 3vw, 44px)' }}>
            Obra pública de gran envergadura
          </h2>
          <p className="text-white/70 text-[15.5px] leading-relaxed mb-8">
            Desde autovías de alta capacidad hasta carreteras regionales, nuestro equipo acompaña a la
            administración pública y a las grandes constructoras en cada fase crítica del proyecto.
          </p>
          <div className="flex gap-2 flex-wrap mb-9">
            {tags.map(t => (
              <span key={t} className="px-3.5 py-1.5 border border-white/20 rounded-sm text-[11px] tracking-wide uppercase text-white/60">
                {t}
              </span>
            ))}
          </div>
          <a
            href="#contacto"
            onClick={e => { e.preventDefault(); document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="self-start bg-amber hover:bg-amber-dark text-white px-8 py-3.5 rounded-[6px] text-[12.5px] font-semibold uppercase tracking-wide transition-colors duration-200"
          >
            Consultar proyecto
          </a>
        </div>
      </div>
    </div>
  )
}
