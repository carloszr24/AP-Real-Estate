'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { PROPERTY_TYPES, PROPERTY_OPERATIONS, PROPERTY_STATUSES, OPERATION_LABELS, STATUS_LABELS, TYPE_LABELS } from '@/lib/utils'

export function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)

  const type = searchParams.get('type') || ''
  const operation = searchParams.get('operation') || ''
  const status = searchParams.get('status') || ''
  const minPrice = searchParams.get('minPrice') || ''
  const maxPrice = searchParams.get('maxPrice') || ''

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

  const hasFilters = type || operation || status || minPrice || maxPrice
  const activeFilters = useMemo(
    () => [type, operation, status, minPrice, maxPrice].filter(Boolean).length,
    [type, operation, status, minPrice, maxPrice]
  )

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-y border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <p className="text-sm md:text-base font-medium text-stone-900">Filtros</p>
            <p className="text-sm text-stone-500">
              {hasFilters ? `${activeFilters} activo${activeFilters !== 1 ? 's' : ''}` : 'Sin filtros activos'}
            </p>
          </div>
          <div className="flex items-center gap-5">
            {hasFilters && (
              <button onClick={clearAll} className="text-sm text-gold hover:text-gold-dark transition-colors">
                Limpiar
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex items-center gap-2 text-sm md:text-base font-medium text-stone-900"
              aria-expanded={open}
              aria-controls="property-filters-panel"
            >
              {open ? 'Ocultar filtros' : 'Mostrar filtros'}
              <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>⌄</span>
            </button>
          </div>
        </div>

        {open && (
          <div
            id="property-filters-panel"
            className="border-t border-stone-100 py-5 md:py-6"
          >
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5 xl:items-end">
            {/* Tipo */}
            <div>
              <label className="text-sm text-stone-500 mb-2 block">Tipo de inmueble</label>
              <select
                value={type}
                onChange={(e) => updateParam('type', e.target.value)}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-base text-stone-900 focus:outline-none focus:border-stone-400"
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
              <label className="text-sm text-stone-500 mb-2 block">Operación</label>
              <select
                value={operation}
                onChange={(e) => updateParam('operation', e.target.value)}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-base text-stone-900 focus:outline-none focus:border-stone-400"
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
              <label className="text-sm text-stone-500 mb-2 block">Estado</label>
              <select
                value={status}
                onChange={(e) => updateParam('status', e.target.value)}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-base text-stone-900 focus:outline-none focus:border-stone-400"
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
              <label className="text-sm text-stone-500 mb-2 block">Precio mínimo</label>
              <input
                type="number"
                placeholder="Mín"
                value={minPrice}
                onChange={(e) => updateParam('minPrice', e.target.value)}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-base text-stone-900 focus:outline-none focus:border-stone-400"
              />
            </div>

            {/* Precio máximo */}
            <div>
              <label className="text-sm text-stone-500 mb-2 block">Precio máximo</label>
              <input
                type="number"
                placeholder="Máx"
                value={maxPrice}
                onChange={(e) => updateParam('maxPrice', e.target.value)}
                className="w-full bg-white border border-stone-200 px-4 py-3 text-base text-stone-900 focus:outline-none focus:border-stone-400"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
