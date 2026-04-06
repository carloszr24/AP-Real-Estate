export interface Property {
  id: string
  title: string
  price: number
  location: string
  type: string
  status: string
  description: string
  images: string
  fotocasaUrl?: string | null
  bedrooms?: number | null
  bathrooms?: number | null
  sqMeters?: number | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PropertyFilters {
  type?: string
  status?: string
  minPrice?: number
  maxPrice?: number
}

export interface PropertyFormData {
  title: string
  price: string
  location: string
  type: string
  status: string
  description: string
  images: string
  fotocasaUrl: string
  bedrooms: string
  bathrooms: string
  sqMeters: string
  featured: boolean
}
