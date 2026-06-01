import type { Property } from '@/types'

const now = new Date()

/** Catálogo demo en archivo (sin Supabase). */
export const DEMO_PROPERTIES: Property[] = [
  {
    id: 'piso-salesas-salamanca',
    title: 'Piso en venta en Salesas',
    price: 311_000,
    location: 'Chinchibarra - Capuchinos, Salamanca',
    type: 'piso',
    operation: 'venta',
    status: 'disponible',
    description: `Gran piso en venta de cuatro dormitorios, tres de ellos dobles.

Dos baños, uno con bañera y otro con ducha.

Balcón.

Amplio salón y cocina independiente y equipada con salida a terraza.

Actualmente se encuentra alquilado en 980 € + gastos, lo que supone una buena rentabilidad para inversión.

1ª planta exterior con ascensor. Superficie de 130 m².

En Cilleros Inmobiliaria vendemos hogares y construimos sueños. No dudes en llamarnos para visitarlo.`,
    images: JSON.stringify([
      '/images/piso-salesas-salon.png',
      '/images/piso-salesas-dormitorio-1.png',
      '/images/piso-salesas-dormitorio-2.png',
    ]),
    fotocasaUrl: null,
    bedrooms: 4,
    bathrooms: 2,
    sqMeters: 130,
    availability: 'Alquilada (980 €/mes + gastos)',
    floor: '1ª planta exterior',
    elevator: 'Sí',
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
]
