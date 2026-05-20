import { useEffect, useMemo, useState } from 'react'
import { Pagination } from './components/Pagination'
import { PropertyCard } from './components/PropertyCard'
import { PropertyDetails } from './components/PropertyDetails'
import { properties } from './data/properties'
import type { Property, SortOption, ViewMode } from './types'
import { editDistance, formatPrice, quickSort } from './utils/algorithms'
import './App.css'

const PAGE_SIZE = 4

const typeOptions = ['All Types', 'PG', 'Apartment', 'House'] as const

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [page, setPage] = useState(1)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [searchText, setSearchText] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [location, setLocation] = useState('All Locations')
  const [propertyType, setPropertyType] = useState<(typeof typeOptions)[number]>('All Types')
  const [budget, setBudget] = useState('')
  const [ratingFilter, setRatingFilter] = useState('0')
  const [furnishedOnly, setFurnishedOnly] = useState(false)
  const [nearbyFilter, setNearbyFilter] = useState('All')
  const [sortOption, setSortOption] = useState<SortOption>('recommended')
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchText), 300)
    return () => window.clearTimeout(timer)
  }, [searchText])

  const locationSuggestions = useMemo(() => {
    if (!debouncedSearch.trim()) return []

    const uniqueLocations = Array.from(new Set(properties.map((property) => property.location)))
    return uniqueLocations
      .map((item) => ({ item, score: editDistance(debouncedSearch, item) }))
      .sort((left, right) => left.score - right.score)
      .slice(0, 4)
      .map(({ item }) => item)
  }, [debouncedSearch])

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      const matchesSearch =
        !debouncedSearch ||
        [property.title, property.location, property.type, property.amenities.join(' ')].join(' ').toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        editDistance(debouncedSearch, property.location) <= 6

      const matchesLocation = location === 'All Locations' || property.location === location
      const matchesType = propertyType === 'All Types' || property.type === propertyType
      const matchesBudget = !budget || property.price <= Number(budget)
      const matchesRating = property.rating >= Number(ratingFilter)
      const matchesFurnished = !furnishedOnly || property.furnished
      const matchesNearby = nearbyFilter === 'All' || property.nearby.includes(nearbyFilter)

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
      result = quickSort(result, (left, right) => left.price - right.price)
    } else if (sortOption === 'price-desc') {
      result = quickSort(result, (left, right) => right.price - left.price)
    } else if (sortOption === 'rating-desc') {
      result = quickSort(result, (left, right) => right.rating - left.rating)
    } else {
      const ranked = result.map((property) => ({
        property,
        score: editDistance(debouncedSearch || 'property', `${property.title} ${property.location}`),
      }))

      result = quickSort(ranked, (left, right) => left.score - right.score).map(({ property }) => property)
    }

    return result
  }, [budget, debouncedSearch, furnishedOnly, location, nearbyFilter, propertyType, ratingFilter, sortOption])

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE))
  const paginatedProperties = filteredProperties.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [budget, debouncedSearch, furnishedOnly, location, nearbyFilter, propertyType, ratingFilter, sortOption, viewMode])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  useEffect(() => {
    if (selectedProperty) setImageIndex(0)
  }, [selectedProperty])

  const allLocations = Array.from(new Set(properties.map((property) => property.location)))
  const nearbyOptions = Array.from(new Set(properties.flatMap((property) => property.nearby)))

  if (selectedProperty) {
    return (
      <main className="app-shell detail-shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">Property Browsing Module</p>
            <h1>Find your next place with smart search</h1>
          </div>
        </header>
        <PropertyDetails
          property={selectedProperty}
          imageIndex={imageIndex}
          onImageChange={setImageIndex}
          onBack={() => setSelectedProperty(null)}
        />
      </main>
    )
  }

  return (
    <main className="app-shell">
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
                ? formatPrice(Math.min(...filteredProperties.map((property) => property.price)))
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
            <select value={propertyType} onChange={(event) => setPropertyType(event.target.value as typeof propertyType)}>
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
            Nearby
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
            <select value={sortOption} onChange={(event) => setSortOption(event.target.value as SortOption)}>
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
          <PropertyCard key={property.id} property={property} viewMode={viewMode} onOpen={setSelectedProperty} />
        ))}
      </section>

      {filteredProperties.length === 0 && <div className="empty-state">No properties match the current filters.</div>}

      <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />
    </main>
  )
}

export default App
