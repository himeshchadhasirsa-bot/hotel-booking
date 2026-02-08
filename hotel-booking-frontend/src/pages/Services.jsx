import { Building2, Calendar, Users, Shield, Clock, Headphones, CreditCard, Globe } from 'lucide-react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: 'Hotel Booking',
      description: 'Browse and book from our curated selection of luxury hotels worldwide with instant confirmation.',
      features: ['200+ Partner Hotels', 'Best Price Guarantee', 'Instant Confirmation', 'Flexible Options']
    },
    {
      icon: Calendar,
      title: 'Room Reservations',
      description: 'Reserve your perfect room with flexible dates and easy modification options.',
      features: ['Multiple Room Types', 'Easy Date Changes', 'Group Bookings', 'Special Requests']
    },
    {
      icon: Users,
      title: 'Corporate Packages',
      description: 'Tailored solutions for business travelers with exclusive corporate rates and benefits.',
      features: ['Volume Discounts', 'Dedicated Support', 'Invoicing Options', 'Travel Reports']
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your transactions are protected with industry-leading security standards and encryption.',
      features: ['SSL Encryption', 'Multiple Payment Options', 'Secure Checkout', 'Refund Protection']
    },
    {
      icon: Clock,
      title: '24/7 Customer Support',
      description: 'Round-the-clock assistance for all your booking needs and travel questions.',
      features: ['Live Chat', 'Phone Support', 'Email Assistance', 'Emergency Help']
    },
    {
      icon: Headphones,
      title: 'Concierge Service',
      description: 'Personalized assistance for planning your stay and arranging special experiences.',
      features: ['Activity Planning', 'Restaurant Reservations', 'Transportation', 'Special Occasions']
    },
    {
      icon: CreditCard,
      title: 'Loyalty Rewards',
      description: 'Earn points on every booking and enjoy exclusive benefits as a valued member.',
      features: ['Earn Points', 'Member Discounts', 'Priority Support', 'Exclusive Deals']
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Access hotels in major cities and destinations across the world.',
      features: ['50+ Countries', 'Major Cities', 'Resort Destinations', 'Hidden Gems']
    }
  ];

  return (
    <div className="services-page">
      <div className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive solutions for all your hotel booking needs</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="service-icon">
                  <service.icon size={40} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Our Services?</h2>
            <p>Start your journey with LuxeStay today</p>
            <a href="/hotels" className="btn btn-secondary btn-lg">Browse Hotels</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
