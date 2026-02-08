import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: 'user' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login - Replace with actual API call
    // The selected role determines the mock user created for local testing.
    const email = formData.email?.toLowerCase();
    const selectedRole = formData.role || 'user';
    const roleNames = {
      admin: 'Admin User',
      manager: 'Manager User',
      waiter: 'Waiter',
      cook: 'Cook',
      receptionist: 'Receptionist',
      user: 'Regular User'
    };

    const mockUser = {
      id: `u-${selectedRole}`,
      name: roleNames[selectedRole] || 'User',
      email: email || formData.email,
      role: selectedRole,
      token: `${selectedRole}-token-123`
    };

    login(mockUser);

    const getDashboardRoute = (role) => {
      if (role === 'admin') return '/dashboard/admin';
      if (['manager', 'waiter', 'cook', 'receptionist'].includes(role)) return '/dashboard/employee';
      return '/dashboard/user';
    };

    const from = location.state?.from || getDashboardRoute(selectedRole);
    navigate(from);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="john@example.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Enter your password"
              />
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
            <button type="submit" className="btn btn-primary btn-lg">
              <LogIn size={20} />
              Sign In
            </button>
          </form>
          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
