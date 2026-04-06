import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const properties = [
  {
    title: 'Ático con vistas al mar en Marbella',
    price: 485000,
    location: 'Marbella, Málaga',
    type: 'piso',
    status: 'disponible',
    description: 'Espectacular ático de 120m² con terraza de 40m² y vistas panorámicas al Mediterráneo. Acabados de lujo, cocina equipada de diseño, tres habitaciones en suite. Urbanización privada con piscina y seguridad 24h. Orientación sur, máxima luminosidad.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200',
    ]),
    fotocasaUrl: 'https://www.fotocasa.es',
    bedrooms: 3,
    bathrooms: 2,
    sqMeters: 120,
    featured: true,
  },
  {
    title: 'Villa contemporánea en La Zagaleta',
    price: 2850000,
    location: 'Benahavís, Málaga',
    type: 'casa',
    status: 'disponible',
    description: 'Impresionante villa de obra nueva en la exclusiva urbanización La Zagaleta. 600m² construidos en parcela de 2.500m². Diseño arquitectónico vanguardista con infinitypool, bodega, cine privado y garage para 4 vehículos.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
    ]),
    fotocasaUrl: 'https://www.fotocasa.es',
    bedrooms: 5,
    bathrooms: 4,
    sqMeters: 600,
    featured: true,
  },
  {
    title: 'Piso reformado en el centro histórico',
    price: 189000,
    location: 'Fuengirola, Málaga',
    type: 'piso',
    status: 'disponible',
    description: 'Precioso piso de 85m² totalmente reformado en 2024 en pleno centro. Distribuición de 2 habitaciones, 1 baño completo, salón amplio y cocina americana abierta. Suelos de madera natural, ventanas de PVC doble acristalamiento.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200',
    ]),
    fotocasaUrl: 'https://www.fotocasa.es',
    bedrooms: 2,
    bathrooms: 1,
    sqMeters: 85,
    featured: false,
  },
  {
    title: 'Local comercial prime en paseo marítimo',
    price: 320000,
    location: 'Benalmádena, Málaga',
    type: 'local',
    status: 'reservado',
    description: 'Excelente local comercial de 180m² en primera línea de playa. Diáfano, con gran escaparate de cristal, almacén y baños. Ideal para restaurante, boutique o concepto premium. Licencia de actividad incluida.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
    ]),
    fotocasaUrl: 'https://www.fotocasa.es',
    bedrooms: null,
    bathrooms: 2,
    sqMeters: 180,
    featured: false,
  },
  {
    title: 'Chalet adosado con jardín privado',
    price: 375000,
    location: 'Mijas, Málaga',
    type: 'casa',
    status: 'disponible',
    description: 'Luminoso chalet adosado de esquina con jardín privado de 80m² y piscina comunitaria. 3 plantas, 4 habitaciones, 3 baños, terraza panorámica, garaje doble. Urbanización tranquila a 5 min de la playa.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200',
    ]),
    fotocasaUrl: 'https://www.fotocasa.es',
    bedrooms: 4,
    bathrooms: 3,
    sqMeters: 180,
    featured: true,
  },
  {
    title: 'Estudio moderno en Nueva Andalucía',
    price: 145000,
    location: 'Nueva Andalucía, Marbella',
    type: 'piso',
    status: 'vendido',
    description: 'Estudio de 45m² completamente reformado y amueblado. Ideal como inversión o segunda residencia. A 10 minutos del Puerto Banús. Comunidad con piscina y jardines.',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200',
    ]),
    fotocasaUrl: 'https://www.fotocasa.es',
    bedrooms: 0,
    bathrooms: 1,
    sqMeters: 45,
    featured: false,
  },
]

async function main() {
  console.log('🌱 Seeding database...')
  await prisma.property.deleteMany()
  for (const property of properties) {
    await prisma.property.create({ data: property })
  }
  console.log(`✅ Created ${properties.length} properties`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
