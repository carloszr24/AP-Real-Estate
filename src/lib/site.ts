export const SITE = {
  name: 'Sales Inmobiliaria',
  tagline: 'Soluciones inmobiliarias con un trato cercano y profesional.',
  description:
    'Sales Inmobiliaria en Fernán Núñez (Córdoba): compra, venta y alquiler de viviendas con asesoramiento personalizado.',
  logo: '/images/sales-inmobiliaria-logo.png',
  city: 'Fernán Núñez',
  address: {
    line1: 'C. Adolfo Darhan',
    line2: '14520 Fernán Núñez, Córdoba',
    full: 'C. Adolfo Darhan, 14520 Fernán Núñez, Córdoba',
  },
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Calle+Adolfo+Darhan+14520+Fern%C3%A1n+N%C3%BA%C3%B1ez+C%C3%B3rdoba',
  phone: {
    display: '619 59 03 53',
    href: 'tel:+34619590353',
    whatsappHref: 'https://wa.me/34619590353',
  },
  openingHours: [
    { label: 'Lunes a viernes', hours: '10:00–14:00, 18:00–21:00' },
    { label: 'Sábado', hours: 'Cerrado' },
    { label: 'Domingo', hours: 'Cerrado' },
  ],
} as const

export function formatOpeningHours(): string {
  return SITE.openingHours.map(({ label, hours }) => `${label}: ${hours}`).join('\n')
}
