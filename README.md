# Real Estate & Accommodation System

Backend API for property rental platform.

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

## Installation

Clone:

```bash
git clone REPO_URL
```

Install:

```bash
npm install
```

Create:

```env
.env
```

Run:

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

---

## Tech Stack

Node.js

Express

MongoDB

JWT

Socket.io

Cloudinary

Razorpay

---

## Team Structure

Team Lead:
Backend + Deployment

Members:
Frontend/Auth/UI