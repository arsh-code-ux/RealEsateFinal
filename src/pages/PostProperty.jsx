import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function PostProperty() {
  const navigate = useNavigate()
  const { authUser, showToast, addProperty } = useApp()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    city: '',
    price: '',
    propertyType: 'Apartment',
    furnished: 'Unfurnished',
    amenities: '',
    images: '',
    latitude: '',
    longitude: '',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!authUser) {
      navigate('/login')
      return
    }

    if (authUser.userType !== 'admin') {
      showToast('Only admin users can post properties.', 'error')
      navigate('/')
    }
  }, [authUser, navigate, showToast])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const payload = {
      ...form,
      price: Number(form.price),
      coordinates: {
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
      },
      amenities: form.amenities.split(',').map((item) => item.trim()).filter(Boolean),
      images: form.images.split(',').map((item) => item.trim()).filter(Boolean),
    }

    try {
      await addProperty(payload)
      showToast('Property posted successfully!', 'success')
      navigate('/listings')
    } catch (error) {
      console.error(error)
      showToast(error.message || 'Failed to post property.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.16),_transparent_34%),linear-gradient(180deg,#f4f6f9_0%,#eef2ff_100%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <section className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.28)]">
        <div className="border-b border-slate-200 bg-slate-950 px-6 py-5 text-white sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-300">Admin Workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Post a new property</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-300">
            Use a clean full-page form to add a property without anything extra blocking the screen.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white" required />
            <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white" required />
          </div>

          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white" rows={5} required />

          <div className="grid gap-4 sm:grid-cols-2">
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white" required />
            <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white" required />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white">
              <option>Apartment</option>
              <option>House</option>
            </select>
            <select name="furnished" value={form.furnished} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white">
              <option>Unfurnished</option>
              <option>Semi-furnished</option>
              <option>Fully furnished</option>
            </select>
          </div>

          <input name="amenities" placeholder="Amenities (comma separated)" value={form.amenities} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white" />
          <input name="images" placeholder="Image URLs (comma separated)" value={form.images} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white" />

          <div className="grid gap-4 sm:grid-cols-2">
            <input name="latitude" type="number" step="any" placeholder="Latitude" value={form.latitude} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white" required />
            <input name="longitude" type="number" step="any" placeholder="Longitude" value={form.longitude} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white" required />
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Link to="/" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Cancel
            </Link>
            <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={loading}>
              {loading ? 'Posting...' : 'Post Property'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default PostProperty