import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'user' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Mock registration - Replace with actual API call
    const selectedRole = formData.role || 'user';
    const mockUser = { id: Date.now(), name: formData.name, email: formData.email, role: selectedRole, token: `${selectedRole}-token-123` };
    login(mockUser);
    const getDashboardRoute = (role) => {
      if (role === 'admin') return '/dashboard/admin';
      if (['manager', 'waiter', 'cook', 'receptionist'].includes(role)) return '/dashboard/employee';
      return '/dashboard/user';
    };
    navigate(getDashboardRoute(selectedRole));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join LuxeStay for exclusive hotel deals</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label"><User size={16} /> Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-input" required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label className="form-label"><Mail size={16} />  Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label"><Lock size={16} />  Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-input" required placeholder="Enter password" />
            </div>
            <div className="form-group">
              <label className="form-label"><Lock size={16} />  Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-input" required placeholder="Confirm password" />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="form-select">
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="waiter">Waiter</option>
                <option value="cook">Cook</option>
                <option value="receptionist">Receptionist</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-lg"><UserPlus size={20} />  Create Account</button>
          </form>
          <div className="auth-footer"><p>Already have an account? <Link to="/login">Login here</Link></p></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
