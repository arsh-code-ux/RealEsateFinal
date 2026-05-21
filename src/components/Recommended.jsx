import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { properties } from '../data/properties'
import { filterProperties } from '../utils/filterProperties'
import PropertyCard from './PropertyCard'
import ScrollReveal from './ScrollReveal'

function Recommended() {
  const { searchFilters, setSearchFilters } = useApp()

  const filtered = useMemo(
    () => filterProperties(properties, searchFilters),
    [searchFilters],
  )

  const clearFilters = () => {
    setSearchFilters({ neighborhood: '', propertyType: '', budget: '' })
  }

  return (
    <section id="recommended" className="section section--dark">
      <div className="section-inner">
        <ScrollReveal>
          <div className="section-header">
            <div>
              <h2 className="section-title">AI-Recommended for You</h2>
              <p className="section-subtitle">
                {filtered.length === properties.length
                  ? 'Tailored listings based on your preferences.'
                  : `${filtered.length} home${filtered.length === 1 ? '' : 's'} match your search`}
              </p>
            </div>
            {filtered.length !== properties.length ? (
              <button type="button" className="link-text" onClick={clearFilters}>
                Clear filters
              </button>
            ) : (
              <Link to="/listings" className="link-text link-text--chevron" style={{ textDecoration: 'none' }}>
                View All <span aria-hidden>›</span>
              </Link>
            )}
          </div>
        </ScrollReveal>

        {filtered.length === 0 ? (
          <ScrollReveal>
            <div className="empty-results">
              <p>No homes match — try a different area or budget.</p>
              <button type="button" className="btn btn-outline" onClick={clearFilters}>
                Show all listings
              </button>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid-3">
            {filtered.map((item, i) => (
              <ScrollReveal key={item.slug} delay={i * 80}>
                <PropertyCard {...item} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Recommended
