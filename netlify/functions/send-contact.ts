import nodemailer from 'nodemailer'

interface NetlifyEvent {
  httpMethod: string
  body: string | null
}

interface NetlifyResponse {
  statusCode: number
  headers: Record<string, string>
  body: string
}

interface Payload {
  nombre:          string
  empresa?:        string
  email:           string
  tel?:            string
  tipo?:           string
  msg?:            string
  turnstileToken:  string
  source?:         'contact-section' | 'legal-modal'
}

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type':                 'application/json',
}

function ok(body: object): NetlifyResponse {
  return { statusCode: 200, headers: CORS, body: JSON.stringify(body) }
}

function fail(statusCode: number, error: string): NetlifyResponse {
  return { statusCode, headers: CORS, body: JSON.stringify({ success: false, error }) }
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function handler(event: NetlifyEvent): Promise<NetlifyResponse> {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return fail(405, 'Method not allowed')
  }

  let payload: Payload
  try {
    payload = JSON.parse(event.body ?? '{}') as Payload
  } catch {
    return fail(400, 'JSON inválido')
  }

  const { nombre, empresa, email, tel, tipo, msg, turnstileToken, source } = payload

  if (!nombre?.trim() || !email?.trim()) {
    return fail(400, 'Nombre y email son obligatorios')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail(400, 'Formato de email no válido')
  }

  // Verify Turnstile token
  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    new URLSearchParams({
      secret:   process.env.TURNSTILE_SECRET_KEY ?? '',
      response: turnstileToken,
    }),
  })
  const { success: turnstileOk } = (await verifyRes.json()) as { success: boolean }

  if (!turnstileOk) {
    return fail(403, 'Verificación anti-spam fallida')
  }

  const isLegal = source === 'legal-modal'
  const subject = isLegal
    ? `Nueva consulta web (Legal) — ${nombre}`
    : `Nueva consulta web — ${nombre}`

  const dateStr = new Date().toLocaleString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
    timeZone: 'Europe/Madrid',
  })

  const sourceLabel = isLegal ? 'Modal en páginas legales' : 'Sección de contacto principal'

  const LBL = 'padding:10px 16px 10px 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#4a6080;white-space:nowrap;vertical-align:top;width:140px'
  const VAL = 'padding:10px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;vertical-align:top'
  const SEP = 'border-top:1px solid #ede9e2'

  const fieldRow = (label: string, valueHtml: string, first = false) => `
    <tr>
      <td style="${LBL}${first ? '' : ';' + SEP}">${label}</td>
      <td style="${VAL}${first ? '' : ';' + SEP}">${valueHtml}</td>
    </tr>`

  const rows = [
    fieldRow('Nombre',           esc(nombre), true),
    empresa ? fieldRow('Empresa',          esc(empresa)) : '',
    fieldRow('Email',
      `<a href="mailto:${esc(email)}" style="color:#1a3a5c;text-decoration:none">${esc(email)}</a>`),
    tel  ? fieldRow('Teléfono',
      `<a href="tel:${esc(tel)}" style="color:#1a3a5c;text-decoration:none">${esc(tel)}</a>`) : '',
    tipo ? fieldRow('Tipo de proyecto',    esc(tipo)) : '',
  ].join('')

  const msgBlock = msg ? `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:24px">
      <tr>
        <td style="background:#ede9e2;border-left:4px solid #c17f3e;padding:16px 20px">
          <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#4a6080;text-transform:uppercase;letter-spacing:0.07em">Mensaje</p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;line-height:1.6;white-space:pre-wrap">${esc(msg)}</p>
        </td>
      </tr>
    </table>` : ''

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Nueva consulta — INCO</title>
</head>
<body style="margin:0;padding:0;background:#f5f4f1">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f4f1;padding:24px 0">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a3a5c;padding:28px 32px 24px">
              <p style="margin:0;font-family:Georgia,'Times New Roman',Times,serif;font-size:34px;font-weight:bold;color:#ffffff;letter-spacing:0.04em">INCO</p>
              <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#c17f3e;text-transform:uppercase;letter-spacing:0.12em">Nueva consulta web</p>
            </td>
          </tr>

          <!-- CUERPO -->
          <tr>
            <td style="background:#ffffff;padding:32px">
              <p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',Times,serif;font-size:16px;color:#1a3a5c;border-bottom:1px solid #ede9e2;padding-bottom:12px">Datos de la consulta</p>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${rows}
              </table>
              ${msgBlock}
            </td>
          </tr>

          <!-- ORIGEN -->
          <tr>
            <td style="background:#f5f4f1;padding:10px 32px;border-top:1px solid #e0ddd7">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#999999">Origen:&nbsp;<span style="color:#4a6080;font-weight:600">${sourceLabel}</span></p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1a3a5c;padding:20px 32px">
              <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#8fa8c4">Recibido el ${dateStr}</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#5d7a99">Este mensaje fue generado automáticamente desde el formulario de inco.com.es</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  try {
    const transporter = nodemailer.createTransport({
      host:   'smtp.ionos.es',
      port:   587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from:    '"Web INCO" <web@inco.com.es>',
      to:      'info@inco.com.es',
      replyTo: email,
      subject,
      html,
    })

    return ok({ success: true })
  } catch (err) {
    console.error('SMTP error:', err)
    return fail(500, 'Error al enviar el email. Inténtalo de nuevo más tarde.')
  }
}
