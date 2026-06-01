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
  {
    id: 'chalet-calvarrasa-arriba',
    title: 'Casa o chalet independiente en venta en Calvarrasa de Arriba',
    price: 99_000,
    location: 'Área Metropolitana, Salamanca',
    type: 'casa',
    operation: 'venta',
    status: 'disponible',
    description: `Parcela en terreno urbano no consolidado con construcción en curso a falta de remates y finalización de obra en el interior.

Tiene hecho: estructura, cerramientos, tabiquería, solados y alicatados, pintura, instalaciones, ventanas de aluminio lacado con doble cristal, carpintería interior de roble y suelos de gres, pintura lisa y cocina amueblada.

La vivienda cuenta con una edificación de dos plantas: en la planta principal, 3 dormitorios, 2 cuartos de baño completos, cocina independiente y salón-comedor de buen tamaño; en la planta alta, 2 dormitorios y un aseo.

Además dispone de terraza, porche y jardín privado con garaje cerrado para dos coches y espacio de almacenaje.

La parcela dispone de 1.000 m². Las edificaciones suman aproximadamente 132 m² destinados a vivienda y 31 m² a aparcamiento.

Solo faltan pequeños remates y la caldera individual de gasóleo.

Electricidad por generadores (placas y baterías). Agua por sondeo comunitario y fosa séptica para aguas fecales.

No cobramos comisión al comprador.

En Cilleros Inmobiliaria vendemos hogares y construimos sueños.`,
    images: JSON.stringify([
      '/images/chalet-calvarrasa-1.png',
      '/images/chalet-calvarrasa-2.png',
      '/images/chalet-calvarrasa-3.png',
    ]),
    fotocasaUrl: null,
    bedrooms: 5,
    bathrooms: 3,
    sqMeters: 160,
    availability: 'Obra en curso (falta de remates)',
    garage: 'Garaje cerrado (2 plazas)',
    heating: 'Gasóleo (pendiente de instalar caldera)',
    condition: 'En construcción',
    featured: true,
    createdAt: now,
    updatedAt: now,
  },
]
