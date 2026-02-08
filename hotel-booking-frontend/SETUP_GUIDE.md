# 🚀 Hotel Booking System - Frontend Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A code editor (VS Code recommended)

## 🎯 Quick Start (3 Steps)

### Step 1: Navigate to Project Directory
```bash
cd hotel-booking-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

The application will open at: `http://localhost:3000`

## 📁 Project Structure Overview

```
hotel-booking-frontend/
├── src/
│   ├── components/common/    # Reusable components (Header, Footer)
│   ├── context/              # React Context (AuthContext)
│   ├── pages/                # All page components
│   ├── styles/               # Global styles
│   ├── App.jsx               # Main app component with routing
│   └── main.jsx              # Entry point
├── public/                   # Static assets
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # Documentation
```

## 🎨 Features Implemented

### ✅ Common Pages (All Users)
- **Home** - Hero, Features, Stats, Testimonials
- **Hotels** - Listing with search & filters
- **Hotel Details** - Complete info with booking form
- **About Us** - Company story, values, team
- **Services** - All services offered
- **Contact** - Form + Google Maps
- **Blogs** - Card-based listing
- **Blog Detail** - Full article view

### ✅ Authentication
- Login page
- Register page
- Protected routes
- Role-based access control

### ✅ Dashboards
1. **Admin Dashboard**
   - Statistics cards
   - Booking breakdown
   - Quick actions

2. **Employee Dashboard** (Manager/Receptionist/Waiter/Cook)
   - Time-based greeting
   - Clean, minimal design

3. **User Dashboard**
   - Profile management
   - Booking history
   - Cancel bookings

## 🔐 Testing Different Roles

The app uses mock authentication. To test different roles:

### Admin Access
1. Go to `/login`
2. Enter any email (e.g., `admin@test.com`)
3. Enter any password
4. The user will be created as 'user' role by default

### To Test Admin Dashboard:
Modify `Login.jsx` line 16:
```javascript
role: 'admin'  // Change to: admin, manager, receptionist, waiter, cook, user
```

### Available Roles:
- `admin` → `/dashboard/admin`
- `manager` → `/dashboard/employee`
- `receptionist` → `/dashboard/employee`
- `waiter` → `/dashboard/employee`
- `cook` → `/dashboard/employee`
- `user` → `/dashboard/user`

## 🎨 Design System

### Color Palette
```css
Primary: #1a3a52 (Deep Blue)
Secondary: #c9a961 (Gold)
Background: #fafaf8
Surface: #ffffff
```

### Typography
- **Display**: Playfair Display (elegant serif for headers)
- **Body**: Lato (clean sans-serif for content)

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🛠 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter (if configured)
npm run lint
```

## 🔧 Customization Guide

### Changing Colors
Edit `/src/styles/global.css`:
```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  /* ... */
}
```

### Adding New Pages
1. Create component in `/src/pages/YourPage.jsx`
2. Create styles in `/src/pages/YourPage.css`
3. Add route in `/src/App.jsx`:
```javascript
<Route path="/your-path" element={<YourPage />} />
```
4. Add navigation link in `/src/components/common/Header.jsx`

### Modifying Time-Based Greeting
Edit `/src/pages/EmployeeDashboard.jsx` in `getGreeting()` function:
```javascript
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 3 && hour < 12) return 'Good Morning';
  // Modify time ranges as needed
};
```

## 🔌 Backend Integration (Next Steps)

When your backend is ready:

### 1. Setup API Client
Create `/src/utils/api.js`:
```javascript
const API_URL = 'http://localhost:5000/api';

export const api = {
  get: (endpoint) => fetch(`${API_URL}${endpoint}`).then(r => r.json()),
  post: (endpoint, data) => fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  // ... other methods
};
```

### 2. Replace Mock Data
Example for Hotels page:
```javascript
// Before (Mock)
const hotels = [/* mock data */];

// After (API)
const [hotels, setHotels] = useState([]);
useEffect(() => {
  api.get('/hotels').then(setHotels);
}, []);
```

### 3. Implement Real Authentication
Update `Login.jsx`:
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await api.post('/auth/login', formData);
  login(response.user);
  navigate('/dashboard');
};
```

## 🐛 Common Issues & Solutions

### Issue: Port already in use
```bash
# Change port in vite.config.js
server: {
  port: 3001  // Change to any available port
}
```

### Issue: Module not found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Styles not loading
```bash
# Make sure global.css is imported in main.jsx
import './styles/global.css'
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

This creates a `dist/` folder with optimized files.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Drag and drop the `dist/` folder to Netlify
2. Or connect your GitHub repo

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)

## 💡 Tips for Success

1. **Use React DevTools** - Install browser extension for debugging
2. **Follow Component Structure** - Keep components small and focused
3. **Use CSS Variables** - Easy theming and consistent design
4. **Test Responsiveness** - Use browser dev tools to test different screen sizes
5. **Add Loading States** - Improve UX with spinners during API calls
6. **Error Handling** - Add try-catch blocks for API calls
7. **Accessibility** - Use semantic HTML and ARIA labels

## 🎯 Next Development Phase

1. ✅ **Frontend Complete** ← You are here
2. 🔄 **Backend Development** ← Next
3. 🔄 **API Integration**
4. 🔄 **Testing**
5. 🔄 **Deployment**

## 📞 Support

For questions or issues:
- Check documentation in README.md
- Review component code and comments
- Check browser console for errors

---

**Happy Coding! 🚀**

*Built with React + Vite for optimal performance*
