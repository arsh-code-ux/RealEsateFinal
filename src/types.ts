export type PropertyType = 'PG' | 'Apartment' | 'House'

export interface Property {
  id: string
  title: string
  location: string
  type: PropertyType
  price: number
  rating: number
  furnished: boolean
  nearby: string[]
  amenities: string[]
  description: string
  reviews: Array<{
    author: string
    rating: number
    comment: string
  }>
  images: string[]
  contact: {
    phone: string
    email: string
    whatsapp: string
  }
}

export type ViewMode = 'grid' | 'list'
export type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc'
