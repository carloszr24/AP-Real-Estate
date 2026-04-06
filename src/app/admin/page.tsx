'use client'

import { useEffect, useState } from 'react'
import { Property } from '@/types'
import { formatPrice, PROPERTY_STATUSES, PROPERTY_TYPES, STATUS_LABELS, TYPE_LABELS } from '@/lib/utils'
import { cn } from '@/lib/utils'

const emptyForm = {
  title: '',
  price: '',
  location: '',
  type: 'piso',
  status: 'disponible',
  description: '',
  images: '',
  fotocasaUrl: '',
  bedrooms: '',
  bathrooms: '',
  sqMeters: '',
  featured: false,
}

const statusColors: Record<string, string> = {
  disponible: 'text-emerald-600 bg-emerald-50',
  reservado: 'text-amber-600 bg-amber-50',
  vendido: 'text-stone-500 bg-stone-100',
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [pwError, setPwError] = useState(false)

  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((r) => r.json())
      .then((data: { authed?: boolean }) => {
        if (data.authed) setAuthed(true)
      })
      .catch(() => {})
  }, [])

  const login = async () => {
    setPwError(false)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        setAuthed(true)
        setPassword('')
      } else {
        setPwError(true)
      }
    } catch {
      setPwError(true)
    }
  }

  // Fetch
  const fetchProperties = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/propiedades', { credentials: 'include' })
      const data = await res.json()
      setProperties(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authed) fetchProperties()
  }, [authed])

  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const openCreate = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const openEdit = (p: Property) => {
    const imgs = (() => { try { return JSON.parse(p.images).join('\n') } catch { return p.images } })()
    setForm({
      title: p.title,
      price: p.price.toString(),
      location: p.location,
      type: p.type,
      status: p.status,
      description: p.description,
      images: imgs,
      fotocasaUrl: p.fotocasaUrl || '',
      bedrooms: p.bedrooms?.toString() || '',
      bathrooms: p.bathrooms?.toString() || '',
      sqMeters: p.sqMeters?.toString() || '',
      featured: p.featured,
    })
    setEditingId(p.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const imagesArray = form.images.split('\n').map(s => s.trim()).filter(Boolean)
      const payload = { ...form, images: imagesArray }
      const url = editingId ? `/api/propiedades/${editingId}` : '/api/propiedades'
      const method = editingId ? 'PUT' : 'POST'
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })
      setShowForm(false)
      setEditingId(null)
      await fetchProperties()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/propiedades/${id}`, { method: 'DELETE', credentials: 'include' })
    setDeleteId(null)
    await fetchProperties()
  }

  // PASSWORD SCREEN
  if (!authed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-3xl font-light text-stone-900 mb-8 text-center">Acceso admin</h1>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setPwError(false) }}
              onKeyDown={(e) => e.key === 'Enter' && login()}
              placeholder="Contraseña"
              className={cn(
                'w-full border px-4 py-3 text-sm focus:outline-none transition-colors',
                pwError ? 'border-red-300 bg-red-50' : 'border-stone-200 focus:border-stone-900'
              )}
            />
            {pwError && <p className="text-red-500 text-xs">Contraseña incorrecta</p>}
            <button onClick={login} className="btn-primary w-full py-3 text-sm">
              Entrar
            </button>
            {process.env.NODE_ENV === 'development' && (
              <p className="text-xs text-stone-400 text-center">
                Local: usa la variable <code className="bg-stone-100 px-1">ADMIN_PASSWORD</code> de <code className="bg-stone-100 px-1">.env</code>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-light text-stone-900">Propiedades</h1>
          <p className="text-stone-400 text-sm mt-1">{properties.length} inmuebles en total</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={async () => {
              await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
              setAuthed(false)
            }}
            className="text-xs text-stone-500 hover:text-stone-900 transition-colors"
          >
            Cerrar sesión
          </button>
          <button onClick={openCreate} className="btn-primary text-xs px-5 py-2.5">
            + Nueva propiedad
          </button>
        </div>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white border border-stone-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium text-stone-900">
              {editingId ? 'Editar propiedad' : 'Nueva propiedad'}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-stone-400 hover:text-stone-900 text-xl leading-none">×</button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="text-xs text-stone-500 block mb-1.5">Título *</label>
                <input name="title" value={form.title} onChange={handleChange} required
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900" />
              </div>

              <div>
                <label className="text-xs text-stone-500 block mb-1.5">Precio (€) *</label>
                <input name="price" value={form.price} onChange={handleChange} required type="number"
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900" />
              </div>

              <div>
                <label className="text-xs text-stone-500 block mb-1.5">Ubicación *</label>
                <input name="location" value={form.location} onChange={handleChange} required
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900" />
              </div>

              <div>
                <label className="text-xs text-stone-500 block mb-1.5">Tipo</label>
                <select name="type" value={form.type} onChange={handleChange}
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900 bg-white">
                  {PROPERTY_TYPES.map(t => (
                    <option key={t} value={t}>{TYPE_LABELS[t]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-stone-500 block mb-1.5">Estado</label>
                <select name="status" value={form.status} onChange={handleChange}
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900 bg-white">
                  {PROPERTY_STATUSES.map(s => (
                    <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-stone-500 block mb-1.5">m²</label>
                <input name="sqMeters" value={form.sqMeters} onChange={handleChange} type="number"
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900" />
              </div>

              <div>
                <label className="text-xs text-stone-500 block mb-1.5">Habitaciones</label>
                <input name="bedrooms" value={form.bedrooms} onChange={handleChange} type="number"
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900" />
              </div>

              <div>
                <label className="text-xs text-stone-500 block mb-1.5">Baños</label>
                <input name="bathrooms" value={form.bathrooms} onChange={handleChange} type="number"
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900" />
              </div>

              <div>
                <label className="text-xs text-stone-500 block mb-1.5">Link Fotocasa</label>
                <input name="fotocasaUrl" value={form.fotocasaUrl} onChange={handleChange} type="url"
                  placeholder="https://www.fotocasa.es/..."
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900" />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-stone-500 block mb-1.5">Descripción *</label>
                <textarea name="description" value={form.description} onChange={handleChange} required rows={4}
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900 resize-none" />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-stone-500 block mb-1.5">
                  URLs de imágenes <span className="text-stone-400">(una por línea)</span>
                </label>
                <textarea name="images" value={form.images} onChange={handleChange} rows={3}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:outline-none focus:border-stone-900 resize-none font-mono" />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" name="featured" id="featured"
                  checked={form.featured} onChange={handleChange}
                  className="accent-stone-900 w-4 h-4" />
                <label htmlFor="featured" className="text-sm text-stone-600 cursor-pointer">
                  Destacar en home
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
              <button type="submit" disabled={saving} className="btn-primary text-xs px-6 py-2.5 disabled:opacity-50">
                {saving ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear propiedad'}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="text-sm text-stone-500 hover:text-stone-900 transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white border border-stone-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-stone-400 text-sm">Cargando...</div>
        ) : properties.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-stone-400 mb-4">No hay propiedades aún.</p>
            <button onClick={openCreate} className="btn-primary text-xs px-5 py-2.5">
              Crear la primera
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  {['Título', 'Precio', 'Tipo', 'Estado', 'Ubicación', 'Dest.', 'Acciones'].map(h => (
                    <th key={h} className="text-left text-xs text-stone-500 font-medium px-4 py-3 tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-stone-900 line-clamp-1 max-w-[200px] block">
                        {p.title}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-600 whitespace-nowrap">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-4 py-3 text-stone-500">
                      {TYPE_LABELS[p.type] || p.type}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn('text-xs px-2 py-0.5 font-medium', statusColors[p.status] || '')}>
                        {STATUS_LABELS[p.status] || p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-stone-500 text-xs max-w-[150px] truncate">
                      {p.location}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {p.featured ? '⭐' : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => openEdit(p)}
                          className="text-xs text-stone-500 hover:text-stone-900 transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setDeleteId(p.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors"
                        >
                          Borrar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
          <div className="bg-white p-8 max-w-sm w-full">
            <h3 className="font-medium text-stone-900 mb-2">¿Confirmar eliminación?</h3>
            <p className="text-stone-500 text-sm mb-6">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteId)}
                className="btn-primary text-xs px-5 py-2.5 bg-red-600 hover:bg-red-700"
              >
                Eliminar
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
