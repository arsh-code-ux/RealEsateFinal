import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Auth.css'

function Login() {
  const navigate = useNavigate()
    const { showToast, setAuthUser } = useApp()
    const [userType, setUserType] = useState('user') // 'user' or 'admin'
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      adminPasskey: '',
    })
    
    const adminPasskey = import.meta.env.VITE_ADMIN_PASSKEY || 'ADMIN@2026'
  
    const handleChange = (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      // Validation
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
  
      // Admin passkey validation
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
        const data = await response.json()
        if (!data.success) {
          showToast(data.message || 'Login failed. Please check credentials.', 'error')
          return
        }
  
        // Store auth data in localStorage
        const authData = {
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          userType: data.user.role === 'admin' ? 'admin' : 'user',
          loginTime: new Date().toISOString(),
          token: data.accessToken,
          refreshToken: data.refreshToken,
        }
        localStorage.setItem('auth-user', JSON.stringify(authData))
        setAuthUser(authData)
  
        showToast(
          authData.userType === 'admin'
            ? `Welcome back, Admin! 👨‍💼`
            : `Welcome back, ${authData.name || authData.email.split('@')[0]}! 🏡`,
          'success',
        )
  
        // Redirect based on user type
        setTimeout(() => {
          navigate(authData.userType === 'admin' ? '/admin-dashboard' : '/')
        }, 1000)
      } catch (error) {
        showToast('Login failed. Please try again.', 'error')
      } finally {
        setLoading(false)
      }
    }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account</p>
        </div>

        {/* User Type Toggle */}
        <div className="auth-type-toggle">
          <button
            type="button"
            className={`type-btn ${userType === 'user' ? 'active' : ''}`}
            onClick={() => setUserType('user')}
          >
            🏡 User
          </button>
          <button
            type="button"
            className={`type-btn ${userType === 'admin' ? 'active' : ''}`}
            onClick={() => setUserType('admin')}
          >
            👨‍💼 Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
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
            />
          </div>

          {/* Password Field */}
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
            />
            <p className="form-hint">
              {userType === 'admin' ? 'Demo: admin@luxe / Password: 123456' : 'Demo: user@luxe / Password: 123456'}
            </p>
          </div>

          {/* Admin Passkey Field (only for admin) */}
          {userType === 'admin' && (
            <div className="form-group">
              <label htmlFor="adminPasskey" className="form-label">
                Admin Passkey <span className="required">*</span>
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
              <p className="form-hint">Special passkey required for admin access</p>
            </div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="form-row">
            <label className="checkbox-label">
              <input type="checkbox" disabled={loading} />
              <span>Remember me</span>
            </label>
            <a href="#" className="link-forget">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? 'Signing in...' : `Sign In as ${userType === 'admin' ? 'Admin' : 'User'}`}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* Social Login */}
        <div className="social-login">
          <button type="button" className="social-btn google-btn" disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
            Google
          </button>
          <button type="button" className="social-btn github-btn" disabled={loading}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.547 2.914 1.186.092-.924.35-1.546.636-1.903-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.268.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
            GitHub
          </button>
        </div>

        {/* Sign Up Link */}
        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup" className="link-auth">
            Sign up here
          </Link>
        </p>
      </div>

      {/* Illustration Side */}
      <div className="auth-illustration">
        <div className="illustration-content">
          <div className="illustration-emoji">🔐</div>
          <h2>Secure Login</h2>
          <p>Your information is protected with enterprise-grade security</p>
        </div>
      </div>
    </div>
  )
}

export default Login
