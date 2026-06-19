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

export const AvisoLegalPage = () => {
  return (
    <LegalLayout
      title="Aviso legal"
      description="Aviso legal de INCO Estudio Técnico, S.L. Información sobre el titular, términos de uso, propiedad intelectual y ley aplicable del sitio web inco.com.es."
      path="/aviso-legal"
    >

      <Section num="1" title="Datos identificativos">
        <p>
          Esta página web es titularidad de <strong className="text-stone-600 font-medium">Esther Calvo</strong> con
          NIF 071733T y oficina situada en Calle San Agustín 9 Bajo Ext. Izq. – 28014 Madrid, actuando bajo el nombre
          comercial de <strong className="text-stone-600 font-medium">Inco Estudio Técnico SL</strong> (en adelante
          Inco). Puede ponerse en contacto con nosotros a través del correo electrónico{' '}
          <a href="mailto:info@inco.com.es" className="text-amber hover:underline">info@inco.com.es</a>{' '}
          o llamando al teléfono{' '}
          <a href="tel:+34914994717" className="text-amber hover:underline">91 499 47 17</a>.
        </p>
      </Section>

      <Section num="2" title="Términos de uso de la web">
        <p>
          2.1 El acceso a los contenidos ofrecidos en la página web Inco.com.es atribuyen a quien lo haga la condición
          de usuario, implicando la aceptación de todas las condiciones establecidas en este aviso legal. Si como
          usuario no acepta cualquiera de las cláusulas contenidas en este aviso legal, debe abstenerse de acceder a
          esta página web o utilizar sus servicios o contenidos.
        </p>
        <p>
          2.2 Inco se reserva el derecho a modificar o sustituir en cualquier momento el presente Aviso legal y el
          resto de políticas establecidas en esta página web. Las nuevas condiciones sustituirán, complementarán o
          modificarán las actuales desde el mismo momento en que sean publicadas en la página web o por cualquier otro
          medio que permita al usuario conocerlas.
        </p>
        <p>
          Se recomienda al usuario leer periódicamente el presente Aviso legal y el resto de políticas establecidas en
          esta página web a efectos de quedar informados de las nuevas modificaciones que pudieran añadirse.
        </p>
      </Section>

      <Section num="3" title="Condiciones generales de uso">
        <p>
          3.1 Los contenidos y servicios ofrecidos en esta página web están destinados a su uso por personas mayores de
          edad con fines comerciales.
        </p>
        <p>
          3.2 El acceso a la página web de Inco implica la aceptación por el usuario del tratamiento de datos
          establecido en la presente política de privacidad y en la respectiva política de cookies.
        </p>
        <p>
          3.3 Inco no tiene el deber de controlar la utilización que hagan los usuarios del contenido ofrecido en la
          página web. El modo de utilización de los servicios ofrecidos es de exclusiva responsabilidad del usuario,
          que hará uso de esta página web con buena fe y con la finalidad para la cual esta página web sirva a los
          objetivos del usuario. Será este quien asuma además el deber de indemnizar por los daños producidos a Inco
          y/o terceros.
        </p>
        <p>3.4 El usuario reconoce que la navegación por la página web se desarrolla bajo su exclusiva responsabilidad. Inco no asume ninguna responsabilidad frente a:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>La infracción de la legislación vigente por parte del usuario.</li>
          <li>
            La existencia de códigos maliciosos o cualquier otro elemento informático dañino que pudiera causar daños
            al sistema informático del usuario o de tercero. Corresponde al usuario, en todo caso, disponer de
            herramientas adecuadas para la detección y eliminación de estos elementos.
          </li>
        </ul>
      </Section>

      <Section num="4" title="Propiedad industrial e intelectual">
        <p>
          4.1 Todos los contenidos (textos, imágenes, fotografías, gráficos, contenidos audiovisuales, diseño gráfico,
          software, etc.) de la página web, así como las marcas y demás signos distintivos, son propiedad de Inco o de
          terceros, y no otorga al usuario ninguna facultad de utilización sobre ellos por la mera utilización de la
          página web. Cualquier uso indebido que dé lugar a la vulneración de la propiedad industrial e intelectual por
          personas diferentes de su legítimo titular y sin el consentimiento expreso e inequívoco de éste, podrá ser
          denunciado y llevado a término por los cauces legalmente establecidos.
        </p>
      </Section>

      <Section num="5" title="Nulidad parcial y renuncia">
        <p>
          5.1 Si alguna de las cláusulas del presente Aviso legal fuera declarada total o parcialmente nula o ineficaz,
          el resto mantendrán plenamente su vigencia y validez.
        </p>
      </Section>

      <Section num="6" title="Ley aplicable y jurisdicción">
        <p>
          6.1 El usuario se compromete a hacer uso correcto de este portal de conformidad con la Ley, el presente Aviso
          legal y las demás políticas establecidas en esta página web.
        </p>
        <p>
          6.2 El presente Aviso legal se rige por la legislación española, siendo competentes los juzgados y tribunales
          españoles para conocer cuántas cuestiones suscite sobre su interpretación, aplicación y cumplimiento. El
          usuario, por virtud de la aceptación de las condiciones recogidas en este Aviso legal, renuncia expresamente
          a cualquier fuero distinto que por aplicación de la ley vigente pudiera corresponderle.
        </p>
      </Section>

    </LegalLayout>
  )
}
