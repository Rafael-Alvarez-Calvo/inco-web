import { LegalLayout } from './LegalLayout'

export const AccesibilidadPage = () => {
  return (
    <LegalLayout
      title="Declaración de accesibilidad"
      description="Declaración de accesibilidad de INCO Estudio Técnico conforme al Real Decreto 1112/2018. Información de contacto para consultas sobre accesibilidad del sitio web."
      path="/accesibilidad"
    >

      <p className="text-[15px] text-stone-500 leading-relaxed mb-10">
        Esther Calvo se ha comprometido a hacer accesibles sus sitios web de conformidad con el{' '}
        <strong className="text-stone-600 font-medium">
          Real Decreto 1112/2018, de 7 de septiembre
        </strong>
        , sobre accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público.
        La presente declaración de accesibilidad se aplica al sitio web{' '}
        <strong className="text-stone-600 font-medium">inco.com.es</strong>.
      </p>

      <section className="mb-10">
        <h2 className="font-serif text-blue text-[20px] font-semibold mb-4 pb-3 border-b border-stone-200">
          Datos de contacto
        </h2>
        <div className="space-y-4 text-[15px] text-stone-500 leading-relaxed">
          <p>
            Según lo previsto en el artículo 11 RD, para la comunicación sobre requisitos de accesibilidad relativos a:
          </p>
          <ul className="list-disc list-inside pl-2 space-y-1">
            <li>Posibles incumplimientos por parte de este sitio web.</li>
            <li>Transmitir otras dificultades de acceso al contenido.</li>
            <li>Formular cualquier otra consulta o sugerencia de mejora relativa a la accesibilidad del sitio web.</li>
          </ul>
          <p>Podrá ponerse en contacto a través de:</p>
          <address className="not-italic bg-white border border-stone-200 rounded-[4px] p-5 text-[14px] space-y-1">
            <p>Correo electrónico: <a href="mailto:info@inco.com.es" className="text-amber hover:underline">info@inco.com.es</a></p>
            <p>Teléfono: <a href="tel:+34914994717" className="text-amber hover:underline">91 499 47 17</a></p>
            <p>Oficina física: Calle San Agustín 9 Bajo Ext. Izq. – 28014 Madrid</p>
          </address>
          <p>
            Las solicitudes de información accesible y quejas relativas a este sitio web se regirán por lo dispuesto
            en el artículo 12 RD 1112/2018, de 7 de septiembre.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-blue text-[20px] font-semibold mb-4 pb-3 border-b border-stone-200">
          Procedimiento de reclamación
        </h2>
        <div className="space-y-4 text-[15px] text-stone-500 leading-relaxed">
          <p>
            Las reclamaciones deben dirigirse a la Subdirección General de Servicios Web, Transparencia y Protección
            de Datos, como Unidad responsable de accesibilidad de esta página web, o si la reclamación es por una
            actuación de dicha Unidad, al superior jerárquico de ésta.
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-serif text-blue text-[20px] font-semibold mb-4 pb-3 border-b border-stone-200">
          Fecha de declaración
        </h2>
        <div className="space-y-2 text-[15px] text-stone-500 leading-relaxed">
          <p>La presente declaración fue preparada el <strong className="text-stone-600 font-medium">10/09/2023</strong>.</p>
          <p>Última revisión de la declaración: <strong className="text-stone-600 font-medium">20/11/2023</strong>.</p>
        </div>
      </section>

    </LegalLayout>
  )
}
