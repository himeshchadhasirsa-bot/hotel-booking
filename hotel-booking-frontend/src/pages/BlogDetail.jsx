import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import './BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock blog data
  const blog = {
    id: parseInt(id),
    title: 'Top 10 Luxury Hotels in New York City',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
    author: 'Sarah Johnson',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Travel Guide',
    content: `
      <p>New York City, the city that never sleeps, is home to some of the world's most luxurious and iconic hotels. From historic landmarks to modern masterpieces, these establishments offer unparalleled service, stunning views, and unforgettable experiences.</p>

      <h2>1. The Plaza Hotel</h2>
      <p>An iconic landmark on Fifth Avenue, The Plaza has been the epitome of luxury since 1907. With its château-style architecture and legendary service, it continues to be a favorite among discerning travelers.</p>

      <h2>2. The St. Regis New York</h2>
      <p>This Beaux-Arts masterpiece has been setting the standard for luxury hospitality since 1904. Known for its impeccable butler service and opulent design, The St. Regis remains a timeless choice.</p>

      <h2>3. The Carlyle</h2>
      <p>Located on the Upper East Side, The Carlyle combines European elegance with New York sophistication. Its legendary Bemelmans Bar and Café Carlyle make it a cultural institution.</p>

      <h2>4. Four Seasons Hotel New York Downtown</h2>
      <p>This modern skyscraper hotel offers contemporary luxury in Lower Manhattan. With stunning views of the Financial District and exceptional dining options, it's perfect for the modern traveler.</p>

      <h2>5. The Peninsula New York</h2>
      <p>Combining old-world elegance with cutting-edge technology, The Peninsula offers a unique blend of tradition and innovation in the heart of Midtown Manhattan.</p>

      <p>These hotels represent just a fraction of the luxury accommodations available in New York City. Each offers its own unique character and exceptional service that make them stand out in this competitive market.</p>

      <h2>Conclusion</h2>
      <p>Whether you're visiting for business or pleasure, New York City's luxury hotels provide the perfect base for exploring this incredible city. From historic elegance to modern sophistication, there's a perfect hotel waiting for every discerning traveler.</p>
    `
  };

  return (
    <div className="blog-detail-page">
      <div className="container">
        <button onClick={() => navigate('/blogs')} className="back-btn">
          <ArrowLeft size={20} />
          <span>Back to Blogs</span>
        </button>

        <article className="blog-detail-article">
          <div className="blog-detail-header">
            <span className="blog-detail-category">{blog.category}</span>
            <h1>{blog.title}</h1>
            <div className="blog-detail-meta">
              <div className="meta-item">
                <User size={18} />
                <span>{blog.author}</span>
              </div>
              <div className="meta-item">
                <Calendar size={18} />
                <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="meta-item">
                <Clock size={18} />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>

          <div className="blog-detail-image">
            <img src={blog.image} alt={blog.title} />
          </div>

          <div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
