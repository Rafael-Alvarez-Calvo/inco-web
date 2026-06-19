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

export const PrivacidadPage = () => {
  return (
    <LegalLayout
      title="Política de privacidad"
      description="Política de privacidad de INCO Estudio Técnico. Información sobre el tratamiento, finalidad y derechos relativos a los datos personales recabados en inco.com.es."
      path="/privacidad"
    >

      <p className="text-[15px] text-stone-500 leading-relaxed mb-10">
        Esta política de privacidad tiene como finalidad ofrecer una información clara de cómo se recopilan, utilizan
        y custodian los datos obtenidos de los usuarios que hagan uso de los servicios ofrecidos en esta página web.
      </p>

      <Section num="1" title="Responsable de tratamiento">
        <p>Los datos recopilados en esta página web serán tratados por:</p>
        <address className="not-italic bg-white border border-stone-200 rounded-[4px] p-5 text-[14px] space-y-1">
          <p><strong className="text-stone-600 font-medium">Esther Calvo</strong></p>
          <p>NIF: 072172331T</p>
          <p>Domicilio social: Calle San Agustín 9 Bajo Ext. Izq. – 28014 Madrid</p>
          <p>Teléfono: <a href="tel:+34914994717" className="text-amber hover:underline">91 499 47 17</a></p>
          <p>Correo electrónico: <a href="mailto:info@inco.com.es" className="text-amber hover:underline">info@inco.com.es</a></p>
        </address>
      </Section>

      <Section num="2" title="Tratamiento de los datos">
        <p>
          <strong className="text-stone-600 font-medium">Categoría de datos recopilados:</strong>{' '}
          Nombre, apellidos, correo corporativo, teléfono de contacto, e-mail.
        </p>
        <p><strong className="text-stone-600 font-medium">La finalidad del tratamiento de los datos será:</strong></p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>Responder a solicitudes, peticiones o consultas realizadas a través de esta página web.</li>
          <li>Gestión de los datos con fines comerciales y/o publicitarios relativos a los servicios ofertados por Inco.</li>
        </ul>
        <p><strong className="text-stone-600 font-medium">La legitimación para el tratamiento de los datos será:</strong></p>
        <ul className="list-disc list-inside pl-2 space-y-1">
          <li>El consentimiento de la persona que proporciona los datos.</li>
          <li>Interés legítimo empresarial para dar respuesta a las solicitudes.</li>
        </ul>
        <p>
          <strong className="text-stone-600 font-medium">La duración del tratamiento:</strong>{' '}
          Se conservarán hasta que los interesados retiren su consentimiento y/o hasta la duración que determinen las
          leyes vigentes aplicables relativos a los datos tratados.
        </p>
        <p>El tratamiento de datos realizado en esta página web no conlleva ninguna transferencia de datos internacionales.</p>
      </Section>

      <Section num="3" title="Derechos de los interesados">
        <p>Toda persona que haya facilitado sus datos a Inco podrá ejercer los siguientes derechos:</p>
        <ul className="space-y-3 pl-2">
          <li>
            <strong className="text-stone-600 font-medium">Derecho de acceso:</strong>{' '}
            para que sea informado de si estamos tratando datos personales suyos. Tendrán derecho a acceder a sus
            datos, rectificar los datos inexactos o, en su caso, solicitar su supresión cuando ya no sean necesarios
            para los fines para los que fueron recogidos.
          </li>
          <li>
            <strong className="text-stone-600 font-medium">Derecho de oposición:</strong>{' '}
            una vez otorgado el consentimiento, el interesado tiene derecho a retirarlo en cualquier momento, sin que
            ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.
          </li>
          <li>
            <strong className="text-stone-600 font-medium">Derecho a no ser objeto de decisiones automatizadas</strong>{' '}
            según lo dispuesto en el Reglamento General de Protección de Datos (RGPD).
          </li>
          <li>
            <strong className="text-stone-600 font-medium">Derecho a solicitar la limitación</strong>{' '}
            de los datos o de su portabilidad en los términos expresados en el RGPD.
          </li>
        </ul>
        <p>
          A través de los datos de contacto que figuran en el apartado de «Responsable de Tratamiento» de esta
          Política de Privacidad o mediante correo electrónico a{' '}
          <a href="mailto:info@inco.com.es" className="text-amber hover:underline">info@inco.com.es</a>,
          cualquier ejercicio de estos derechos será atendido sin coste alguno.
        </p>
        <p>
          Inco se reserva el derecho a conservar el tratamiento de datos únicamente para el ejercicio o la defensa de
          reclamaciones u motivos legítimos imperiosos.
        </p>
      </Section>

      <Section num="4" title="Autoridad en materia de protección de datos">
        <p>
          Frente a cualquier vulneración de derechos, especialmente cuando no se haya obtenido satisfacción en su
          ejercicio, el interesado puede presentar una reclamación ante la{' '}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber hover:underline"
          >
            Agencia Española de Protección de Datos (www.aepd.es)
          </a>{' '}
          u otra autoridad competente donde podrá encontrar más información acerca de los derechos que le asisten.
        </p>
      </Section>

      <Section num="5" title="Responsabilidad de los datos personales que facilite un interesado">
        <p>
          Inco no se hace responsable de que la información ofrecida por el usuario sea cierta. A estos efectos, será
          el usuario que solicite los servicios de esta página web el responsable de la veracidad y exactitud de todos
          los datos proporcionados.
        </p>
        <p>
          El usuario será responsable de las informaciones falsas o inexactas que proporcione y de los perjuicios que
          puedan causar al titular de esta web o a terceros.
        </p>
      </Section>

      <Section num="6" title="Enlaces de tercero">
        <p>
          Como titular de la página web Inco.com.es, Inco Estudio Técnico SL no se hace responsable de la redacción
          ni de la aceptación de políticas de privacidad y/o políticas de cookies de otras páginas de terceros que
          puedan encontrarse enlazadas en esta página web.
        </p>
        <p>
          Quede informado de que esta página web se encuentra sujeta al Reglamento (UE) 2016/679 del Parlamento
          Europeo y del Consejo de 27 de abril de 2016 y a la Ley Orgánica 3/2018, de 5 de diciembre, de protección
          de datos personales y garantías de los derechos digitales.
        </p>
      </Section>

      <Section num="7" title="Proveedores de servicios de terceros — Cloudflare Turnstile">
        <p>
          Este sitio web utiliza <strong className="text-stone-600 font-medium">Cloudflare Turnstile</strong>, un
          servicio de verificación antispam prestado por Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107,
          EE. UU.), con el fin de proteger nuestros formularios de contacto contra el uso fraudulento y el spam
          automatizado.
        </p>
        <p>
          Para ofrecer esta protección, Turnstile puede recopilar y procesar determinados datos del dispositivo y del
          navegador del usuario (como dirección IP, agente de usuario, cookies de sesión de Cloudflare e información
          sobre la interacción con el formulario). Dichos datos son tratados por Cloudflare conforme a su propia
          política de privacidad.
        </p>
        <p>
          La base legitimadora de este tratamiento es el interés legítimo del responsable en mantener la seguridad e
          integridad de los formularios del sitio web (art. 6.1.f RGPD).
        </p>
        <p>Para más información sobre cómo Cloudflare procesa estos datos, puede consultar:</p>
        <ul className="list-disc list-inside pl-2 space-y-1.5">
          <li>
            <a
              href="https://www.cloudflare.com/turnstilepolicy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              Turnstile Privacy Notice de Cloudflare
            </a>
          </li>
          <li>
            <a
              href="https://www.cloudflare.com/turnstile-privacy-addendum/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              Privacy Addendum de Cloudflare para Turnstile
            </a>
          </li>
        </ul>
      </Section>

    </LegalLayout>
  )
}
