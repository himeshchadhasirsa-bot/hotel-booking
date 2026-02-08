# 📡 LuxeStay API Documentation

Complete API reference for Hotel Booking System backend.

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Response Format

All API responses follow this standard format:

### Success Response
```json
{
  "success": true,
  "message": "Optional success message",
  "data": {},
  "count": 10,
  "total": 100,
  "page": 1,
  "pages": 10
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

## Authentication

### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get Current User
```
GET /auth/me
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "phone": "+1-555-0123",
    "address": "123 Main St"
  }
}
```

## Hotels

### Get All Hotels
```
GET /hotels?search=&city=&minPrice=&maxPrice=&category=&sort=&page=1&limit=10
```

**Query Parameters:**
- `search` (string): Search in name, description, location
- `city` (string): Filter by city
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `category` (string): Budget/Standard/Luxury/Premium
- `sort` (string): price-asc, price-desc, rating
- `page` (number): Page number
- `limit` (number): Results per page

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "...",
      "name": "Grand Plaza Hotel",
      "description": "Luxury hotel...",
      "location": {
        "city": "New York",
        "country": "USA"
      },
      "price": 299,
      "rating": 4.8,
      "images": ["url1", "url2"]
    }
  ]
}
```

### Get Single Hotel
```
GET /hotels/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "Grand Plaza Hotel",
    "description": "Full description",
    "location": {...},
    "price": 299,
    "amenities": ["WiFi", "Pool"],
    "features": ["Ocean View"],
    "rooms": {
      "total": 500,
      "available": 450
    }
  }
}
```

### Create Hotel (Admin)
```
POST /hotels
Authorization: Bearer ADMIN_TOKEN
```

**Request Body:**
```json
{
  "name": "New Hotel",
  "description": "Beautiful hotel...",
  "location": {
    "address": "123 Street",
    "city": "Miami",
    "state": "FL",
    "country": "USA"
  },
  "price": 350,
  "images": ["url1", "url2"],
  "amenities": ["WiFi", "Pool"],
  "rooms": {
    "total": 200
  },
  "category": "Luxury"
}
```

## Bookings

### Create Booking
```
POST /bookings
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "hotel": "hotel_id",
  "checkInDate": "2024-03-15",
  "checkOutDate": "2024-03-18",
  "guests": 2,
  "rooms": 1,
  "specialRequests": "Late check-in please"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "...",
    "bookingReference": "BK1234567890",
    "user": {...},
    "hotel": {...},
    "checkInDate": "2024-03-15",
    "checkOutDate": "2024-03-18",
    "numberOfNights": 3,
    "totalPrice": 897,
    "status": "Booked"
  }
}
```

### Get My Bookings
```
GET /bookings/my-bookings
Authorization: Bearer TOKEN
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "bookingReference": "BK1234567890",
      "hotel": {
        "name": "Grand Plaza Hotel",
        "location": {...}
      },
      "checkInDate": "2024-03-15",
      "status": "Booked",
      "totalPrice": 897
    }
  ]
}
```

### Cancel Booking
```
PUT /bookings/:id/cancel
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "reason": "Change of plans"
}
```

## Blogs

### Get All Blogs
```
GET /blogs?search=&category=&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "title": "Top 10 Hotels in NYC",
      "slug": "top-10-hotels-in-nyc",
      "excerpt": "Discover...",
      "image": "url",
      "category": "Travel Guide",
      "author": {
        "name": "John Doe"
      },
      "readTime": "5 min read",
      "publishedAt": "2024-01-15"
    }
  ]
}
```

### Get Single Blog
```
GET /blogs/:id
```

### Create Blog (Admin)
```
POST /blogs
Authorization: Bearer ADMIN_TOKEN
```

**Request Body:**
```json
{
  "title": "Amazing Hotel Guide",
  "excerpt": "Short description...",
  "content": "<p>Full HTML content...</p>",
  "image": "url",
  "category": "Travel Guide",
  "tags": ["hotels", "travel"]
}
```

### Add Comment
```
POST /blogs/:id/comments
Authorization: Bearer TOKEN
```

**Request Body:**
```json
{
  "text": "Great article!"
}
```

## Users (Admin Only)

### Get All Users
```
GET /users?role=&search=&page=1&limit=10
Authorization: Bearer ADMIN_TOKEN
```

### Get User Statistics
```
GET /users/stats
Authorization: Bearer ADMIN_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 1000,
    "usersByRole": [
      { "_id": "user", "count": 950 },
      { "_id": "admin", "count": 5 }
    ],
    "recentUsers": [...]
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

## Rate Limiting

- Window: 15 minutes
- Max Requests: 100 per IP
- Applies to all `/api` endpoints

## Best Practices

1. **Always include JWT token** for protected routes
2. **Use pagination** for large datasets
3. **Handle errors** properly in your application
4. **Validate data** before sending requests
5. **Store tokens securely** (not in localStorage for sensitive apps)

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Get hotels
curl http://localhost:5000/api/hotels

# Create booking (with token)
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"hotel":"hotel_id","checkInDate":"2024-03-15","checkOutDate":"2024-03-18","guests":2}'
```

## Testing with Postman

1. Create a Postman collection
2. Add environment variables:
   - `baseUrl`: http://localhost:5000/api
   - `token`: (will be set after login)
3. Set Authorization header for protected routes
4. Import provided Postman collection (if available)

---

**For support, contact: dev@luxestay.com**
