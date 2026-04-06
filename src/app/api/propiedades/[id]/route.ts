import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminTokenFromRequest, verifyAdminSessionToken } from '@/lib/admin-session'

function unauthorized() {
  return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const property = await prisma.property.findUnique({ where: { id: params.id } })
    if (!property) return NextResponse.json({ error: 'No encontrada' }, { status: 404 })
    return NextResponse.json(property)
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }
  try {
    const body = await request.json()
    const {
      title, price, location, type, status, description,
      images, fotocasaUrl, bedrooms, bathrooms, sqMeters, featured,
    } = body

    const property = await prisma.property.update({
      where: { id: params.id },
      data: {
        title,
        price: parseFloat(price),
        location,
        type,
        status,
        description,
        images: Array.isArray(images) ? JSON.stringify(images) : images,
        fotocasaUrl: fotocasaUrl || null,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        sqMeters: sqMeters ? parseFloat(sqMeters) : null,
        featured: featured || false,
      },
    })

    return NextResponse.json(property)
  } catch {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (!verifyAdminSessionToken(getAdminTokenFromRequest(request))) {
    return unauthorized()
  }
  try {
    await prisma.property.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}
