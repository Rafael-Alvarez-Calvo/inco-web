import { useState } from 'react'
import { useInView } from '../hooks/useInView'

type Category = 'todos' | 'viaria' | 'ferroviaria' | 'hidraulica' | 'urbanismo' | 'edificacion'

interface Ref {
  cat: Category
  title: string
  client: string
  pem?: string
  km?: string
  months?: string
  tag: string
}

const refs: Ref[] = [
  // VIARIA
  { cat: 'viaria', title: 'Autovía Trujillo–Cáceres A-58. Tramo: Trujillo–Plasenzuela', client: 'Ministerio de Fomento', pem: '46 M€', km: '12,5 km', months: '20 meses', tag: 'Asistencia técnica' },
  { cat: 'viaria', title: 'Autovía autonómica EX-A1 Navalmoral–Portugal. Tramo: Coria–Moraleja Este', client: 'Junta de Extremadura', pem: '25 M€', km: '15,6 km', months: '30 meses', tag: 'Asistencia técnica' },
  { cat: 'viaria', title: 'A-66 Autovía de la Plata. Tramo: Fuente de Cantos – l.p. Huelva', client: 'Ministerio de Fomento', pem: '90 M€', km: '26,6 km', months: '36 meses', tag: 'Control y vigilancia' },
  { cat: 'viaria', title: 'Vía de servicio autovía A-42, pp.kk. 30+450 al 37+000. Illescas (Toledo)', client: 'Ayuntamiento de Illescas', pem: '6,5 M€', km: '3,5 km', months: '16 meses', tag: 'Redacción + D.F.' },
  { cat: 'viaria', title: 'Variante de Padrón CN-550 A Coruña–Tui', client: 'Ministerio de Fomento', pem: '18 M€', months: '24 meses', tag: 'Supervisión y control' },
  { cat: 'viaria', title: 'Carretera EX-324 Monterrubio de la Serena–Helechal', client: 'Junta de Extremadura', pem: '4,2 M€', months: '12 meses', tag: 'Dirección de obra' },
  { cat: 'viaria', title: 'Desdoblamiento EX-310 Badajoz–Valverde de Leganés, tramo urbano', client: 'Junta de Extremadura', pem: '6 M€', months: '12 meses', tag: 'Dirección de obra' },
  // FERROVIARIA
  { cat: 'ferroviaria', title: 'Nueva Estación de Alta Velocidad de Elche (Alicante)', client: 'ADIF', months: '15 meses', tag: 'Control y vigilancia' },
  { cat: 'ferroviaria', title: 'LAV Madrid–Barcelona–Frontera Francesa. Salida emergencia Túnel Los Rojales', client: 'ADIF', months: '20 meses', tag: 'Control de obras' },
  { cat: 'ferroviaria', title: 'LAV Vitoria–Bilbao–San Sebastián. Tramo: Elorrio–Bergara', client: 'ADIF', pem: '58 M€', months: '38 meses', tag: 'Asistencia técnica' },
  // HIDRÁULICA
  { cat: 'hidraulica', title: 'Colectores aguas fecales y pluviales, Actuaciones industriales Norte Illescas (Toledo)', client: 'Promotor privado', pem: '14 M€', km: '6,2 km', months: '6 meses', tag: 'Proyecto + D.F.' },
  { cat: 'hidraulica', title: 'Colectores cuenca receptora Nº1, Rivas-Vaciamadrid (Madrid)', client: 'Ayuntamiento de Rivas', pem: '12,5 M€', km: '3,9 km', months: '36 meses', tag: 'Proyecto + D.F.' },
  { cat: 'hidraulica', title: 'Tanque de tormentas cuenca receptora Nº1, Rivas-Vaciamadrid — 43.200 m³', client: 'Ayuntamiento de Rivas', pem: '3,8 M€', tag: 'Proyecto de ejecución' },
  { cat: 'hidraulica', title: 'E.D.A.R. y ampliación colectores Mancomunidad Sagra Alta (Toledo)', client: 'Mancomunidad Sagra Alta', pem: '5,3 M€', km: '17 km', tag: 'Proyecto + D.F.' },
  { cat: 'hidraulica', title: 'E.D.A.R.ES de Abengibre, Alcalá del Júcar, Villatoya y otros (Albacete)', client: 'Junta de C.-La Mancha', pem: '10,3 M€', months: '18 meses', tag: 'Dirección de obra' },
  // URBANISMO
  { cat: 'urbanismo', title: 'Plan General de Ordenación y Catálogo Urbanístico. Concejo de Cabrales (Asturias)', client: 'Ayuntamiento de Cabrales', km: '238 km²', tag: 'PGOU' },
  { cat: 'urbanismo', title: 'Urbanización PAU "La Veredilla III", SUBcO 10, Illescas (Toledo) — Toyota, Michelín, FM Logistics', client: 'Promotores privados', km: '3 M m²', tag: 'Dirección facultativa' },
  { cat: 'urbanismo', title: 'Proyecto y D.F. urbanización SAU-5B "Valdevaleros Norte", Cobeña (Madrid)', client: 'Promotor privado', km: '147.700 m²', months: '18 meses', tag: 'Urbanización' },
  { cat: 'urbanismo', title: 'Urbanización polígono SAU-13 y ampliaciones, Illescas (Toledo)', client: 'Promotor privado', pem: '14 M€', km: '765.000 m²', tag: 'Proyecto + D.F.' },
  // EDIFICACIÓN
  { cat: 'edificacion', title: '116 viviendas V.P.P. Dehesa Vieja, San Sebastián de los Reyes (Madrid)', client: 'Promotor privado', months: '18 meses', tag: 'Proyecto + D.F.' },
  { cat: 'edificacion', title: '204 viviendas V.P.P. EMV Rivas-Vaciamadrid (Madrid)', client: 'EMV Rivas', pem: '12,6 M€', months: '18 meses', tag: 'Proyecto + D.F.' },
  { cat: 'edificacion', title: '182 viviendas VPPB parcela B9 sector PP-03 "Buenavista", Getafe (Madrid)', client: 'Promotor privado', pem: '14,2 M€', months: '18 meses', tag: 'Proyecto + D.F.' },
]

