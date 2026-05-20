import type { Property } from '../types'
import { formatPrice } from '../utils/algorithms'

interface PropertyDetailsProps {
  property: Property
  imageIndex: number
  onImageChange: (index: number) => void
  onBack: () => void
}

export function PropertyDetails({
  property,
  imageIndex,
  onImageChange,
  onBack,
}: PropertyDetailsProps) {
  const currentImage = property.images[imageIndex]

  return (
    <section className="details-page">
      <button type="button" className="back-button" onClick={onBack}>
        Back to listings
      </button>

      <div className="details-grid">
        <div className="details-gallery">
          <img className="hero-image" src={currentImage} alt={property.title} />
          <div className="thumbnail-row">
            {property.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={index === imageIndex ? 'thumbnail active' : 'thumbnail'}
                onClick={() => onImageChange(index)}
              >
                <img src={image} alt={`${property.title} preview ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="details-panel">
          <div className="property-topline">
            <span className="pill">{property.type}</span>
            <span className="rating">★ {property.rating.toFixed(1)}</span>
          </div>
          <h1>{property.title}</h1>
          <p className="muted">{property.location}</p>
          <p className="price">{formatPrice(property.price)} / month</p>
          <p className="description large">{property.description}</p>

          <div className="detail-card">
            <h3>Amenities</h3>
            <div className="chip-grid">
              {property.amenities.map((amenity) => (
                <span className="chip" key={amenity}>
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          <div className="detail-card">
            <h3>Reviews</h3>
            <div className="review-list">
              {property.reviews.map((review) => (
                <div className="review-item" key={review.author + review.comment}>
                  <div>
                    <strong>{review.author}</strong>
                    <p className="muted">★ {review.rating.toFixed(1)}</p>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-card">
            <h3>Contact options</h3>
            <div className="contact-grid">
              <a href={`tel:${property.contact.phone}`}>Call {property.contact.phone}</a>
              <a href={`mailto:${property.contact.email}`}>Email enquiry</a>
              <a href={`https://wa.me/${property.contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
