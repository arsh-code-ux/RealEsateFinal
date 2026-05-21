# Real Estate & Accommodation System

Full-stack property rental platform featuring a React + Vite frontend and an Express + Node.js backend.

## Tech Stack
- **Frontend**: React, Vite, React Router, TailwindCSS/Vanilla CSS
- **Backend**: Node.js, Express, MongoDB, Socket.io, Cloudinary, Razorpay, JWT

---

## Features

- Authentication (JWT + Refresh Token)
- Property CRUD
- Search + Filter + Pagination
- Reviews & Ratings
- Wishlist
- Nearby Property Search
- Recommendations
- Notifications
- Visit Scheduling
- Real-time Chat
- Razorpay Payments
- Admin Dashboard

---

## Installation & Setup

### Repository Setup
```bash
npm install
```

### Backend Setup
Go to the `backend` directory and configure the environment:
```bash
cd backend
npm install
```
Create a `backend/.env` file with appropriate configuration.
Run the backend server:
```bash
npm run dev # or npm start
```

### Frontend Setup
In the root directory, run:
```bash
npm run dev
```

---

## API Routes

### Auth
```txt
/api/auth/register
/api/auth/login
/api/auth/logout
/api/auth/forgot-password
/api/auth/reset-password/:token
/api/auth/refresh-token
```

### Users
```txt
/api/users/profile
/api/users/wishlist
```

### Properties
```txt
/api/properties
/api/properties/nearby
```

### Reviews
```txt
/api/reviews
```

### Chat
```txt
/api/chat
```

### Payments
```txt
/api/payments
```

### Notifications
```txt
/api/notifications
```

### Bookings
```txt
/api/bookings
```

