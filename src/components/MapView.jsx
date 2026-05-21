import React from 'react';

/**
 * Simple map view component that displays an interactive map using OpenStreetMap.
 * It receives latitude and longitude coordinates and constructs an embed URL.
 */
export default function MapView({ coordinates, zoom = 14 }) {
  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    return <div className="map-view">Location data not available.</div>;
  }

  const { latitude, longitude } = coordinates;
  // Calculate a small bounding box around the point for the embed
  const delta = 0.005; // ~500m
  const left = longitude - delta;
  const right = longitude + delta;
  const top = latitude + delta;
  const bottom = latitude - delta;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${left},${bottom},${right},${top}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="map-view" style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', marginTop: '20px' }}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        src={src}
        allowFullScreen
        title="Property location map"
        style={{ border: 0 }}
      ></iframe>
    </div>
  );
}
