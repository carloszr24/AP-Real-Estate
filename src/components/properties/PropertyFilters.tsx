'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { PROPERTY_TYPES, PROPERTY_OPERATIONS, PROPERTY_STATUSES, OPERATION_LABELS, STATUS_LABELS, TYPE_LABELS } from '@/lib/utils'

const PRICE_MIN = 0
const PRICE_MAX = 1000000
const PRICE_STEP = 10000

const EXTRA_OPTIONS = [
  { value: 'garage', label: 'Garaje' },
  { value: 'elevator', label: 'Ascensor' },
  { value: 'furnished', label: 'Amueblado' },
  { value: 'heating', label: 'Calefacción' },
] as const

function formatEuro(value: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const type = searchParams.get('type') || ''
  const operation = searchParams.get('operation') || ''
  const status = searchParams.get('status') || ''
  const extra = searchParams.get('extra') || ''
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''
  const minPriceValue = minPrice ? Number(minPrice) : PRICE_MIN
  const maxPriceValue = maxPrice ? Number(maxPrice) : PRICE_MAX

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/propiedades?${params.toString()}`)
  }, [router, searchParams])

  const clearAll = () => {
    router.push('/propiedades')
  }

  const hasFilters = type || operation || status || extra || minPrice || maxPrice

  return (
    <div className="bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-end py-2.5">
          {hasFilters && (
            <button onClick={clearAll} className="text-sm text-gold hover:text-gold-dark transition-colors">
              Limpiar
            </button>
          )}
        </div>

        <div className="py-3 md:py-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6 xl:items-end">
              {/* Tipo */}
              <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Tipo de inmueble</label>
              <select
                value={type}
                onChange={(e) => updateParam('type', e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
              >
                <option value="">Todos</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
              </div>

              {/* Operación */}
              <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Operación</label>
              <select
                value={operation}
                onChange={(e) => updateParam('operation', e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
              >
                <option value="">Todas</option>
                {PROPERTY_OPERATIONS.map((op) => (
                  <option key={op} value={op}>
                    {OPERATION_LABELS[op]}
                  </option>
                ))}
              </select>
              </div>

              {/* Estado */}
              <div>
              <label className="text-xs text-stone-500 mb-1.5 block">Estado</label>
              <select
                value={status}
                onChange={(e) => updateParam('status', e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
              >
                <option value="">Todos</option>
                {PROPERTY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
              </div>

              {/* Precio mínimo */}
              <div>
                <label className="text-xs text-stone-500 mb-1.5 block">
                  Precio mínimo ({formatEuro(minPriceValue)})
                </label>
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={PRICE_STEP}
                  value={Math.min(minPriceValue, maxPriceValue)}
                  onChange={(e) => {
                    const next = Number(e.target.value)
                    updateParam('minPrice', String(next))
                    if (next > maxPriceValue) {
                      updateParam('maxPrice', String(next))
                    }
                  }}
                  className="w-full accent-stone-900 h-5"
                />
              </div>

              {/* Precio máximo */}
              <div>
                <label className="text-xs text-stone-500 mb-1.5 block">
                  Precio máximo ({formatEuro(maxPriceValue)})
                </label>
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={PRICE_STEP}
                  value={Math.max(maxPriceValue, minPriceValue)}
                  onChange={(e) => {
                    const next = Number(e.target.value)
                    updateParam('maxPrice', String(next))
                    if (next < minPriceValue) {
                      updateParam('minPrice', String(next))
                    }
                  }}
                  className="w-full accent-stone-900 h-5"
                />
              </div>

              {/* Extras */}
              <div>
                <label className="text-xs text-stone-500 mb-1.5 block">Extras</label>
                <select
                  value={extra}
                  onChange={(e) => updateParam('extra', e.target.value)}
                  className="w-full bg-white border border-stone-200 rounded-full px-4 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-stone-400"
                >
                  <option value="">Cualquiera</option>
                  {EXTRA_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
