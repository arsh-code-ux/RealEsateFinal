require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Property = require('./models/Property');

console.log('Using MONGO_URI from backend/.env:', process.env.MONGO_URI);

const seedData = async () => {
  try {
    mongoose.connection.on('connected', () => console.log('Backend Mongoose connected!'));
    mongoose.connection.on('error', (err) => console.error('Backend Mongoose connection error:', err));
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });
    console.log('Connected to MongoDB. Seeding...');

    // Clear existing data
    await User.deleteMany({ role: 'landlord' });
    await Property.deleteMany({});

    // Create a dummy landlord
    const landlord = await User.create({
      name: 'Anshika Chandra',
      email: 'anshika@luxe.com',
      password: 'password123',
      role: 'landlord'
    });
    console.log('Landlord created:', landlord._id);

    const baseAmenities = [
      'Gigabit Fiber Wi-Fi', 'Private Mini-Gym', '100% Power Backup', 
      'EV-Ready Parking', '24/7 Biometric Security', 'Weekly Housekeeping',
      'Lift', 'Power backup', 'Gym', 'Pool', 'Parking', 'Garden', 
      'Smart home', 'Servant quarter', 'Security', 'Club access',
      'Balcony', 'Clubhouse', 'Visitor parking', 'CCTV', 'Water softener'
    ];

    const generateAmenities = () => {
      const shuffled = baseAmenities.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.floor(Math.random() * 5) + 3);
    };

    const dummyProperties = [
      {
        title: 'Modern Luxury Stay in Koramangala',
        description: 'Experience a new standard of high-end living in the heart of Koramangala 4th Block. This meticulously designed 3-BHK apartment caters specifically to the needs of tech professionals and expatriates seeking both convenience and luxury. Featuring a smart home system, high-speed fiber connectivity, and bespoke furniture, this residence bridges the gap between professional efficiency and domestic comfort.',
        location: 'Koramangala, Bangalore',
        city: 'Bangalore',
        price: 75000,
        propertyType: 'Apartment',
        furnished: 'Fully furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200',
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200'
        ],
        coordinates: { latitude: 12.9317, longitude: 77.6244 },
        landlord: landlord._id,
        rating: 4.8,
        reviewsCount: 24
      },
      {
        title: 'Skyline Residency',
        description: 'Spacious 3BHK on the 8th floor with city views, modular kitchen, and covered parking. Building has gym, pool, and 24/7 security. Owner verified via Luxe Bangalore.',
        location: 'Indiranagar, Bangalore',
        city: 'Bangalore',
        price: 85000,
        propertyType: 'Apartment',
        furnished: 'Semi-furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1973&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200'
        ],
        coordinates: { latitude: 12.97189, longitude: 77.64115 },
        landlord: landlord._id,
        rating: 4.5,
        reviewsCount: 12
      },
      {
        title: 'Prestige Villa',
        description: 'Premium 4BHK villa with private garden, home theatre, and smart-home features. Ideal for executives relocating to Bangalore. Lease terms negotiable.',
        location: 'North Bangalore, Bangalore',
        city: 'Bangalore',
        price: 245000,
        propertyType: 'House',
        furnished: 'Fully furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1974&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200'
        ],
        coordinates: { latitude: 13.0358, longitude: 77.5978 },
        landlord: landlord._id,
        rating: 4.9,
        reviewsCount: 8
      },
      {
        title: 'Embassy Heights',
        description: 'Corner-unit 3BHK with floor-to-ceiling windows and two balconies. Walking distance to cafes and coworking spaces. Visual inspection completed last week.',
        location: 'Koramangala, Bangalore',
        city: 'Bangalore',
        price: 110000,
        propertyType: 'Apartment',
        furnished: 'Furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1974&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200'
        ],
        coordinates: { latitude: 12.9352, longitude: 77.6244 },
        landlord: landlord._id,
        rating: 4.6,
        reviewsCount: 15
      },
      {
        title: 'Brigade Metropolis Duplex',
        description: 'Stunning 4BHK duplex apartment located in the prestigious Whitefield area. Comes with a private terrace and premium fixtures throughout. Just minutes away from major IT parks.',
        location: 'Whitefield, Bangalore',
        city: 'Bangalore',
        price: 135000,
        propertyType: 'Apartment',
        furnished: 'Fully furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=1200',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.7,
        reviewsCount: 19
      },
      {
        title: 'Serenity Tech Park Residency',
        description: 'Perfect 2BHK for bachelors or young couples. Fully furnished with modular kitchen and modern decor. The building offers excellent connectivity to Outer Ring Road.',
        location: 'Marathahalli, Bangalore',
        city: 'Bangalore',
        price: 42000,
        propertyType: 'Apartment',
        furnished: 'Fully furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200',
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.2,
        reviewsCount: 31
      },
      {
        title: 'Orchid Woods Studio',
        description: 'Cozy, well-lit studio apartment in a quiet neighborhood. Perfect for singles. High-speed internet included in rent.',
        location: 'HSR Layout, Bangalore',
        city: 'Bangalore',
        price: 25000,
        propertyType: 'Apartment',
        furnished: 'Semi-furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.1,
        reviewsCount: 9
      },
      {
        title: 'The Green Haven',
        description: 'Eco-friendly 3BHK home with solar heating, rainwater harvesting, and lush green surroundings. Ideal for nature lovers.',
        location: 'Jayanagar, Bangalore',
        city: 'Bangalore',
        price: 68000,
        propertyType: 'House',
        furnished: 'Unfurnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.9,
        reviewsCount: 42
      },
      {
        title: 'Silicon Valley Suites',
        description: 'Corporate guest house level luxury in a 2BHK apartment. Features imported marble flooring and smart appliances.',
        location: 'Electronic City, Bangalore',
        city: 'Bangalore',
        price: 55000,
        propertyType: 'Apartment',
        furnished: 'Fully furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.4,
        reviewsCount: 16
      },
      {
        title: 'Hebbal Lakeview Manor',
        description: 'Breathtaking views of the lake from this premium 3BHK on the 15th floor. The society boasts a 50,000 sqft clubhouse.',
        location: 'Hebbal, Bangalore',
        city: 'Bangalore',
        price: 95000,
        propertyType: 'Apartment',
        furnished: 'Semi-furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.8,
        reviewsCount: 22
      },
      {
        title: 'BTM Executive Layout',
        description: 'Well-maintained 1BHK perfect for early career professionals. Close to Udupi restaurants and public transport.',
        location: 'BTM Layout, Bangalore',
        city: 'Bangalore',
        price: 18000,
        propertyType: 'Apartment',
        furnished: 'Unfurnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200'
        ],
        landlord: landlord._id,
        rating: 3.9,
        reviewsCount: 14
      },
      {
        title: 'Majestic Malleshwaram Bungalow',
        description: 'Heritage style 4BHK bungalow with modern interiors. Teak wood flooring, courtyard, and 2 car parkings.',
        location: 'Malleshwaram, Bangalore',
        city: 'Bangalore',
        price: 150000,
        propertyType: 'House',
        furnished: 'Furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200'
        ],
        landlord: landlord._id,
        rating: 5.0,
        reviewsCount: 5
      },
      {
        title: 'Purva Palm Beach',
        description: 'Beach-themed luxury apartment complex. This 3BHK comes with an extended balcony overlooking the wave pool.',
        location: 'Off Hennur Road, Bangalore',
        city: 'Bangalore',
        price: 72000,
        propertyType: 'Apartment',
        furnished: 'Semi-furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.5,
        reviewsCount: 29
      },
      {
        title: 'Salarpuria Sattva Celesta',
        description: '2BHK adjacent to KR Puram lake. Well-ventilated, vastu-compliant, and brand new interiors.',
        location: 'KR Puram, Bangalore',
        city: 'Bangalore',
        price: 38000,
        propertyType: 'Apartment',
        furnished: 'Semi-furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.3,
        reviewsCount: 18
      },
      {
        title: 'Urban Oasis Penthouse',
        description: 'Top floor 4BHK with a private plunge pool. Features Italian marble and a chef\'s kitchen. Ultimate luxury living.',
        location: 'Lavelle Road, Bangalore',
        city: 'Bangalore',
        price: 350000,
        propertyType: 'Apartment',
        furnished: 'Fully furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200',
          'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.9,
        reviewsCount: 11
      },
      {
        title: 'Compact Comfort',
        description: 'Affordable 1RK for students near Christ University. Simple, clean, and secure building.',
        location: 'SG Palya, Bangalore',
        city: 'Bangalore',
        price: 12000,
        propertyType: 'Apartment',
        furnished: 'Semi-furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200'
        ],
        landlord: landlord._id,
        rating: 3.8,
        reviewsCount: 56
      },
      {
        title: 'Zen Gardens Apartment',
        description: 'Quiet and peaceful 2BHK with a large balcony facing the internal gardens. Family-friendly society with great amenities.',
        location: 'Yelahanka, Bangalore',
        city: 'Bangalore',
        price: 45000,
        propertyType: 'Apartment',
        furnished: 'Fully furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.6,
        reviewsCount: 18
      },
      {
        title: 'Tech Park Adjacent 1BHK',
        description: 'Perfect for bachelors working in Manyata Tech Park. High-speed WiFi included. Vibrant neighborhood with lots of eateries.',
        location: 'Nagavara, Bangalore',
        city: 'Bangalore',
        price: 22000,
        propertyType: 'Apartment',
        furnished: 'Furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.0,
        reviewsCount: 45
      },
      {
        title: 'Spacious Corner 3BHK',
        description: 'Luxurious corner apartment with lots of natural light. Features modern interior design and smart home integration.',
        location: 'Bellandur, Bangalore',
        city: 'Bangalore',
        price: 85000,
        propertyType: 'Apartment',
        furnished: 'Semi-furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.7,
        reviewsCount: 27
      },
      {
        title: 'Boutique House in City Center',
        description: 'Charming 3BHK house with vintage aesthetics combined with modern comforts. Walking distance to Metro station.',
        location: 'MG Road, Bangalore',
        city: 'Bangalore',
        price: 110000,
        propertyType: 'House',
        furnished: 'Fully furnished',
        amenities: generateAmenities(),
        images: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200'
        ],
        landlord: landlord._id,
        rating: 4.9,
        reviewsCount: 12
      }
    ];

    await Property.insertMany(dummyProperties);
    console.log(`Seeded ${dummyProperties.length} properties successfully!`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
};

seedData();
