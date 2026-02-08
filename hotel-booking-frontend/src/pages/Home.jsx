import { Link } from 'react-router-dom';
import { Search, Star, Shield, Clock, MapPin, Users, Award, TrendingUp } from 'lucide-react';
import './Home.css';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Easy Booking',
      description: 'Search and book your perfect hotel in just a few clicks with our intuitive platform.'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your transactions are protected with industry-leading security standards.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our dedicated team is always available to assist you with any queries.'
    },
    {
      icon: Star,
      title: 'Best Prices',
      description: 'Get exclusive deals and guaranteed best rates on premium hotel bookings.'
    }
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Happy Customers' },
    { icon: MapPin, value: '200+', label: 'Hotel Partners' },
    { icon: Award, value: '15+', label: 'Years Experience' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Traveler',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      rating: 5,
      text: 'LuxeStay made my business trip incredibly smooth. The booking process was seamless, and the hotel exceeded all my expectations.'
    },
    {
      name: 'Michael Chen',
      role: 'Vacation Enthusiast',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      text: 'I have used many booking platforms, but LuxeStay stands out with its exceptional service and curated hotel selection.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Family Traveler',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 5,
      text: 'Perfect for family vacations! The interface is user-friendly, and we found the perfect hotel for our needs.'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <Star size={16} />
              <span>Premium Hotel Booking Platform</span>
            </div>
            <h1 className="hero-title">
              Discover Your Perfect
              <span className="hero-title-accent"> Stay</span>
            </h1>
            <p className="hero-subtitle">
              Experience luxury and comfort at the world's finest hotels. 
              Book with confidence and create unforgettable memories.
            </p>
            <div className="hero-actions">
              <Link to="/hotels" className="btn btn-primary btn-lg">
                Explore Hotels
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Choose LuxeStay</h2>
            <p className="section-subtitle">
              We provide exceptional service and benefits to make your hotel booking experience seamless
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="feature-icon">
                  <feature.icon size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-icon">
                  <stat.icon size={36} />
                </div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>What Our Guests Say</h2>
            <p className="section-subtitle">
              Read reviews from our satisfied customers who have experienced excellence
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Book Your Dream Stay?</h2>
            <p className="cta-subtitle">
              Join thousands of satisfied travelers and experience luxury at its finest
            </p>
            <Link to="/hotels" className="btn btn-secondary btn-lg">
              Browse Hotels Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
