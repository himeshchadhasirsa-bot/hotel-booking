# LuxeStay - Hotel Booking & Management System (Frontend)

## 🎨 Project Overview

A professional, clean, and scalable hotel booking and management system frontend built with React. Features a sophisticated UI/UX design with role-based dashboards and comprehensive functionality.

## ✨ Features

### Common Frontend (All Users)
- **Consistent Layout**: Professional header, footer, and navigation
- **Responsive Design**: Works seamlessly across all devices
- **Modern UI**: Clean typography, spacing, and color scheme
- **Smooth Animations**: Engaging transitions and micro-interactions

### Pages Implemented
1. **Home** - Hero section, features, stats, testimonials, CTA
2. **Hotels** - Hotel listing with search and filters
3. **Hotel Details** - Complete hotel information with booking form
4. **About Us** - Company story, values, team
5. **Contact** - Contact form with Google Maps integration
6. **Blogs** - Blog listing in card format
7. **Blog Detail** - Full blog post view (opens on "Read More")
8. **Login/Register** - Authentication pages

### Role-Based Dashboards
- **Admin Dashboard**
  - Total hotels, users, bookings statistics
  - Booking status breakdown (Booked, Cancelled, Successful)
  - Quick action buttons
  - Visual charts and metrics

- **Employee Dashboards** (Manager, Receptionist, Waiter, Cook)
  - Time-based greeting (Good Morning/Afternoon/Evening/Night)
  - Clean, minimal design
  - No statistics or charts

- **User Dashboard**
  - Profile management (view/edit)
  - Booking history
  - Cancel booking functionality
  - Status tracking

## 🎨 Design System

### Color Palette
- **Primary**: #1a3a52 (Deep Blue)
- **Secondary**: #c9a961 (Gold)
- **Background**: #fafaf8 (Off White)
- **Surface**: #ffffff (White)

### Typography
- **Display Font**: Playfair Display (Headers)
- **Body Font**: Lato (Content)

### Components
- Professional buttons with hover effects
- Clean form inputs
- Elegant cards with shadows
- Status badges
- Responsive grid layouts

## 📁 Project Structure

```
hotel-booking-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Hotels.jsx
│   │   ├── Hotels.css
│   │   ├── HotelDetail.jsx
│   │   ├── HotelDetail.css
│   │   ├── About.jsx
│   │   ├── About.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── Blogs.jsx
│   │   ├── Blogs.css
│   │   ├── BlogDetail.jsx
│   │   ├── BlogDetail.css
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Auth.css
│   │   ├── AdminDashboard.jsx
│   │   ├── EmployeeDashboard.jsx
│   │   ├── UserDashboard.jsx
│   │   └── Dashboard.css
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🔐 Authentication & Roles

### Test User Roles
The frontend currently uses mock authentication. You can test different roles:

- **Admin**: Full dashboard with statistics
  - Email: admin@luxestay.com
  
- **Employee Roles** (Manager/Receptionist/Waiter/Cook): Greeting dashboard
  - Email: employee@luxestay.com
  
- **Normal User**: Profile and booking management
  - Email: user@luxestay.com

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎯 Key Features Implementation

### Time-Based Greeting Logic
```
3:00 AM – 11:50 AM  → Good Morning
11:51 AM – 4:00 PM  → Good Afternoon
4:01 PM – 7:00 PM   → Good Evening
7:01 PM – 3:00 AM   → Good Night
```

### Booking Status
- **Booked**: Active upcoming bookings
- **Successful**: Completed stays
- **Cancelled**: Cancelled bookings

### Public vs Authenticated Features
- **Public**: View hotels, hotel details, browse content
- **Authenticated**: Book rooms, manage profile, view history, cancel bookings

## 🛠 Tech Stack

- **React 18** - UI library
- **React Router v6** - Routing
- **Vite** - Build tool
- **Lucide React** - Icons
- **CSS3** - Styling (no framework dependency)
- **date-fns** - Date utilities

## 📝 Code Quality

### Best Practices Followed
- ✅ Clean folder structure
- ✅ Component modularity
- ✅ Consistent naming conventions
- ✅ CSS custom properties for theming
- ✅ Responsive design patterns
- ✅ Accessibility considerations
- ✅ Performance optimizations

### Naming Conventions
- **Components**: PascalCase (e.g., `Header.jsx`)
- **Files**: PascalCase for components, lowercase for utilities
- **CSS Classes**: kebab-case (e.g., `.hotel-card`)
- **Functions**: camelCase (e.g., `handleSubmit`)

## 🔄 Next Steps (Backend Integration)

When integrating with the backend:

1. Replace mock data with API calls
2. Implement actual authentication
3. Connect booking functionality
4. Add real-time updates
5. Implement payment gateway
6. Add image uploads for user profiles
7. Connect admin management features

## 📧 Contact

For questions or support, contact: info@luxestay.com

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ for exceptional hotel booking experiences**
