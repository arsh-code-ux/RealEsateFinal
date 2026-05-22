import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { parseApiResponse } from '../utils/apiResponse'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
  const { showToast, setAuthUser } = useApp()
  const [userType, setUserType] = useState('user')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminPasskey: '',
  })

  const adminPasskey = import.meta.env.VITE_ADMIN_PASSKEY || 'ADMIN@2026'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const storeAuthUser = (authData) => {
    localStorage.setItem('auth-user', JSON.stringify(authData))
    setAuthUser(authData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.email.trim() || !formData.password.trim()) {
      showToast('Please fill in all fields', 'error')
      return
    }

    if (!formData.email.includes('@')) {
      showToast('Please enter a valid email address', 'error')
      return
    }

    if (formData.password.length < 6) {
      showToast('Password must be at least 6 characters', 'error')
      return
    }

    if (userType === 'admin') {
      if (!formData.adminPasskey.trim()) {
        showToast('Admin passkey is required', 'error')
        return
      }

      if (formData.adminPasskey !== adminPasskey) {
        showToast('Invalid admin passkey', 'error')
        return
      }
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const { ok, data, message } = await parseApiResponse(response)

      if (!ok || !data?.success) {
        throw new Error(data?.message || message || 'Login failed')
      }

      const displayName = data.user?.name || formData.email.split('@')[0]
      const resolvedUserType = data.user?.role === 'admin' ? 'admin' : 'user'
      const authData = {
        fullName: displayName,
        name: displayName,
        email: data.user?.email || formData.email,
        role: data.user?.role || 'tenant',
        userType: resolvedUserType,
        loginTime: new Date().toISOString(),
        token: data.accessToken,
        refreshToken: data.refreshToken,
      }

      storeAuthUser(authData)
      showToast(
        resolvedUserType === 'admin'
          ? `Welcome back, Admin!`
          : `Welcome back, ${displayName}!`,
        'success',
      )
      setTimeout(() => navigate('/'), 900)
    } catch (error) {
      showToast(error.message || 'Login failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page auth-page--login">
      <section className="auth-hero-panel">
        <div className="auth-hero-badge">Luxe Bangalore Access</div>
        <h1>Sign in with a cleaner, faster flow.</h1>
        <p>
          Switch between user and admin, fill the form quickly, and continue into the app without
          any broken or hidden states.
        </p>

        <div className="auth-hero-stats">
          <div>
            <strong>2</strong>
            <span>Roles</span>
          </div>
          <div>
            <strong>1</strong>
            <span>Fast login screen</span>
          </div>
          <div>
            <strong>0</strong>
            <span>Modal clutter</span>
          </div>
        </div>

      </section>

      <section className="auth-card-shell">
        <div className="auth-card">
          <div className="auth-card__top">
            <Link to="/" className="auth-back-link">
              ← Back to home
            </Link>
            <div className="auth-card__title-block">
              <span className="auth-kicker">Welcome back</span>
              <h2>Login</h2>
              <p>Choose your role and continue.</p>
            </div>
          </div>

          <div className="auth-role-switch" role="tablist" aria-label="Select account type">
            <button
              type="button"
              role="tab"
              aria-selected={userType === 'user'}
              className={`auth-role-switch__btn ${userType === 'user' ? 'is-active' : ''}`}
              onClick={() => setUserType('user')}
            >
              <span className="auth-role-icon">🏡</span>
              <span>
                <strong>User</strong>
                <small>Explore homes</small>
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={userType === 'admin'}
              className={`auth-role-switch__btn ${userType === 'admin' ? 'is-active' : ''}`}
              onClick={() => setUserType('admin')}
            >
              <span className="auth-role-icon">👨‍💼</span>
              <span>
                <strong>Admin</strong>
                <small>Manage listings</small>
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form auth-form--modern">
            <div className="auth-field-grid">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={userType === 'admin' ? 'admin@luxebangalore.com' : 'you@example.com'}
                  className="form-input"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="form-input"
                  disabled={loading}
                  autoComplete={userType === 'admin' ? 'current-password' : 'current-password'}
                />
                <p className="form-hint">
                  Use the email and password you created during signup.
                </p>
              </div>
            </div>

            {userType === 'admin' && (
              <div className="form-group auth-passkey-box">
                <label htmlFor="adminPasskey" className="form-label">
                  Admin passkey <span className="required">*</span>
                </label>
                <input
                  id="adminPasskey"
                  type="password"
                  name="adminPasskey"
                  value={formData.adminPasskey}
                  onChange={handleChange}
                  placeholder="Enter admin passkey"
                  className="form-input"
                  disabled={loading}
                />
                <p className="form-hint">Required only for admin login.</p>
              </div>
            )}

            <div className="form-row form-row--clean">
              <label className="checkbox-label">
                <input type="checkbox" disabled={loading} />
                <span>Remember me</span>
              </label>
              <a href="#" className="link-forget">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="form-submit form-submit--modern" disabled={loading}>
              {loading ? 'Signing in...' : `Sign in as ${userType === 'admin' ? 'Admin' : 'User'}`}
            </button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <div className="social-login social-login--modern">
            <button type="button" className="social-btn google-btn" disabled={loading}>
              <span className="social-btn__icon">G</span>
              Google
            </button>
            <button type="button" className="social-btn github-btn" disabled={loading}>
              <span className="social-btn__icon">⌘</span>
              GitHub
            </button>
          </div>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link to="/signup" className="link-auth">
              Sign up here
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Login
