import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true,
    unique: true,
    minlength: [3, 'Hotel name must be at least 3 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [20, 'Description must be at least 20 characters']
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    country: {
      type: String,
      required: [true, 'Country is required']
    },
    zipCode: {
      type: String
    },
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  images: [{
    type: String,
    required: true
  }],
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  amenities: [{
    type: String,
    trim: true
  }],
  features: [{
    type: String,
    trim: true
  }],
  rooms: {
    total: {
      type: Number,
      required: [true, 'Total rooms is required'],
      min: [1, 'Hotel must have at least 1 room']
    },
    available: {
      type: Number,
      required: true
    }
  },
  category: {
    type: String,
    enum: ['Budget', 'Standard', 'Luxury', 'Premium'],
    default: 'Standard'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  checkInTime: {
    type: String,
    default: '14:00'
  },
  checkOutTime: {
    type: String,
    default: '11:00'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for location-based searches
hotelSchema.index({ 'location.city': 1 });
hotelSchema.index({ 'location.country': 1 });
hotelSchema.index({ price: 1 });
hotelSchema.index({ rating: -1 });

// Virtual for full location string
hotelSchema.virtual('fullLocation').get(function() {
  return `${this.location.city}, ${this.location.state}, ${this.location.country}`;
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
