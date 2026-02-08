import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Wifi, Car, Coffee, Search } from 'lucide-react';
import './Hotels.css';

const Hotels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Mock hotel data - will be replaced with API calls
  const hotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'New York, USA',
      rating: 4.8,
      reviews: 1250,
      price: 299,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      amenities: ['WiFi', 'Parking', 'Restaurant', 'Pool'],
      description: 'Luxurious 5-star hotel in the heart of Manhattan with stunning city views.'
    },
    {
      id: 2,
      name: 'Seaside Resort & Spa',
      location: 'Miami, USA',
      rating: 4.9,
      reviews: 980,
      price: 450,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
      amenities: ['WiFi', 'Spa', 'Beach Access', 'Restaurant'],
      description: 'Beachfront paradise with world-class spa and dining experiences.'
    },
    {
      id: 3,
      name: 'Mountain View Lodge',
      location: 'Aspen, USA',
      rating: 4.7,
      reviews: 750,
      price: 380,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      amenities: ['WiFi', 'Parking', 'Fireplace', 'Ski Access'],
      description: 'Cozy mountain retreat with breathtaking views and ski-in access.'
    },
    {
      id: 4,
      name: 'Urban Boutique Hotel',
      location: 'San Francisco, USA',
      rating: 4.6,
      reviews: 650,
      price: 245,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      amenities: ['WiFi', 'Parking', 'Rooftop Bar', 'Gym'],
      description: 'Modern boutique hotel in the vibrant heart of San Francisco.'
    },
    {
      id: 5,
      name: 'Lakeside Inn',
      location: 'Chicago, USA',
      rating: 4.5,
      reviews: 520,
      price: 189,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      amenities: ['WiFi', 'Lake View', 'Restaurant', 'Bar'],
      description: 'Charming lakefront hotel with stunning water views.'
    },
    {
      id: 6,
      name: 'Desert Oasis Resort',
      location: 'Phoenix, USA',
      rating: 4.8,
      reviews: 890,
      price: 320,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      amenities: ['WiFi', 'Pool', 'Spa', 'Golf Course'],
      description: 'Luxury desert resort with championship golf and premium amenities.'
    }
  ];

  const locations = ['all', 'New York', 'Miami', 'San Francisco', 'Chicago', 'Phoenix', 'Aspen'];

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || 
                           hotel.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="hotels-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1>Discover Hotels</h1>
          <p>Find the perfect accommodation for your next stay</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="search-section">
        <div className="container">
          <div className="search-bar">
            <div className="search-input-wrapper">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search hotels by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="location-filter"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      <section className="section">
        <div className="container">
          <div className="hotels-count">
            <p>{filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} found</p>
          </div>
          <div className="hotels-grid">
            {filteredHotels.map((hotel, index) => (
              <Link
                key={hotel.id}
                to={`/hotels/${hotel.id}`}
                className="hotel-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="hotel-image">
                  <img src={hotel.image} alt={hotel.name} />
                  <div className="hotel-badge">
                    <Star size={16} fill="currentColor" />
                    <span>{hotel.rating}</span>
                  </div>
                </div>
                <div className="hotel-content">
                  <div className="hotel-header">
                    <h3 className="hotel-name">{hotel.name}</h3>
                    <div className="hotel-location">
                      <MapPin size={16} />
                      <span>{hotel.location}</span>
                    </div>
                  </div>
                  <p className="hotel-description">{hotel.description}</p>
                  <div className="hotel-amenities">
                    {hotel.amenities.slice(0, 4).map((amenity, i) => (
                      <span key={i} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                  <div className="hotel-footer">
                    <div className="hotel-reviews">
                      <Users size={16} />
                      <span>{hotel.reviews} reviews</span>
                    </div>
                    <div className="hotel-price">
                      <span className="price-label">From</span>
                      <span className="price-value">${hotel.price}</span>
                      <span className="price-period">/night</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filteredHotels.length === 0 && (
            <div className="no-results">
              <h3>No hotels found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hotels;
