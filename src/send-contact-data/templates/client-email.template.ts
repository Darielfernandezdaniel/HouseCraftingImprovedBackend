import { ContactDataFormDto } from '../dto/contactDataForm.dto';

const SERVICE_CONFIG: Record<string, { emoji: string; color: string; bg: string; desc: string }> = {
  'pintura': {
    emoji: '🎨',
    color: '#7C3AED',
    bg: '#f8f5ff',
    desc: 'Interior, exterior, decorativa y más.'
  },
  'albanileria': {
    emoji: '🧱',
    color: '#E97820',
    bg: '#fff8f0',
    desc: 'Construcción, remodelación y reparaciones.'
  },
  'agua': {
    emoji: '💧',
    color: '#2563EB',
    bg: '#f0f7ff',
    desc: 'Tuberías, grifería y sistemas hidráulicos.'
  },
  'electricidad': {
    emoji: '⚡',
    color: '#c99a07',
    bg: '#fffdf0',
    desc: 'Instalaciones, reparaciones y mantenimiento.'
  },
  'limpieza': {
    emoji: '🧹',
    color: '#16a34a',
    bg: '#f0fdf4',
    desc: 'Limpieza profesional del hogar.'
  },
  'tasacion': {
    emoji: '🏠',
    color: '#c99a07',
    bg: '#fffdf0',
    desc: 'Valoración de propiedades.'
  },
  'refrigeracion': {
    emoji: '❄️',
    color: '#0ea5e9',
    bg: '#f0f9ff',
    desc: 'Instalación y mantenimiento de climatización.'
  }
};

function normalizeKey(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function buildServiceCards(services: string[]): string {
  return services.map((s) => {
    const key = normalizeKey(s);
    const cfg = SERVICE_CONFIG[key] ?? {
      emoji: '🔧',
      color: '#64748b',
      bg: '#f8fafc',
      desc: ''
    };

    return `
<tr>
  <td style="padding:8px 0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
      style="background:${cfg.bg}; border-radius:10px; overflow:hidden; border:1px solid rgba(0,0,0,0.06);">

      <tr>
        <td style="padding:16px 20px;">

          <span style="font-size:22px; vertical-align:middle;">${cfg.emoji}</span>

          <span style="font-size:15px; font-weight:700; color:${cfg.color}; padding-left:10px; vertical-align:middle;">
            ${s}
          </span>

          <div style="margin-top:6px; font-size:12px; line-height:1.5; color:#6b6b7b;">
            ${cfg.desc}
          </div>

        </td>
      </tr>

    </table>
  </td>
</tr>
`;
  }).join('');
}

export function buildClientEmail(contactData: ContactDataFormDto): string {
  const logoUrl =
    'https://res.cloudinary.com/du8zp37r4/image/upload/q_auto/f_auto/v1777386076/Logo-removebg-preview_xsnhst.png';

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:0;background-color:#df771e;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#df771e;">
  <tr>
    <td align="center" style="padding:20px 10px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0"
        style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">

        <!-- LOGO -->
        <tr>
          <td align="center" style="padding:20px;">
            <img src="${logoUrl}" alt="HouseCrafting Logo"
              width="120"
              style="display:block;margin:0 auto;border-radius:50%;">
          </td>
        </tr>

        <!-- TEXTO -->
        <tr>
          <td style="padding:40px 40px 24px;">
            <h2 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#1a1a2e;">
              ¡Hola, ${contactData.name}! 👋
            </h2>
            <p style="margin:0;font-size:16px;line-height:1.6;color:#4a4a5a;">
              Gracias por contactar con <strong>HouseCrafting</strong>.
              Hemos recibido tu solicitud y nos pondremos en contacto contigo en menos de 24 horas.
            </p>
          </td>
        </tr>

        <!-- SEPARADOR -->
        <tr>
          <td style="padding:0 40px;">
            <hr style="border:none;border-top:2px solid #f0ece6;margin:0;">
          </td>
        </tr>

        <!-- SERVICIOS -->
        <tr>
          <td style="padding:32px 40px;">
            <h3 style="margin:0 0 16px;font-size:18px;font-weight:700;color:#1a1a2e;text-align:center;">
              Servicios solicitados
            </h3>

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              ${buildServiceCards(contactData.services)}
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#1a1a2e;padding:28px 40px;text-align:center;">
            <p style="margin:0 0 4px;font-size:13px;color:rgba(255,255,255,0.7);">
              ✉️ housecrafting44@gmail.com
            </p>
            <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);">
              © HouseCrafting · Todos los derechos reservados
            </p>
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
}