import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react'
import { mapBackendProperty } from '../utils/mapBackendProperty'

const WISHLIST_KEY = 'luxe-wishlist'
const AUTH_KEY = 'auth-user'

function loadWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadAuthUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)
    const token = parsed?.token

    // Old demo sessions stored a fake token like token_xxx.
    // Real backend sessions use JWTs with three dot-separated parts.
    if (typeof token !== 'string' || token.split('.').length !== 3) {
      localStorage.removeItem(AUTH_KEY)
      return null
    }

    return parsed
  } catch {
    return null
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist)
  const [authUser, setAuthUser] = useState(loadAuthUser)
  const [toast, setToast] = useState(null)
  const [properties, setProperties] = useState([])
  const [propertiesLoading, setPropertiesLoading] = useState(true)
  const [searchFilters, setSearchFilters] = useState({
    neighborhood: '',
    propertyType: '',
    budget: '',
  })

// Utility to fetch all properties and update state
  const fetchAllProperties = async () => {
    try {
      const res = await fetch('/api/properties')
      const data = await res.json()
      if (data.success) {
        setProperties(data.data.map(mapBackendProperty))
      }
    } catch (err) {
      console.error('Error fetching properties from backend:', err)
    } finally {
      setPropertiesLoading(false)
    }
  };

  // Load properties on mount
  useEffect(() => {
    fetchAllProperties();
  }, []);

  // Function to add a new property (admin only)
  const addProperty = async (property) => {
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(authUser?.token && { Authorization: `Bearer ${authUser.token}` }),
        },
        body: JSON.stringify(property),
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to add property');
      }
      // Refresh property list after successful post
      await fetchAllProperties();
      showToast('Property posted successfully', 'success');
    } catch (err) {
      console.error('Add property error:', err);
      showToast(err.message || 'Failed to post property', 'error');
      throw err;
    }
  };



  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() })
    setTimeout(() => setToast(null), 3200)
  }, [])

  const toggleWishlist = useCallback((slug, title) => {
    setWishlist((prev) => {
      const isRemoving = prev.includes(slug)
      const next = isRemoving ? prev.filter((s) => s !== slug) : [...prev, slug]
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next))
      showToast(
        isRemoving ? `${title} removed from wishlist` : `❤️ ${title} saved to wishlist`,
        isRemoving ? 'info' : 'success',
      )
      return next
    })
  }, [showToast])

  const isWishlisted = useCallback((slug) => wishlist.includes(slug), [wishlist])

  const applySearch = useCallback((filters) => {
    setSearchFilters(filters)
    showToast('Showing matching homes below ✨', 'success')
    document.getElementById('recommended')?.scrollIntoView({ behavior: 'smooth' })
  }, [showToast])

  const logout = useCallback(() => {
    setAuthUser(null)
    localStorage.removeItem(AUTH_KEY)
    showToast('Logged out successfully', 'success')
  }, [showToast])

  const value = useMemo(
    () => ({
      wishlist,
      toggleWishlist,
      isWishlisted,
      toast,
      showToast,
      searchFilters,
      setSearchFilters,
      applySearch,
      authUser,
      setAuthUser,
      logout,
      properties,
      propertiesLoading,
      addProperty,
    }),
    [wishlist, toggleWishlist, isWishlisted, toast, showToast, searchFilters, applySearch, authUser, logout, properties, propertiesLoading, addProperty],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

