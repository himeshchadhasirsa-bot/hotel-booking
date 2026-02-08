import { useState } from 'react';
import { Building2, Users, BookOpen, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const AdminDashboard = () => {
  const stats = [
    { icon: Building2, label: 'Total Hotels', value: '248', change: '+12%', color: 'primary' },
    { icon: Users, label: 'Total Users', value: '50,234', change: '+18%', color: 'success' },
    { icon: BookOpen, label: 'Total Bookings', value: '12,567', change: '+25%', color: 'warning' },
    { icon: TrendingUp, label: 'Successful', value: '11,234', change: '+15%', color: 'info' }
  ];

  const bookingStats = [
    { status: 'Booked', count: 12567, percentage: 100 },
    { status: 'Successful', count: 11234, percentage: 89 },
    { status: 'Cancelled', count: 1333, percentage: 11 }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, Admin</p>
      </div>

      <div className="stats-grid-dash">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card-dash ${stat.color}`}>
            <div className="stat-icon-dash"><stat.icon size={32} /></div>
            <div className="stat-content-dash">
              <div className="stat-label-dash">{stat.label}</div>
              <div className="stat-value-dash">{stat.value}</div>
              <div className="stat-change-dash">{stat.change} from last month</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Booking Status Breakdown</h2>
          <div className="booking-breakdown">
            {bookingStats.map((item, index) => (
              <div key={index} className="breakdown-item">
                <div className="breakdown-header">
                  <span className="breakdown-label">{item.status}</span>
                  <span className="breakdown-count">{item.count.toLocaleString()}</span>
                </div>
                <div className="breakdown-bar">
                  <div className="breakdown-fill" style={{ width: `${item.percentage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-btn">Add Hotel</button>
            <button className="action-btn">Manage Users</button>
            <button className="action-btn">View Bookings</button>
            <button className="action-btn">Create Blog</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
