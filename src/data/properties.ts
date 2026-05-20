import type { Property } from '../types'

export const properties: Property[] = [
  {
    id: 'sunset-heights',
    title: 'Sunset Heights Residency',
    location: 'Indiranagar, Bengaluru',
    type: 'Apartment',
    price: 42000,
    rating: 4.8,
    furnished: true,
    nearby: ['Metro', 'IT Park', 'Supermarket'],
    amenities: ['Pool', 'Gym', 'Security', 'Parking', 'Power Backup'],
    description:
      'A premium apartment in a vibrant neighborhood with quick access to transit, cafes, and workspaces.',
    reviews: [
      {
        author: 'Aarav',
        rating: 5,
        comment: 'Great location and the maintenance team is very responsive.',
      },
      {
        author: 'Meera',
        rating: 4.7,
        comment: 'Modern interiors and solid security. Worth the price.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 98765 43210',
      email: 'sunset.heights@example.com',
      whatsapp: '+91 98765 43210',
    },
  },
  {
    id: 'olive-stay',
    title: 'Olive Stay PG',
    location: 'Hitech City, Hyderabad',
    type: 'PG',
    price: 14500,
    rating: 4.4,
    furnished: true,
    nearby: ['Metro', 'Co-working', 'Hospital'],
    amenities: ['Wi-Fi', 'Meals', 'Laundry', 'CCTV', 'Housekeeping'],
    description:
      'A secure and fully managed PG designed for working professionals and students.',
    reviews: [
      {
        author: 'Riya',
        rating: 4.5,
        comment: 'Comfortable rooms and the food is decent.',
      },
      {
        author: 'Kabir',
        rating: 4.2,
        comment: 'Well-connected location and easy onboarding.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 91234 56780',
      email: 'olive.stay@example.com',
      whatsapp: '+91 91234 56780',
    },
  },
  {
    id: 'blue-ridge-villa',
    title: 'Blue Ridge Villa',
    location: 'Whitefield, Bengaluru',
    type: 'House',
    price: 76000,
    rating: 4.9,
    furnished: false,
    nearby: ['School', 'Mall', 'Hospital'],
    amenities: ['Garden', 'Parking', 'Security', 'Terrace', 'Pet Friendly'],
    description:
      'A spacious independent house with landscaped open areas and family-friendly surroundings.',
    reviews: [
      {
        author: 'Sanjay',
        rating: 5,
        comment: 'Excellent family home with lots of natural light.',
      },
      {
        author: 'Nisha',
        rating: 4.8,
        comment: 'Peaceful neighborhood and generous room sizes.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 99887 77665',
      email: 'blue.ridge@example.com',
      whatsapp: '+91 99887 77665',
    },
  },
  {
    id: 'metro-arc',
    title: 'Metro Arc Apartments',
    location: 'Gachibowli, Hyderabad',
    type: 'Apartment',
    price: 36000,
    rating: 4.6,
    furnished: true,
    nearby: ['Metro', 'Office Hub', 'Cafe'],
    amenities: ['Gym', 'Lift', 'Pool', 'Parking', 'Security'],
    description:
      'A well-planned apartment community with excellent connectivity and lifestyle amenities.',
    reviews: [
      {
        author: 'Dev',
        rating: 4.7,
        comment: 'Convenient location and strong connectivity.',
      },
      {
        author: 'Anika',
        rating: 4.6,
        comment: 'Amenities are well maintained and the flat feels premium.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 90909 90909',
      email: 'metro.arc@example.com',
      whatsapp: '+91 90909 90909',
    },
  },
  {
    id: 'coastal-cove',
    title: 'Coastal Cove PG Living',
    location: 'Andheri West, Mumbai',
    type: 'PG',
    price: 18999,
    rating: 4.1,
    furnished: true,
    nearby: ['Metro', 'Beach', 'Market'],
    amenities: ['Wi-Fi', 'Meals', 'Laundry', 'Power Backup'],
    description:
      'Affordable and hassle-free PG living with easy access to entertainment and work zones.',
    reviews: [
      {
        author: 'Fahad',
        rating: 4.2,
        comment: 'The commute is easy and staff are helpful.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 90111 22334',
      email: 'coastal.cove@example.com',
      whatsapp: '+91 90111 22334',
    },
  },
  {
    id: 'north-park-home',
    title: 'North Park Family Home',
    location: 'Sector 21, Noida',
    type: 'House',
    price: 54000,
    rating: 4.5,
    furnished: false,
    nearby: ['School', 'Park', 'Market'],
    amenities: ['Garden', 'Parking', 'Security', 'Study Room'],
    description:
      'A practical and peaceful house for families seeking space, privacy, and daily convenience.',
    reviews: [
      {
        author: 'Tanya',
        rating: 4.6,
        comment: 'Nice neighborhood with a lot of usable space.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 93210 44556',
      email: 'north.park@example.com',
      whatsapp: '+91 93210 44556',
    },
  },
  {
    id: 'lakeside-nest',
    title: 'Lakeside Nest Apartment',
    location: 'Powai, Mumbai',
    type: 'Apartment',
    price: 47000,
    rating: 4.7,
    furnished: true,
    nearby: ['Lake', 'Metro', 'Office Hub'],
    amenities: ['Gym', 'Pool', 'Lift', 'Security', 'Visitor Parking'],
    description:
      'A lake-facing apartment with modern interiors and quick access to the city’s business districts.',
    reviews: [
      {
        author: 'Isha',
        rating: 4.8,
        comment: 'Great views and the apartment is move-in ready.',
      },
      {
        author: 'Pranav',
        rating: 4.6,
        comment: 'Amenities are excellent and the society is clean.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 98811 66774',
      email: 'lakeside.nest@example.com',
      whatsapp: '+91 98811 66774',
    },
  },
  {
    id: 'orchid-square',
    title: 'Orchid Square Residence',
    location: 'Koramangala, Bengaluru',
    type: 'Apartment',
    price: 51000,
    rating: 4.7,
    furnished: true,
    nearby: ['Metro', 'Cafe', 'Mall'],
    amenities: ['Gym', 'Lift', 'Security', 'Parking', 'Balcony'],
    description:
      'A bright apartment in one of Bengaluru’s most connected neighborhoods with premium finishes.',
    reviews: [
      {
        author: 'Naveen',
        rating: 4.8,
        comment: 'Excellent location for work and social life.',
      },
      {
        author: 'Shruti',
        rating: 4.6,
        comment: 'Great interiors and good ventilation throughout.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5d4b5a0f1d?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 97777 11223',
      email: 'orchid.square@example.com',
      whatsapp: '+91 97777 11223',
    },
  },
  {
    id: 'silver-oak-villa',
    title: 'Silver Oak Villa',
    location: 'Baner, Pune',
    type: 'House',
    price: 68000,
    rating: 4.8,
    furnished: false,
    nearby: ['School', 'Park', 'Market'],
    amenities: ['Garden', 'Parking', 'Security', 'Study Room', 'Terrace'],
    description:
      'A spacious villa with a private garden and calm surroundings, ideal for families.',
    reviews: [
      {
        author: 'Aditi',
        rating: 4.9,
        comment: 'Feels like a proper family home with a lot of privacy.',
      },
      {
        author: 'Rahul',
        rating: 4.7,
        comment: 'Large rooms and a very quiet neighborhood.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 96666 44331',
      email: 'silver.oak@example.com',
      whatsapp: '+91 96666 44331',
    },
  },
  {
    id: 'harbor-inn',
    title: 'Harbor Inn PG',
    location: 'Bandra East, Mumbai',
    type: 'PG',
    price: 22000,
    rating: 4.3,
    furnished: true,
    nearby: ['Metro', 'Station', 'Cafe'],
    amenities: ['Wi-Fi', 'Meals', 'Laundry', 'CCTV', 'Power Backup'],
    description:
      'A managed PG with easy commute access and a comfortable setup for professionals.',
    reviews: [
      {
        author: 'Karan',
        rating: 4.4,
        comment: 'Useful for office commute and very well kept.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 95555 66778',
      email: 'harbor.inn@example.com',
      whatsapp: '+91 95555 66778',
    },
  },
  {
    id: 'cedar-court',
    title: 'Cedar Court Apartments',
    location: 'Jubilee Hills, Hyderabad',
    type: 'Apartment',
    price: 59000,
    rating: 4.9,
    furnished: true,
    nearby: ['Metro', 'Hospital', 'Restaurant'],
    amenities: ['Pool', 'Gym', 'Lift', 'Security', 'Visitor Parking'],
    description:
      'A luxury apartment community in a prime location with polished interiors and modern amenities.',
    reviews: [
      {
        author: 'Sonia',
        rating: 5,
        comment: 'One of the best apartment options in the area.',
      },
      {
        author: 'Imran',
        rating: 4.8,
        comment: 'Very premium feel and excellent maintenance.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560184897-67f3c71a7c4b?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 94444 55667',
      email: 'cedar.court@example.com',
      whatsapp: '+91 94444 55667',
    },
  },
  {
    id: 'maple-haven',
    title: 'Maple Haven House',
    location: 'Salt Lake, Kolkata',
    type: 'House',
    price: 43000,
    rating: 4.4,
    furnished: false,
    nearby: ['School', 'Park', 'Market'],
    amenities: ['Parking', 'Security', 'Balcony', 'Study Room'],
    description:
      'A practical independent house with roomy interiors and a calm residential setting.',
    reviews: [
      {
        author: 'Priya',
        rating: 4.5,
        comment: 'Good layout and nice neighborhood for families.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1560185007-5d36d0e0c1f8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 93333 77889',
      email: 'maple.haven@example.com',
      whatsapp: '+91 93333 77889',
    },
  },
  {
    id: 'trinity-commons',
    title: 'Trinity Commons PG',
    location: 'Thane West, Mumbai',
    type: 'PG',
    price: 16800,
    rating: 4.2,
    furnished: true,
    nearby: ['Metro', 'Market', 'Hospital'],
    amenities: ['Wi-Fi', 'Meals', 'Laundry', 'Security'],
    description:
      'An affordable PG with essentials covered and good access to transit and daily needs.',
    reviews: [
      {
        author: 'Pooja',
        rating: 4.1,
        comment: 'Simple, clean, and budget friendly.',
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    ],
    contact: {
      phone: '+91 92222 33445',
      email: 'trinity.commons@example.com',
      whatsapp: '+91 92222 33445',
    },
  },
]
