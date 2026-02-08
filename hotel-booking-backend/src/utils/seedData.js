import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Hotel from '../models/Hotel.js';
import Booking from '../models/Booking.js';
import Blog from '../models/Blog.js';

dotenv.config();

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@luxestay.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1-555-0001',
    address: '123 Admin St, New York, NY'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
    phone: '+1-555-0002',
    address: '456 User Ave, Los Angeles, CA'
  },
  {
    name: 'Manager Smith',
    email: 'manager@luxestay.com',
    password: 'manager123',
    role: 'manager',
    phone: '+1-555-0003'
  }
];

const hotels = [
  {
    name: 'Grand Plaza Hotel',
    description: 'Luxurious 5-star hotel in the heart of Manhattan with stunning city views and world-class amenities.',
    location: {
      address: '123 Fifth Avenue',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    },
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'
    ],
    price: 299,
    rating: 4.8,
    reviews: 1250,
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Pool', 'Spa', 'Gym'],
    features: ['500+ Luxury Rooms', 'Panoramic City Views', 'Michelin Star Restaurant'],
    rooms: { total: 500, available: 450 },
    category: 'Luxury',
    contactInfo: {
      phone: '+1-555-1001',
      email: 'info@grandplaza.com',
      website: 'www.grandplaza.com'
    }
  },
  {
    name: 'Seaside Resort & Spa',
    description: 'Beachfront paradise with world-class spa and dining experiences.',
    location: {
      address: '789 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      zipCode: '33139'
    },
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
    ],
    price: 450,
    rating: 4.9,
    reviews: 980,
    amenities: ['WiFi', 'Spa', 'Beach Access', 'Restaurant', 'Bar', 'Pool'],
    features: ['Private Beach', 'Luxury Spa', 'Ocean View Rooms'],
    rooms: { total: 300, available: 280 },
    category: 'Premium',
    contactInfo: {
      phone: '+1-555-1002',
      email: 'info@seasideresort.com'
    }
  },
  {
    name: 'Mountain View Lodge',
    description: 'Cozy mountain retreat with breathtaking views and ski-in access.',
    location: {
      address: '456 Mountain Road',
      city: 'Aspen',
      state: 'CO',
      country: 'USA',
      zipCode: '81611'
    },
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    ],
    price: 380,
    rating: 4.7,
    reviews: 750,
    amenities: ['WiFi', 'Parking', 'Fireplace', 'Ski Access', 'Restaurant'],
    features: ['Ski-in Access', 'Mountain Views', 'Cozy Fireplaces'],
    rooms: { total: 150, available: 140 },
    category: 'Luxury',
    contactInfo: {
      phone: '+1-555-1003',
      email: 'info@mountainview.com'
    }
  }
];

const blogs = [
  {
    title: 'Top 10 Luxury Hotels in New York City',
    excerpt: 'Discover the most exquisite hotels that define luxury in the heart of Manhattan.',
    content: `<p>New York City is home to some of the world's most luxurious hotels. From historic landmarks to modern masterpieces, these establishments offer unparalleled service and stunning views.</p>

<h2>1. The Plaza Hotel</h2>
<p>An iconic landmark on Fifth Avenue, The Plaza has been the epitome of luxury since 1907.</p>

<h2>2. The St. Regis New York</h2>
<p>This Beaux-Arts masterpiece has been setting the standard for luxury hospitality since 1904.</p>

<p>Each hotel offers its own unique character and exceptional service that make them stand out in this competitive market.</p>`,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    category: 'Travel Guide',
    tags: ['luxury', 'new york', 'hotels'],
    featured: true
  },
  {
    title: 'A Complete Guide to Beach Resorts',
    excerpt: 'Everything you need to know about choosing the perfect beach resort for your vacation.',
    content: `<p>Beach resorts offer the ultimate escape with pristine waters, white sand beaches, and world-class amenities.</p>

<h2>What to Look For</h2>
<p>When selecting a beach resort, consider the location, amenities, and activities available.</p>

<h2>Top Beach Destinations</h2>
<p>From the Caribbean to Southeast Asia, explore the world's best beach resort destinations.</p>`,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
    category: 'Tips & Advice',
    tags: ['beach', 'resort', 'vacation']
  }
];

// Import data
const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Hotel.deleteMany();
    await Booking.deleteMany();
    await Blog.deleteMany();

    console.log('📦 Old data cleared...');

    // Create users
    const createdUsers = await User.create(users);
    console.log('✅ Users imported');

    // Assign admin as creator for hotels
    const hotelsWithCreator = hotels.map(hotel => ({
      ...hotel,
      createdBy: createdUsers[0]._id
    }));

    // Create hotels
    await Hotel.create(hotelsWithCreator);
    console.log('✅ Hotels imported');

    // Create blogs
    const blogsWithAuthor = blogs.map(blog => ({
      ...blog,
      author: createdUsers[0]._id
    }));

    await Blog.create(blogsWithAuthor);
    console.log('✅ Blogs imported');

    console.log('🎉 All data imported successfully!');
    console.log('\n📧 Login Credentials:');
    console.log('Admin: admin@luxestay.com / admin123');
    console.log('User: john@example.com / user123');
    console.log('Manager: manager@luxestay.com / manager123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Hotel.deleteMany();
    await Booking.deleteMany();
    await Blog.deleteMany();

    console.log('🗑️  All data deleted!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
};

// Run based on argument
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use -i to import or -d to delete data');
  process.exit(0);
}
