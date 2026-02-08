import { Award, Users, Target, Heart } from 'lucide-react';
import './About.css';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above all else, ensuring every guest has an exceptional experience.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards of quality in every aspect of our service and hotel partnerships.'
    },
    {
      icon: Users,
      title: 'Trust',
      description: 'We build lasting relationships through transparency, reliability, and integrity in all our interactions.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We continuously evolve our platform to provide cutting-edge booking solutions and seamless experiences.'
    }
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
    },
    {
      name: 'Sarah Johnson',
      role: 'Chief Operating Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Partnerships',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Customer Experience Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'
    }
  ];

  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <h1>About LuxeStay</h1>
          <p>Your Trusted Partner in Luxury Hotel Bookings</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2009, LuxeStay has grown from a small startup to one of the world's leading
                hotel booking platforms. Our journey began with a simple vision: to make luxury hotel
                bookings accessible, transparent, and effortless for everyone.
              </p>
              <p>
                Today, we partner with over 200 premium hotels worldwide, serving more than 50,000
                satisfied customers annually. Our platform combines cutting-edge technology with
                personalized service to deliver an unmatched booking experience.
              </p>
              <p>
                We believe that every journey deserves a perfect stay, and we're committed to helping
                you find exactly that. Whether you're traveling for business or leisure, our curated
                selection of hotels ensures you'll always find your ideal accommodation.
              </p>
            </div>
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800"
                alt="Our team"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Core Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="value-icon">
                  <value.icon size={36} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section team-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Meet Our Leadership</h2>
            <p className="section-subtitle">
              The team dedicated to revolutionizing hotel bookings
            </p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
