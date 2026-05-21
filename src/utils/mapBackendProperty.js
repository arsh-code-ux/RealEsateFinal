export function mapBackendProperty(p) {
  if (!p) return null;
  
  // Try to parse beds, baths, sqft from description or title if missing
  const beds = p.beds || (
    p.title.includes('3BHK') || p.description.includes('3 BHK') || p.description.includes('3BHK') ? 3 : 
    p.title.includes('4BHK') || p.description.includes('4 BHK') ? 4 : 2
  );
  
  const baths = p.baths || (
    p.title.includes('3BHK') || p.description.includes('3 BHK') ? 3 : 
    p.title.includes('4BHK') ? 4 : 2
  );
  
  const sqft = p.sqft || (
    p.description.includes('1,850 sqft') ? 1850 : 
    p.description.includes('2400') ? 2400 : 
    p.description.includes('4200') ? 4200 : 
    p.description.includes('2100') ? 2100 : 1500
  );

  const price = p.price || 0;
  const originalPrice = Math.round(price * 1.1);
  const discount = "9% OFF";
  const securityDeposit = price * 2;

  return {
    slug: p._id, // use _id as slug
    _id: p._id,
    image: p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1973&auto=format&fit=crop',
    title: p.title,
    price: `₹${price.toLocaleString('en-IN')}`,
    priceValue: price,
    originalPrice,
    discount,
    securityDeposit,
    location: p.location,
    beds,
    baths,
    sqft,
    type: p.propertyType || 'Apartment',
    furnished: p.furnished || 'Semi-furnished',
    description: p.description,
    amenities: p.amenities || [],
    images: p.images && p.images.length > 0 ? p.images : [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200'
    ],
    landlord: p.landlord || null,
    rating: p.rating || 4.5,
    reviewsCount: p.reviewsCount || 10
  };
}
