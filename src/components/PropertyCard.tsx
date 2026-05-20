import type { Property, ViewMode } from '../types'
import { formatPrice } from '../utils/algorithms'

interface PropertyCardProps {
  property: Property
  viewMode: ViewMode
  onOpen: (property: Property) => void
}

export function PropertyCard({ property, viewMode, onOpen }: PropertyCardProps) {
  return (
    <article className={`property-card ${viewMode}`}>
      <img className="property-image" src={property.images[0]} alt={property.title} />
      <div className="property-card-body">
        <div className="property-topline">
          <span className="pill">{property.type}</span>
          <span className="rating">★ {property.rating.toFixed(1)}</span>
        </div>
        <h3>{property.title}</h3>
        <p className="muted">{property.location}</p>
        <p className="description">{property.description}</p>
        <div className="meta-row">
          <span>{property.furnished ? 'Fully furnished' : 'Unfurnished'}</span>
          <span>{property.nearby.join(' • ')}</span>
        </div>
        <div className="card-footer">
          <strong>{formatPrice(property.price)}</strong>
          <button type="button" onClick={() => onOpen(property)}>
            View details
          </button>
        </div>
      </div>
    </article>
  )
}
