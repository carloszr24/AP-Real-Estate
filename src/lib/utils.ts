import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function parseImages(images: string): string[] {
  try {
    return JSON.parse(images)
  } catch {
    return []
  }
}

export const PROPERTY_TYPES = ['piso', 'casa', 'local', 'terreno', 'oficina'] as const
export const PROPERTY_STATUSES = ['disponible', 'reservado', 'vendido'] as const

export const STATUS_LABELS: Record<string, string> = {
  disponible: 'Disponible',
  reservado: 'Reservado',
  vendido: 'Vendido',
}

export const TYPE_LABELS: Record<string, string> = {
  piso: 'Piso',
  casa: 'Casa',
  local: 'Local',
  terreno: 'Terreno',
  oficina: 'Oficina',
}
