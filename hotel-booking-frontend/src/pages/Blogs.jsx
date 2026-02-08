import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import './Blogs.css';

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const blogs = [
    {
      id: 1,
      title: 'Top 10 Luxury Hotels in New York City',
      excerpt: 'Discover the most exquisite hotels that define luxury in the heart of Manhattan.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'Travel Guide'
    },
    {
      id: 2,
      title: 'A Complete Guide to Beach Resorts',
      excerpt: 'Everything you need to know about choosing the perfect beach resort for your vacation.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600',
      author: 'Michael Chen',
      date: '2024-01-10',
      category: 'Tips & Advice'
    },
    {
      id: 3,
      title: 'Business Travel: Best Hotels for Remote Work',
      excerpt: 'Top hotels with excellent work amenities for digital nomads and business travelers.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600',
      author: 'Emily Rodriguez',
      date: '2024-01-05',
      category: 'Business Travel'
    },
    {
      id: 4,
      title: 'Mountain Retreats: Escape to Nature',
      excerpt: 'Find peace and tranquility in these stunning mountain lodge destinations.',
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600',
      author: 'David Kim',
      date: '2023-12-28',
      category: 'Travel Guide'
    },
    {
      id: 5,
      title: 'Hotel Booking Tips: Save More on Your Stay',
      excerpt: 'Expert tips and tricks to get the best deals on luxury hotel bookings.',
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600',
      author: 'Lisa Anderson',
      date: '2023-12-20',
      category: 'Tips & Advice'
    },
    {
      id: 6,
      title: 'Family-Friendly Hotels Around the World',
      excerpt: 'The best hotels that cater to families with children of all ages.',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600',
      author: 'Tom Wilson',
      date: '2023-12-15',
      category: 'Family Travel'
    }
  ];

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="blogs-page">
      <div className="page-header">
        <div className="container">
          <h1>Travel Blog</h1>
          <p>Insights, tips, and stories from the world of luxury travel</p>
        </div>
      </div>

      <div className="search-section">
        <div className="container">
          <div className="search-bar">
          
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="blogs-grid">
            {filteredBlogs.map((blog, index) => (
              <article
                key={blog.id}
                className="blog-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="blog-image">
                  <img src={blog.image} alt={blog.title} />
                  <span className="blog-category">{blog.category}</span>
                </div>
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-excerpt">{blog.excerpt}</p>
                  <div className="blog-meta">
                    <div className="blog-author">
                      <User size={16} />
                      <span>{blog.author}</span>
                    </div>
                    <div className="blog-date">
                      <Calendar size={16} />
                      <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <Link to={`/blogs/${blog.id}`} className="blog-link">
                    Read More
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {filteredBlogs.length === 0 && (
            <div className="no-results">
              <h3>No articles found</h3>
              <p>Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
