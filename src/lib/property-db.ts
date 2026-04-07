import type { Property } from '@/types'

export type PropertyRow = {
  id: string
  title: string
  price: number
  location: string
  type: string
  status: string
  description: string
  images: string
  fotocasa_url: string | null
  bedrooms: number | null
  bathrooms: number | null
  sq_meters: number | null
  featured: boolean
  created_at: string
  updated_at: string
}

export function rowToProperty(r: PropertyRow): Property {
  return {
    id: r.id,
    title: r.title,
    price: r.price,
    location: r.location,
    type: r.type,
    status: r.status,
    description: r.description,
    images: r.images,
    fotocasaUrl: r.fotocasa_url,
    bedrooms: r.bedrooms,
    bathrooms: r.bathrooms,
    sqMeters: r.sq_meters,
    featured: r.featured,
    createdAt: new Date(r.created_at),
    updatedAt: new Date(r.updated_at),
  }
}

export function rowsToProperties(rows: PropertyRow[] | null): Property[] {
  if (!rows?.length) return []
  return rows.map(rowToProperty)
}

export type PropertyInsert = {
  title: string
  price: number
  location: string
  type: string
  status: string
  description: string
  images: string
  fotocasa_url: string | null
  bedrooms: number | null
  bathrooms: number | null
  sq_meters: number | null
  featured: boolean
}

export function bodyToInsert(body: {
  title: string
  price: string | number
  location: string
  type: string
  status?: string
  description: string
  images: string | string[]
  fotocasaUrl?: string | null
  bedrooms?: string | number | null
  bathrooms?: string | number | null
  sqMeters?: string | number | null
  featured?: boolean
}): PropertyInsert {
  const imagesStr = Array.isArray(body.images) ? JSON.stringify(body.images) : String(body.images)
  return {
    title: body.title,
    price: typeof body.price === 'number' ? body.price : parseFloat(String(body.price)),
    location: body.location,
    type: body.type,
    status: body.status || 'disponible',
    description: body.description,
    images: imagesStr,
    fotocasa_url: body.fotocasaUrl || null,
    bedrooms: body.bedrooms !== undefined && body.bedrooms !== '' && body.bedrooms !== null
      ? parseInt(String(body.bedrooms), 10)
      : null,
    bathrooms: body.bathrooms !== undefined && body.bathrooms !== '' && body.bathrooms !== null
      ? parseInt(String(body.bathrooms), 10)
      : null,
    sq_meters: body.sqMeters !== undefined && body.sqMeters !== '' && body.sqMeters !== null
      ? parseFloat(String(body.sqMeters))
      : null,
    featured: Boolean(body.featured),
  }
}
