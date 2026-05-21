import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Pagination } from '../components/Pagination'
import PropertyCard from '../components/PropertyCard'
import { quickSort, editDistance, formatPrice } from '../utils/algorithms'
import { mapBackendProperty } from '../utils/mapBackendProperty'
import './Listings.css'

const PAGE_SIZE = 4

function Listings() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [location, setLocation] = useState('All Locations')
  const [propertyType, setPropertyType] = useState('All Types')
  const [budget, setBudget] = useState('')
  const [ratingFilter, setRatingFilter] = useState('0')
  const [nearbyFilter, setNearbyFilter] = useState('All')
  const [furnishedOnly, setFurnishedOnly] = useState(false)
  const [sortOption, setSortOption] = useState('recommended')
  const [viewMode, setViewMode] = useState('grid')
  const [page, setPage] = useState(1)

  // Fetch properties from backend
  useEffect(() => {
    setLoading(true)
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const mapped = data.data.map(mapBackendProperty)
          setProperties(mapped)
        } else {
          setError('Failed to fetch properties')
        }
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchText), 300)
    return () => clearTimeout(timer)
  }, [searchText])

  const typeOptions = ['All Types', ...new Set(properties.map((p) => p.type))]
  const allLocations = Array.from(new Set(properties.map((p) => p.location)))
  const nearbyOptions = Array.from(new Set(properties.flatMap((p) => p.amenities || [])))

  const locationSuggestions = useMemo(() => {
    if (!searchText || searchText.length < 2) return []
    return allLocations.filter(
      (loc) => loc.toLowerCase().includes(searchText.toLowerCase()) && loc !== location
    )
  }, [searchText, allLocations, location])

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      const matchesSearch =
        !debouncedSearch ||
        property.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        property.location.toLowerCase().includes(debouncedSearch.toLowerCase())

      const matchesLocation = location === 'All Locations' || property.location === location
      const matchesType = propertyType === 'All Types' || property.type === propertyType
      const matchesBudget = !budget || property.priceValue <= Number(budget)
      const matchesRating = (property.rating || 0) >= Number(ratingFilter)
      const matchesFurnished = !furnishedOnly || property.furnished === 'Fully furnished' || property.furnished === 'Furnished'
      const matchesNearby = nearbyFilter === 'All' || (property.amenities && property.amenities.includes(nearbyFilter))

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesBudget &&
        matchesRating &&
        matchesFurnished &&
        matchesNearby
      )
    })

    if (sortOption === 'price-asc') {
      result = quickSort(result, (left, right) => left.priceValue - right.priceValue)
    } else if (sortOption === 'price-desc') {
      result = quickSort(result, (left, right) => right.priceValue - left.priceValue)
    } else if (sortOption === 'rating-desc') {
      result = quickSort(result, (left, right) => (right.rating || 0) - (left.rating || 0))
    } else {
      const ranked = result.map((property) => ({
        property,
        score: editDistance(debouncedSearch || 'property', `${property.title} ${property.location}`),
      }))

      result = quickSort(ranked, (left, right) => left.score - right.score).map(({ property }) => property)
    }

    return result
  }, [properties, budget, debouncedSearch, furnishedOnly, location, nearbyFilter, propertyType, ratingFilter, sortOption])

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE))
  const paginatedProperties = filteredProperties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [budget, debouncedSearch, furnishedOnly, location, nearbyFilter, propertyType, ratingFilter, sortOption, viewMode])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])


  if (loading) {
    return (
      <div className="app-shell" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <p>Loading properties...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-shell">
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <main className="app-shell">
      <Link to="/" className="back-button" style={{ display: 'inline-block', marginBottom: '20px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>
        ← Back to home
      </Link>
      <header className="topbar">
        <div>
          <p className="eyebrow">Property Browsing Module</p>
          <h1>Discover listings, compare options, and book faster</h1>
          <p className="subcopy">
            Grid or list layouts, pagination, live filters, and quick detail access powered by edit-distance suggestions and Quick Sort.
          </p>
        </div>
        <div className="stats-row">
          <div>
            <strong>{properties.length}</strong>
            <span>Total listings</span>
          </div>
          <div>
            <strong>{filteredProperties.length}</strong>
            <span>Matching filters</span>
          </div>
          <div>
            <strong>
              {filteredProperties.length > 0
                ? formatPrice(Math.min(...filteredProperties.map((property) => property.priceValue)))
                : 'N/A'}
            </strong>
            <span>Lowest price</span>
          </div>
        </div>
      </header>

      <section className="controls-panel">
        <div className="search-stack">
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by location, property type, or budget keywords"
          />
          {locationSuggestions.length > 0 && (
            <div className="suggestions">
              {locationSuggestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => setLocation(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="filter-grid">
          <label>
            Location
            <select value={location} onChange={(event) => setLocation(event.target.value)}>
              <option value="All Locations">All Locations</option>
              {allLocations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Property type
            <select value={propertyType} onChange={(event) => setPropertyType(event.target.value)}>
              {typeOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            Max budget
            <input type="number" min="0" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="60000" />
          </label>

          <label>
            Min rating
            <select value={ratingFilter} onChange={(event) => setRatingFilter(event.target.value)}>
              <option value="0">Any</option>
              <option value="4">4.0+</option>
              <option value="4.5">4.5+</option>
              <option value="4.8">4.8+</option>
            </select>
          </label>

          <label>
            Nearby/Amenities
            <select value={nearbyFilter} onChange={(event) => setNearbyFilter(event.target.value)}>
              <option value="All">All</option>
              {nearbyOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="checkbox-field">
            <span>Furnished only</span>
            <input type="checkbox" checked={furnishedOnly} onChange={(event) => setFurnishedOnly(event.target.checked)} />
          </label>

          <label>
            Sort by
            <select value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="price-asc">Low to high</option>
              <option value="price-desc">High to low</option>
              <option value="rating-desc">Rating sort</option>
            </select>
          </label>
        </div>

        <div className="toolbar-row">
          <div className="view-toggle">
            <button type="button" className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>
              Grid view
            </button>
            <button type="button" className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>
              List view
            </button>
          </div>
          <div className="result-summary">Showing {paginatedProperties.length} of {filteredProperties.length} properties</div>
        </div>
      </section>

      <section className={`listing-grid ${viewMode}`}>
        {paginatedProperties.map((property) => (
          <PropertyCard key={property.slug} {...property} viewMode={viewMode} />
        ))}
      </section>

      {filteredProperties.length === 0 && <div className="empty-state">No properties match the current filters.</div>}

      <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
    </main>
  )
}

export default Listings
