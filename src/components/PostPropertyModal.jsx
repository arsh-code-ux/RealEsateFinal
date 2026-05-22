import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function PostPropertyModal({ onClose }) {
  const { showToast, addProperty } = useApp();
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    city: '',
    price: '',
    propertyType: 'Apartment',
    furnished: 'Unfurnished',
    amenities: '', // comma separated
    images: '', // comma separated URLs
    latitude: '',
    longitude: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      price: Number(form.price),
      coordinates: { latitude: Number(form.latitude), longitude: Number(form.longitude) },
      amenities: form.amenities.split(',').map((s) => s.trim()).filter(Boolean),
      images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      await addProperty(payload);
      showToast('Property posted successfully!', 'success');
      onClose();
    } catch (err) {
      console.error(err);
      showToast('Failed to post property.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-6 sm:py-10">
      <div className="min-h-full flex items-start justify-center sm:items-center">
        <div className="w-full max-w-lg max-h-[calc(100vh-3rem)] overflow-y-auto rounded-xl bg-white p-6 shadow-lg sm:max-h-[calc(100vh-5rem)]">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold">Add New Property</h2>
            <button type="button" onClick={onClose} className="text-2xl leading-none text-gray-500 hover:text-gray-800" aria-label="Close modal">
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" rows={3} required />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" required />
          <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full border p-2 rounded">
            <option>Apartment</option>
            <option>House</option>
          </select>
          <select name="furnished" value={form.furnished} onChange={handleChange} className="w-full border p-2 rounded">
            <option>Unfurnished</option>
            <option>Semi-furnished</option>
            <option>Fully furnished</option>
          </select>
          <input name="amenities" placeholder="Amenities (comma separated)" value={form.amenities} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="images" placeholder="Image URLs (comma separated)" value={form.images} onChange={handleChange} className="w-full border p-2 rounded" />
          <div className="grid grid-cols-2 gap-2">
            <input name="latitude" type="number" step="any" placeholder="Latitude" value={form.latitude} onChange={handleChange} className="border p-2 rounded" required />
            <input name="longitude" type="number" step="any" placeholder="Longitude" value={form.longitude} onChange={handleChange} className="border p-2 rounded" required />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded" disabled={loading}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>
              {loading ? 'Posting...' : 'Post Property'}
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
