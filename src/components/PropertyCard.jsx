import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/algorithms'

function PropertyCard(props) {
  const { slug, image, title, price, location, beds, baths, sqft, viewMode, _id, type, rating, description, furnished, amenities, images } = props
  const { isWishlisted, toggleWishlist } = useApp()
  const saved = isWishlisted(slug || _id)
  const navigate = useNavigate()

  const onHeartClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(slug || _id, title)
  }

  const handleOpen = (e) => {
    e.preventDefault()
    navigate(`/property/${slug || _id}`)
  }

  // If viewMode is provided, we use the Mahi-branch layout (Listings page)
  if (viewMode) {
    const mainImage = images && images.length > 0 ? images[0] : image
    return (
      <article className={`property-card ${viewMode}`}>
        <img className="property-image" src={mainImage} alt={title} />
        <div className="property-card-body">
          <div className="property-topline">
            <span className="pill">{type || 'Apartment'}</span>
            <span className="rating">★ {(rating || 4.5).toFixed(1)}</span>
          </div>
          <h3>{title}</h3>
          <p className="muted">{location}</p>
          <p className="description">{description ? (description.length > 100 ? description.substring(0, 100) + '...' : description) : `${beds} BHK in ${location}`}</p>
          <div className="meta-row">
            <span>{furnished || 'Semi-furnished'}</span>
            <span>{beds} Beds • {baths} Baths</span>
          </div>
          <div className="card-footer">
            <strong>{formatPrice(props.priceValue || parseInt(price.replace(/[^0-9]/g, '')) || 0)}</strong>
            <button type="button" onClick={handleOpen}>
              View details
            </button>
          </div>
        </div>
      </article>
    )
  }

  // Otherwise we use the original layout (Home page)
  return (
    <Link to={`/property/${slug || _id}`} className="card-property-wrap" style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className="card-property">
        <div className="card-property__image-wrap">
          <span className="card-property__verified">✓ Verified</span>
          <img src={image} alt={title} className="card-property__image" />
          <button
            type="button"
            className={`card-property__heart ${saved ? 'card-property__heart--active' : ''}`}
            onClick={onHeartClick}
            aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            {saved ? '♥' : '♡'}
          </button>
        </div>

        <div className="card-property__body">
          <p className="card-property__price">{price}</p>
          <p className="card-property__title">{title}</p>
          <p className="card-property__location">{location}</p>

          <div className="card-property__meta">
            <span>{beds} Beds</span>
            <span>{baths} Baths</span>
            <span>{sqft} sqft</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default PropertyCard
