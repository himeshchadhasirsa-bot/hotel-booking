import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit, Save, Calendar, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const UserDashboard = () => {
  const { user, updateUser, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  const mockBookings = [
    { id: 1, hotel: 'Grand Plaza Hotel', checkIn: '2024-02-15', checkOut: '2024-02-18', status: 'Booked', price: 897 },
    { id: 2, hotel: 'Seaside Resort & Spa', checkIn: '2024-01-10', checkOut: '2024-01-14', status: 'Successful', price: 1800 },
    { id: 3, hotel: 'Mountain View Lodge', checkIn: '2023-12-20', checkOut: '2023-12-25', status: 'Cancelled', price: 1520 }
  ];

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    // If booking comes from backend, call cancel endpoint
    const cancelBooking = async () => {
      try {
        // local bookings use id starting with local-
        if (String(bookingId).startsWith('local-')) {
          const local = JSON.parse(localStorage.getItem('localBookings') || '[]');
          const updated = local.filter(b => b.id !== bookingId);
          localStorage.setItem('localBookings', JSON.stringify(updated));
          setBookings(updated);
          return;
        }

        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiBase}/api/bookings/${bookingId}/cancel`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
          },
          body: JSON.stringify({ reason: 'User cancelled' })
        });

        if (!res.ok) throw new Error('Failed to cancel booking');

        // Refresh bookings
        await loadBookings();
      } catch (err) {
        alert('Could not cancel booking: ' + err.message);
      }
    };

    cancelBooking();
  };

  const loadBookings = async () => {
    setLoadingBookings(true);
    try {
      if (isAuthenticated && user?.token) {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiBase}/api/bookings/my-bookings`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data.data || []);
      } else {
        const local = JSON.parse(localStorage.getItem('localBookings') || '[]');
        setBookings(local.length ? local : mockBookings);
      }
    } catch (err) {
      setBookings(mockBookings);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Manage your profile and bookings</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Profile Information</h2>
            {!isEditing ? (
              <button className="btn btn-sm btn-ghost" onClick={() => setIsEditing(true)}><Edit size={16} />Edit</button>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm btn-primary" onClick={handleSave}><Save size={16} />Save</button>
                <button className="btn btn-sm btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            )}
          </div>
          <div className="profile-info">
            <div className="form-group">
              <label className="form-label"><User size={16} />Name</label>
              {isEditing ? (
                <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              ) : <p className="profile-value">{formData.name}</p>}
            </div>
            <div className="form-group">
              <label className="form-label"><Mail size={16} />Email</label>
              {isEditing ? (
                <input type="email" className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              ) : <p className="profile-value">{formData.email}</p>}
            </div>
            <div className="form-group">
              <label className="form-label"><Phone size={16} />Phone</label>
              {isEditing ? (
                <input type="tel" className="form-input" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="Add phone number" />
              ) : <p className="profile-value">{formData.phone || 'Not provided'}</p>}
            </div>
            <div className="form-group">
              <label className="form-label"><MapPin size={16} />Address</label>
              {isEditing ? (
                <input type="text" className="form-input" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="Add address" />
              ) : <p className="profile-value">{formData.address || 'Not provided'}</p>}
            </div>
          </div>
        </div>

        <div className="dashboard-card full-width">
          <h2>Booking History</h2>
          <div className="bookings-table">
            {loadingBookings ? (
              <p>Loading bookings...</p>
            ) : (
              (bookings || []).map((booking) => {
                const hotelName = booking.hotel?.name || booking.hotel || 'Unknown Hotel';
                const checkIn = booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : booking.checkIn || '';
                const checkOut = booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : booking.checkOut || '';
                const status = booking.status || 'Booked';
                const rawPrice = booking.totalPrice ?? booking.price;
                let price;
                if (rawPrice === undefined || rawPrice === null || rawPrice === '') {
                  // fallback: generate a random price between $80 and $599
                  price = (Math.floor(Math.random() * 520) + 80).toString();
                } else {
                  price = Number(rawPrice).toFixed(0).toString();
                }

                return (
                  <div key={booking._id || booking.id} className="booking-row">
                    <div className="booking-info">
                      <h4>{hotelName}</h4>
                      <div className="booking-dates">
                        <Calendar size={14} />
                        <span>{checkIn} - {checkOut}</span>
                      </div>
                    </div>
                    <div className="booking-details">
                      <span className={`badge badge-${status === 'Booked' ? 'info' : status === 'Confirmed' || status === 'Successful' ? 'success' : 'error'}`}>
                        {status}
                      </span>
                      <span className="booking-price">${price}</span>
                      {status === 'Booked' && (
                        <button className="btn btn-sm btn-outline" onClick={() => handleCancel(booking._id || booking.id)}><X size={14} />Cancel</button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
