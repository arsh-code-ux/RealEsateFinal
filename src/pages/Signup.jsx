import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { parseApiResponse } from '../utils/apiResponse'
import './Auth.css'

function Signup() {
  const navigate = useNavigate()
  const { showToast, setAuthUser } = useApp()
  const [userType, setUserType] = useState('user')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    adminPasskey: '',
    agreeTerms: false,
  })

  const adminPasskey = import.meta.env.VITE_ADMIN_PASSKEY || 'ADMIN@2026'

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const storeAuthUser = (authData) => {
    localStorage.setItem('auth-user', JSON.stringify(authData))
    setAuthUser(authData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      showToast('Please fill in all required fields', 'error')
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

    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error')
      return
    }

    if (!formData.agreeTerms) {
      showToast('Please agree to the terms and conditions', 'error')
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: userType === 'admin' ? 'admin' : 'tenant',
          adminPasskey: formData.adminPasskey,
        }),
      })

      const { ok, data, message } = await parseApiResponse(response)

      if (!ok || !data?.success) {
        showToast(data?.message || message || 'Registration failed. Please try again.', 'error')
        return
      }

      const authUser = {
        fullName: data.user?.name,
        email: data.user?.email,
        name: data.user?.name,
        role: data.user?.role,
        userType: data.user?.role === 'admin' ? 'admin' : 'user',
        createdAt: data.user?.createdAt,
        token: data.accessToken,
        refreshToken: data.refreshToken,
      }

      storeAuthUser(authUser)
      showToast(`Welcome to Luxe Bangalore, ${authUser.name.split(' ')[0]}!`, 'success')
      setTimeout(() => navigate('/'), 900)
    } catch (error) {
      showToast(error.message || 'Signup failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page auth-page--signup">
      <section className="auth-hero-panel auth-hero-panel--signup">
        <div className="auth-hero-badge">Create your account</div>
        <h1>Join Luxe Bangalore with a smoother signup experience.</h1>
        <p>
          Register as a user or admin, keep the same feature set, and get a polished screen that
          feels built for real use.
        </p>

        <div className="auth-hero-stats">
          <div>
            <strong>2</strong>
            <span>Account types</span>
          </div>
          <div>
            <strong>1</strong>
            <span>Simple form flow</span>
          </div>
          <div>
            <strong>100%</strong>
            <span>Feature parity</span>
          </div>
        </div>

        <div className="auth-note-card">
          <h2>What you keep</h2>
          <ul>
            <li>User/Admin toggle</li>
            <li>Real backend signup</li>
            <li>Admin passkey check for admin accounts</li>
          </ul>
        </div>
      </section>

      <section className="auth-card-shell">
        <div className="auth-card">
          <div className="auth-card__top">
            <Link to="/" className="auth-back-link">
              ← Back to home
            </Link>
            <div className="auth-card__title-block">
              <span className="auth-kicker">Get started</span>
              <h2>Create account</h2>
              <p>Register and choose your role.</p>
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
                <small>Find homes</small>
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
                <small>Post listings</small>
              </span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form auth-form--modern">
            <div className="auth-field-grid">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input"
                  disabled={loading}
                  autoComplete="name"
                />
              </div>

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
                  placeholder="you@example.com"
                  className="form-input"
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="auth-field-grid">
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone number {userType === 'admin' && <span className="required">*</span>}
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="form-input"
                  disabled={loading}
                  autoComplete="tel"
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
                  autoComplete="new-password"
                />
                <p className="form-hint">At least 6 characters with mix of letters and numbers.</p>
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
                  autoComplete="off"
                />
                <p className="form-hint">Admin accounts require the correct passkey before signup.</p>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="form-input"
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            <label className="checkbox-label full-width auth-terms-box">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                disabled={loading}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="link-inline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="link-inline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button type="submit" className="form-submit form-submit--modern" disabled={loading}>
              {loading ? 'Creating account...' : `Sign up as ${userType === 'admin' ? 'Admin' : 'User'}`}
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
            Already have an account?{' '}
            <Link to="/login" className="link-auth">
              Sign in here
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

export default Signup
