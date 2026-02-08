import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapPin, Star, Wifi, Car, Coffee, Users, Calendar, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './HotelDetail.css';

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  // Mock hotel data - Replace with API call
  const hotel = {
    id: parseInt(id),
    name: 'Grand Plaza Hotel',
    location: 'Manhattan, New York, USA',
    rating: 4.8,
    reviews: 1250,
    price: 299,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200'
    ],
    description: 'Experience unparalleled luxury in the heart of Manhattan. The Grand Plaza Hotel combines timeless elegance with modern sophistication, offering guests an unforgettable stay in one of the world\'s most iconic cities. Our meticulously designed rooms and suites provide the perfect sanctuary after a day of exploring.',
    amenities: [
      'High-Speed WiFi',
      'Valet Parking',
      'Fine Dining Restaurant',
      'Rooftop Pool',
      '24/7 Concierge',
      'Fitness Center',
      'Spa & Wellness',
      'Business Center',
      'Room Service',
      'Airport Shuttle'
    ],
    features: [
      '500+ Luxury Rooms',
      'Michelin Star Restaurant',
      'Panoramic City Views',
      'Premium Bedding',
      'Marble Bathrooms',
      'Smart Room Technology'
    ]
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/hotels/${id}` } });
      return;
    }
    
    // Will be replaced with actual booking logic
    const bookingData = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      checkIn,
      checkOut,
      guests,
      totalPrice: hotel.price
    };
    console.log('Booking:', bookingData);
    alert('Booking functionality will be implemented with backend!');
  };

  return (
    <div className="hotel-detail-page">
      {/* Back Button */}
      <div className="container">
        <button onClick={() => navigate('/hotels')} className="back-btn">
          <ArrowLeft size={20} />
          <span>Back to Hotels</span>
        </button>
      </div>

      {/* Hotel Images */}
      <div className="hotel-gallery">
        <div className="container">
          <div className="gallery-grid">
            <div className="gallery-main">
              <img src={hotel.images[0]} alt={hotel.name} />
            </div>
            <div className="gallery-side">
              <img src={hotel.images[1]} alt={hotel.name} />
              <img src={hotel.images[2]} alt={hotel.name} />
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Info */}
      <section className="section">
        <div className="container">
          <div className="hotel-detail-grid">
            {/* Left Column */}
            <div className="hotel-info">
              <div className="hotel-detail-header">
                <div>
                  <h1>{hotel.name}</h1>
                  <div className="hotel-detail-location">
                    <MapPin size={20} />
                    <span>{hotel.location}</span>
                  </div>
                </div>
                <div className="hotel-rating-badge">
                  <Star size={24} fill="currentColor" />
                  <div>
                    <div className="rating-value">{hotel.rating}</div>
                    <div className="rating-reviews">{hotel.reviews} reviews</div>
                  </div>
                </div>
              </div>

              <div className="hotel-description">
                <h2>About This Hotel</h2>
                <p>{hotel.description}</p>
              </div>

              <div className="hotel-features">
                <h2>Hotel Features</h2>
                <div className="features-grid">
                  {hotel.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <Check size={20} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hotel-amenities-section">
                <h2>Amenities</h2>
                <div className="amenities-grid">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      <Check size={18} />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="booking-card-wrapper">
              <div className="booking-card">
                <div className="booking-price">
                  <span className="price-amount">${hotel.price}</span>
                  <span className="price-period">per night</span>
                </div>

                <form onSubmit={handleBooking} className="booking-form">
                  <div className="form-group">
                    <label className="form-label">
                      <Calendar size={16} />
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Calendar size={16} />
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Users size={16} />
                      Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      required
                      className="form-select"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>

                  {!isAuthenticated && (
                    <div className="auth-notice">
                      <p>Please login to book this hotel</p>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary btn-lg">
                    {isAuthenticated ? 'Book Now' : 'Login to Book'}
                  </button>
                </form>

                <div className="booking-features">
                  <div className="booking-feature">
                    <Check size={16} />
                    <span>Free cancellation</span>
                  </div>
                  <div className="booking-feature">
                    <Check size={16} />
                    <span>Best price guarantee</span>
                  </div>
                  <div className="booking-feature">
                    <Check size={16} />
                    <span>Instant confirmation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelDetail;
