# 🏨 LuxeStay Hotel Booking System - Backend API

Complete RESTful API for Hotel Booking & Management System built with Node.js, Express, and MongoDB.

## 📋 Features

### ✅ **Authentication & Authorization**
- User registration and login with JWT
- Role-based access control (Admin, Manager, Receptionist, Waiter, Cook, User)
- Password encryption with bcrypt
- Protected routes
- Profile management

### ✅ **Hotel Management**
- CRUD operations for hotels
- Search and filter hotels
- Location-based search
- Price range filtering
- Category filtering
- Featured hotels
- Hotel statistics

### ✅ **Booking System**
- Create bookings with date validation
- View booking history
- Cancel bookings
- Update booking status
- Booking statistics
- Room availability management
- Automatic pricing calculation

### ✅ **Blog Management**
- Create, read, update, delete blogs
- Search blogs
- Category filtering
- Comments system
- Like functionality
- View tracking
- Auto-generated slugs

### ✅ **User Management**
- Admin user management
- View all users
- Update user roles
- Deactivate users
- User statistics

### ✅ **Security Features**
- JWT authentication
- Password hashing
- Rate limiting
- CORS protection
- MongoDB sanitization
- Helmet security headers
- Request validation

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiter
- **Logging**: Morgan

## 📁 Project Structure

```
hotel-booking-backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── hotelController.js   # Hotel operations
│   │   ├── bookingController.js # Booking operations
│   │   ├── blogController.js    # Blog operations
│   │   └── userController.js    # User management
│   ├── middleware/
│   │   ├── auth.js              # Authentication & authorization
│   │   ├── errorHandler.js      # Error handling
│   │   └── validation.js        # Request validation
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Hotel.js             # Hotel model
│   │   ├── Booking.js           # Booking model
│   │   └── Blog.js              # Blog model
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── hotelRoutes.js       # Hotel endpoints
│   │   ├── bookingRoutes.js     # Booking endpoints
│   │   ├── blogRoutes.js        # Blog endpoints
│   │   └── userRoutes.js        # User endpoints
│   ├── utils/
│   │   └── seedData.js          # Database seeding
│   └── server.js                # Entry point
├── uploads/                     # File uploads
├── .env                         # Environment variables
├── .env.example                 # Example env file
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies
└── README.md                    # Documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone & Install

```bash
# Navigate to backend directory
cd hotel-booking-backend

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy example env file
cp .env.example .env

# Edit .env file with your settings
```

Required environment variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel_booking
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### 3. Database Setup

```bash
# Import sample data
npm run seed

# This will create:
# - Admin user: admin@luxestay.com / admin123
# - Regular user: john@example.com / user123
# - Manager: manager@luxestay.com / manager123
# - 3 Sample hotels
# - 2 Sample blogs
```

### 4. Start Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will start at: `http://localhost:5000`

## 📡 API Endpoints

### **Authentication** `/api/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login user |
| GET | `/me` | Private | Get current user |
| PUT | `/profile` | Private | Update profile |
| PUT | `/change-password` | Private | Change password |
| POST | `/logout` | Private | Logout user |

### **Hotels** `/api/hotels`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Get all hotels (with filters) |
| GET | `/featured` | Public | Get featured hotels |
| GET | `/:id` | Public | Get single hotel |
| POST | `/` | Admin | Create hotel |
| PUT | `/:id` | Admin | Update hotel |
| DELETE | `/:id` | Admin | Delete hotel |
| GET | `/stats/overview` | Admin | Get hotel statistics |

### **Bookings** `/api/bookings`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | Private | Create booking |
| GET | `/my-bookings` | Private | Get user bookings |
| GET | `/:id` | Private | Get single booking |
| PUT | `/:id/cancel` | Private | Cancel booking |
| GET | `/` | Admin | Get all bookings |
| PUT | `/:id/status` | Admin | Update booking status |
| DELETE | `/:id` | Admin | Delete booking |
| GET | `/stats/overview` | Admin | Get booking statistics |

### **Blogs** `/api/blogs`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Public | Get all blogs |
| GET | `/categories` | Public | Get blog categories |
| GET | `/:id` | Public | Get single blog |
| GET | `/slug/:slug` | Public | Get blog by slug |
| POST | `/` | Admin | Create blog |
| PUT | `/:id` | Admin | Update blog |
| DELETE | `/:id` | Admin | Delete blog |
| POST | `/:id/comments` | Private | Add comment |
| DELETE | `/:id/comments/:commentId` | Private | Delete comment |
| PUT | `/:id/like` | Private | Like blog |

### **Users** `/api/users` (Admin Only)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | Admin | Get all users |
| GET | `/stats` | Admin | Get user statistics |
| GET | `/:id` | Admin | Get single user |
| PUT | `/:id` | Admin | Update user |
| DELETE | `/:id` | Admin | Delete user |

## 📝 API Request Examples

### Register User
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Hotels (with filters)
```bash
GET http://localhost:5000/api/hotels?city=New York&minPrice=100&maxPrice=500&sort=price-asc
```

### Create Booking
```bash
POST http://localhost:5000/api/bookings
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "hotel": "hotel_id_here",
  "checkInDate": "2024-03-15",
  "checkOutDate": "2024-03-18",
  "guests": 2,
  "rooms": 1
}
```

## 🔐 Authentication

All protected routes require JWT token in Authorization header:

```bash
Authorization: Bearer YOUR_JWT_TOKEN
```

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **user** | Create bookings, view own bookings, manage profile |
| **admin** | Full access to all features |
| **manager** | View-only access to dashboard |
| **receptionist** | View-only access to dashboard |
| **waiter** | View-only access to dashboard |
| **cook** | View-only access to dashboard |

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Response:
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-02-08T..."
}
```

## 📊 Database Models

### User Model
- name, email, password (hashed)
- role (user/admin/manager/receptionist/waiter/cook)
- phone, address, avatar
- isActive, isEmailVerified
- timestamps

### Hotel Model
- name, description
- location (address, city, state, country, coordinates)
- images[], price, rating, reviews
- amenities[], features[]
- rooms (total, available)
- category, contactInfo
- timestamps

### Booking Model
- user (ref), hotel (ref)
- checkInDate, checkOutDate
- guests, rooms, totalPrice
- status (Booked/Confirmed/Cancelled/Completed)
- bookingReference
- timestamps

### Blog Model
- title, slug, excerpt, content
- image, category, tags[]
- author (ref), readTime
- views, likes, comments[]
- timestamps

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Seed database
npm run seed

# Clear database
npm run seed -d
```

## 🚀 Deployment

### Environment Variables
Set all variables from `.env.example` in your production environment.

### MongoDB Atlas
1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in .env

### Deploy to Heroku
```bash
heroku create your-app-name
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)

## 🤝 Integration with Frontend

The backend is designed to work with the React frontend. Ensure:
1. Backend running on port 5000
2. Frontend running on port 3000
3. CORS configured for CLIENT_URL

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ for LuxeStay Hotel Booking System**
