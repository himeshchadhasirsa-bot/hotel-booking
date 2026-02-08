import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Building2, BookOpen, Phone, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getDashboardRoute = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'manager':
      case 'waiter':
      case 'cook':
      case 'receptionist':
        return '/dashboard/employee';
      case 'user':
        return '/dashboard/user';
      default:
        return '/';
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Hotels', path: '/hotels', icon: Building2 },
    { name: 'Services', path: '/services', icon: Building2 },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Blogs', path: '/blogs', icon: BookOpen },
    { name: 'Contact', path: '/contact', icon: Phone }
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <Building2 size={32} />
            <span className="logo-text">LuxeStay </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="nav-link">
                <link.icon size={18} />
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Actions */}
          <div className="header-actions">
            {isAuthenticated ? (
              <>
                <Link to={getDashboardRoute()} className="btn btn-ghost btn-sm">
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              <link.icon size={20} />
              <span>{link.name}</span>
            </Link>
          ))}
          
          <div className="nav-mobile-divider"></div>
          
          {isAuthenticated ? (
            <>
              <Link
                to={getDashboardRoute()}
                className="nav-link-mobile"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                <span>Dashboard</span>
              </Link>
              <button onClick={handleLogout} className="nav-link-mobile">
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-link-mobile"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="nav-link-mobile"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
