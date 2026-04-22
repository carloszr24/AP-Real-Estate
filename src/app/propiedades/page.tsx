import { Suspense } from 'react'
import { createPublicSupabase } from '@/lib/supabase/public-server'
import { rowsToProperties, type PropertyRow } from '@/lib/property-db'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyFilters } from '@/components/properties/PropertyFilters'

export const dynamic = 'force-dynamic'

interface SearchParams {
  type?: string
  operation?: string
  status?: string
  minPrice?: string
  maxPrice?: string
  extra?: string
}

function hasExtra(value?: string | null): boolean {
  if (!value) return false
  const normalized = value.trim().toLowerCase()
  if (!normalized) return false
  return normalized === 'si' || normalized === 'sí' || normalized === 'true' || normalized.startsWith('con ')
}

async function getProperties(searchParams: SearchParams) {
  const supabase = createPublicSupabase()
  let q = supabase.from('properties').select('*').order('created_at', { ascending: false })

  if (searchParams.type) q = q.eq('type', searchParams.type)
  if (searchParams.operation) q = q.eq('operation', searchParams.operation)
  if (searchParams.status) q = q.eq('status', searchParams.status)
  if (searchParams.minPrice) q = q.gte('price', parseFloat(searchParams.minPrice))
  if (searchParams.maxPrice) q = q.lte('price', parseFloat(searchParams.maxPrice))

  const { data, error } = await q
  if (error) throw error
  const properties = rowsToProperties(data as PropertyRow[] | null)

  if (!searchParams.extra) return properties

  return properties.filter((property) => {
    switch (searchParams.extra) {
      case 'garage':
        return hasExtra(property.garage)
      case 'elevator':
        return hasExtra(property.elevator)
      case 'furnished':
        return hasExtra(property.furnished)
      case 'heating':
        return hasExtra(property.heating)
      default:
        return true
    }
  })
}

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const properties = await getProperties(searchParams)

  return (
    <div className="pt-16">
      <Suspense fallback={<div className="skeleton h-40 w-full" />}>
        <PropertyFilters />
      </Suspense>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14">
        {properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-400 text-lg mb-4">No hay propiedades con estos filtros.</p>
            <a href="/propiedades" className="text-gold text-sm hover:underline">
              Ver todas las propiedades →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