const cats: { key: Category; label: string }[] = [
  { key: 'todos',       label: 'Todos' },
  { key: 'viaria',      label: 'Infraestructura Viaria' },
  { key: 'ferroviaria', label: 'Ferroviaria' },
  { key: 'hidraulica',  label: 'Hidráulica' },
  { key: 'urbanismo',   label: 'Urbanismo' },
  { key: 'edificacion', label: 'Edificación' },
]

const tagColors: Record<string, string> = {
  'Asistencia técnica': 'bg-blue-light text-blue',
  'Control y vigilancia': 'bg-blue-light text-blue',
  'Control de obras': 'bg-blue-light text-blue',
  'Supervisión y control': 'bg-blue-light text-blue',
  'Redacción + D.F.': 'bg-amber-light text-amber',
  'Proyecto + D.F.': 'bg-amber-light text-amber',
  'Proyecto de ejecución': 'bg-amber-light text-amber',
  'Dirección de obra': 'bg-amber-light text-amber',
  'Dirección facultativa': 'bg-amber-light text-amber',
  'PGOU': 'bg-stone-100 text-stone-600',
  'Urbanización': 'bg-stone-100 text-stone-600',
}

export default function References() {
  const [active, setActive] = useState<Category>('todos')
  const { ref: headRef, inView: headIn } = useInView(0.1)
  const { ref: listRef, inView: listIn } = useInView(0.05)

  const filtered = active === 'todos' ? refs : refs.filter(r => r.cat === active)

  return (
    <section id="referencias" className="section-pad bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-700 ${headIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} mb-10`}
        >
          <div className="eyebrow mb-3">Portfolio de proyectos</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="section-title">Referencias <em>destacadas</em></h2>
            <p className="max-w-sm text-[15px] text-stone-500 leading-relaxed">
              Proyectos reales ejecutados para el Ministerio de Fomento, ADIF, Juntas Autonómicas y promotores privados en toda España.
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {cats.map(c => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`px-4 py-2 rounded-[6px] text-[12px] font-medium tracking-wide uppercase transition-all duration-200 ${
                active === c.key
                  ? 'bg-blue text-white shadow-sm'
                  : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div
          ref={listRef as React.RefObject<HTMLDivElement>}
          className={`transition-all duration-500 ${listIn ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="border border-stone-200 rounded-[4px] overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-12 bg-stone-50 border-b border-stone-200 px-5 py-3 text-[10px] tracking-[1.5px] uppercase text-stone-400 font-semibold">
              <div className="col-span-5">Proyecto</div>
              <div className="col-span-2 hidden md:block">Cliente</div>
              <div className="col-span-2 hidden md:block">Datos</div>
              <div className="col-span-3 md:col-span-3">Servicio</div>
            </div>

            {/* Rows */}
            {filtered.map((r, i) => (
              <div
                key={i}
                className={`grid grid-cols-12 items-start px-5 py-4 border-b border-stone-100 last:border-b-0 hover:bg-stone-50 transition-colors duration-150 ${listIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: `${Math.min(i, 10) * 40}ms` }}
              >
                <div className="col-span-9 md:col-span-5 pr-4">
                  <p className="text-[13.5px] text-stone-700 font-medium leading-snug">{r.title}</p>
                </div>
                <div className="col-span-0 md:col-span-2 hidden md:block pr-3">
                  <p className="text-[12.5px] text-stone-500 leading-snug">{r.client}</p>
                </div>
                <div className="col-span-0 md:col-span-2 hidden md:flex flex-col gap-0.5">
                  {r.pem    && <span className="text-[11.5px] text-stone-500">💰 {r.pem}</span>}
                  {r.km     && <span className="text-[11.5px] text-stone-500">📏 {r.km}</span>}
                  {r.months && <span className="text-[11.5px] text-stone-500">⏱ {r.months}</span>}
                </div>
                <div className="col-span-3 flex justify-end md:justify-start">
                  <span className={`inline-block text-[10px] tracking-wide uppercase font-semibold px-2.5 py-1 rounded-[4px] ${tagColors[r.tag] || 'bg-stone-100 text-stone-500'}`}>
                    {r.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-stone-400 mt-4 text-right">
            Mostrando {filtered.length} de {refs.length} referencias — relación enunciativa no exhaustiva
          </p>
        </div>
      </div>
    </section>
  )
}
