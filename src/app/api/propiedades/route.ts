import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(properties)
  } catch {
    return NextResponse.json({ error: 'Error al obtener propiedades' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }
  try {
    const body = await request.json()
    const {
      title, price, location, type, status, description,
      images, fotocasaUrl, bedrooms, bathrooms, sqMeters, featured,
    } = body

    if (!title || !price || !location || !type || !description) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const property = await prisma.property.create({
      data: {
        title,
        price: parseFloat(price),
        location,
        type,
        status: status || 'disponible',
        description,
        images: Array.isArray(images) ? JSON.stringify(images) : images,
        fotocasaUrl: fotocasaUrl || null,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        sqMeters: sqMeters ? parseFloat(sqMeters) : null,
        featured: featured || false,
      },
    })

    return NextResponse.json(property, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear propiedad' }, { status: 500 })
  }
}
