import { Suspense } from 'react'
import { createPublicSupabase } from '@/lib/supabase/public-server'
import { rowsToProperties, type PropertyRow } from '@/lib/property-db'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyFilters } from '@/components/properties/PropertyFilters'

export const dynamic = 'force-dynamic'

function debugLog(payload: {
  runId: string
  hypothesisId: string
  location: string
  message: string
  data: Record<string, unknown>
}) {
  // #region agent log
  fetch('http://127.0.0.1:7474/ingest/405f2639-3a52-4550-ad87-60b4b9c70aff', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '31b3af' },
    body: JSON.stringify({
      sessionId: '31b3af',
      ...payload,
      timestamp: Date.now(),
    }),
  }).catch(() => {})
  // #endregion
}

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
  debugLog({
    runId: 'pre-fix',
    hypothesisId: 'H3',
    location: 'src/app/propiedades/page.tsx:getProperties',
    message: 'Supabase query resolved for propiedades list',
    data: {
      hasError: Boolean(error),
      errorCode: error?.code ?? null,
      rowsLength: Array.isArray(data) ? data.length : 0,
      topIds: Array.isArray(data) ? data.slice(0, 5).map((row) => (row as { id?: string }).id ?? null) : [],
      filters: searchParams,
    },
  })
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
  const hasFilters = Object.values(searchParams).some(Boolean)
  debugLog({
    runId: 'pre-fix',
    hypothesisId: 'H2',
    location: 'src/app/propiedades/page.tsx:PropiedadesPage',
    message: 'SSR propiedades render payload',
    data: {
      hasFilters,
      searchParams,
      propertiesLength: properties.length,
    },
  })

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
