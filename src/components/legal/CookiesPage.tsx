import { Link } from 'react-router-dom'
import { LegalLayout } from './LegalLayout'

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-serif text-blue text-[20px] font-semibold mb-4 pb-3 border-b border-stone-200">
        {num}. {title}
      </h2>
      <div className="space-y-4 text-[15px] text-stone-500 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function CookieTable({
  rows,
}: {
  rows: { name: string; duration: string; desc: string }[]
}) {
  return (
    <div className="overflow-x-auto rounded-[4px] border border-stone-200 mt-4">
      <table className="w-full text-[13.5px]">
        <thead>
          <tr className="bg-stone-100 text-stone-500">
            <th className="px-4 py-2.5 text-left font-semibold w-[25%]">Nombre</th>
            <th className="px-4 py-2.5 text-left font-semibold w-[18%]">Duración</th>
            <th className="px-4 py-2.5 text-left font-semibold">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
              <td className="px-4 py-3 font-mono text-blue text-[12.5px]">{r.name}</td>
              <td className="px-4 py-3 text-stone-400 whitespace-nowrap">{r.duration}</td>
              <td className="px-4 py-3 text-stone-500 leading-snug">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const NECESSARY_ROWS = [
  {
    name: 'inco_cookie_consent',
    duration: '1 año',
    desc: 'Cookie técnica utilizada para almacenar las preferencias de cookies del usuario en este sitio web.',
  },
]

const ANALYTICS_ROWS = [
  { name: '_ga',    duration: '2 años',  desc: 'Cookie analítica asociada a Google Analytics. Permite identificar a un visitante de otro, sin rastrear entre sitios no relacionados.' },
  { name: '_ga_#',  duration: '2 años',  desc: 'Cookie analítica asociada a Google Analytics. Similar a _ga, identifica a un visitante de otro sin rastrear en sitios no relacionados.' },
  { name: '__utmt', duration: '10 min',  desc: 'Cookie analítica de Google Analytics. Se utiliza para regular la tasa de solicitudes.' },
  { name: '__utmz', duration: '6 meses', desc: 'Cookie analítica utilizada para atribuir la visita, es decir, para saber desde dónde y cómo llegó el usuario a la página web.' },
  { name: '__utmc', duration: 'Sesión',  desc: 'Cookie analítica que determina si se establece una nueva sesión para el usuario y el momento en que se visitó la página web.' },
  { name: '__utmb', duration: 'Sesión',  desc: 'Cookie analítica utilizada para determinar si se establece una nueva sesión para el usuario y el momento de la visita a la página web.' },
  { name: '__utma', duration: '2 años',  desc: 'Cookie analítica utilizada para distinguir sesiones y usuarios.' },
]

export const CookiesPage = () => {
  return (
    <LegalLayout
      title="Política de cookies"
      description="Política de cookies de INCO Estudio Técnico. Información sobre las cookies técnicas y analíticas utilizadas en inco.com.es y cómo gestionar tus preferencias."
      path="/cookies"
    >

      <p className="text-[15px] text-stone-500 leading-relaxed mb-10">
        La presente política de cookies tiene por finalidad facilitar información a los usuarios que naveguen en esta
        página web y ofrecer información clara y transparente de las cookies almacenadas en Inco.com.es, propiedad de
        Esther Calvo.
      </p>

      <Section num="1" title="¿Qué son las cookies?">
        <p>
          Este sitio web utiliza cookies y/o tecnologías similares que almacenan y recuperan información cuando
          navegas. En general, estas tecnologías pueden servir para finalidades muy diversas, como, por ejemplo,
          reconocerte como usuario, obtener información sobre tus hábitos de navegación o personalizar la forma en la
          que se muestra el contenido.
        </p>
      </Section>

      <Section num="2" title="¿Qué tipo de cookies utilizamos?">
        <p>
          <strong className="text-stone-600 font-medium">Cookies técnicas/necesarias:</strong>{' '}
          Permiten al usuario la navegación a través de la página web y la utilización de las diferentes opciones o
          servicios que en ella existan, incluyendo aquellas que utilizamos para permitir la gestión y operativa de la
          página web.
        </p>
        <CookieTable rows={NECESSARY_ROWS} />

        <p className="mt-6">
          <strong className="text-stone-600 font-medium">Cookies de análisis:</strong>{' '}
          Son aquellas que nos permiten cuantificar el número de usuarios y así realizar la medición y análisis
          estadístico de la utilización que hacen los usuarios mientras navegan por nuestra página web. Desde Inco
          utilizamos cookies analíticas de{' '}
          <strong className="text-stone-600 font-medium">Google Analytics</strong>{' '}
          con la finalidad de mejorar los servicios y el funcionamiento mismo de la página. Estas cookies no recopilan
          información personal que identifique personalmente a un visitante.
        </p>
        <CookieTable rows={ANALYTICS_ROWS} />
      </Section>

      <Section num="3" title="Gestionar las cookies">
        <p>
          Puede permitir, bloquear o eliminar las cookies instaladas en su dispositivo a través del menú de
          configuración de su navegador de internet. Los siguientes enlaces proporcionan información sobre cómo
          configurar las cookies en los principales navegadores:
        </p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li><strong className="text-stone-600 font-medium">Microsoft Edge / Internet Explorer:</strong> Herramientas &gt; Opciones de Internet &gt; Privacidad &gt; Configuración.</li>
          <li><strong className="text-stone-600 font-medium">Firefox:</strong> Herramientas &gt; Opciones &gt; Privacidad &gt; Cookies.</li>
          <li><strong className="text-stone-600 font-medium">Chrome:</strong> Opciones &gt; Opciones avanzadas &gt; Privacidad.</li>
          <li><strong className="text-stone-600 font-medium">Safari:</strong> Preferencias &gt; Privacidad.</li>
          <li><strong className="text-stone-600 font-medium">Safari para iOS:</strong> Ajustes &gt; Safari.</li>
          <li><strong className="text-stone-600 font-medium">Chrome para Android:</strong> Configuración &gt; Configuración de sitios web &gt; Cookies.</li>
        </ul>
        <p>
          Asimismo, puede implementar la inhabilitación de Google Analytics para navegadores descargando e instalando
          el complemento oficial de Google disponible en{' '}
          <a
            href="https://tools.google.com/dlpage/gaoptout?hl=es_ES"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber hover:underline"
          >
            tools.google.com/dlpage/gaoptout
          </a>.
        </p>
        <p>
          También puede gestionar sus preferencias de cookies directamente desde esta web a través de nuestro{' '}
          <button
            onClick={() => {
              localStorage.removeItem('inco_cookie_consent')
              window.location.href = '/'
            }}
            className="text-amber hover:underline cursor-pointer focus:outline-none focus-visible:underline"
          >
            panel de preferencias de cookies
          </button>.
        </p>
      </Section>

      <Section num="4" title="Enlaces externos">
        <p>
          Inco no se hace responsable de la política de cookies que pueda estar establecida en enlaces de terceros.
          Recomendamos leer las respectivas políticas de cookies que puedan estar establecidas en otras páginas web.
          Inco no guarda relación con la utilización de las respectivas políticas que se implementen en otros
          servidores web.
        </p>
      </Section>

      <Section num="5" title="Datos de contacto">
        <address className="not-italic bg-white border border-stone-200 rounded-[4px] p-5 text-[14px] space-y-1">
          <p><strong className="text-stone-600 font-medium">Esther Calvo</strong></p>
          <p>Oficina: Calle San Agustín 9 Bajo Ext. Izq. – 28014 Madrid</p>
          <p>Teléfono: <a href="tel:+34914994717" className="text-amber hover:underline">91 499 47 17</a></p>
          <p>Email: <a href="mailto:info@inco.com.es" className="text-amber hover:underline">info@inco.com.es</a></p>
        </address>
        <p>
          Con la aceptación de la presente política de cookies queda informado y consiente los datos que puedan ser
          recabados en esta página web. Inco se reserva el derecho a modificar y actualizar la presente política de
          cookies.
        </p>
        <p className="text-[13px] text-stone-400">
          Última fecha de modificación: 02/01/2024
        </p>
      </Section>

      {/* Cross-links */}
      <div className="mt-12 pt-8 border-t border-stone-200 flex flex-wrap gap-4 text-[13px]">
        <Link to="/aviso-legal"  className="text-amber hover:underline transition-colors">Aviso legal</Link>
        <Link to="/privacidad"   className="text-amber hover:underline transition-colors">Política de privacidad</Link>
        <Link to="/accesibilidad" className="text-amber hover:underline transition-colors">Declaración de accesibilidad</Link>
      </div>

    </LegalLayout>
  )
}
