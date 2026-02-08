# 🚀 Backend Setup Guide

Complete step-by-step guide to set up and run the LuxeStay Hotel Booking API.

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ Node.js (v14 or higher) installed
- ✅ MongoDB installed locally OR MongoDB Atlas account
- ✅ npm or yarn package manager
- ✅ Git (optional)
- ✅ Postman or similar API testing tool (optional)

## 🔧 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd hotel-booking-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- and more...

### Step 3: Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env
```

Edit the `.env` file with your settings:

```env
# Server
NODE_ENV=development
PORT=5000

# Database (Choose one)
# Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/hotel_booking

# OR MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel_booking

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

# Frontend
CLIENT_URL=http://localhost:3000
```

### Step 4: Set Up MongoDB

#### Option A: Local MongoDB

1. Install MongoDB Community Server
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB

   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create new cluster
4. Click "Connect"
5. Choose "Connect your application"
6. Copy connection string
7. Replace in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel_booking
   ```

### Step 5: Seed the Database

```bash
npm run seed
```

This will create:
- ✅ Admin user: `admin@luxestay.com` / `admin123`
- ✅ Regular user: `john@example.com` / `user123`
- ✅ Manager: `manager@luxestay.com` / `manager123`
- ✅ 3 Sample hotels
- ✅ 2 Sample blog posts

### Step 6: Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║           🏨 LuxeStay Hotel Booking API Server 🏨            ║
║                                                                ║
║  Environment: development                                      ║
║  Port: 5000                                                    ║
║  API URL: http://localhost:5000                                ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
✅ MongoDB Connected: localhost
📊 Database: hotel_booking
```

## ✅ Verify Installation

### Test Health Endpoint

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-02-08T..."
}
```

### Test Root Endpoint

Open browser: `http://localhost:5000`

You should see:
```json
{
  "success": true,
  "message": "LuxeStay Hotel Booking API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "hotels": "/api/hotels",
    "bookings": "/api/bookings",
    "blogs": "/api/blogs",
    "users": "/api/users"
  }
}
```

## 🧪 Testing the API

### Using cURL

```bash
# 1. Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'

# Save the token from response

# 3. Get hotels
curl http://localhost:5000/api/hotels

# 4. Create booking (with token)
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "hotel": "HOTEL_ID_HERE",
    "checkInDate": "2024-03-15",
    "checkOutDate": "2024-03-18",
    "guests": 2
  }'
```

### Using Postman

1. **Import Collection**
   - Create new collection: "LuxeStay API"
   - Add base URL variable: `http://localhost:5000/api`

2. **Test Authentication**
   - POST `/auth/login`
   - Body: `{"email":"admin@luxestay.com","password":"admin123"}`
   - Save token from response

3. **Set Authorization**
   - Type: Bearer Token
   - Token: (paste from login response)

4. **Test Other Endpoints**
   - GET `/hotels`
   - POST `/bookings`
   - GET `/bookings/my-bookings`

## 📁 Project Structure Explained

```
hotel-booking-backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection setup
│   ├── controllers/             # Business logic
│   │   ├── authController.js    # Authentication (register/login)
│   │   ├── hotelController.js   # Hotel CRUD operations
│   │   ├── bookingController.js # Booking management
│   │   ├── blogController.js    # Blog operations
│   │   └── userController.js    # User management
│   ├── middleware/              # Express middleware
│   │   ├── auth.js              # JWT verification
│   │   ├── errorHandler.js      # Error handling
│   │   └── validation.js        # Input validation
│   ├── models/                  # Mongoose schemas
│   │   ├── User.js              # User model
│   │   ├── Hotel.js             # Hotel model
│   │   ├── Booking.js           # Booking model
│   │   └── Blog.js              # Blog model
│   ├── routes/                  # API routes
│   │   ├── authRoutes.js        # /api/auth
│   │   ├── hotelRoutes.js       # /api/hotels
│   │   ├── bookingRoutes.js     # /api/bookings
│   │   ├── blogRoutes.js        # /api/blogs
│   │   └── userRoutes.js        # /api/users
│   ├── utils/
│   │   └── seedData.js          # Sample data seeder
│   └── server.js                # Express app entry point
├── uploads/                     # File upload directory
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies
└── README.md                    # Documentation
```

## 🔐 Default User Accounts

After seeding, you can login with:

| Email | Password | Role |
|-------|----------|------|
| admin@luxestay.com | admin123 | admin |
| john@example.com | user123 | user |
| manager@luxestay.com | manager123 | manager |

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Seed database
npm run seed

# Clear database
npm run seed -- -d
```

## ⚠️ Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### MongoDB Connection Error
```bash
# Check MongoDB is running
# Windows
net start MongoDB

# macOS
brew services list

# Linux
sudo systemctl status mongod
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### JWT Token Issues
```bash
# Make sure JWT_SECRET is set in .env
JWT_SECRET=your_secret_key_here_make_it_long_and_random
```

## 🔄 Database Management

### Clear All Data
```bash
npm run seed -- -d
```

### Re-seed Database
```bash
npm run seed -- -d  # Clear
npm run seed        # Seed
```

### Connect to MongoDB
```bash
# Using MongoDB Compass
mongodb://localhost:27017/hotel_booking

# Using mongo shell
mongo
use hotel_booking
show collections
```

## 📊 Available Scripts

```json
{
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "seed": "node src/utils/seedData.js"
}
```

## 🔗 Integration with Frontend

1. **Backend**: Running on `http://localhost:5000`
2. **Frontend**: Running on `http://localhost:3000`
3. **CORS**: Configured in server.js
4. **API Base URL**: Set in frontend as `http://localhost:5000/api`

## 🚀 Next Steps

1. ✅ Backend is running
2. → Test all API endpoints
3. → Connect with frontend
4. → Deploy to production

## 📚 Additional Documentation

- `README.md` - Complete API overview
- `API_DOCUMENTATION.md` - Detailed API reference
- `SETUP_GUIDE.md` - This file

## 💡 Tips

1. **Use Environment Variables** - Never commit `.env` to Git
2. **Test Endpoints** - Use Postman or similar tools
3. **Check Logs** - Watch console for errors
4. **MongoDB Compass** - Visual tool for database
5. **Keep Dependencies Updated** - Run `npm update` periodically

## 🎉 Success!

If you see the welcome message and can access endpoints, you're ready to go!

**Questions?** Check the documentation or API reference.

---

**Happy Coding! 🚀**
