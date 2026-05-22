import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Navbar() {
  const { wishlist, authUser, logout } = useApp()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const menuRef = useRef(null)

  const isHome = pathname === '/'
  const isListings = pathname === '/listings'
  const isAdmin = authUser?.userType === 'admin'
  const roleLabel = isAdmin ? 'Admin' : 'User'

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignIn = () => {
    navigate('/login')
  }

  const handlePostProperty = () => {
    if (!authUser || !isAdmin) {
      navigate('/login')
      return
    }
    navigate('/post-property')
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Luxe Bangalore
      </Link>

      <div className="navbar-links">
        <Link
          to="/listings"
          className={isHome || isListings ? 'navbar-link--active' : ''}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Browse
        </Link>
        <a href={isHome ? '/#trust' : '/#'}>Verified</a>
        <a href={isHome ? '/#neighborhoods' : '/#'}>Neighborhoods</a>
        <a href={isHome ? '/#cta' : '/#'}>Invest</a>
        {wishlist.length > 0 && (
          <a href="/#saved" className="navbar-wishlist">
            Saved <span className="navbar-wishlist__count">{wishlist.length}</span>
          </a>
        )}
      </div>

      <div className="navbar-actions">
        {authUser ? (
          <div className="user-menu-container" ref={menuRef}>
            <button
              type="button"
              className="user-menu-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className="user-avatar">{authUser.fullName ? authUser.fullName.charAt(0).toUpperCase() : authUser.email.charAt(0).toUpperCase()}</span>
              <span className="user-name">{authUser.fullName || authUser.email.split('@')[0]}</span>
              <span className={isAdmin ? 'admin-badge' : 'user-menu-type'}>{isAdmin ? '👨‍💼 Admin' : '🏡 User'}</span>
            </button>

            {showUserMenu && (
              <div className="user-menu-dropdown">
                <div className="user-menu-header">
                  <p className="user-menu-email">{authUser.email}</p>
                  <span className="user-menu-type">{roleLabel}</span>
                </div>
                <div className="user-menu-divider"></div>
                <a href="/#" className="user-menu-item">
                  👤 {isAdmin ? 'Admin Profile' : 'User Profile'}
                </a>
                <a href="/#" className="user-menu-item">
                  ❤️ My Wishlist ({wishlist.length})
                </a>
                {isAdmin && (
                  <a href="/#" className="user-menu-item">
                    📊 Dashboard
                  </a>
                )}
                <a href="/#" className="user-menu-item">
                  ⚙️ Settings
                </a>
                <div className="user-menu-divider"></div>
                <button className="user-menu-item logout-item" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button type="button" className="btn btn-ghost" onClick={handleSignIn}>
            Sign In
          </button>
        )}

        {/* Post Property button - only visible for admins */}
        {isAdmin && (
          <button type="button" className="btn btn-primary" onClick={handlePostProperty}>
            Post Property
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
